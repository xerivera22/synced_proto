import Card from "@/components/shared/Card";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/pages/student/components/ui/avatar";
import { Button } from "@/pages/student/components/ui/button";
import { Calendar, Edit, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";

export default function TeacherProfile() {
  const { user } = useAuth();
  const handle = user?.email?.split("@")[0];
  const derivedName = handle
    ? handle.replace(/\./g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
    : undefined;

  const teacherInfo = {
    name: "Jordan Reyes",
    employeeId: "EMP-4589",
    email: user?.email || "jordan.reyes@school.edu",
    phone: "+1 (555) 234-9876",
    address: "45 Faculty Rd, Campus City, CA",
    dateOfBirth: "July 12, 1989",
    hiredDate: "June 2020",
    department: "Mathematics",
    adviserOf: "Grade 10 - Section A",
    loadHours: "24",
  };

  const emergencyContact = {
    name: "Pat Reyes",
    relationship: "Spouse",
    phone: "+1 (555) 765-4321",
    email: "pat.reyes@email.com",
  };

  return (
    <div className="space-y-3">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Teacher Profile</h1>
            <p className="text-white/80 text-sm mt-0.5">Manage your personal information</p>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-3 shadow-sm">
              <AvatarImage src="/placeholder-avatar.jpg" alt={derivedName || teacherInfo.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white text-sm">
                {(derivedName || teacherInfo.name)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {derivedName || teacherInfo.name}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID: {teacherInfo.employeeId}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#647FBC]">{teacherInfo.department}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <GraduationCap className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Teaching Load
              </p>
              <p className="text-sm font-semibold text-slate-900">{teacherInfo.loadHours} hrs</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Hired Date
              </p>
              <p className="text-sm font-semibold text-slate-900">{teacherInfo.hiredDate}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Personal Information</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Mail className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Email</p>
              <p className="text-xs text-slate-500">{teacherInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Phone className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Phone</p>
              <p className="text-xs text-slate-500">{teacherInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <MapPin className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Address</p>
              <p className="text-xs text-slate-500">{teacherInfo.address}</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Date of Birth</p>
              <p className="text-xs text-slate-500">{teacherInfo.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Assignment & Advisory */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <h2 className="text-base font-semibold text-slate-900">Teaching Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Department
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{teacherInfo.department}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Adviser Of
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{teacherInfo.adviserOf}</p>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Emergency Contact</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contact Person
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {emergencyContact.name} ({emergencyContact.relationship})
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{emergencyContact.phone}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{emergencyContact.email}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
