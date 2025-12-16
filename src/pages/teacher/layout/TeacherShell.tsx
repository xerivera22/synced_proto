import { useAuth } from "@/context/AuthContext";
import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

// Reuse student styling conventions via shared components and existing CSS tokens
import SplashScreen from "@/components/SplashScreen";
import "@/pages/student/styles/student.css";
import SideNavigation from "../components/side-navigation";

export default function TeacherShell() {
  const { user, userData, logout } = useAuth();
  const loc = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  console.log("User:", user, "UserData:", userData);

  // Scroll to top on route change within teacher area (always declare hooks before conditional returns)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only depend on pathname for scroll reset.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (contentRef.current)
        contentRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [loc.pathname]);

  // Close menus on outside click
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
    if (profileOpen || searchOpen) {
      document.addEventListener("mousedown", onDocClick);
    }
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [profileOpen, searchOpen]);

  // Focus search input when opening
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 0);
    else setQuery("");
  }, [searchOpen]);

  const lastSubjectId = useMemo(() => {
    try {
      return localStorage.getItem("teacher.lastSubjectId") || undefined;
    } catch {
      return undefined;
    }
  }, []);

  const searchItems = useMemo(
    () => [
      {
        id: "nav-overview",
        kind: "Page",
        title: "Overview",
        subtitle: "Dashboard summary",
        to: "/teacher/overview",
      },
      {
        id: "nav-subjects",
        kind: "Page",
        title: "Subjects",
        subtitle: "Manage classes and sections",
        to: "/teacher/subjects",
      },
      {
        id: "nav-class-records",
        kind: "Tab",
        title: "Class Records",
        subtitle: "Grades inside a subject",
        to: `/teacher/subjects/${lastSubjectId ?? "1"}?tab=class-records`,
      },
      {
        id: "nav-attendance",
        kind: "Page",
        title: "Attendance",
        subtitle: "Daily and monthly records",
        to: "/teacher/attendance",
      },
      {
        id: "nav-schedule",
        kind: "Page",
        title: "Schedule",
        subtitle: "Timetable and events",
        to: "/teacher/schedule",
      },
      {
        id: "nav-chat",
        kind: "Page",
        title: "Chat",
        subtitle: "Messages with students/parents",
        to: "/teacher/chat",
      },
      {
        id: "nav-profile",
        kind: "Page",
        title: "Profile",
        subtitle: "Personal information",
        to: "/teacher/profile",
      },
      {
        id: "nav-settings",
        kind: "Page",
        title: "Settings",
        subtitle: "Preferences",
        to: "/teacher/settings",
      },
    ],
    [lastSubjectId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems.slice(0, 6);
    return searchItems
      .filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, searchItems]);

  const initials = useMemo(() => {
    const handle = userData?.email?.split("@")[0] || "";
    if (!handle) return "TR";
    const parts = handle
      .replace(/[^a-zA-Z]/g, " ")
      .trim()
      .split(/\s+/);
    const chars =
      (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");
    return chars.toUpperCase() || "TR";
  }, [userData?.email]);

  // Guard: allow only teacher role - check both user and userData
  if (user === null && userData === null) return null; // wait for auth resolution
  
  // Check user.role first (from login), then fallback to userData.role
  const userRole = user?.role || userData?.role;
  if (userRole !== "teacher") {
    return <Navigate to="/teacher-login" state={{ from: loc }} replace />;
  }

  return (
    <div data-teacher-ui className="app-container">
      {/* Sidebar (desktop) */}
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
                {mobileNavOpen ? (
                  <X className="header-icon" />
                ) : (
                  <Menu className="header-icon" />
                )}
              </button>
              <h1>TEACHER_PORTAL</h1>
              <p>Academic Management Tool</p>
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
                      placeholder="Search teacher pages..."
                      className="w-full outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <ul className="max-h-72 overflow-auto py-1">
                    {filtered.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No results
                      </li>
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
                              if (item.id === "nav-class-records") {
                                const id = ((): string => {
                                  try {
                                    return (
                                      localStorage.getItem(
                                        "teacher.lastSubjectId"
                                      ) || "1"
                                    );
                                  } catch {
                                    return "1";
                                  }
                                })();
                                navigate(
                                  `/teacher/subjects/${id}?tab=class-records`
                                );
                              } else {
                                navigate(item.to);
                              }
                            }}
                          >
                            <div className="text-sm font-medium">
                              {item.title}
                            </div>
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
                          {userData?.email?.split("@")[0] || "Teacher"}
                        </div>
                        <div className="profile-email">
                          {userData?.email || "teacher@example.com"}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        navigate("/teacher-login", { replace: true });
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
}
