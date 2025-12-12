import {
  Bell,
  Calendar,
  CalendarDays,
  CheckCircle,
  Clock,
  Cloud,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "./ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

export function Schedule() {
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

  const parseDurationHours = (timeRange: string) => {
    const [start, end] = timeRange.split("-");
    const toMinutes = (value: string) => {
      const [hours, minutes] = value.split(":").map(Number);
      return hours * 60 + minutes;
    };
    const duration = toMinutes(end) - toMinutes(start);
    return duration > 0 ? duration / 60 : 0;
  };

  const semestralScheduleData = scheduleKeys.map((dayKey) => {
    const classes = schedule[dayKey];
    const totalHours = classes.reduce((sum, cls) => sum + parseDurationHours(cls.time), 0);
    const prettyDay = `${dayKey.charAt(0).toUpperCase()}${dayKey.slice(1, 3)}`;
    return {
      day: prettyDay,
      fullDayLabel: dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
      hours: Number(totalHours.toFixed(1)),
      classes: classes.length,
    };
  });

  const semestralChartConfig = {
    hours: {
      label: "Scheduled Hours",
      color: "hsl(224 70% 50%)",
    },
  };

  const totalSemesterHours = semestralScheduleData.reduce((sum, day) => sum + day.hours, 0);

  const weatherData = {
    current: {
      temperature: 72,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8,
      icon: Cloud,
    },
    forecast: [
      { day: "Today", high: 75, low: 58, condition: "Partly Cloudy", icon: Cloud },
      { day: "Tomorrow", high: 68, low: 52, condition: "Rain", icon: Droplets },
      { day: "Thursday", high: 71, low: 55, condition: "Sunny", icon: Sun },
      { day: "Friday", high: 74, low: 60, condition: "Partly Cloudy", icon: Cloud },
    ],
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
      value: `${weatherData.current.temperature}°F`,
      subtext: weatherData.current.condition,
      icon: weatherData.current.icon,
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
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview, with circular icon) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Weekly Schedule</h1>
            <p className="text-white/80 text-sm mt-0.5">Fall Semester 2025</p>
          </div>
        </div>
      </div>

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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Semestral Schedule */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="font-semibold text-[#647FBC] text-sm">Semestral Schedule</h2>
              <p className="text-xs text-slate-500">
                Total classroom hours per weekday for the current semester
              </p>
            </div>
            <div className="rounded-full bg-[#647FBC]/10 px-4 py-1 text-xs font-medium text-[#647FBC]">
              {totalSemesterHours.toFixed(1)} hrs this week
            </div>
          </div>

          <ChartContainer config={semestralChartConfig} className="w-full">
            <BarChart data={semestralScheduleData} barSize={36}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                allowDecimals={false}
                width={30}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(215 25% 98% / 0.9)" }}
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <span className="font-medium">{Number(value).toFixed(1)} hrs</span>
                    )}
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.fullDayLabel ?? ""
                    }
                  />
                }
              />
              <ChartLegend
                verticalAlign="top"
                content={<ChartLegendContent className="justify-start" hideIcon />}
              />
              <Bar
                dataKey="hours"
                fill="var(--color-hours)"
                radius={[10, 10, 6, 6]}
                name="Scheduled Hours"
              />
            </BarChart>
          </ChartContainer>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {semestralScheduleData.map((day) => (
              <div key={day.fullDayLabel} className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-500">{day.fullDayLabel}</p>
                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {day.hours.toFixed(1)} hrs
                </p>
                <p className="text-xs text-slate-500">
                  {day.classes} {day.classes === 1 ? "class" : "classes"}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Weather Forecast */}
        <Card className="p-6">
          <div className="flex items-center mb-3">
            <Sun className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-[#647FBC] text-sm">Weather Forecast</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {weatherData.forecast.map((day) => {
              const Icon = day.icon;
              return (
                <div key={day.day} className="bg-gray-50 p-2 rounded-md text-center">
                  <p className="font-medium text-gray-700 mb-1 text-xs">{day.day}</p>
                  <Icon className="w-4 h-4 mx-auto mb-2 text-[#647FBC]" />
                  <p className="font-semibold text-xs">{day.high}°</p>
                  <p className="text-gray-500 text-xs">{day.low}°</p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center">
                <Droplets className="w-3 h-3 text-blue-500 mr-2" />
                <span className="text-gray-600 text-xs">
                  Humidity: {weatherData.current.humidity}%
                </span>
              </div>
              <div className="flex items-center">
                <Wind className="w-3 h-3 text-gray-500 mr-2" />
                <span className="text-gray-600 text-xs">
                  Wind: {weatherData.current.windSpeed} mph
                </span>
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* Upcoming School Events */}
      <Card className="p-6">
        <div className="flex items-center mb-3">
          <Bell className="w-4 h-4 text-[#647FBC] mr-2" />
          <h2 className="font-semibold text-[#647FBC] text-sm">Upcoming School Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schoolEvents.map((event) => (
            <div
              key={`${event.title}-${event.date}`}
              className="bg-gray-50 p-3 rounded-md border-l-4 border-[#647FBC]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{event.title}</h3>
                  <p className="text-gray-600 mt-1 text-xs">{event.description}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full border text-xs ${getEventTypeColor(event.type)}`}
                >
                  {event.type}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-500 mt-2">
                <span className="font-medium text-xs">{event.date}</span>
                <span className="text-xs">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
