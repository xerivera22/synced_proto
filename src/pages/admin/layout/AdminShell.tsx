import { useAuth } from "@/context/AuthContext";
import "@/pages/student/styles/student.css";
import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSideNavigation from "../components/side-navigation";
import SplashScreen from "@/components/SplashScreen";

type SearchShortcut = {
  id: string;
  title: string;
  description: string;
  to: string;
};

const searchShortcuts: SearchShortcut[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Executive summary",
    to: "/admin/dashboard",
  },
  {
    id: "students",
    title: "Student Records",
    description: "Roster & status",
    to: "/admin/students",
  },
  {
    id: "faculty",
    title: "Faculty Directory",
    description: "Teacher accounts",
    to: "/admin/faculty",
  },
  {
    id: "events",
    title: "Events & Schedule",
    description: "Calendar planning",
    to: "/admin/events",
  },
  {
    id: "payments",
    title: "Payment Ledger",
    description: "Billing & balances",
    to: "/admin/payments",
  },
  {
    id: "announcements",
    title: "Announcements",
    description: "Broadcast center",
    to: "/admin/announcements",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Portal configuration",
    to: "/admin/settings",
  },
];

const AdminShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const shouldBindOutsideClick = profileOpen || searchOpen;

  useEffect(() => {
    const path = location.pathname;
    if (!path) return undefined;

    const id = requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  useEffect(() => {
    if (!shouldBindOutsideClick) return undefined;

    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [shouldBindOutsideClick]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  const filteredShortcuts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchShortcuts.slice(0, 5);
    return searchShortcuts.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query]);

  const initials = useMemo(() => {
    const handle = user?.email?.split("@")[0] || "";
    if (!handle) return "AD";
    const parts = handle
      .replace(/[^a-zA-Z]/g, " ")
      .trim()
      .split(/\s+/);
    const chars =
      (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");
    return chars.toUpperCase() || "AD";
  }, [user?.email]);

  if (user === null) return null;
  if (user.role !== "admin") {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  const currentTitle = () => {
    if (location.pathname.includes("students")) return "Student Records";
    if (location.pathname.includes("faculty")) return "Faculty";
    if (location.pathname.includes("events")) return "Events & Schedule";
    if (location.pathname.includes("payments")) return "Payment Ledger";
    if (location.pathname.includes("announcements")) return "Announcements";
    if (location.pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div data-admin-ui className="app-container">
      <aside className="max-md:hidden block">
        <AdminSideNavigation />
      </aside>
      <div className="md:hidden">
        <AdminSideNavigation
          className={mobileNavOpen ? "active" : ""}
          onLinkClick={() => setMobileNavOpen(false)}
        />
        {mobileNavOpen && (
          <button
            type="button"
            className="fixed inset-0 bg-black/30 z-[95] p-0 m-0 border-0"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setMobileNavOpen(false);
            }}
          />
        )}
      </div>
      <div className="main-content">
        <header className="top-header">
          <div className="header-content">
            <div className="header-left">
              <button
                type="button"
                className="header-btn md:hidden"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileNavOpen((v) => !v)}
              >
                {mobileNavOpen ? (
                  <X className="header-icon" />
                ) : (
                  <Menu className="header-icon" />
                )}
              </button>
              <h1>ADMIN_PORTAL</h1>
              <p>{currentTitle()}</p>
            </div>
            <div className="header-right relative" ref={searchRef}>
              <button
                type="button"
                className="header-btn"
                aria-label={searchOpen ? "Close search" : "Search"}
                onClick={() => setSearchOpen((v) => !v)}
              >
                {searchOpen ? (
                  <X className="header-icon" />
                ) : (
                  <Search className="header-icon" />
                )}
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[min(92vw,480px)] bg-white border border-gray-200 rounded-lg shadow-lg z-[99]">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      ref={searchInputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search admin pages..."
                      className="w-full outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <ul className="max-h-72 overflow-auto py-1">
                    {filteredShortcuts.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No results
                      </li>
                    ) : (
                      filteredShortcuts.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-gray-50"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                              navigate(item.to);
                            }}
                          >
                            <div className="text-sm font-medium">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
              <button
                type="button"
                className="header-btn"
                aria-label="Notifications"
              >
                <Bell className="header-icon" />
              </button>
              <div className="header-profile" ref={profileRef}>
                <button
                  type="button"
                  className="header-avatar"
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setProfileOpen(false);
                  }}
                >
                  {initials}
                </button>
                {profileOpen && (
                  <div className="profile-menu">
                    <div className="profile-meta" aria-hidden="true">
                      <div className="profile-initials">{initials}</div>
                      <div className="profile-texts">
                        <div className="profile-name">
                          {user?.email?.split("@")[0] || "Admin"}
                        </div>
                        <div className="profile-email">
                          {user?.email || "admin@example.com"}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        navigate("/admin-login", { replace: true });
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main ref={contentRef} className="content-area pb-16 md:pb-4">
          <Outlet />
        </main>
      </div>
      <SplashScreen />
    </div>
  );
};

export default AdminShell;
