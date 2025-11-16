import { Calendar, Edit, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/pages/student/components/ui/avatar";
import { Button } from "@/pages/student/components/ui/button";
import { Card } from "@/pages/student/components/ui/card";

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
      <Card className="p-3 shadow-sm border-0 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-center justify-between mb-3">
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
              <h2 className="text-base font-semibold text-gray-900">
                {derivedName || teacherInfo.name}
              </h2>
              <p className="text-gray-500 font-medium text-xs">ID: {teacherInfo.employeeId}</p>
              <p className="text-[#647FBC] font-medium mt-0.5 text-sm">{teacherInfo.department}</p>
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

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
              <GraduationCap className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Teaching Load</p>
              <p className="font-semibold text-gray-900 text-sm">{teacherInfo.loadHours} hrs</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Hired Date</p>
              <p className="font-semibold text-gray-900 text-sm">{teacherInfo.hiredDate}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Personal Information</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Mail className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Email</p>
              <p className="text-gray-600 text-xs">{teacherInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Phone className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Phone</p>
              <p className="text-gray-600 text-xs">{teacherInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <MapPin className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Address</p>
              <p className="text-gray-600 text-xs">{teacherInfo.address}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Date of Birth</p>
              <p className="text-gray-600 text-xs">{teacherInfo.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Assignment & Advisory */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Teaching Information</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Department</p>
            <p className="text-gray-900 font-semibold text-sm">{teacherInfo.department}</p>
          </div>
          <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Adviser Of</p>
            <p className="text-gray-900 font-semibold text-sm">{teacherInfo.adviserOf}</p>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Emergency Contact</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-red-50/50 rounded-lg border border-red-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Contact Person</p>
            <p className="text-gray-900 font-semibold text-sm">
              {emergencyContact.name} ({emergencyContact.relationship})
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Phone</p>
              <p className="text-gray-900 font-semibold text-sm">{emergencyContact.phone}</p>
            </div>
            <div className="p-2 bg-green-50/50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Email</p>
              <p className="text-gray-900 font-semibold text-sm">{emergencyContact.email}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
