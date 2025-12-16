import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Button } from "@/pages/student/components/ui/button";
import { Switch } from "@/pages/student/components/ui/switch";
import {
    Bell,
    Download,
    Globe,
    Lock,
    Mail,
    MessageSquare,
    Plus,
    Settings as SettingsIcon,
    Trash2,
    User,
    Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getParentPortalDate } from "../utils/date";

interface NotificationPreference {
  id: string;
  type: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

interface AppPreference {
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

const ParentSettings = () => {
  const dateLabel = getParentPortalDate();
  
  // Load saved preferences from localStorage
  const loadPreferences = useCallback(() => {
    const saved = localStorage.getItem("parent_settings");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      email: true,
      sms: true,
      push: false,
      public: true,
    };
  }, []);

  const [preferences, setPreferences] = useState(loadPreferences);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("parent_settings", JSON.stringify(preferences));
  }, [preferences]);

  const handleToggle = async (id: string, currentValue: boolean, type: string) => {
    const newValue = !currentValue;
    
    // Special handling for push notifications
    if (id === "push" && newValue) {
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

  const notificationPreferences: NotificationPreference[] = [
    {
      id: "email",
      type: "Email Notifications",
      description: "Daily summary of attendance and grade updates",
      icon: Mail,
      enabled: preferences.email,
    },
    {
      id: "sms",
      type: "SMS Notifications",
      description: "Instant alerts for tardies, absences, and payment reminders",
      icon: MessageSquare,
      enabled: preferences.sms,
    },
    {
      id: "push",
      type: "Push Notifications",
      description: "Mobile app notifications",
      icon: Bell,
      enabled: preferences.push,
    },
  ];

  const appPreferences: AppPreference[] = [
    {
      id: "public",
      type: "Public Profile",
      description: "Make profile visible to teachers",
      icon: Globe,
      enabled: preferences.public,
    },
  ];

  return (
    <div className="space-y-3">
      <Banner
        title="Settings"
        subtitle="Configure notifications, linked accounts, and data preferences."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Notifications */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <Bell className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Notification Preferences</h2>
        </div>
        <div className="space-y-3">
          {notificationPreferences.map((pref) => {
            const Icon = pref.icon;
            return (
              <div
                key={pref.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#647FBC]/40"
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                    <Icon className="w-3 h-3 text-[#647FBC]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{pref.type}</p>
                    <p className="text-xs text-slate-500">{pref.description}</p>
                  </div>
                </div>
                <Switch 
                  checked={pref.enabled} 
                  onCheckedChange={() => handleToggle(pref.id, pref.enabled, pref.type)}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* App Preferences */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <SettingsIcon className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">App Preferences</h2>
        </div>
        <div className="space-y-3">
          {appPreferences.map((pref) => {
            const Icon = pref.icon;
            return (
              <div
                key={pref.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#647FBC]/40"
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                    <Icon className="w-3 h-3 text-[#647FBC]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{pref.type}</p>
                    <p className="text-xs text-slate-500">{pref.description}</p>
                  </div>
                </div>
                <Switch 
                  checked={pref.enabled} 
                  onCheckedChange={() => handleToggle(pref.id, pref.enabled, pref.type)}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Linked Accounts */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <Users className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Linked Accounts</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#647FBC]/40">
            <div className="flex items-center">
              <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                <User className="w-3 h-3 text-[#647FBC]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Morgan Johnson</p>
                <p className="text-xs text-slate-500">Has access to attendance and payment info</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Manage
            </Button>
          </div>
          <Button className="w-full border-dashed border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Plus className="mr-2 h-4 w-4" /> Add another guardian
          </Button>
        </div>
      </Card>

      {/* Data Privacy */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <Lock className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Data Privacy</h2>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button variant="outline" className="flex-1 bg-white">
            <Download className="mr-2 h-4 w-4" /> Download data archive
          </Button>
          <Button variant="outline" className="flex-1 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
            <Trash2 className="mr-2 h-4 w-4" /> Request data removal
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="group border border-[#647FBC] !bg-[#647FBC] text-white hover:!bg-white hover:!text-[#647FBC] hover:border-[#647FBC] h-10 rounded-full shadow-sm text-sm font-semibold transition-colors">
          <SettingsIcon className="w-4 h-4 mr-1 transition-colors" />
          Advanced Settings
        </Button>
        <Button 
          onClick={() => {
            Swal.fire({
              icon: "success",
              title: "Settings Saved",
              text: "Your preferences have been updated successfully.",
              confirmButtonColor: "#647FBC",
            });
          }}
          className="group border border-[#647FBC] !bg-[#647FBC] text-white hover:!bg-white hover:!text-[#647FBC] hover:border-[#647FBC] h-10 rounded-full shadow-sm text-sm font-semibold transition-colors"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ParentSettings;
