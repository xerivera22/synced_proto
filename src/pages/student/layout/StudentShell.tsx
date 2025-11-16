import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BottomNavigation from "../components/bottom-navigation";
// Import the navigation components from the student's components folder
// These were copied from the other app as dash-case files
import SideNavigation from "../components/side-navigation";

// Scoped student styles (isolated to the student area)
import "../styles/student.css";

const StudentShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const loc = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Always scroll the student content area to top when navigating between tabs/routes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only depend on pathname for scroll reset.
  useEffect(() => {
    // Defer to ensure new route content mounts before scrolling container
    const id = requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [loc.pathname]);

  // Close profile menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", onDocClick);
    }
    if (searchOpen) {
      document.addEventListener("mousedown", onDocClick);
    }
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [profileOpen, searchOpen]);

  // Focus search input when opening
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  const searchItems = useMemo(
    () => [
      {
        id: "nav-overview",
        kind: "Page",
        title: "Overview",
        subtitle: "Dashboard summary",
        to: "/student/overview",
      },
      {
        id: "nav-progress",
        kind: "Page",
        title: "Academic Progress",
        subtitle: "Grades and subjects",
        to: "/student/progress",
      },
      {
        id: "nav-attendance",
        kind: "Page",
        title: "Attendance",
        subtitle: "Daily and monthly records",
        to: "/student/attendance",
      },
      {
        id: "nav-schedule",
        kind: "Page",
        title: "Schedule",
        subtitle: "Classes and timetable",
        to: "/student/schedule",
      },
      {
        id: "nav-payments",
        kind: "Page",
        title: "Payments",
        subtitle: "Tuition and fees",
        to: "/student/payments",
      },
      {
        id: "nav-documents",
        kind: "Page",
        title: "Documents",
        subtitle: "IDs, forms, certificates",
        to: "/student/documents",
      },
      {
        id: "nav-profile",
        kind: "Page",
        title: "Profile",
        subtitle: "Personal information",
        to: "/student/profile",
      },
      {
        id: "nav-settings",
        kind: "Page",
        title: "Settings",
        subtitle: "Preferences and privacy",
        to: "/student/settings",
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems.slice(0, 6);
    return searchItems
      .filter((i) => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, searchItems]);

  // Wait for session restoration in AuthProvider before deciding
  if (user === null) return null;

  // Allow students and parents to access student area
  if (user.role !== "student" && user.role !== "parent") {
    return <Navigate to="/student-login" state={{ from: loc }} replace />;
  }

  return (
    <div data-student-ui className="app-container">
      {/* Sidebar (desktop and up) */}
      <aside className="max-md:hidden block">
        <SideNavigation />
      </aside>
      {/* Mobile slide-in sidebar and backdrop */}
      <div className="md:hidden">
        <SideNavigation
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

      {/* Main area */}
      <div className="main-content">
        {/* Top header for student UI */}
        <header className="top-header">
          <div className="header-content">
            <div className="header-left">
              {/* Mobile hamburger */}
              <button
                type="button"
                className="header-btn md:hidden"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileNavOpen((v) => !v)}
              >
                {mobileNavOpen ? <X className="header-icon" /> : <Menu className="header-icon" />}
              </button>
              <h1>STUDENT_UI_PROTOTYPE</h1>
              <p>Academic Management Tool</p>
            </div>
            <div className="header-right relative" ref={searchRef}>
              <button
                type="button"
                className="header-btn"
                aria-label={searchOpen ? "Close search" : "Search"}
                onClick={() => setSearchOpen((v) => !v)}
              >
                {searchOpen ? <X className="header-icon" /> : <Search className="header-icon" />}
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[min(92vw,480px)] bg-white border border-gray-200 rounded-lg shadow-lg z-[99]">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      ref={searchInputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search student pages..."
                      className="w-full outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <ul className="max-h-72 overflow-auto py-1">
                    {filtered.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">No results</li>
                    ) : (
                      filtered.map((item) => (
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
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">
                              {item.kind} • {item.subtitle}
                            </div>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
              <button type="button" className="header-btn" aria-label="Notifications">
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
                  AT
                </button>
                {profileOpen && (
                  <div className="profile-menu">
                    <div className="profile-meta" aria-hidden="true">
                      <div className="profile-initials">AT</div>
                      <div className="profile-texts">
                        <div className="profile-name">
                          {user?.email?.split("@")[0] || "Student"}
                        </div>
                        <div className="profile-email">{user?.email || "student@example.com"}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        navigate("/student-login", { replace: true });
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
        {/* Scrollable content area; add extra bottom padding so mobile bottom nav doesn't cover content */}
        <main ref={contentRef} className="content-area pb-16 md:pb-4">
          <Outlet />
        </main>
        {/* Mobile bottom navigation */}
        <div className="md:hidden sticky bottom-0">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default StudentShell;
