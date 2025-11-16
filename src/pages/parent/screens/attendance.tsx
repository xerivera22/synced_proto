import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

type AttendanceStatus = "Present" | "Excused" | "Unexcused";

type AttendanceSummaryItem = {
  label: string;
  value: string;
  subtext: string;
  containerClass: string;
  labelClass: string;
  valueClass?: string;
};

type AttendanceRecord = {
  date: string;
  status: AttendanceStatus;
  notes: string;
};

const attendanceSummary: AttendanceSummaryItem[] = [
  {
    label: "Attendance",
    value: "96%",
    subtext: "4 days missed",
    containerClass: "border-emerald-100 bg-emerald-50",
    labelClass: "text-emerald-700",
    valueClass: "text-emerald-700",
  },
  {
    label: "Excused",
    value: "3",
    subtext: "Medical",
    containerClass: "border-sky-100 bg-sky-50",
    labelClass: "text-sky-700",
  },
  {
    label: "Unexcused",
    value: "1",
    subtext: "Reported",
    containerClass: "border-amber-100 bg-amber-50",
    labelClass: "text-amber-700",
    valueClass: "text-amber-700",
  },
  {
    label: "Tardies",
    value: "2",
    subtext: "Improving",
    containerClass: "border-indigo-100 bg-indigo-50",
    labelClass: "text-indigo-700",
  },
];

const recentRecords: AttendanceRecord[] = [
  { date: "Aug 28, 2024", status: "Present", notes: "On time" },
  { date: "Aug 27, 2024", status: "Present", notes: "On time" },
  { date: "Aug 26, 2024", status: "Excused", notes: "Doctor appointment" },
  { date: "Aug 23, 2024", status: "Present", notes: "On time" },
  { date: "Aug 22, 2024", status: "Unexcused", notes: "Missed bus" },
];

const statusTone: Record<AttendanceStatus, string> = {
  Present: "text-emerald-600",
  Excused: "text-sky-600",
  Unexcused: "text-amber-600",
};

const ParentAttendance = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Attendance"
        subtitle="Monitor daily presence, tardiness, and absence trends."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {attendanceSummary.map((item) => (
          <article
            key={item.label}
            className={`rounded-2xl border p-6 shadow-sm ${item.containerClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${item.labelClass}`}>
              {item.label}
            </p>
            <p className={`mt-3 text-3xl font-semibold ${item.valueClass ?? "text-slate-900"}`}>
              {item.value}
            </p>
            <p className="text-xs text-slate-600">{item.subtext}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Recent Attendance</h2>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Export to CSV
          </button>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {recentRecords.map((record) => (
                <tr key={record.date}>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">{record.date}</td>
                  <td className={`px-4 py-4 text-sm font-semibold ${statusTone[record.status]}`}>
                    {record.status}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ParentAttendance;
