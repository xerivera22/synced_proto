import logoUrl from "@/assets/ISE_logo.png";
import {
  Building,
  CalendarClock,
  File,
  FileStack,
  GraduationCap,
  Home,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type SideNavigationProps = {
  className?: string;
  onLinkClick?: () => void;
};

const navItems = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/faculty", label: "Faculty", icon: Users },
  { to: "/admin/events", label: "Events & Schedule", icon: CalendarClock },
  { to: "/admin/payments", label: "Payment Ledger", icon: FileStack },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/subjects", label: "Subjects", icon: File },
  { to: "/admin/section", label: "Section", icon: Building },
];

const AdminSideNavigation: React.FC<SideNavigationProps> = ({
  className = "",
  onLinkClick,
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("admin.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("admin.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore persistence failure
    }
  }, [collapsed]);

  return (
    <nav
      className={`side-navigation ${
        collapsed ? "collapsed" : ""
      } ${className}`.trim()}
    >
      <div className="nav-header">
        <button
          type="button"
          className="bg-transparent border-0 p-0 m-0"
          onClick={() => setCollapsed((prev) => !prev)}
          title="Toggle sidebar"
        >
          <img src={logoUrl} alt="SyncED" className="nav-logo-image" />
        </button>
        {!collapsed && <h1 className="nav-logo">SYNCED</h1>}
      </div>
      <div className="nav-menu">
        <ul className="nav-list">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => {
                  const highlight =
                    isActive ||
                    (to === "/admin" &&
                      location.pathname.startsWith("/admin/dashboard"));
                  return `nav-item ${highlight ? "active" : ""}`;
                }}
                end
                onClick={onLinkClick}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-footer">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          end
          onClick={onLinkClick}
        >
          <Settings className="nav-icon" />
          <span className="nav-text">Settings</span>
        </NavLink>
        <div className="user-info mt-3">
          <div className="user-avatar">AD</div>
          <div className="user-details">
            <div className="user-name">Admin Desk</div>
            <div className="user-id">3 alerts</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSideNavigation;
