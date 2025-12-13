import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { Button } from "@/pages/student/components/ui/button";
import { Switch } from "@/pages/student/components/ui/switch";
import {
  Bell,
  Download,
  Lock,
  Mail,
  MessageSquare,
  Plus,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { getParentPortalDate } from "../utils/date";

const ParentSettings = () => {
  const dateLabel = getParentPortalDate();

  const notificationPreferences = [
    {
      id: "email",
      type: "Email updates",
      description: "Daily summary of attendance and grade updates.",
      icon: Mail,
      enabled: true,
    },
    {
      id: "sms",
      type: "SMS alerts",
      description: "Instant alerts for tardies, absences, and payment reminders.",
      icon: MessageSquare,
      enabled: true,
    },
    {
      id: "push",
      type: "Mobile push",
      description: "Receive push notifications in the mobile app.",
      icon: Bell,
      enabled: false,
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
          <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
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
    </div>
  );
};

export default ParentSettings;
