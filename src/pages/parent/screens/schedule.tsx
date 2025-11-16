import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const schedule = [
  { time: "08:00 AM", course: "Mathematics", teacher: "Mr. Thompson", location: "Room 204" },
  { time: "09:15 AM", course: "English Literature", teacher: "Ms. Rivera", location: "Room 118" },
  { time: "10:30 AM", course: "Science", teacher: "Dr. Chen", location: "Lab 3" },
  { time: "12:30 PM", course: "History", teacher: "Mr. Peters", location: "Room 107" },
  { time: "01:45 PM", course: "Physical Education", teacher: "Coach Wells", location: "Gymnasium" },
];

const ParentSchedule = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Daily Schedule"
        subtitle={`Upcoming classes for ${dateLabel}`}
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              Sync to calendar
            </button>
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              View weekly
            </button>
          </div>
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {schedule.map((item) => (
            <article
              key={`${item.time}-${item.course}`}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.time}
                </p>
                <p className="text-base font-semibold text-slate-900">{item.course}</p>
                <p className="text-xs text-slate-500">{item.teacher}</p>
              </div>
              <p className="text-sm font-medium text-slate-600">{item.location}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParentSchedule;
