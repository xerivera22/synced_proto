import Banner from "@/components/shared/Banner";
import { AlertCircle, CalendarCheck, CheckCircle, XCircle } from "lucide-react";
import { getStudentPortalDate } from "../utils/date";

export function Attendance() {
  const dateLabel = getStudentPortalDate();

  // Subject Attendance - matches schedule subjects
  const subjectAttendance = [
    { subject: "Mathematics", attended: 28, total: 30, percentage: 93, room: "Room 201", professor: "Dr. Smith" },
    { subject: "Physics", attended: 26, total: 28, percentage: 93, room: "Lab 3", professor: "Dr. Wilson" },
    { subject: "Chemistry", attended: 22, total: 25, percentage: 88, room: "Lab 2", professor: "Dr. Johnson" },
    { subject: "English", attended: 25, total: 27, percentage: 93, room: "Room 105", professor: "Ms. Davis" },
    { subject: "History", attended: 20, total: 26, percentage: 77, room: "Room 301", professor: "Mr. Brown" },
    { subject: "Biology", attended: 24, total: 26, percentage: 92, room: "Lab 1", professor: "Dr. Lee" },
  ];

  // Event Attendance - matches schedule events
  const eventAttendance = [
    { title: "Mid-term Exam Week", date: "Oct 14-18", status: "attended", type: "academic" },
    { title: "Career Fair", date: "Oct 20", status: "attended", type: "event" },
    { title: "Guest Lecture: AI in Healthcare", date: "Oct 28", status: "registered", type: "lecture" },
    { title: "Science Fair", date: "Nov 5", status: "missed", type: "event" },
  ];

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-amber-600";
    return "text-rose-600";
  };

  const getPercentageBg = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-50 border-emerald-200";
    if (percentage >= 80) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case "attended":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "registered":
        return <AlertCircle className="w-4 h-4 text-sky-600" />;
      case "missed":
        return <XCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <CalendarCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case "attended":
        return "text-emerald-600";
      case "registered":
        return "text-sky-600";
      case "missed":
        return "text-rose-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Attendance"
        subtitle="Monitor your class and event participation record."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Summary Cards */}
      <section className="grid grid-cols-3 gap-4">
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm text-center">
          <p className="text-3xl font-bold text-emerald-600">
            {eventAttendance.filter(e => e.status === "attended").length}
          </p>
          <p className="text-sm text-slate-600 mt-2">Attended</p>
        </article>
        <article className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm text-center">
          <p className="text-3xl font-bold text-sky-600">
            {eventAttendance.filter(e => e.status === "registered").length}
          </p>
          <p className="text-sm text-slate-600 mt-2">Registered</p>
        </article>
        <article className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm text-center">
          <p className="text-3xl font-bold text-rose-600">
            {eventAttendance.filter(e => e.status === "missed").length}
          </p>
          <p className="text-sm text-slate-600 mt-2">Missed</p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {/* Subject Attendance */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Subject Attendance</h2>
          <div className="space-y-3">
            {subjectAttendance.map((subject) => (
              <div
                key={subject.subject}
                className={`rounded-xl border p-4 ${getPercentageBg(subject.percentage)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{subject.subject}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {subject.professor} • {subject.room}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getPercentageColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-medium">{subject.attended} Present</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span className="font-medium">{subject.total - subject.attended} Absent</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {subject.attended}/{subject.total} classes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Event Attendance */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Event Attendance</h2>
          <div className="space-y-3">
            {eventAttendance.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getEventStatusIcon(event.status)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{event.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${getEventStatusColor(event.status)}`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
