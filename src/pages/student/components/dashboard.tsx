import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { announcementService } from "@/services/announcementService";
import { subjectService } from "@/services/subjectService";
import {
    AlertCircle,
    AlertTriangle,
    BookOpen,
    BookOpenCheck,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    TrendingUp,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getStudentPortalDate } from "../utils/date";
import { Card } from "./ui/card";

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

interface DashboardClass {
  subject: string;
  subjectCode: string;
  time: string;
  room?: string;
  department: string;
  sectionName?: string;
  status: "upcoming" | "ongoing" | "completed";
}

interface Announcement {
  _id: string;
  id: string;
  title: string;
  content: string;
  target: string;
  scheduledFor: string;
  status: string;
  authorRole: string;
  authorName: string;
  createdAt?: string;
}

export function Dashboard() {
  const dateLabel = getStudentPortalDate();
  const { userData } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [todayClasses, setTodayClasses] = useState<DashboardClass[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [quickStats, setQuickStats] = useState([
    {
      label: userData.role === "teacher" ? "Total Subjects" : "Attendance Rate",
      value: "0",
      description: userData.role === "teacher" ? "Assigned subjects" : "Past 30 days",
      icon: userData.role === "teacher" ? BookOpen : CheckCircle,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: userData.role === "teacher" ? "Today's Classes" : "Overall GPA",
      value: "0",
      description: userData.role === "teacher" ? "Scheduled today" : "Current semester",
      icon: userData.role === "teacher" ? Calendar : TrendingUp,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
    },
    {
      label: userData.role === "teacher" ? "Sections" : "Pending Tasks",
      value: "0",
      description: userData.role === "teacher" ? "Assigned sections" : "Due soon",
      icon: userData.role === "teacher" ? Users : AlertCircle,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: userData.role === "teacher" ? "Teaching Hours" : "Study Time",
      value: "0h",
      description: userData.role === "teacher" ? "Weekly total" : "Logged this week",
      icon: Clock,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
  ]);

  // Fetch subjects and announcements on component mount
  useEffect(() => {
    fetchSubjects();
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementService.getAnnouncements();
      // Filter announcements for students (target: "all" or "students")
      const studentAnnouncements = data.filter(
        (a: Announcement) => a.target === "all" || a.target === "students"
      );
      setAnnouncements(studentAnnouncements);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subjectService.getSubjects();
      setSubjects(data);
      processDashboardData(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Process dashboard data
  const processDashboardData = (subjectsData: Subject[]) => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = today.getHours() * 60 + today.getMinutes(); // Current time in minutes

    const todayClassesData: DashboardClass[] = [];
    let totalTeachingHours = 0;
    const uniqueSections = new Set<string>();

    subjectsData.forEach((subject) => {
      // Count unique sections
      if (subject.sectionName) {
        uniqueSections.add(subject.sectionName);
      }

      // Process today's classes
      subject.schedules.forEach((schedule) => {
        const [date, time] = schedule.split(" ");

        // Check if schedule is for today
        if (date === todayString) {
          const [classHours, classMinutes] = time.split(":").map(Number);
          const classTimeInMinutes = classHours * 60 + classMinutes;

          // Determine status based on current time
          let status: "upcoming" | "ongoing" | "completed" = "upcoming";

          if (classTimeInMinutes < currentTime - 50) {
            // Class finished (assuming 50 min classes)
            status = "completed";
          } else if (classTimeInMinutes <= currentTime) {
            // Class is happening now or just started
            status = "ongoing";
          } else {
            // Future class
            status = "upcoming";
          }

          // Add teaching hours
          totalTeachingHours += 1; // 1 hour per class

          todayClassesData.push({
            subject: subject.subjectName,
            subjectCode: subject.subjectCode,
            time: formatTime(time),
            department: subject.department,
            sectionName: subject.sectionName,
            status: status,
          });
        }
      });
    });

    // Sort by time
    todayClassesData.sort((a, b) => {
      // Extract time from the original schedule string
      const timeA = a.time.split(" ")[0];
      const timeB = b.time.split(" ")[0];
      return timeA.localeCompare(timeB);
    });

    setTodayClasses(todayClassesData);
    updateQuickStats(
      subjectsData.length,
      todayClassesData.length,
      uniqueSections.size,
      totalTeachingHours
    );
  };

  // Format time from "09:00" to "09:00 AM"
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Update quick stats
  const updateQuickStats = (
    totalSubjects: number,
    todayClassesCount: number,
    sectionsCount: number,
    teachingHours: number
  ) => {
    const updatedStats = [...quickStats];

    if (userData.role === "teacher") {
      // Update for teacher
      updatedStats[0] = {
        ...updatedStats[0],
        value: totalSubjects.toString(),
        description: `${totalSubjects} assigned subject${totalSubjects !== 1 ? "s" : ""}`,
      };

      updatedStats[1] = {
        ...updatedStats[1],
        value: todayClassesCount.toString(),
        description: `${todayClassesCount} class${todayClassesCount !== 1 ? "es" : ""} today`,
      };

      updatedStats[2] = {
        ...updatedStats[2],
        value: sectionsCount.toString(),
        description: `${sectionsCount} section${sectionsCount !== 1 ? "s" : ""} assigned`,
      };

      updatedStats[3] = {
        ...updatedStats[3],
        value: `${teachingHours}h`,
        description: `${teachingHours} teaching hour${teachingHours !== 1 ? "s" : ""}`,
      };
    } else {
      // Update for student (placeholder data - replace with actual student data)
      updatedStats[0] = {
        ...updatedStats[0],
        value: "92%",
        description: "Past 30 days",
      };

      updatedStats[1] = {
        ...updatedStats[1],
        value: "3.8",
        description: "Current semester",
      };

      updatedStats[2] = {
        ...updatedStats[2],
        value: "₱250",
        description: "Due Oct 15",
      };

      updatedStats[3] = {
        ...updatedStats[3],
        value: "25h",
        description: "Logged this week",
      };
    }

    setQuickStats(updatedStats);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "border-green-200 bg-green-50";
      case "completed":
        return "border-slate-200 bg-slate-50";
      case "upcoming":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
        return <AlertTriangle className="w-3 h-3 text-green-600" />;
      case "completed":
        return <CheckCircle className="w-3 h-3 text-slate-600" />;
      case "upcoming":
        return <Clock className="w-3 h-3 text-blue-600" />;
      default:
        return <Clock className="w-3 h-3 text-slate-600" />;
    }
  };

  // Format date for announcements
  const formatAnnouncementDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Banner
          title={`Welcome back, ${userData.name}!`}
          subtitle="Loading your dashboard..."
          right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
        />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <Banner
        title={`Welcome back, ${userData.name}!`}
        subtitle={
          userData.role === "teacher"
            ? "Here's your teaching overview for today"
            : "Here's what's happening with your studies today"
        }
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Quick Stats */}
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-[#647FBC] mr-2" />
              <h2 className="font-semibold text-sm">Today's Schedule</h2>
            </div>
            <span className="text-xs text-slate-500">
              {todayClasses.length} class{todayClasses.length !== 1 ? "es" : ""}
            </span>
          </div>
          {todayClasses.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No classes scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todayClasses.map((cls, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl border ${getStatusColor(
                    cls.status
                  )} p-3`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{cls.subject}</p>
                      <span className="text-xs text-[#647FBC] bg-[#647FBC]/10 px-2 py-0.5 rounded-full">
                        {cls.subjectCode}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        <span>{cls.department}</span>
                      </div>
                      {cls.sectionName && (
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{cls.sectionName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      {getStatusIcon(cls.status)}
                      <p className="font-medium text-slate-900 text-xs">{cls.time}</p>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="text-xs">50 min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Announcements */}
        <Card className="p-6">
          <div className="flex items-center mb-3">
            <BookOpen className="w-4 h-4 text-[#647FBC] mr-2" />
            <h2 className="font-semibold text-sm">Recent Announcements</h2>
          </div>
          <div className="space-y-2">
            {announcements.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <p className="text-slate-500 text-sm">No announcements yet</p>
              </div>
            ) : (
              announcements.slice(0, 5).map((announcement) => (
                <div key={announcement._id || announcement.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{announcement.title}</p>
                      {announcement.content && (
                        <p className="text-slate-600 text-xs mt-1 line-clamp-2">{announcement.content}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-slate-500 text-xs">
                          {formatAnnouncementDate(announcement.scheduledFor || announcement.createdAt || "")}
                        </p>
                        {announcement.authorRole === "teacher" && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            From: {announcement.authorName || "Teacher"}
                          </span>
                        )}
                        {announcement.authorRole === "admin" && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Activity Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BookOpenCheck className="w-4 h-4 text-green-600 mr-2" />
              <h2 className="font-semibold text-sm">
                {userData.role === "teacher" ? "Teaching Summary" : "Weekly Activity"}
              </h2>
            </div>
          </div>
          <div className="space-y-2">
            {userData.role === "teacher" ? (
              <>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-sm">Total Subjects</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{subjects.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="font-medium text-sm">Upcoming Classes</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {todayClasses.filter((c) => c.status === "upcoming").length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="font-medium text-sm">Teaching Hours</span>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">
                    {quickStats[3].value}
                  </span>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
