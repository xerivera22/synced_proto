import Card from "@/components/shared/Card";
import { BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "class-records", label: "Class Records" },
  { key: "attendance", label: "Attendance" },
  { key: "materials", label: "Materials" },
  { key: "settings", label: "Settings" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function SubjectDetail() {
  const { id } = useParams();
  const [search, setSearch] = useSearchParams();
  const activeParam = (search.get("tab") as TabKey) || "overview";
  const [active, setActive] = useState<TabKey>(activeParam);

  // Keep URL in sync when tab changes
  function setTab(next: TabKey) {
    setActive(next);
    setSearch(
      (prev) => {
        const s = new URLSearchParams(prev);
        s.set("tab", next);
        return s;
      },
      { replace: true },
    );
  }

  const subject = useMemo(() => ({ id, name: "Sample Subject", section: "A", roster: 30 }), [id]);

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

  return (
    <div className="space-y-3">
      {/* Title banner (student-style) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">{subject.name}</h1>
            <p className="text-white/80 text-sm mt-0.5">
              Manage Overview, Class Records, Attendance and Materials
            </p>
          </div>
        </div>
      </div>
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {subject.name} — Section {subject.section}
            </h2>
            <p className="text-sm text-slate-500">
              Subject ID: {id} • {subject.roster} students enrolled
            </p>
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
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="flex gap-1 border-b border-slate-200 bg-slate-50 px-3 pt-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-t-lg px-4 py-2 text-xs font-semibold transition ${active === t.key ? "bg-white border border-slate-200 border-b-white text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {active === "overview" && <OverviewTab />}
          {active === "class-records" && <ClassRecordsTab />}
          {active === "attendance" && <AttendanceTab />}
          {active === "materials" && <MaterialsTab />}
          {active === "settings" && <SettingsTab />}
        </div>
      </Card>
    </div>
  );
}

function OverviewTab() {
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
      value: "30",
      description: "Enrolled learners",
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
    },
  ];

  return (
    <div className="space-y-4 text-sm">
      <p className="text-slate-600">
        Quick summary for the selected subject. Add KPIs, upcoming assessments, and reminders here.
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card
            key={stat.label}
            className={`p-5 ${stat.containerClass} flex flex-col justify-between`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${stat.labelClass}`}>
              {stat.label}
            </p>
            <div>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClassRecordsTab() {
  // Minimal table placeholder to represent the old Gradebook screen
  const rows = [
    { id: 1, student: "John Doe", quiz1: 15, quiz2: 18, midterm: 85 },
    { id: 2, student: "Jane Smith", quiz1: 19, quiz2: 17, midterm: 91 },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Class Records</h3>
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
              <tr key={r.id} className="odd:bg-white even:bg-slate-50 text-slate-700">
                <td className="border-b border-slate-200 px-3 py-2 text-sm font-medium">
                  {r.student}
                </td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">{r.quiz1}</td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">{r.quiz2}</td>
                <td className="border-b border-slate-200 px-3 py-2 text-sm">{r.midterm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AttendanceTab() {
  return (
    <p className="text-sm text-gray-600">Attendance tools for this subject will appear here.</p>
  );
}

function MaterialsTab() {
  return <p className="text-sm text-gray-600">Upload or link class materials.</p>;
}

function SettingsTab() {
  return (
    <p className="text-sm text-gray-600">
      Subject-specific settings like grading scheme and visibility.
    </p>
  );
}
