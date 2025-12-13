import Banner from "@/components/shared/Banner";
import Card from "@/components/shared/Card";
import { subjectService } from "@/services/subjectService";
import {
  BookOpenCheck,
  Building,
  Calendar,
  Clock,
  TimerReset,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getTeacherPortalDate } from "../utils/date";

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

interface ScheduleItem {
  subject: string;
  subjectCode: string;
  time: string;
  room?: string;
  sectionName?: string;
  department: string;
  schedule: string; // Original schedule string
}

export default function TeacherSchedule() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);
  const [kpis, setKpis] = useState([
    {
      label: "Classes Today",
      value: "0",
      description: "Sessions to facilitate",
      icon: Calendar,
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
      iconClass: "text-indigo-700",
    },
    {
      label: "Teaching Hours",
      value: "0h",
      description: "In-class instruction",
      icon: Clock,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Subjects",
      value: "0",
      description: "Total subjects assigned",
      icon: BookOpenCheck,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Next Class",
      value: "None",
      description: "Check schedule",
      icon: TimerReset,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
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
      processScheduleData(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load schedule. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Process schedule data to get today's classes
  const processScheduleData = (subjectsData: Subject[]) => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD

    // Filter subjects with schedules for today
    const todaysClasses: ScheduleItem[] = [];

    subjectsData.forEach((subject) => {
      subject.schedules.forEach((schedule) => {
        const [date, time] = schedule.split(" ");

        // Check if schedule is for today
        if (date === todayString) {
          todaysClasses.push({
            subject: subject.subjectName,
            subjectCode: subject.subjectCode,
            time: formatTime(time),
            department: subject.department,
            sectionName: subject.sectionName,
            schedule: schedule,
          });
        }
      });
    });

    // Sort by time
    todaysClasses.sort((a, b) => {
      const timeA = a.schedule.split(" ")[1];
      const timeB = b.schedule.split(" ")[1];
      return timeA.localeCompare(timeB);
    });

    setTodaySchedule(todaysClasses);
    updateKPIs(todaysClasses, subjectsData);
  };

  // Format time from "09:00" to "09:00 AM"
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Update KPI values based on schedule data
  const updateKPIs = (
    todaysClasses: ScheduleItem[],
    allSubjects: Subject[]
  ) => {
    // Calculate teaching hours (assuming each class is 1 hour)
    const teachingHours = todaysClasses.length;

    // Find next class
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

    let nextClass: ScheduleItem | null = null;
    for (const classItem of todaysClasses) {
      const [_, classTime] = classItem.schedule.split(" ");
      const [classHours, classMinutes] = classTime.split(":").map(Number);
      const classTimeInMinutes = classHours * 60 + classMinutes;

      if (classTimeInMinutes > currentTime) {
        nextClass = classItem;
        break;
      }
    }

    const updatedKPIs = [...kpis];

    // Update Classes Today
    updatedKPIs[0] = {
      ...updatedKPIs[0],
      value: todaysClasses.length.toString(),
      description: `${todaysClasses.length} session${todaysClasses.length !== 1 ? "s" : ""
        } to facilitate`,
    };

    // Update Teaching Hours
    updatedKPIs[1] = {
      ...updatedKPIs[1],
      value: `${teachingHours}h`,
      description: `In-class instruction`,
    };

    // Update Subjects
    updatedKPIs[2] = {
      ...updatedKPIs[2],
      value: allSubjects.length.toString(),
      description: `Total subjects assigned`,
    };

    // Update Next Class
    if (nextClass) {
      updatedKPIs[3] = {
        ...updatedKPIs[3],
        value: nextClass.time,
        description: `${nextClass.subject} (${nextClass.subjectCode})`,
      };
    } else if (todaysClasses.length > 0) {
      // All classes for today have passed
      updatedKPIs[3] = {
        ...updatedKPIs[3],
        value: "Done",
        description: "Classes completed for today",
      };
    }

    setKpis(updatedKPIs);
  };

  // Get current date label
  const dateLabel = getTeacherPortalDate();

  if (loading) {
    return (
      <div className="space-y-3">
        <Banner
          title="Schedule"
          subtitle="Loading your schedule..."
          right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
        />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
          <p className="text-gray-600">Loading your schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <Banner
          title="Schedule"
          subtitle="View and manage your timetable"
          right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
        />
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
      <Banner
        title="Schedule"
        subtitle="View and manage your timetable"
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

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

      {/* Today's schedule list */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Today's Schedule
            </h2>
            <p className="text-sm text-slate-500">
              {todaySchedule.length === 0
                ? "No classes scheduled for today"
                : `${todaySchedule.length} class${todaySchedule.length !== 1 ? "es" : ""
                } scheduled`}
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <Calendar className="inline w-4 h-4 mr-1" />
            {getCurrentDay()}
          </div>
        </div>

        {todaySchedule.length === 0 ? (
          <div className="mt-4 text-center py-8">
            <div className="text-gray-400 mb-2">No classes today</div>
            <p className="text-sm text-gray-500">
              Enjoy your free day! Check back tomorrow for your schedule.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {todaySchedule.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-white transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {classItem.subject}
                    </p>
                    <span className="text-xs text-[#647FBC] bg-[#647FBC]/10 px-2 py-0.5 rounded-full">
                      {classItem.subjectCode}
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
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#647FBC]">
                    {classItem.time}
                  </p>
                  <div className="mt-1 flex items-center text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">50 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subject list summary */}
        {subjects.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              All Subjects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="rounded-lg border border-slate-200 bg-white p-3"
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
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
