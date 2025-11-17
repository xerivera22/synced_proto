import Card from "@/components/shared/Card";
import { AlertTriangle, Calendar, CheckCircle2, ClipboardCheck, Clock } from "lucide-react";

export default function TeacherAttendance() {
  const kpis = [
    {
      label: "Today’s Classes",
      value: "4",
      description: "On today’s roster",
      icon: Calendar,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
    {
      label: "Pending Records",
      value: "2",
      description: "Awaiting submission",
      icon: ClipboardCheck,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Completed Today",
      value: "3",
      description: "Marked on time",
      icon: CheckCircle2,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Late Submissions",
      value: "1",
      description: "Requires follow-up",
      icon: AlertTriangle,
      containerClass: "border-rose-100 bg-rose-50",
      labelClass: "text-rose-700",
      iconClass: "text-rose-700",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Title banner */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Attendance</h1>
            <p className="text-white/80 text-sm mt-0.5">Take and review class attendance</p>
          </div>
        </div>
      </div>
      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {kpis.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`p-5 ${stat.containerClass} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}>
                  {stat.label}
                </p>
                <Icon className={`h-4 w-4 ${stat.iconClass}`} />
              </div>
              <div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today list */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Today’s Classes</h2>
            <p className="text-sm text-slate-500">Track attendance status and timing.</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { subject: "Mathematics", time: "09:00 AM", room: "Room 201", status: "pending" },
            { subject: "Physics", time: "11:00 AM", room: "Lab 3", status: "done" },
            { subject: "English", time: "02:00 PM", room: "Room 105", status: "pending" },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{c.subject}</p>
                <p className="text-xs text-slate-500">{c.room}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#647FBC]">{c.time}</p>
                  <div className="mt-1 flex items-center text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">50 min</span>
                  </div>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                  type="button"
                >
                  {c.status === "done" ? "Edit" : "Take"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
