import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const ParentSettings = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Settings"
        subtitle="Configure notifications, linked accounts, and data preferences."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
        <p className="mt-2 text-sm text-slate-500">
          Choose how you receive updates about attendance, academics, and payments.
        </p>

        <div className="mt-6 space-y-4">
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" defaultChecked />
            <span>
              <span className="block text-sm font-semibold text-slate-900">Email updates</span>
              <span className="text-xs text-slate-500">
                Daily summary of attendance and grade updates.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" defaultChecked />
            <span>
              <span className="block text-sm font-semibold text-slate-900">SMS alerts</span>
              <span className="text-xs text-slate-500">
                Instant alerts for tardies, absences, and payment reminders.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" />
            <span>
              <span className="block text-sm font-semibold text-slate-900">Mobile push</span>
              <span className="text-xs text-slate-500">
                Receive push notifications in the mobile app.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Linked Accounts</h2>
        <p className="mt-2 text-sm text-slate-500">
          Connect to other guardians or authorized caregivers for shared access.
        </p>

        <div className="mt-6 space-y-4">
          <article className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-semibold text-slate-900">Morgan Johnson</p>
            <p className="text-xs text-slate-500">Has access to attendance and payment info</p>
            <button
              type="button"
              className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Manage permissions
            </button>
          </article>
          <button
            type="button"
            className="w-full rounded-full border border-dashed border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Add another guardian
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Data Privacy</h2>
        <p className="mt-2 text-sm text-slate-500">
          Download student data or request removal in compliance with school policies.
        </p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Download data archive
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Request data removal
          </button>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg border border-[#647FBC] bg-[#647FBC] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white hover:text-[#647FBC] hover:border-[#647FBC]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ParentSettings;
