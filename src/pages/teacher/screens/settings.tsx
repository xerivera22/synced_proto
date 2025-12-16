import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Button } from "@/pages/student/components/ui/button";
import { Switch } from "@/pages/student/components/ui/switch";
import {
    Bell,
    Calculator,
    Globe,
    IdCard,
    Mail,
    MessageSquare,
    Settings as SettingsIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getTeacherPortalDate } from "../utils/date";

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

export default function TeacherSettings() {
  const dateLabel = getTeacherPortalDate();
  
  // Load saved preferences from localStorage
  const loadPreferences = useCallback(() => {
    const saved = localStorage.getItem("teacher_settings");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      email: true,
      sms: false,
      push: false,
      "auto-final": true,
      "show-ids": true,
      public: true,
    };
  }, []);

  const [preferences, setPreferences] = useState(loadPreferences);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("teacher_settings", JSON.stringify(preferences));
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
      description: "Receive updates via email",
      icon: Mail,
      enabled: preferences.email,
    },
    {
      id: "sms",
      type: "SMS Notifications",
      description: "Get important alerts via text",
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
      id: "auto-final",
      type: "Auto-calculate Final Grade",
      description: "Compute finals from weighted components",
      icon: Calculator,
      enabled: preferences["auto-final"],
    },
    {
      id: "show-ids",
      type: "Show Student IDs",
      description: "Display IDs in class records",
      icon: IdCard,
      enabled: preferences["show-ids"],
    },
    {
      id: "public",
      type: "Public Profile",
      description: "Make profile visible to others",
      icon: Globe,
      enabled: preferences.public,
    },
  ];

  return (
    <div className="space-y-3">
      <Banner
        title="Settings"
        subtitle="Manage preferences and notifications"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Notification Preferences */}
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

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="group h-10 rounded-full border border-[#647FBC] !bg-[#647FBC] px-4 text-sm font-semibold text-white shadow-sm transition hover:!bg-white hover:!text-[#647FBC]">
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
          className="group h-10 rounded-full border border-[#647FBC] !bg-[#647FBC] px-4 text-sm font-semibold text-white shadow-sm transition hover:!bg-white hover:!text-[#647FBC]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
