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
  Palette,
  Settings as SettingsIcon,
} from "lucide-react";
import { getTeacherPortalDate } from "../utils/date";

export default function TeacherSettings() {
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

  const teachingPreferences = [
    {
      id: "auto-final",
      type: "Auto-calculate Final Grade",
      description: "Compute finals from weighted components",
      icon: Calculator,
      enabled: true,
    },
    {
      id: "show-ids",
      type: "Show Student IDs",
      description: "Display IDs in class records",
      icon: IdCard,
      enabled: true,
    },
    {
      id: "dark",
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

  const dateLabel = getTeacherPortalDate();

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
          <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
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
                    <p className="text-base font-medium text-slate-900">{pref.type}</p>
                    <p className="text-sm text-slate-500">{pref.description}</p>
                  </div>
                </div>
                <Switch checked={pref.enabled} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Teaching/App Preferences */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
            <SettingsIcon className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Teaching &amp; App Preferences</h2>
        </div>
        <div className="space-y-3">
          {teachingPreferences.map((pref) => {
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
                    <p className="text-base font-medium text-slate-900">{pref.type}</p>
                    <p className="text-sm text-slate-500">{pref.description}</p>
                  </div>
                </div>
                <Switch checked={pref.enabled} />
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
        <Button className="group h-10 rounded-full border border-[#647FBC] !bg-[#647FBC] px-4 text-sm font-semibold text-white shadow-sm transition hover:!bg-white hover:!text-[#647FBC]">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
