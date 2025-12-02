import Card from "@/components/shared/Card";
import { BookOpen, Clock, Building, Hash, Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { subjectService } from "@/services/subjectService";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "class-records", label: "Class Records" },
  { key: "attendance", label: "Attendance" },
  { key: "materials", label: "Materials" },
  { key: "settings", label: "Settings" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

// Helper function to format schedule display
const formatScheduleDisplay = (schedule: string) => {
  const [date, time] = schedule.split(" ");
  const dateObj = new Date(`${date}T${time}:00`);
  return (
    dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    time
  );
};

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const activeParam = (search.get("tab") as TabKey) || "overview";
  const [active, setActive] = useState<TabKey>(activeParam);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subject data
  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await subjectService.getSubject(id);
        setSubject(data);
      } catch (err) {
        console.error("Error fetching subject:", err);
        setError("Failed to load subject. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  // Keep URL in sync when tab changes
  function setTab(next: TabKey) {
    setActive(next);
    setSearch(
      (prev) => {
        const s = new URLSearchParams(prev);
        s.set("tab", next);
        return s;
      },
      { replace: true }
    );
  }

  // Remember last opened subject id for deep links (e.g., Class Records)
  useEffect(() => {
    if (id) {
      try {
        localStorage.setItem("teacher.lastSubjectId", id);
      } catch {
        // ignore persistence errors
      }
    }
  }, [id]);

  // Calculate average students (mock - replace with real data)
  const averageStudents = useMemo(() => {
    return 30; // You can replace this with actual enrollment data
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
          <div className="h-full flex items-center justify-center px-3 md:px-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white/80 text-sm">Loading subject...</span>
            </div>
          </div>
        </div>
        <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC] mb-2"></div>
            <p className="text-gray-600">Loading subject details...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="space-y-3">
        <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
          <div className="h-full flex items-center px-3 md:px-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold">Subject Not Found</h1>
              <p className="text-white/80 text-sm mt-0.5">
                The requested subject could not be loaded
              </p>
            </div>
          </div>
        </div>
        <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
          <div className="text-center py-12">
            <div className="text-red-600 mb-2">
              {error || "Subject not found"}
            </div>
            <button
              onClick={() => navigate("/teacher/subjects")}
              className="px-4 py-2 text-sm font-medium text-[#647FBC] hover:text-[#5a73b3]"
            >
              Back to Subjects
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
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-base font-semibold">
                  {subject.subjectName}
                </h1>
                <p className="text-white/80 text-sm mt-0.5">
                  Manage Overview, Class Records, Attendance and Materials
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20">
                  {subject.subjectCode}
                </span>
                {subject.sectionName && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20">
                    {subject.sectionName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Info Card */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-slate-900">
              {subject.subjectName}{" "}
              {subject.sectionName && `— ${subject.sectionName}`}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Hash size={14} />
                <span>Code: {subject.subjectCode}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building size={14} />
                <span>Department: {subject.department}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Schedules: {subject.schedules.length}</span>
              </div>
              {subject.sectionName && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
                  <span>Section: {subject.sectionName}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/teacher/subjects/${id}?tab=class-records`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Class Records
            </Link>
            <Link
              to="/teacher/subjects"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Back to Subjects
            </Link>
          </div>
        </div>

        {/* Schedules Section */}
        {subject.schedules.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#647FBC]/20">
            <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Clock size={14} />
              Class Schedules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {subject.schedules.map((schedule, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/50 rounded-lg border border-slate-200"
                >
                  <div className="text-sm font-medium text-slate-900">
                    {formatScheduleDisplay(schedule)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Tab Navigation */}
      <Card className="p-0 overflow-hidden">
        <div className="flex gap-1 border-b border-slate-200 bg-slate-50 px-3 pt-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-t-lg px-4 py-2 text-xs font-semibold transition ${
                active === t.key
                  ? "bg-white border border-slate-200 border-b-white text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {active === "overview" && (
            <OverviewTab subject={subject} averageStudents={averageStudents} />
          )}
          {active === "class-records" && <ClassRecordsTab subjectId={id!} />}
          {active === "attendance" && <AttendanceTab subjectId={id!} />}
          {active === "materials" && <MaterialsTab subjectId={id!} />}
          {active === "settings" && <SettingsTab subject={subject} />}
        </div>
      </Card>
    </div>
  );
}

function OverviewTab({
  subject,
  averageStudents,
}: {
  subject: Subject;
  averageStudents: number;
}) {
  const overviewStats = [
    {
      label: "To Grade",
      value: "12",
      description: "Assignments awaiting review",
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
    },
    {
      label: "Avg Score",
      value: "87%",
      description: "Current class average",
      containerClass: "border-indigo-100 bg-indigo-50",
      labelClass: "text-indigo-700",
    },
    {
      label: "Absences",
      value: "3",
      description: "This week across sections",
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
    },
    {
      label: "Students",
      value: averageStudents.toString(),
      description: "Enrolled learners",
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
    },
  ];

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Subject Overview
        </h3>
        <div className="text-sm text-slate-600">
          <span className="font-medium">{subject.subjectCode}</span> •{" "}
          {subject.department}
        </div>
      </div>

      <p className="text-slate-600">
        Quick summary for{" "}
        <span className="font-medium">{subject.subjectName}</span>.
        {subject.sectionName && ` Section: ${subject.sectionName}.`}
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card
            key={stat.label}
            className={`p-5 ${stat.containerClass} flex flex-col justify-between`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}
            >
              {stat.label}
            </p>
            <div>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="text-xs text-slate-600">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional subject info */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-2">
          Subject Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Subject Code:</span>
              <span className="font-medium">{subject.subjectCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="font-medium">{subject.department}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Schedules:</span>
              <span className="font-medium">{subject.schedules.length}</span>
            </div>
            {subject.sectionName && (
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Section:</span>
                <span className="font-medium">{subject.sectionName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassRecordsTab({ subjectId }: { subjectId: string }) {
  // Minimal table placeholder - you can replace with real data
  const rows = [
    { id: 1, student: "John Doe", quiz1: 15, quiz2: 18, midterm: 85 },
    { id: 2, student: "Jane Smith", quiz1: 19, quiz2: 17, midterm: 91 },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Class Records - Subject ID: {subjectId}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Export CSV
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Add Assessment
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-[600px] w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                Student
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                Quiz 1
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                Quiz 2
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                Midterm
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="odd:bg-white even:bg-slate-50 text-slate-700"
              >
                <td className="border-b border-slate-200 px-3 py-2 text-sm font-medium">
                  {r.student}
                </td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">
                  {r.quiz1}
                </td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">
                  {r.quiz2}
                </td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">
                  {r.midterm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AttendanceTab({ subjectId }: { subjectId: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Attendance - Subject ID: {subjectId}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Mark Attendance
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            View Reports
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Attendance tools for this subject will appear here.
      </p>
    </div>
  );
}

function MaterialsTab({ subjectId }: { subjectId: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Materials - Subject ID: {subjectId}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Upload File
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Add Link
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">Upload or link class materials.</p>
    </div>
  );
}

function SettingsTab({ subject }: { subject: Subject }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Settings - {subject.subjectName}
        </h3>
      </div>
      <div className="space-y-4 text-sm">
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-medium text-slate-900 mb-2">
            Subject Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subject Name:</span>
              <span className="font-medium">{subject.subjectName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Subject Code:</span>
              <span className="font-medium">{subject.subjectCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Department:</span>
              <span className="font-medium">{subject.department}</span>
            </div>
            {subject.sectionName && (
              <div className="flex justify-between">
                <span className="text-slate-600">Assigned Section:</span>
                <span className="font-medium">{subject.sectionName}</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Subject-specific settings like grading scheme and visibility.
        </p>
      </div>
    </div>
  );
}
