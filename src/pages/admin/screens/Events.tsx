import Banner from "@/components/shared/Banner";
import { upcomingEvents } from "../data/mockData";

const Events = () => {
  return (
    <div className="space-y-6">
      <Banner
        title="Events & Schedule"
        subtitle="Coordinate school-wide events, faculty sessions, and parent activities."
      />

      <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Upcoming calendar</h2>
            <p className="text-sm text-slate-600">
              Track planning status and ensure the right groups are informed.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
          >
            Create event (mock)
          </button>
        </header>

        <ul className="divide-y divide-slate-100">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-500">Target audience: {event.audience}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-white px-3 py-1 font-medium text-sky-700">
                  {event.date}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {event.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        Calendar view placeholder — integrate with scheduling API or embed once backend is ready.
      </section>
    </div>
  );
};

export default Events;
