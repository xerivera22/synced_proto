import Card from "@/components/shared/Card";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/pages/student/components/ui/avatar";
import { Button } from "@/pages/student/components/ui/button";
import { Calendar, Edit, GraduationCap, Mail, MapPin, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";

export default function TeacherProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handle = user?.email?.split("@")[0];
  const derivedName = handle
    ? handle.replace(/\./g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
    : undefined;

  const [teacherInfo, setTeacherInfo] = useState({
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
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: "Pat Reyes",
    relationship: "Spouse",
    phone: "+1 (555) 765-4321",
    email: "pat.reyes@email.com",
  });

  const handleEdit = (section: string) => {
    setIsEditing(true);
    setEditingSection(section);
  };

  const handleSave = (section: string) => {
    setIsEditing(false);
    setEditingSection(null);
    console.log(`Saving ${section} data:`, section === "personal" ? teacherInfo : emergencyContact);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSection(null);
  };

  const handleInputChange = (field: string, value: string, section: "personal" | "emergency") => {
    if (section === "personal") {
      setTeacherInfo((prev) => ({ ...prev, [field]: value }));
    } else {
      setEmergencyContact((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isEditingSection = (section: string) => {
    return isEditing && editingSection === section;
  };

  // Render edit buttons function for consistency
  const renderEditButtons = (section: string) => {
    if (isEditingSection(section)) {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700 h-8 px-3 text-sm"
            onClick={() => handleSave(section)}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 h-8 px-3 text-sm"
            onClick={handleCancel}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          variant="outline"
          size="sm"
          className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-8 px-3 text-sm"
          onClick={() => handleEdit(section)}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      );
    }
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
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={teacherInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value, "personal")}
                  className="text-base font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 mb-1"
                />
              ) : (
                <h2 className="text-base font-semibold text-slate-900">
                  {derivedName || teacherInfo.name}
                </h2>
              )}
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID: {teacherInfo.employeeId}
              </p>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={teacherInfo.department}
                  onChange={(e) => handleInputChange("department", e.target.value, "personal")}
                  className="mt-1 text-sm font-semibold text-[#647FBC] bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="mt-1 text-sm font-semibold text-[#647FBC]">
                  {teacherInfo.department}
                </p>
              )}
            </div>
          </div>
          {renderEditButtons("overview")}
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
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={teacherInfo.loadHours}
                  onChange={(e) => handleInputChange("loadHours", e.target.value, "personal")}
                  className="text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-16"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{teacherInfo.loadHours} hrs</p>
              )}
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
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={teacherInfo.hiredDate}
                  onChange={(e) => handleInputChange("hiredDate", e.target.value, "personal")}
                  className="text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{teacherInfo.hiredDate}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Personal Information</h2>
          {renderEditButtons("personal")}
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Mail className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Email</p>
              {isEditingSection("personal") ? (
                <input
                  type="email"
                  value={teacherInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value, "personal")}
                  className="text-xs text-slate-500 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-xs text-slate-500">{teacherInfo.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Phone className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Phone</p>
              {isEditingSection("personal") ? (
                <input
                  type="tel"
                  value={teacherInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value, "personal")}
                  className="text-xs text-slate-500 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-xs text-slate-500">{teacherInfo.phone}</p>
              )}
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <MapPin className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Address</p>
              {isEditingSection("personal") ? (
                <textarea
                  value={teacherInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value, "personal")}
                  className="text-xs text-slate-500 bg-white border border-gray-300 rounded-md px-2 py-1 w-full resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-xs text-slate-500">{teacherInfo.address}</p>
              )}
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Date of Birth</p>
              {isEditingSection("personal") ? (
                <input
                  type="text"
                  value={teacherInfo.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value, "personal")}
                  className="text-xs text-slate-500 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-xs text-slate-500">{teacherInfo.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Assignment & Advisory */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Teaching Information</h2>
          {renderEditButtons("academic")}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Department
            </p>
            {isEditingSection("academic") ? (
              <input
                type="text"
                value={teacherInfo.department}
                onChange={(e) => handleInputChange("department", e.target.value, "personal")}
                className="mt-1 text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
              />
            ) : (
              <p className="mt-1 text-sm font-semibold text-slate-900">{teacherInfo.department}</p>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Adviser Of
            </p>
            {isEditingSection("academic") ? (
              <input
                type="text"
                value={teacherInfo.adviserOf}
                onChange={(e) => handleInputChange("adviserOf", e.target.value, "personal")}
                className="mt-1 text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
              />
            ) : (
              <p className="mt-1 text-sm font-semibold text-slate-900">{teacherInfo.adviserOf}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6 bg-[#647FBC]/5 border-[#647FBC]/15">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Emergency Contact</h2>
          {renderEditButtons("emergency")}
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contact Person
            </p>
            {isEditingSection("emergency") ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={emergencyContact.name}
                  onChange={(e) => handleInputChange("name", e.target.value, "emergency")}
                  className="mt-1 text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={emergencyContact.relationship}
                  onChange={(e) => handleInputChange("relationship", e.target.value, "emergency")}
                  className="text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Relationship"
                />
              </div>
            ) : (
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {emergencyContact.name} ({emergencyContact.relationship})
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              {isEditingSection("emergency") ? (
                <input
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value, "emergency")}
                  className="mt-1 text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {emergencyContact.phone}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              {isEditingSection("emergency") ? (
                <input
                  type="email"
                  value={emergencyContact.email}
                  onChange={(e) => handleInputChange("email", e.target.value, "emergency")}
                  className="mt-1 text-sm font-semibold text-slate-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {emergencyContact.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
