import Card from "@/components/shared/Card";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Users,
  Building,
} from "lucide-react";
import { useEffect, useState } from "react";
import { subjectService } from "@/services/subjectService";
import { Link } from "react-router-dom";

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

interface AttendanceClass {
  id: string;
  subject: string;
  subjectCode: string;
  time: string;
  department: string;
  sectionName?: string;
  schedule: string;
  status: "pending" | "done" | "missed";
}

export default function TeacherAttendance() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todayClasses, setTodayClasses] = useState<AttendanceClass[]>([]);
  const [kpis, setKpis] = useState([
    {
      label: "Today's Classes",
      value: "0",
      description: "On today's roster",
      icon: Calendar,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
    {
      label: "Pending Records",
      value: "0",
      description: "Awaiting submission",
      icon: ClipboardCheck,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Completed Today",
      value: "0",
      description: "Marked on time",
      icon: CheckCircle2,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Late Submissions",
      value: "0",
      description: "Requires follow-up",
      icon: AlertTriangle,
      containerClass: "border-rose-100 bg-rose-50",
      labelClass: "text-rose-700",
      iconClass: "text-rose-700",
    },
  ]);

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subjectService.getSubjects();
      setSubjects(data);
      processAttendanceData(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load attendance data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Process attendance data for today
  const processAttendanceData = (subjectsData: Subject[]) => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = today.getHours() * 60 + today.getMinutes(); // Current time in minutes

    const todayAttendanceClasses: AttendanceClass[] = [];
    let pendingCount = 0;
    let completedCount = 0;
    let lateCount = 0;

    subjectsData.forEach((subject) => {
      subject.schedules.forEach((schedule) => {
        const [date, time] = schedule.split(" ");

        // Check if schedule is for today
        if (date === todayString) {
          const [classHours, classMinutes] = time.split(":").map(Number);
          const classTimeInMinutes = classHours * 60 + classMinutes;

          // Determine status based on current time
          let status: "pending" | "done" | "missed" = "pending";

          if (classTimeInMinutes < currentTime - 15) {
            // Class started more than 15 minutes ago - consider it missed if not marked
            status = "missed";
            lateCount++;
          } else if (classTimeInMinutes <= currentTime) {
            // Class is happening now or just started
            status = "pending";
            pendingCount++;
          } else {
            // Future class
            status = "pending";
            pendingCount++;
          }

          // For demo: Mark some as done randomly (replace with actual attendance data)
          if (Math.random() > 0.6) {
            status = "done";
            completedCount++;
            pendingCount = Math.max(0, pendingCount - 1);
          }

          todayAttendanceClasses.push({
            id: subject._id,
            subject: subject.subjectName,
            subjectCode: subject.subjectCode,
            time: formatTime(time),
            department: subject.department,
            sectionName: subject.sectionName,
            schedule: schedule,
            status: status,
          });
        }
      });
    });

    // Sort by time
    todayAttendanceClasses.sort((a, b) => {
      const timeA = a.schedule.split(" ")[1];
      const timeB = b.schedule.split(" ")[1];
      return timeA.localeCompare(timeB);
    });

    setTodayClasses(todayAttendanceClasses);
    updateKPIs(todayAttendanceClasses, pendingCount, completedCount, lateCount);
  };

  // Format time from "09:00" to "09:00 AM"
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Update KPI values
  const updateKPIs = (
    classes: AttendanceClass[],
    pending: number,
    completed: number,
    late: number
  ) => {
    const updatedKPIs = [...kpis];

    // Update Today's Classes
    updatedKPIs[0] = {
      ...updatedKPIs[0],
      value: classes.length.toString(),
      description: `${classes.length} class${
        classes.length !== 1 ? "es" : ""
      } today`,
    };

    // Update Pending Records
    updatedKPIs[1] = {
      ...updatedKPIs[1],
      value: pending.toString(),
      description: `${pending} awaiting submission`,
    };

    // Update Completed Today
    updatedKPIs[2] = {
      ...updatedKPIs[2],
      value: completed.toString(),
      description: `${completed} marked on time`,
    };

    // Update Late Submissions
    updatedKPIs[3] = {
      ...updatedKPIs[3],
      value: late.toString(),
      description: `${late} require${late !== 1 ? "s" : ""} follow-up`,
    };

    setKpis(updatedKPIs);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "done":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "missed":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "done":
        return "Completed";
      case "pending":
        return "Pending";
      case "missed":
        return "Missed";
      default:
        return status;
    }
  };

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
          <div className="h-full flex items-center justify-center px-3 md:px-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white/80 text-sm">
                Loading attendance...
              </span>
            </div>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
          <div className="h-full flex items-center px-3 md:px-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold">Attendance</h1>
              <p className="text-white/80 text-sm mt-0.5">
                Take and review class attendance
              </p>
            </div>
          </div>
        </div>
        <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
          <div className="text-center py-12">
            <div className="text-red-600 mb-2">{error}</div>
            <button
              onClick={fetchSubjects}
              className="px-4 py-2 text-sm font-medium text-[#647FBC] hover:text-[#5a73b3]"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

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
            <p className="text-white/80 text-sm mt-0.5">{getCurrentDate()}</p>
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
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}
                >
                  {stat.label}
                </p>
                <Icon className={`h-4 w-4 ${stat.iconClass}`} />
              </div>
              <div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-600">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today's classes list */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Today's Classes
            </h2>
            <p className="text-sm text-slate-500">
              {todayClasses.length === 0
                ? "No classes scheduled for today"
                : "Track attendance status and timing."}
            </p>
          </div>
          {todayClasses.length > 0 && (
            <div className="text-sm text-slate-600">
              <ClipboardCheck className="inline w-4 h-4 mr-1" />
              Real-time tracking
            </div>
          )}
        </div>

        {todayClasses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No classes scheduled today</div>
            <p className="text-sm text-gray-500">
              There are no classes scheduled for today. Check your schedule for
              upcoming classes.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayClasses.map((classItem, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-xl border ${
                  classItem.status === "missed"
                    ? "border-rose-200 bg-rose-50"
                    : "border-slate-200 bg-slate-50"
                } px-4 py-3 hover:bg-white transition-colors`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {classItem.subject}
                    </p>
                    <span className="text-xs text-[#647FBC] bg-[#647FBC]/10 px-2 py-0.5 rounded-full">
                      {classItem.subjectCode}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(
                        classItem.status
                      )}`}
                    >
                      {getStatusText(classItem.status)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <div className="flex items-center">
                      <Building className="w-3 h-3 mr-1" />
                      <span>{classItem.department}</span>
                    </div>
                    {classItem.sectionName && (
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{classItem.sectionName}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#647FBC]">
                      {classItem.time}
                    </p>
                    <div className="mt-1 flex items-center text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="text-xs">50 min</span>
                    </div>
                  </div>
                  <Link
                    to={`/teacher/subjects/${classItem.id}?tab=attendance`}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      classItem.status === "done"
                        ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        : classItem.status === "missed"
                        ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    type="button"
                  >
                    {classItem.status === "done" ? "Edit" : "Take"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All subjects summary */}
        {subjects.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">
                All Subjects
              </h3>
              <span className="text-xs text-slate-500">
                {subjects.length} subject{subjects.length !== 1 ? "s" : ""}{" "}
                total
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((subject) => (
                <Link
                  key={subject._id}
                  to={`/teacher/subjects/${subject._id}?tab=attendance`}
                  className="rounded-lg border border-slate-200 bg-white p-3 hover:border-[#647FBC] hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {subject.subjectName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {subject.subjectCode} • {subject.department}
                      </p>
                    </div>
                    <span className="text-xs text-[#647FBC] bg-[#647FBC]/10 px-2 py-0.5 rounded-full">
                      {subject.schedules.length} schedule
                      {subject.schedules.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {subject.sectionName && (
                    <div className="mt-2 text-xs text-slate-600">
                      <Users className="inline w-3 h-3 mr-1" />
                      {subject.sectionName}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
