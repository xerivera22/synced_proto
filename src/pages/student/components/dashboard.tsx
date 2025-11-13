import { PropsWithChildren, useMemo } from "react";
import { Calendar, Clock, BookOpen, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export function Dashboard() {

  const upcomingClasses = useMemo(
    () => [
      { subject: "Mathematics", time: "09:00 AM", room: "Room 201", status: "upcoming" },
      { subject: "Physics", time: "11:00 AM", room: "Lab 3", status: "upcoming" },
      { subject: "English", time: "02:00 PM", room: "Room 105", status: "upcoming" },
    ],
    []
  );

  const quickStats = [
    { label: "Attendance", value: "92%", icon: CheckCircle, color: "text-green-600" },
    { label: "GPA", value: "3.8", icon: TrendingUp, color: "text-[#647FBC]" },
    { label: "Pending Fees", value: "$250", icon: AlertCircle, color: "text-orange-600" },
  ];

  const recentAnnouncements = useMemo(
    () => [
      { title: "Mid-term Exam Schedule Released", date: "2 hours ago", type: "important" },
      { title: "Library Hours Extended", date: "1 day ago", type: "info" },
      { title: "Sports Day Registration Open", date: "3 days ago", type: "event" },
    ],
    []
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
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">Tuesday, September 16, 2025</p>
        </div>
      </div>

      {/* Quick Stats: fill available width with 4 equal cards on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center"
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-sm font-semibold mb-1">{stat.value}</p>
              <p className="text-gray-600 text-xs">{stat.label}</p>
            </Card>
          );
        })}
        {/* Add an additional stat card */}
        <Card className="p-3 text-center h-24 md:h-28 flex flex-col items-center justify-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-purple-600" />
          <p className="text-sm font-semibold mb-1">25h</p>
          <p className="text-gray-600 text-xs">Study Time</p>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Today's Schedule */}
        <Card className="p-3">
          <div className="flex items-center mb-3">
            <Calendar className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Today's Schedule</h2>
          </div>
          <div className="space-y-2">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-sm">{cls.subject}</p>
                  <p className="text-gray-600 mt-0.5 text-xs">{cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#647FBC] text-xs">{cls.time}</p>
                  <div className="flex items-center text-gray-500 mt-0.5">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">50 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card className="p-3">
          <div className="flex items-center mb-3">
            <BookOpen className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Recent Announcements</h2>
          </div>
          <div className="space-y-2">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className="border-l-4 border-[#647FBC] pl-2 py-2">
                <p className="font-medium text-sm">{announcement.title}</p>
                <p className="text-gray-500 mt-0.5 text-xs">{announcement.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Card with Horizontal Layout */}
        <Card className="p-3">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Weekly Activity</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-sm">Classes Attended</span>
              </div>
              <span className="text-sm font-semibold text-green-600">18/20</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-sm">Assignments Done</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">12/15</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
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

// Minimal local Card to avoid pulling heavy UI dependencies
function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}