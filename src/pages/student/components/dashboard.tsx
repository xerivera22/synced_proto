import { AlertCircle, BookOpen, Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Card } from "./ui/card";

export function Dashboard() {
  const upcomingClasses = useMemo(
    () => [
      { subject: "Mathematics", time: "09:00 AM", room: "Room 201", status: "upcoming" },
      { subject: "Physics", time: "11:00 AM", room: "Lab 3", status: "upcoming" },
      { subject: "English", time: "02:00 PM", room: "Room 105", status: "upcoming" },
    ],
    [],
  );

  const quickStats = [
    {
      label: "Attendance Rate",
      value: "92%",
      description: "Past 30 days",
      icon: CheckCircle,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Overall GPA",
      value: "3.8",
      description: "Current semester",
      icon: TrendingUp,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
    },
    {
      label: "Pending Balance",
      value: "$250",
      description: "Due Oct 15",
      icon: AlertCircle,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Study Time",
      value: "25h",
      description: "Logged this week",
      icon: Clock,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
  ];

  const recentAnnouncements = useMemo(
    () => [
      { title: "Mid-term Exam Schedule Released", date: "2 hours ago", type: "important" },
      { title: "Library Hours Extended", date: "1 day ago", type: "info" },
      { title: "Sports Day Registration Open", date: "3 days ago", type: "event" },
    ],
    [],
  );

  return (
    <div className="space-y-2">
      {/* Banner: date always on the right, vertically centered; shorter height */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center justify-between px-3 md:px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-base md:text-lg font-semibold leading-snug">Welcome back, Alex!</h1>
            <p className="text-white/80 text-sm">Here's what's happening with your studies today</p>
          </div>
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            Tuesday, September 16, 2025
          </p>
        </div>
      </div>

      {/* Quick Stats: fill available width with 4 equal cards on md+ */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {quickStats.map((stat) => {
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Today's Schedule */}
        <Card className="p-6">
          <div className="flex items-center mb-3">
            <Calendar className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Today's Schedule</h2>
          </div>
          <div className="space-y-2">
            {upcomingClasses.map((cls, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
              >
                <div>
                  <p className="font-medium text-sm">{cls.subject}</p>
                  <p className="text-gray-600 mt-0.5 text-xs">{cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900 text-xs">{cls.time}</p>
                  <div className="flex items-center text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">50 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card className="p-6">
          <div className="flex items-center mb-3">
            <BookOpen className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Recent Announcements</h2>
          </div>
          <div className="space-y-2">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="font-medium text-sm">{announcement.title}</p>
                <p className="text-slate-500 mt-0.5 text-xs">{announcement.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Card with Horizontal Layout */}
        <Card className="p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <h2 className="font-semibold text-sm">Weekly Activity</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-sm">Classes Attended</span>
              </div>
              <span className="text-sm font-semibold text-green-600">18/20</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-sm">Assignments Done</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">12/15</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="font-medium text-sm">Study Hours</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">28h</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
