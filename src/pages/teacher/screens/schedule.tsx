import Card from "@/components/shared/Card";
import { BookOpenCheck, Calendar, Clock, TimerReset } from "lucide-react";

export default function TeacherSchedule() {
  const kpis = [
    {
      label: "Classes Today",
      value: "4",
      description: "Sessions to facilitate",
      icon: Calendar,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
    {
      label: "Free Periods",
      value: "1",
      description: "Prep time available",
      icon: BookOpenCheck,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Teaching Hours",
      value: "5h",
      description: "In-class instruction",
      icon: Clock,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Next Class",
      value: "11:00 AM",
      description: "Physics (Lab 3)",
      icon: TimerReset,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Title banner */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Schedule</h1>
            <p className="text-white/80 text-sm mt-0.5">View and manage your timetable</p>
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

      {/* Today’s schedule list */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Today’s Schedule</h2>
            <p className="text-sm text-slate-500">Keep track of rooms, times, and pacing.</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { subject: "Mathematics", time: "09:00 AM", room: "Room 201" },
            { subject: "Physics", time: "11:00 AM", room: "Lab 3" },
            { subject: "English", time: "02:00 PM", room: "Room 105" },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{c.subject}</p>
                <p className="text-xs text-slate-500">{c.room}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-[#647FBC]">{c.time}</p>
                <div className="mt-1 flex items-center text-slate-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-xs">50 min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
