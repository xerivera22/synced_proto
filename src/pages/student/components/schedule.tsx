import {
  Bell,
  Calendar,
  CalendarDays,
  CheckCircle,
  Clock,
  Cloud,
  Droplets,
  MapPin,
  Sun,
  Wind,
} from "lucide-react";
import { Card } from "./ui/card";

export function Schedule() {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
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

      {/* Day Selector */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-md p-1 border shadow-sm">
          {weekDays.map((day, index) => (
            <button
              type="button"
              key={day}
              className={`py-2 px-3 rounded-sm font-medium transition-colors min-w-[80px] text-sm ${
                index === currentDay ? "bg-[#647FBC] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Today's Classes */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3 text-[#647FBC] text-sm">Today's Classes</h2>
          <div className="space-y-2">
            {schedule[scheduleKeys[currentDay]].map((cls) => (
              <div
                key={`${cls.subject}-${cls.time}`}
                className="bg-gray-50 p-3 rounded-md border-l-4 border-[#647FBC]"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{cls.subject}</h3>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">{cls.time}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="text-xs">{cls.room}</span>
                </div>
                <p className="text-gray-600 text-xs">{cls.professor}</p>
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

        {/* Weekly Overview */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3 text-[#647FBC] text-sm">Weekly Overview</h2>
          <div className="space-y-2">
            {scheduleKeys.map((day) => (
              <div
                key={day}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium capitalize text-sm">{day}</span>
                <span className="text-gray-600 text-xs">{schedule[day].length} classes</span>
              </div>
            ))}
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
