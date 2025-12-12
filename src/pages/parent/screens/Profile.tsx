import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
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
  const { userData } = useAuth();
  const accountName = userData?.name || "Jaime Erivera";

  return (
    <div className="space-y-6">
      <Banner
        title="Profile"
        subtitle="Keep student and guardian details up to date."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Account Information</h2>
            <p className="text-sm text-slate-500">Logged in as: <span className="font-semibold text-slate-900">{accountName}</span></p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-100 p-4">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Student Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.grade}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Advisor</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{studentInfo.advisor}</p>
                </div>
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

          <article className="rounded-xl border border-slate-100 p-4">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Guardian Information</h3>
            <div className="space-y-4">
              {guardianInfo.map((guardian) => (
                <div key={guardian.email} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-slate-900">{guardian.name}</p>
                  <p className="text-xs text-slate-500 mb-2">{guardian.relation}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-600">{guardian.phone}</p>
                    <p className="text-slate-600">{guardian.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ParentProfile;
