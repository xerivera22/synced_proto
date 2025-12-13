import Banner from "@/components/shared/Banner";
import { Bell, Globe, Mail, MessageSquare, Palette, Settings as SettingsIcon } from "lucide-react";
import { getStudentPortalDate } from "../utils/date";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";

export function Settings() {
  const dateLabel = getStudentPortalDate();
  const notificationPreferences = [
    {
      id: "email",
      type: "Email Notifications",
      description: "Receive updates via email",
      icon: Mail,
      enabled: true,
    },
    {
      id: "sms",
      type: "SMS Notifications",
      description: "Get important alerts via text",
      icon: MessageSquare,
      enabled: false,
    },
    {
      id: "push",
      type: "Push Notifications",
      description: "Mobile app notifications",
      icon: Bell,
      enabled: true,
    },
  ];

  const appPreferences = [
    {
      id: "theme",
      type: "Dark Theme",
      description: "Switch to dark mode",
      icon: Palette,
      enabled: false,
    },
    {
      id: "public",
      type: "Public Profile",
      description: "Make profile visible to others",
      icon: Globe,
      enabled: true,
    },
  ];

  return (
    <div className="space-y-3">
      <Banner
        title="Settings"
        subtitle="Manage your preferences and notifications."
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
                <Switch checked={pref.enabled} />
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
                <Switch checked={pref.enabled} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Advanced Settings: default violet button with white text; hover to white button with violet text */}
        <Button className="group border border-[#647FBC] !bg-[#647FBC] text-white hover:!bg-white hover:!text-[#647FBC] hover:border-[#647FBC] h-8 rounded-lg shadow-sm text-xs transition-colors">
          <SettingsIcon className="w-3 h-3 mr-1 transition-colors" />
          Advanced Settings
        </Button>
        {/* Save Changes: same behavior as Advanced Settings for consistent UX */}
        <Button className="group border border-[#647FBC] !bg-[#647FBC] text-white hover:!bg-white hover:!text-[#647FBC] hover:border-[#647FBC] h-8 rounded-lg shadow-sm text-xs transition-colors">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
