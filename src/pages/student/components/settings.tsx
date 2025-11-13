import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Bell, Mail, MessageSquare, Settings as SettingsIcon, Palette, Globe } from "lucide-react";

export function Settings() {
  const notificationPreferences = [
    { id: "email", type: "Email Notifications", description: "Receive updates via email", icon: Mail, enabled: true },
    { id: "sms", type: "SMS Notifications", description: "Get important alerts via text", icon: MessageSquare, enabled: false },
    { id: "push", type: "Push Notifications", description: "Mobile app notifications", icon: Bell, enabled: true },
  ];

  const appPreferences = [
    { id: "theme", type: "Dark Theme", description: "Switch to dark mode", icon: Palette, enabled: false },
    { id: "public", type: "Public Profile", description: "Make profile visible to others", icon: Globe, enabled: true },
  ];

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <SettingsIcon className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Settings</h1>
            <p className="text-white/80 text-sm mt-0.5">Manage preferences and notifications</p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
            <Bell className="w-3 h-3 text-[#647FBC]" />
          </div>
          <h2 className="text-sm font-semibold text-[#647FBC]">Notification Preferences</h2>
        </div>
        <div className="space-y-2">
          {notificationPreferences.map((pref) => {
            const Icon = pref.icon;
            return (
              <div key={pref.id} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-3 shadow-sm">
                    <Icon className="w-3 h-3 text-[#647FBC]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{pref.type}</p>
                    <p className="text-xs text-gray-600">{pref.description}</p>
                  </div>
                </div>
                <Switch checked={pref.enabled} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* App Preferences */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
            <SettingsIcon className="w-3 h-3 text-[#647FBC]" />
          </div>
        <h2 className="text-sm font-semibold text-[#647FBC]">App Preferences</h2>
        </div>
        <div className="space-y-2">
          {appPreferences.map((pref) => {
            const Icon = pref.icon;
            return (
              <div key={pref.id} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-3 shadow-sm">
                    <Icon className="w-3 h-3 text-[#647FBC]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{pref.type}</p>
                    <p className="text-xs text-gray-600">{pref.description}</p>
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
