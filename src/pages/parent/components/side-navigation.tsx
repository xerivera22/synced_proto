import {
  CalendarCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserCircle,
  Wallet,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoUrl from "../../../assets/ISE_logo.png";

type SideNavigationProps = {
  className?: string;
  onLinkClick?: () => void;
};

const ParentSideNavigation: React.FC<SideNavigationProps> = ({ className = "", onLinkClick }) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("parent.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  const navItems = [
    { to: "/parent/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/parent/academic-progress", label: "Academic Progress", icon: GraduationCap },
    { to: "/parent/attendance", label: "Attendance", icon: ClipboardCheck },
    { to: "/parent/schedule", label: "Schedule", icon: CalendarCheck },
    { to: "/parent/payments", label: "Payments", icon: Wallet },
    { to: "/parent/documents", label: "Documents", icon: FileText },
    { to: "/parent/messages", label: "Messages", icon: MessageSquare },
    { to: "/parent/profile", label: "Profile", icon: UserCircle },
  ];

  useEffect(() => {
    try {
      localStorage.setItem("parent.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore persistence errors
    }
  }, [collapsed]);

  return (
    <nav className={`side-navigation ${collapsed ? "collapsed" : ""} ${className}`.trim()}>
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
      <div className="nav-footer">
        <div className="user-info">
          <div className="user-avatar">PR</div>
          <div className="user-details">
            <div className="user-name">Parent Role</div>
            <div className="user-id">Linked to 1 student</div>
          </div>
        </div>
        <NavLink
          to="/parent/settings"
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

export default ParentSideNavigation;
