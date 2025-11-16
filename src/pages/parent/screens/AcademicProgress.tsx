import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const summaryCards = [
  {
    label: "GPA",
    value: "3.72",
    subtext: "+0.08 vs last term",
    containerClass: "border-emerald-100 bg-emerald-50",
    badgeClass: "text-emerald-700",
  },
  {
    label: "Assignments Submitted",
    value: "28/30",
    subtext: "On time",
    containerClass: "border-sky-100 bg-sky-50",
    badgeClass: "text-sky-700",
  },
  {
    label: "Assessments",
    value: "6",
    subtext: "Next quiz Sept 18",
    containerClass: "border-indigo-100 bg-indigo-50",
    badgeClass: "text-indigo-700",
  },
  {
    label: "Missing Work",
    value: "0",
    subtext: "Great progress",
    containerClass: "border-amber-100 bg-amber-50",
    badgeClass: "text-amber-700",
  },
];

const courses = [
  { name: "English Literature", grade: "A", change: "+2%", toneClass: "text-emerald-600" },
  { name: "Mathematics", grade: "B+", change: "+1%", toneClass: "text-sky-600" },
  { name: "Science", grade: "A-", change: "0%", toneClass: "text-indigo-600" },
  { name: "History", grade: "B", change: "-1%", toneClass: "text-amber-600" },
];

const ParentAcademicProgress = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Academic Progress"
        subtitle="Track grades, assignments, and upcoming assessments for your student."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm ${card.containerClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide ${card.badgeClass}`}>
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="text-xs text-slate-600">{card.subtext}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Course Grades</h2>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Download report
          </button>
        </header>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course.name} className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">{course.name}</p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-semibold text-slate-900">{course.grade}</span>
                <span className={`text-xs font-medium ${course.toneClass}`}>{course.change}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Updated 2 days ago</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParentAcademicProgress;
