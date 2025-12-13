import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Table,
  UserCircle,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Reuse student side navigation styling classes defined in student.css
import logoUrl from "../../../assets/ISE_logo.png";

type SideNavigationProps = {
  className?: string;
  onLinkClick?: () => void;
};

const TeacherSideNavigation: React.FC<SideNavigationProps> = ({ className = "", onLinkClick }) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("teacher.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  const navItems = [
    { to: "/teacher/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/teacher/subjects", label: "Subjects", icon: Table },
    { to: "/teacher/attendance", label: "Attendance", icon: BookOpen },
    { to: "/teacher/schedule", label: "Schedule", icon: CalendarDays },
    { to: "/teacher/chat", label: "Messages", icon: MessageSquare },
    { to: "/teacher/profile", label: "Profile", icon: UserCircle },
  ];

  useEffect(() => {
    try {
      localStorage.setItem("teacher.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [collapsed]);

  return (
    <nav className={`side-navigation ${collapsed ? "collapsed" : ""} ${className}`.trim()}>
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
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
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
          <div className="user-avatar">TR</div>
          <div className="user-details">
            <div className="user-name">Teacher Role</div>
            <div className="user-id">Employee ID: 9876</div>
          </div>
        </div>
        <NavLink
          to="/teacher/settings"
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

export default TeacherSideNavigation;
