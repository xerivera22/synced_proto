import Banner from "@/components/shared/Banner";
import { useMemo, useState } from "react";
import {
  type AdminStudentRecord,
  type StudentStatus,
  studentMetrics,
  studentRecords,
} from "../data/mockData";

const statusBadgeClass: Record<StudentStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  inactive: "bg-gray-100 text-gray-500",
};

const tabOptions = [
  { id: "summary", label: "Summary" },
  { id: "table", label: "Detailed Records" },
] as const;

type TabId = (typeof tabOptions)[number]["id"];

const Students = () => {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">("all");

  const filteredRecords = useMemo(() => {
    if (statusFilter === "all") return studentRecords;
    return studentRecords.filter((record) => record.status === statusFilter);
  }, [statusFilter]);

  const averageGpa = useMemo(() => {
    const students = filteredRecords.length ? filteredRecords : studentRecords;
    const sum = students.reduce((acc, record) => acc + record.gpa, 0);
    return students.length ? (sum / students.length).toFixed(2) : "0.00";
  }, [filteredRecords]);

  const metrics = [
    {
      label: "Total Students",
      value: studentMetrics.totalStudents,
      containerClass: "border-sky-100 bg-sky-50",
      chipClass: "bg-white/80 text-sky-700",
    },
    {
      label: "Active",
      value: studentMetrics.activeStudents,
      containerClass: "border-emerald-100 bg-emerald-50",
      chipClass: "bg-white/80 text-emerald-700",
    },
    {
      label: "Pending",
      value: studentMetrics.pendingEnrollments,
      containerClass: "border-amber-100 bg-amber-50",
      chipClass: "bg-white/80 text-amber-700",
    },
    {
      label: "Inactive",
      value: studentMetrics.inactiveStudents,
      containerClass: "border-slate-200 bg-slate-100",
      chipClass: "bg-white/80 text-slate-600",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <Banner
        title="Student Records"
        subtitle="Monitor enrollment health and individual progress across the school."
      />

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">View Mode</h2>
            <p className="text-sm text-slate-600">
              Switch between summary statistics and detailed tables.
            </p>
          </div>
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-sm shadow-sm">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 font-medium transition ${activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-500"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>
      </section>

      {activeTab === "summary" && (
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                containerClass={metric.containerClass}
                chipClass={metric.chipClass}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Insights</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-4">
                <dt className="text-xs uppercase tracking-wide text-blue-800">Average GPA</dt>
                <dd className="mt-2 text-2xl font-semibold text-blue-900">
                  {studentMetrics.averageGPA}
                </dd>
              </div>
              <div className="rounded-xl bg-purple-50 p-4">
                <dt className="text-xs uppercase tracking-wide text-purple-800">Advisors</dt>
                <dd className="mt-2 text-2xl font-semibold text-purple-900">12 active advisors</dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {activeTab === "table" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Detailed Records</h2>
              <p className="text-sm text-gray-500">Average GPA: {averageGpa}</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="statusFilter" className="text-sm font-medium text-gray-600">
                Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StudentStatus | "all")}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Grade & Section</th>
                  <th className="px-4 py-3">Advisor</th>
                  <th className="px-4 py-3">Enrollment</th>
                  <th className="px-4 py-3">GPA</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Alerts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => (
                  <StudentRow key={record.id} record={record} />
                ))}
              </tbody>
            </table>
            {filteredRecords.length === 0 && (
              <div className="py-8 text-center text-sm text-gray-500">
                No records match the selected status.
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  containerClass,
  chipClass,
}: {
  label: string;
  value: number;
  containerClass: string;
  chipClass: string;
}) => {
  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${containerClass}`}>
      <p className="text-sm text-slate-600">{label}</p>
      <div
        className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${chipClass}`}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
};

const StudentRow = ({ record }: { record: AdminStudentRecord }) => {
  return (
    <tr className="bg-white">
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{record.name}</div>
        <div className="text-xs text-gray-400">{record.id}</div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {record.gradeLevel}
        <div className="text-xs text-gray-400">{record.section}</div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{record.advisor}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{record.enrollmentDate}</td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{record.gpa.toFixed(2)}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass[record.status]}`}
        >
          {record.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{record.alerts ?? "—"}</td>
    </tr>
  );
};

export default Students;
