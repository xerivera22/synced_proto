import Banner from "@/components/shared/Banner";
import {
  Bell,
  CalendarDays,
  CheckCircle,
  Clock,
  Cloud,
  Droplets,
  Wind,
} from "lucide-react";
import { getStudentPortalDate } from "../utils/date";
import { ScheduleOverview, type ScheduleItem as OverviewItem } from "./schedule-overview";
import { Card } from "./ui/card";

export function Schedule() {
  const dateLabel = getStudentPortalDate();
  const currentDay = 1; // Tuesday

  const schedule = {
    monday: [
      { subject: "Mathematics", time: "09:00-10:30", room: "Room 201", professor: "Dr. Smith" },
      { subject: "Chemistry", time: "11:00-12:30", room: "Lab 2", professor: "Dr. Johnson" },
      { subject: "English", time: "02:00-03:30", room: "Room 105", professor: "Ms. Davis" },
    ],
    tuesday: [
      { subject: "Physics", time: "08:00-09:30", room: "Lab 3", professor: "Dr. Wilson" },
      { subject: "Mathematics", time: "10:00-11:30", room: "Room 201", professor: "Dr. Smith" },
      { subject: "History", time: "01:00-02:30", room: "Room 301", professor: "Mr. Brown" },
      { subject: "Art", time: "03:00-04:30", room: "Studio A", professor: "Ms. Taylor" },
    ],
    wednesday: [
      { subject: "Biology", time: "09:00-10:30", room: "Lab 1", professor: "Dr. Lee" },
      { subject: "English", time: "11:00-12:30", room: "Room 105", professor: "Ms. Davis" },
      { subject: "PE", time: "02:00-03:30", room: "Gymnasium", professor: "Coach Miller" },
    ],
    thursday: [
      { subject: "Mathematics", time: "08:00-09:30", room: "Room 201", professor: "Dr. Smith" },
      { subject: "Chemistry", time: "10:00-11:30", room: "Lab 2", professor: "Dr. Johnson" },
      { subject: "Geography", time: "01:00-02:30", room: "Room 205", professor: "Mr. Garcia" },
      { subject: "Music", time: "03:00-04:30", room: "Music Room", professor: "Ms. White" },
    ],
    friday: [
      { subject: "Physics", time: "09:00-10:30", room: "Lab 3", professor: "Dr. Wilson" },
      { subject: "History", time: "11:00-12:30", room: "Room 301", professor: "Mr. Brown" },
      { subject: "Biology", time: "02:00-03:30", room: "Lab 1", professor: "Dr. Lee" },
    ],
  };

  const scheduleKeys = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

  // Build data for ScheduleOverview from existing schedule object
  const dayIndexMap: Record<(typeof scheduleKeys)[number], 0 | 1 | 2 | 3 | 4> = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
  };

  const scheduleOverviewData: OverviewItem[] = scheduleKeys.flatMap((dayKey) =>
    schedule[dayKey].map((cls) => {
      const [start_time, end_time] = cls.time.split("-");
      return {
        day: dayIndexMap[dayKey],
        subject_name: cls.subject,
        start_time,
        end_time,
        room: cls.room,
      };
    }),
  );

  const weatherData = {
    temperature: 72,
    high: 75,
    low: 58,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: Cloud,
  };

  const schoolEvents = [
    {
      title: "Mid-term Exam Week",
      date: "Oct 14-18",
      type: "academic",
      description: "Prepare for mid-semester examinations",
      time: "All Day",
    },
    {
      title: "Career Fair",
      date: "Oct 20",
      type: "event",
      description: "Meet potential employers and internship opportunities",
      time: "10:00 AM - 4:00 PM",
    },
    {
      title: "Fall Break",
      date: "Oct 23-25",
      type: "holiday",
      description: "No classes scheduled",
      time: "All Day",
    },
    {
      title: "Guest Lecture: AI in Healthcare",
      date: "Oct 28",
      type: "lecture",
      description: "Special presentation by Dr. Maria Rodriguez",
      time: "2:00 PM - 3:30 PM",
    },
  ];

  const nextClass = schedule[scheduleKeys[currentDay]][0];

  const overviewHighlights = [
    {
      label: "Current Weather",
      value: `${weatherData.temperature}°F`,
      subtext: weatherData.condition,
      icon: weatherData.icon,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
    },
    {
      label: "School Events",
      value: String(schoolEvents.length),
      subtext: "This month",
      icon: CalendarDays,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
    },
    {
      label: "Next Class",
      value: nextClass.subject,
      subtext: nextClass.time,
      icon: Clock,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
    },
    {
      label: "Completed Tasks",
      value: "8",
      subtext: "Planned today",
      icon: CheckCircle,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-red-100 text-red-700 border-red-200";
      case "event":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "holiday":
        return "bg-green-100 text-green-700 border-green-200";
      case "lecture":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Schedule"
        subtitle="View your weekly class timetable and events."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Weather & Events Overview */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {overviewHighlights.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className={`p-5 ${card.containerClass} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold uppercase tracking-wide ${card.labelClass}`}>
                  {card.label}
                </p>
                <Icon className={`h-4 w-4 ${card.labelClass}`} />
              </div>
              <div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{card.value}</p>
                <p className="text-xs text-slate-600">{card.subtext}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Schedule Overview & Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Schedule Overview Accordion */}
        <div className="lg:col-span-2">
          <ScheduleOverview data={scheduleOverviewData} />
        </div>

        {/* Weather - Current Day Only */}
        <Card className="p-6 bg-gradient-to-br from-sky-50 to-indigo-50 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 text-sm">Weather</h2>
            <span className="text-xs text-slate-500">Today</span>
          </div>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <weatherData.icon className="w-8 h-8 text-[#647FBC]" />
            </div>
            <p className="text-4xl font-bold text-slate-900">{weatherData.temperature}°F</p>
            <p className="text-sm text-slate-600 mt-1">{weatherData.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">High</p>
              <p className="text-lg font-semibold text-slate-900">{weatherData.high}°</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">Low</p>
              <p className="text-lg font-semibold text-slate-900">{weatherData.low}°</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-600">Humidity</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center justify-between bg-white/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">Wind</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{weatherData.windSpeed} mph</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Events */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-slate-800 text-sm">Events</h2>
          </div>
          <span className="text-xs text-slate-500">This Month</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schoolEvents.map((event) => (
            <div
              key={`${event.title}-${event.date}`}
              className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{event.title}</h3>
                  <p className="text-slate-500 mt-1 text-xs line-clamp-2">{event.description}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}
                >
                  {event.type}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span className="font-medium text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
