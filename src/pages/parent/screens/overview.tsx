import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { announcementService } from "@/services/announcementService";
import { eventService } from "@/services/eventService";
import { studentProfileService } from "@/services/studentProfileService";
import { subjectService } from "@/services/subjectService";
import { useEffect, useState } from "react";
import { getParentPortalDate } from "../utils/date";

interface StudentData {
  studentInfo: {
    name: string;
    studentId: string;
    email: string;
    course: string;
    enrollmentDate: string;
  };
}

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  schedules: string[];
}

const ParentOverview = () => {
  const dateLabel = getParentPortalDate();
  const { userData } = useAuth();
  const [linkedStudent, setLinkedStudent] = useState<StudentData | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [announcementsCount, setAnnouncementsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const linkedStudentId = userData?.linkedStudentId;
  const linkedStudentName = userData?.linkedStudentName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch linked student data if we have a linkedStudentId
        if (linkedStudentId) {
          try {
            const studentData = await studentProfileService.getStudentProfileById(linkedStudentId);
            setLinkedStudent(studentData);
          } catch (err) {
            console.error("Error fetching linked student:", err);
          }
        }

        // Fetch subjects
        const subjectsData = await subjectService.getSubjects();
        setSubjects(subjectsData);

        // Fetch events count
        const eventsData = await eventService.getEvents();
        setEventsCount(eventsData.length);

        // Fetch announcements count (for parents)
        const announcementsData = await announcementService.getAnnouncements();
        const parentAnnouncements = announcementsData.filter(
          (a: { target: string }) => a.target === "all" || a.target === "parents"
        );
        setAnnouncementsCount(parentAnnouncements.length);

      } catch (error) {
        console.error("Error fetching parent overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [linkedStudentId]);

  // Get today's classes from subjects
  const getTodayClasses = () => {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[today.getDay()];
    
    const todaySubjects = subjects.filter(subject => 
      subject.schedules?.some(schedule => schedule.includes(todayName))
    );
    
    if (todaySubjects.length === 0) return "No classes today";
    return todaySubjects.slice(0, 3).map(s => s.subjectName).join(", ");
  };

  const overviewStats = [
    {
      label: "Linked Student",
      value: linkedStudent?.studentInfo?.name || linkedStudentName || "Not linked",
      description: linkedStudent?.studentInfo?.studentId || "Link a student in admin",
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
    },
    {
      label: "Upcoming Events",
      value: eventsCount.toString(),
      description: "School events",
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
    },
    {
      label: "Enrolled Subjects",
      value: subjects.length.toString(),
      description: "Current semester",
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
    },
    {
      label: "Announcements",
      value: announcementsCount.toString(),
      description: "For parents",
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Banner
          title="Parent Dashboard"
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
      <Banner
        title="Parent Dashboard"
        subtitle="Monitor academics, attendance, and school updates in one place."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <article
            key={stat.label}
            className={`rounded-2xl border p-5 shadow-sm ${stat.containerClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}>
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-600">{stat.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Linked Students</h2>
              <p className="text-sm text-slate-500">Switch between children to view details.</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Manage
            </button>
          </header>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">Student Course</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {linkedStudent?.studentInfo?.course || "Not enrolled"}
              </p>
              <p className="text-xs text-emerald-600">
                Enrolled: {linkedStudent?.studentInfo?.enrollmentDate 
                  ? new Date(linkedStudent.studentInfo.enrollmentDate).toLocaleDateString() 
                  : "N/A"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">Classes Today</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{getTodayClasses()}</p>
              <p className="text-xs text-slate-500">{subjects.length} subjects total</p>
            </div>
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              Download latest report
              <button
                type="button"
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Download
              </button>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              Notify homeroom teacher
              <button
                type="button"
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Open chat
              </button>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              Update contact preferences
              <button
                type="button"
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Manage
              </button>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};

export default ParentOverview;
