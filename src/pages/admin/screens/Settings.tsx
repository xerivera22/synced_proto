import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Button } from "@/pages/student/components/ui/button";
import { Switch } from "@/pages/student/components/ui/switch";
import {
    Bell,
    Building2,
    ChevronRight,
    Database,
    Download,
    Globe,
    Key,
    Lock,
    Mail,
    MessageSquare,
    Palette,
    RefreshCw,
    Save,
    Settings as SettingsIcon,
    Shield,
    Smartphone,
    Upload,
    UserCog,
    Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAdminPortalDate } from "../utils/date";

interface SettingItem {
  id: string;
  type: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

// Request push notification permission
const requestPushPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    return false;
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
  
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  
  return false;
};

const Settings = () => {
  const dateLabel = getAdminPortalDate();
  const [activeTab, setActiveTab] = useState("notifications");
  
  // Load saved preferences from localStorage
  const loadPreferences = useCallback(() => {
    const saved = localStorage.getItem("admin_settings");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      // Notification settings
      emailBroadcast: true,
      smsBroadcast: false,
      pushNotifications: false,
      systemAlerts: true,
      // Security settings
      twoFactorAuth: false,
      sessionTimeout: true,
      ipWhitelist: false,
      auditLog: true,
      // System settings
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
      apiRateLimit: true,
    };
  }, []);

  const [preferences, setPreferences] = useState(loadPreferences);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("admin_settings", JSON.stringify(preferences));
  }, [preferences]);

  const handleToggle = async (id: string, currentValue: boolean, type: string) => {
    const newValue = !currentValue;
    
    // Special handling for push notifications
    if (id === "pushNotifications" && newValue) {
      const granted = await requestPushPermission();
      if (!granted) {
        Swal.fire({
          icon: "error",
          title: "Permission Denied",
          text: "Please enable notifications in your browser settings to use push notifications.",
          confirmButtonColor: "#647FBC",
        });
        return;
      }
    }
    
    // Warning for critical settings
    if ((id === "maintenanceMode" || id === "debugMode") && newValue) {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: id === "maintenanceMode" 
          ? "Enabling maintenance mode will prevent users from accessing the system."
          : "Debug mode may expose sensitive information. Only enable for troubleshooting.",
        showCancelButton: true,
        confirmButtonColor: "#647FBC",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, enable it",
      });
      
      if (!result.isConfirmed) {
        return;
      }
    }
    
    setPreferences((prev: Record<string, boolean>) => ({ ...prev, [id]: newValue }));
    
    // Show SweetAlert notification
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    
    Toast.fire({
      icon: newValue ? "success" : "info",
      title: newValue ? `${type} enabled` : `${type} disabled`,
    });
  };

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "system", label: "System", icon: Database },
    { id: "branding", label: "Branding", icon: Palette },
  ];

  const notificationSettings: SettingItem[] = [
    {
      id: "emailBroadcast",
      type: "Email Broadcasts",
      description: "Send mass emails to students, parents, and staff",
      icon: Mail,
      enabled: preferences.emailBroadcast,
    },
    {
      id: "smsBroadcast",
      type: "SMS Broadcasts",
      description: "Send text messages for urgent announcements",
      icon: MessageSquare,
      enabled: preferences.smsBroadcast,
    },
    {
      id: "pushNotifications",
      type: "Push Notifications",
      description: "Enable mobile push notifications for all users",
      icon: Smartphone,
      enabled: preferences.pushNotifications,
    },
    {
      id: "systemAlerts",
      type: "System Alerts",
      description: "Receive alerts for system events and errors",
      icon: Bell,
      enabled: preferences.systemAlerts,
    },
  ];

  const securitySettings: SettingItem[] = [
    {
      id: "twoFactorAuth",
      type: "Two-Factor Authentication",
      description: "Require 2FA for admin accounts",
      icon: Key,
      enabled: preferences.twoFactorAuth,
    },
    {
      id: "sessionTimeout",
      type: "Session Timeout",
      description: "Auto-logout after 30 minutes of inactivity",
      icon: RefreshCw,
      enabled: preferences.sessionTimeout,
    },
    {
      id: "ipWhitelist",
      type: "IP Whitelist",
      description: "Restrict admin access to specific IP addresses",
      icon: Globe,
      enabled: preferences.ipWhitelist,
    },
    {
      id: "auditLog",
      type: "Audit Logging",
      description: "Track all admin actions for security review",
      icon: Lock,
      enabled: preferences.auditLog,
    },
  ];

  const systemSettings: SettingItem[] = [
    {
      id: "autoBackup",
      type: "Automatic Backups",
      description: "Daily backup of database and files",
      icon: Database,
      enabled: preferences.autoBackup,
    },
    {
      id: "maintenanceMode",
      type: "Maintenance Mode",
      description: "Temporarily disable access for maintenance",
      icon: SettingsIcon,
      enabled: preferences.maintenanceMode,
    },
    {
      id: "debugMode",
      type: "Debug Mode",
      description: "Enable detailed error logging (dev only)",
      icon: RefreshCw,
      enabled: preferences.debugMode,
    },
    {
      id: "apiRateLimit",
      type: "API Rate Limiting",
      description: "Protect against API abuse",
      icon: Shield,
      enabled: preferences.apiRateLimit,
    },
  ];

  const renderSettingsList = (settings: SettingItem[]) => (
    <div className="space-y-3">
      {settings.map((setting) => {
        const Icon = setting.icon;
        return (
          <div
            key={setting.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#647FBC]/40"
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon className="w-4 h-4 text-[#647FBC]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{setting.type}</p>
                <p className="text-xs text-slate-500">{setting.description}</p>
              </div>
            </div>
            <Switch 
              checked={setting.enabled} 
              onCheckedChange={() => handleToggle(setting.id, setting.enabled, setting.type)}
            />
          </div>
        );
      })}
    </div>
  );

  const renderBrandingTab = () => (
    <div className="space-y-6">
      {/* School Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center mb-4">
          <Building2 className="w-5 h-5 text-[#647FBC] mr-2" />
          <h3 className="text-base font-semibold text-slate-900">School Information</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
            <input
              type="text"
              defaultValue="SyncED Academy"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
            <input
              type="email"
              defaultValue="admin@synced.edu"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue="+63 912 345 6789"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input
              type="text"
              defaultValue="123 Education St, Manila"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
            />
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-[#647FBC] mr-2" />
          <h3 className="text-base font-semibold text-slate-900">Theme Colors</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                defaultValue="#647FBC"
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#647FBC"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                defaultValue="#4B5563"
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#4B5563"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                defaultValue="#10B981"
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#10B981"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#647FBC]/20 focus:border-[#647FBC]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center mb-4">
          <Upload className="w-5 h-5 text-[#647FBC] mr-2" />
          <h3 className="text-base font-semibold text-slate-900">School Logo</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-[#647FBC]/10 flex items-center justify-center border-2 border-dashed border-[#647FBC]/30">
            <Building2 className="w-8 h-8 text-[#647FBC]/50" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-2">Upload your school logo (PNG, JPG, max 2MB)</p>
            <Button variant="outline" size="sm" className="text-xs">
              <Upload className="w-3 h-3 mr-1" /> Choose File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Banner
        title="Admin Settings"
        subtitle="Configure system preferences, security, and notifications."
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
      />

      {/* Tab Navigation */}
      <Card className="p-2 bg-white">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#647FBC] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Tab Content */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        {activeTab === "notifications" && (
          <>
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#647FBC]/10">
                <Bell className="w-4 h-4 text-[#647FBC]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Notification Settings</h2>
                <p className="text-xs text-slate-500">Configure how the system sends notifications</p>
              </div>
            </div>
            {renderSettingsList(notificationSettings)}
          </>
        )}

        {activeTab === "security" && (
          <>
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#647FBC]/10">
                <Shield className="w-4 h-4 text-[#647FBC]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Security Settings</h2>
                <p className="text-xs text-slate-500">Manage access control and authentication</p>
              </div>
            </div>
            {renderSettingsList(securitySettings)}
          </>
        )}

        {activeTab === "system" && (
          <>
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#647FBC]/10">
                <Database className="w-4 h-4 text-[#647FBC]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">System Settings</h2>
                <p className="text-xs text-slate-500">Configure system behavior and maintenance</p>
              </div>
            </div>
            {renderSettingsList(systemSettings)}
          </>
        )}

        {activeTab === "branding" && (
          <>
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#647FBC]/10">
                <Palette className="w-4 h-4 text-[#647FBC]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Branding Settings</h2>
                <p className="text-xs text-slate-500">Customize the look and feel of the portal</p>
              </div>
            </div>
            {renderBrandingTab()}
          </>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-white">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <UserCog className="w-4 h-4 text-[#647FBC]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
            <p className="text-xs text-slate-500">Common administrative tasks</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <button 
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "User Management",
                text: "Navigate to Faculty or Students page to manage users.",
                confirmButtonColor: "#647FBC",
              });
            }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#647FBC]/40 transition group"
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 text-[#647FBC] mr-2" />
              <span className="text-sm font-medium text-slate-700">Manage Users</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#647FBC]" />
          </button>
          <button 
            onClick={() => {
              Swal.fire({
                title: "Backup Database",
                text: "Do you want to create a backup now?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#647FBC",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, backup now",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    icon: "success",
                    title: "Backup Started",
                    text: "Database backup is being created...",
                    confirmButtonColor: "#647FBC",
                  });
                }
              });
            }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#647FBC]/40 transition group"
          >
            <div className="flex items-center">
              <Download className="w-4 h-4 text-[#647FBC] mr-2" />
              <span className="text-sm font-medium text-slate-700">Backup Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#647FBC]" />
          </button>
          <button 
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "View Logs",
                text: "Audit logs will be available once connected to backend.",
                confirmButtonColor: "#647FBC",
              });
            }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#647FBC]/40 transition group"
          >
            <div className="flex items-center">
              <Lock className="w-4 h-4 text-[#647FBC] mr-2" />
              <span className="text-sm font-medium text-slate-700">View Audit Logs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#647FBC]" />
          </button>
          <button 
            onClick={() => {
              Swal.fire({
                title: "Clear Cache",
                text: "This will clear all cached data. Continue?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#647FBC",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, clear cache",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  Swal.fire({
                    icon: "success",
                    title: "Cache Cleared",
                    text: "All cached data has been removed.",
                    confirmButtonColor: "#647FBC",
                  });
                }
              });
            }}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#647FBC]/40 transition group"
          >
            <div className="flex items-center">
              <RefreshCw className="w-4 h-4 text-[#647FBC] mr-2" />
              <span className="text-sm font-medium text-slate-700">Clear Cache</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#647FBC]" />
          </button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            Swal.fire({
              icon: "success",
              title: "Settings Saved",
              text: "All admin settings have been updated successfully.",
              confirmButtonColor: "#647FBC",
            });
          }}
          className="h-10 px-6 rounded-full bg-[#647FBC] text-white font-semibold shadow-sm hover:bg-[#5a73b3] transition"
        >
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
