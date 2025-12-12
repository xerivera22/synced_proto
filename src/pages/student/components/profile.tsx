import Banner from "@/components/shared/Banner";
import { useAuth } from "@/context/AuthContext";
import { Edit, Mail, Phone, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { userData } = useAuth();

  const studentInfo = userData || {
    name: "",
    studentId: "",
    email: "",
    phone: "",
    grade: "",
    advisor: "",
  };

  const emergencyContact = userData?.emergencyContact || {
    name: "",
    relationship: "",
    phone: "",
    email: "",
  };

  const [tempStudentInfo, setTempStudentInfo] = useState(studentInfo);
  const [tempEmergencyContact, setTempEmergencyContact] = useState(emergencyContact);

  useEffect(() => {
    if (userData) {
      setTempStudentInfo(userData);
    }
    if (userData?.emergencyContact) {
      setTempEmergencyContact(userData.emergencyContact);
    }
  }, [userData]);

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving data:", tempStudentInfo, tempEmergencyContact);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) setTempStudentInfo(userData);
    if (userData?.emergencyContact) setTempEmergencyContact(userData.emergencyContact);
  };

  const handleInputChange = (field: string, value: string, section: "personal" | "emergency") => {
    if (section === "personal") {
      setTempStudentInfo((prev: any) => ({ ...prev, [field]: value }));
    } else {
      setTempEmergencyContact((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const displayStudentInfo = isEditing ? tempStudentInfo : studentInfo;
  const displayEmergencyContact = isEditing ? tempEmergencyContact : emergencyContact;

  return (
    <div className="space-y-6">
      <Banner title="Profile" subtitle="Manage your personal information and contacts." />

      <section className="grid gap-6 md:grid-cols-3">
        {/* Student Profile */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarImage src="/placeholder-avatar.jpg" alt={displayStudentInfo.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white">
                  {displayStudentInfo.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={displayStudentInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value, "personal")}
                    className="text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <h2 className="text-base font-semibold text-slate-900">{displayStudentInfo.name}</h2>
                )}
                <p className="text-sm text-slate-500">ID: {displayStudentInfo.studentId}</p>
              </div>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="h-8 text-sm">
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-sm">
                  <X className="w-4 h-4 mr-1" /> Cancel
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 text-sm">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</p>
              {isEditing ? (
                <input
                  type="text"
                  value={displayStudentInfo.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value, "personal")}
                  className="mt-1 w-full text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                />
              ) : (
                <p className="mt-1 text-base font-semibold text-slate-900">{displayStudentInfo.grade}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Advisor</p>
              {isEditing ? (
                <input
                  type="text"
                  value={displayStudentInfo.advisor}
                  onChange={(e) => handleInputChange("advisor", e.target.value, "personal")}
                  className="mt-1 w-full text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                />
              ) : (
                <p className="mt-1 text-base font-semibold text-slate-900">{displayStudentInfo.advisor}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={displayStudentInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value, "personal")}
                  className="mt-1 w-full text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                />
              ) : (
                <p className="mt-1 text-base font-semibold text-slate-900">{displayStudentInfo.email}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={displayStudentInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value, "personal")}
                  className="mt-1 w-full text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                />
              ) : (
                <p className="mt-1 text-base font-semibold text-slate-900">{displayStudentInfo.phone}</p>
              )}
            </div>
          </div>
        </article>

        {/* Quick Actions */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition">
              <Mail className="w-4 h-4" /> Contact Advisor
            </button>
            <button className="w-full flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition">
              <Phone className="w-4 h-4" /> Emergency Hotline
            </button>
          </div>
        </article>
      </section>

      {/* Emergency Contacts */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Emergency Contacts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-semibold text-slate-900">{displayEmergencyContact.name}</p>
            <p className="text-xs text-slate-500">{displayEmergencyContact.relationship}</p>
            <dl className="mt-3 space-y-2 text-sm text-slate-500">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</dt>
                {isEditing ? (
                  <input
                    type="tel"
                    value={displayEmergencyContact.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value, "emergency")}
                    className="mt-1 w-full text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <dd className="text-slate-900">{displayEmergencyContact.phone}</dd>
                )}
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</dt>
                {isEditing ? (
                  <input
                    type="email"
                    value={displayEmergencyContact.email}
                    onChange={(e) => handleInputChange("email", e.target.value, "emergency")}
                    className="mt-1 w-full text-slate-900 bg-white border border-slate-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <dd className="text-slate-900">{displayEmergencyContact.email}</dd>
                )}
              </div>
            </dl>
          </article>
        </div>
      </section>
    </div>
  );
}
