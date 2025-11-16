import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const studentInfo = {
  name: "Avery Johnson",
  grade: "10th Grade",
  advisor: "Ms. Patel",
  email: "avery.johnson@student.edu",
  phone: "(555) 214-7780",
};

const guardianInfo = [
  {
    name: "Jordan Johnson",
    relation: "Parent",
    phone: "(555) 321-4488",
    email: "jordan.johnson@email.com",
  },
  {
    name: "Morgan Johnson",
    relation: "Parent",
    phone: "(555) 822-1199",
    email: "morgan.johnson@email.com",
  },
];

const ParentProfile = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Profile"
        subtitle="Keep student and guardian details up to date."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">Student Profile</h2>
          <p className="mt-2 text-sm text-slate-500">
            Keep personal, guardian, and contact information updated.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Student
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.grade}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Advisor
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.advisor}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.phone}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Preferences</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-500">
            <p>Email notifications for attendance updates</p>
            <p>SMS alerts for payment reminders</p>
            <p>Weekly academic digest summary</p>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Edit preferences
          </button>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Emergency Contacts</h2>
        <p className="mt-2 text-sm text-slate-500">
          Confirm that contact details are accurate in case of urgent updates.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {guardianInfo.map((guardian) => (
            <article key={guardian.email} className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">{guardian.name}</p>
              <p className="text-xs text-slate-500">{guardian.relation}</p>
              <dl className="mt-3 space-y-2 text-sm text-slate-500">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </dt>
                  <dd className="text-slate-900">{guardian.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </dt>
                  <dd className="text-slate-900">{guardian.email}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParentProfile;
