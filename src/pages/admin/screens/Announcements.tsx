import Banner from "@/components/shared/Banner";
import { announcements } from "../data/mockData";

const Announcements = () => {
  return (
    <div className="space-y-6">
      <Banner
        title="Announcements"
        subtitle="Draft, schedule, and monitor communications for the school community."
      />

      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-purple-900">Communication queue</h2>
            <p className="text-sm text-purple-700/80">
              Draft, schedule, and monitor communications for the school community.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-50"
          >
            New announcement (mock)
          </button>
        </header>

        <div className="mt-4 space-y-4">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-purple-100/60 bg-white p-5 shadow-sm"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-xs text-gray-500">Target: {item.target}</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-white px-3 py-1 font-medium text-purple-700">
                    Schedule: {item.scheduledFor}
                  </span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 font-semibold uppercase tracking-wide text-purple-700">
                    {item.status}
                  </span>
                </div>
              </header>
              <p className="mt-4 text-xs text-purple-700/70">
                Message content placeholder — integrate CMS editor when ready.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        Analytics placeholder — display engagement rates once email/SMS metrics are wired up.
      </section>
    </div>
  );
};

export default Announcements;
