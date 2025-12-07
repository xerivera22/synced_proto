import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LineChart,
  Settings,
  UserCircle,
  Wallet,
  MessageCircle,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type SideNavigationProps = {
  className?: string;
  onLinkClick?: () => void;
};

// Full side navigation matching styles in student.css (.side-navigation, .nav-*)
// Use relative path to avoid alias resolution issues
import logoUrl from "../../../assets/ISE_logo.png";
import { useAuth } from "@/context/AuthContext";

const SideNavigation: React.FC<SideNavigationProps> = ({
  className = "",
  onLinkClick,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("student.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  const { userData } = useAuth();

  const navItems = [
    { to: "/student/overview", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/schedule", label: "Schedule", icon: CalendarDays },
    { to: "/student/progress", label: "Academic Progress", icon: LineChart },
    { to: "/student/attendance", label: "Attendance", icon: ClipboardList },
    { to: "/student/payments", label: "Payment Status", icon: Wallet },
    { to: "/student/documents", label: "Documents", icon: FileText },
    { to: "/student/profile", label: "Profile", icon: UserCircle },
    { to: "/student/message", label: "Message", icon: MessageCircle },
  ];

  useEffect(() => {
    try {
      localStorage.setItem("student.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore persistence errors
    }
  }, [collapsed]);

  return (
    <nav
      className={`side-navigation ${
        collapsed ? "collapsed" : ""
      } ${className}`.trim()}
    >
      {/* Header */}
      <div className="nav-header">
        <button
          type="button"
          className="bg-transparent border-0 p-0 m-0"
          onClick={() => setCollapsed((v) => !v)}
          title="Toggle sidebar"
        >
          <img src={logoUrl} alt="SyncED" className="nav-logo-image" />
        </button>
        {!collapsed && <h1 className="nav-logo">SYNCED</h1>}
      </div>

      {/* Menu */}
      <div className="nav-menu">
        <ul className="nav-list">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
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

      {/* Footer */}
      <div className="nav-footer">
        <div className="user-info">
          <div className="user-avatar">{userData.name.slice(0, 1)}</div>
          <div className="user-details">
            <div className="user-name">{userData.name}</div>
            <div className="user-id">Student ID: {userData.studentId}</div>
          </div>
        </div>
        <NavLink
          to="/student/settings"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          end
          onClick={onLinkClick}
        >
          <Settings className="nav-icon" />
          <span className="nav-text">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideNavigation;
