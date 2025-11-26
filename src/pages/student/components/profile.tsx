import {
  Calendar,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useAuth } from "@/context/AuthContext";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { userData } = useAuth();

  // Directly use userData or fallback to empty data
  const studentInfo = userData || {
    name: "",
    studentId: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    enrollmentDate: "",
    expectedGraduation: "",
    major: "",
    minor: "",
    advisor: "",
    gpa: "",
    creditHours: "",
  };

  const emergencyContact = userData?.emergencyContact || {
    name: "",
    relationship: "",
    phone: "",
    email: "",
  };

  const achievements = userData?.achievements || [];

  const [tempStudentInfo, setTempStudentInfo] = useState(studentInfo);
  const [tempEmergencyContact, setTempEmergencyContact] =
    useState(emergencyContact);

  // Update temp state when userData changes
  useEffect(() => {
    if (userData?.studentInfo) {
      setTempStudentInfo(userData.studentInfo);
    }
    if (userData?.emergencyContact) {
      setTempEmergencyContact(userData.emergencyContact);
    }
  }, [userData]);

  const handleEdit = (section: string) => {
    setIsEditing(true);
    setEditingSection(section);
  };

  const handleSave = (section: string) => {
    setIsEditing(false);
    setEditingSection(null);
    console.log("Saving data for section:", section);
    console.log("Student Info:", tempStudentInfo);
    console.log("Emergency Contact:", tempEmergencyContact);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSection(null);
    // Reset to original data
    if (userData?.studentInfo) {
      setTempStudentInfo(userData.studentInfo);
    }
    if (userData?.emergencyContact) {
      setTempEmergencyContact(userData.emergencyContact);
    }
  };

  const handleInputChange = (
    field: string,
    value: string,
    section: "personal" | "emergency"
  ) => {
    if (section === "personal") {
      setTempStudentInfo((prev: any) => ({ ...prev, [field]: value }));
    } else {
      setTempEmergencyContact((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const isEditingSection = (section: string) => {
    return isEditing && editingSection === section;
  };

  const displayStudentInfo = isEditing ? tempStudentInfo : studentInfo;
  const displayEmergencyContact = isEditing
    ? tempEmergencyContact
    : emergencyContact;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Student Profile</h1>
            <p className="text-white/80 text-sm mt-0.5">
              Manage your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-to-r from-white to-gray-50/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-3 shadow-sm">
              <AvatarImage
                src="/placeholder-avatar.jpg"
                alt={displayStudentInfo.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white text-sm">
                {displayStudentInfo.name
                  .split(" ")
                  .map((n: number[]) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={displayStudentInfo.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, "personal")
                  }
                  className="text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 mb-1"
                />
              ) : (
                <h2 className="text-base font-semibold text-gray-900">
                  {displayStudentInfo.name}
                </h2>
              )}
              <p className="text-gray-500 font-medium text-xs">
                ID: {displayStudentInfo.studentId}
              </p>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={displayStudentInfo.major}
                  onChange={(e) =>
                    handleInputChange("major", e.target.value, "personal")
                  }
                  className="text-[#647FBC] font-medium mt-0.5 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-[#647FBC] font-medium mt-0.5 text-sm">
                  {displayStudentInfo.major}
                </p>
              )}
            </div>
          </div>
          {isEditingSection("overview") ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-green-700 hover:bg-green-700 hover:text-white h-8 px-3 text-sm"
                onClick={() => handleSave("overview")}
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
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-8 px-3 text-sm"
              onClick={() => handleEdit("overview")}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
              <GraduationCap className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Current GPA</p>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={displayStudentInfo.gpa}
                  onChange={(e) =>
                    handleInputChange("gpa", e.target.value, "personal")
                  }
                  className="font-semibold text-gray-900 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-16"
                />
              ) : (
                <p className="font-semibold text-gray-900 text-sm">
                  {displayStudentInfo.gpa}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Credit Hours</p>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={displayStudentInfo.creditHours}
                  onChange={(e) =>
                    handleInputChange("creditHours", e.target.value, "personal")
                  }
                  className="font-semibold text-gray-900 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-16"
                />
              ) : (
                <p className="font-semibold text-gray-900 text-sm">
                  {displayStudentInfo.creditHours}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">
            Personal Information
          </h2>
          {isEditingSection("personal") ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-green-700 hover:bg-green-700 hover:text-white h-8 px-3 text-sm"
                onClick={() => handleSave("personal")}
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
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-8 px-3 text-sm"
              onClick={() => handleEdit("personal")}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Mail className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Email</p>
              {isEditingSection("personal") ? (
                <input
                  type="email"
                  value={displayStudentInfo.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value, "personal")
                  }
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">
                  {displayStudentInfo.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Phone className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Phone</p>
              {isEditingSection("personal") ? (
                <input
                  type="tel"
                  value={displayStudentInfo.phone}
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value, "personal")
                  }
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">
                  {displayStudentInfo.phone}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <MapPin className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Address</p>
              {isEditingSection("personal") ? (
                <textarea
                  value={displayStudentInfo.address}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "personal")
                  }
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 text-xs">
                  {displayStudentInfo.address}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Date of Birth</p>
              {isEditingSection("personal") ? (
                <input
                  type="text"
                  value={displayStudentInfo.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value, "personal")
                  }
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">
                  {displayStudentInfo.dateOfBirth}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">
            Academic Information
          </h2>
          {isEditingSection("academic") ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-green-700 hover:bg-green-700 hover:text-white h-8 px-3 text-sm"
                onClick={() => handleSave("academic")}
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
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-8 px-3 text-sm"
              onClick={() => handleEdit("academic")}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Major</p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={displayStudentInfo.major}
                  onChange={(e) =>
                    handleInputChange("major", e.target.value, "personal")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayStudentInfo.major}
                </p>
              )}
            </div>
            <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Minor</p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={displayStudentInfo.minor}
                  onChange={(e) =>
                    handleInputChange("minor", e.target.value, "personal")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayStudentInfo.minor}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">
                Enrollment Date
              </p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={displayStudentInfo.enrollmentDate}
                  onChange={(e) =>
                    handleInputChange(
                      "enrollmentDate",
                      e.target.value,
                      "personal"
                    )
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayStudentInfo.enrollmentDate}
                </p>
              )}
            </div>
            <div className="p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">
                Expected Graduation
              </p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={displayStudentInfo.expectedGraduation}
                  onChange={(e) =>
                    handleInputChange(
                      "expectedGraduation",
                      e.target.value,
                      "personal"
                    )
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayStudentInfo.expectedGraduation}
                </p>
              )}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">
              Academic Advisor
            </p>
            {isEditingSection("academic") ? (
              <input
                type="text"
                value={displayStudentInfo.advisor}
                onChange={(e) =>
                  handleInputChange("advisor", e.target.value, "personal")
                }
                className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-900 font-semibold text-sm">
                {displayStudentInfo.advisor}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">
            Emergency Contact
          </h2>
          {isEditingSection("emergency") ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-green-700 hover:bg-green-700 hover:text-white h-8 px-3 text-sm"
                onClick={() => handleSave("emergency")}
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
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-8 px-3 text-sm"
              onClick={() => handleEdit("emergency")}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-red-50/50 rounded-lg border border-red-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">
              Contact Person
            </p>
            {isEditingSection("emergency") ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={displayEmergencyContact.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, "emergency")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={displayEmergencyContact.relationship}
                  onChange={(e) =>
                    handleInputChange(
                      "relationship",
                      e.target.value,
                      "emergency"
                    )
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Relationship"
                />
              </div>
            ) : (
              <p className="text-gray-900 font-semibold text-sm">
                {displayEmergencyContact.name} (
                {displayEmergencyContact.relationship})
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Phone</p>
              {isEditingSection("emergency") ? (
                <input
                  type="tel"
                  value={displayEmergencyContact.phone}
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value, "emergency")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayEmergencyContact.phone}
                </p>
              )}
            </div>
            <div className="p-2 bg-green-50/50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Email</p>
              {isEditingSection("emergency") ? (
                <input
                  type="email"
                  value={displayEmergencyContact.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value, "emergency")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {displayEmergencyContact.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements (Read-only) */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {achievements.length > 0 ? (
            achievements.map((achievement: any, index: any) => (
              <div
                key={index}
                className="flex items-center p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#647FBC] to-[#5a73b3] rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">🏆</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {achievement.title}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {achievement.semester ||
                      achievement.date ||
                      achievement.year}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No achievements yet</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
