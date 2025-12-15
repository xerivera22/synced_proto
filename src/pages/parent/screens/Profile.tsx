import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/pages/student/components/ui/avatar";
import { Button } from "@/pages/student/components/ui/button";
import { Edit, Phone, User } from "lucide-react";
import { useState } from "react";
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
  const [_isEditing, _setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <Banner
        title="Profile"
        subtitle="Keep student and guardian details up to date."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      <section className="grid gap-6 md:grid-cols-3">
        {/* Parent Profile */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarImage src="/placeholder-avatar.jpg" alt={accountName} />
                <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white">
                  {accountName.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-base font-semibold text-slate-900">{accountName}</h2>
                <p className="text-sm text-slate-500">Parent / Guardian</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-sm">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-base font-semibold text-slate-900">jaime.erivera@email.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <p className="mt-1 text-base font-semibold text-slate-900">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</p>
              <p className="mt-1 text-base font-semibold text-slate-900">123 Main St, Springfield</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Relationship</p>
              <p className="mt-1 text-base font-semibold text-slate-900">Father</p>
            </div>
          </div>
        </article>

        {/* Student Info (Side Column) */}
        <section className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Student Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{studentInfo.name}</p>
                  <p className="text-xs text-slate-500">{studentInfo.grade}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Advisor</span>
                  <span className="font-medium text-slate-900">{studentInfo.advisor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">ID</span>
                  <span className="font-medium text-slate-900">ST-2024-001</span>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Other Guardians</h3>
            <div className="space-y-4">
              {guardianInfo.map((guardian) => (
                <div key={guardian.email} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{guardian.name}</p>
                    <p className="text-xs text-slate-500">{guardian.relation}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs h-8">
                Manage Guardians
              </Button>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
};

export default ParentProfile;
