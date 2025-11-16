import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const overviewStats = [
  {
    label: "Attendance Rate",
    value: "96%",
    description: "Past 30 days",
    containerClass: "border-emerald-100 bg-emerald-50",
    labelClass: "text-emerald-700",
  },
  {
    label: "Upcoming Events",
    value: "3",
    description: "This week",
    containerClass: "border-sky-100 bg-sky-50",
    labelClass: "text-sky-700",
  },
  {
    label: "Outstanding Balance",
    value: "$250",
    description: "Due Oct 10",
    containerClass: "border-amber-100 bg-amber-50",
    labelClass: "text-amber-700",
  },
  {
    label: "Unread Messages",
    value: "4",
    description: "Action required",
    containerClass: "border-indigo-100 bg-indigo-50",
    labelClass: "text-indigo-700",
  },
];

const ParentOverview = () => {
  const dateLabel = getParentPortalDate();

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
              <p className="text-xs font-semibold uppercase text-slate-500">Current Term GPA</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">3.72</p>
              <p className="text-xs text-emerald-600">+0.08 since last term</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">Classes Today</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">English, Math, Science</p>
              <p className="text-xs text-slate-500">Starting at 8:00 AM</p>
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
