import { Calendar, Edit, GraduationCap, Mail, MapPin, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const [studentInfo, setStudentInfo] = useState({
    name: "Alex Thompson",
    studentId: "ST2025001234",
    email: "alex.thompson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, College Town, CT 06001",
    dateOfBirth: "March 15, 2003",
    enrollmentDate: "August 2023",
    expectedGraduation: "May 2027",
    major: "Computer Science",
    minor: "Mathematics",
    advisor: "Dr. Sarah Johnson",
    gpa: "3.8",
    creditHours: "45",
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: "Sarah Thompson",
    relationship: "Mother",
    phone: "+1 (555) 987-6543",
    email: "sarah.thompson@email.com",
  });

  const achievements = [
    { title: "Dean's List", semester: "Spring 2025", icon: "🏆" },
    { title: "Programming Contest Winner", date: "March 2025", icon: "🥇" },
    { title: "Scholarship Recipient", year: "2024-2025", icon: "🎓" },
    { title: "Volunteer Service Award", date: "Dec 2024", icon: "🌟" },
  ];

  const handleEdit = (section: string) => {
    setIsEditing(true);
    setEditingSection(section);
  };

  const handleSave = (section: string) => {
    setIsEditing(false);
    setEditingSection(null);
    // Here you would typically make an API call to save the data
    console.log(`Saving ${section} data:`, section === "personal" ? studentInfo : emergencyContact);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSection(null);
    // Optionally reset form data here if needed
  };

  const handleInputChange = (field: string, value: string, section: "personal" | "emergency") => {
    if (section === "personal") {
      setStudentInfo((prev) => ({ ...prev, [field]: value }));
    } else {
      setEmergencyContact((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isEditingSection = (section: string) => {
    return isEditing && editingSection === section;
  };

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
            <p className="text-white/80 text-sm mt-0.5">Manage your personal information</p>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-to-r from-white to-gray-50/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-3 shadow-sm">
              <AvatarImage src="/placeholder-avatar.jpg" alt={studentInfo.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white text-sm">
                {studentInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value, "personal")}
                  className="text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 mb-1"
                />
              ) : (
                <h2 className="text-base font-semibold text-gray-900">{studentInfo.name}</h2>
              )}
              <p className="text-gray-500 font-medium text-xs">ID: {studentInfo.studentId}</p>
              {isEditingSection("overview") ? (
                <input
                  type="text"
                  value={studentInfo.major}
                  onChange={(e) => handleInputChange("major", e.target.value, "personal")}
                  className="text-[#647FBC] font-medium mt-0.5 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-[#647FBC] font-medium mt-0.5 text-sm">{studentInfo.major}</p>
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
                  value={studentInfo.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value, "personal")}
                  className="font-semibold text-gray-900 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-16"
                />
              ) : (
                <p className="font-semibold text-gray-900 text-sm">{studentInfo.gpa}</p>
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
                  value={studentInfo.creditHours}
                  onChange={(e) => handleInputChange("creditHours", e.target.value, "personal")}
                  className="font-semibold text-gray-900 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-16"
                />
              ) : (
                <p className="font-semibold text-gray-900 text-sm">{studentInfo.creditHours}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Personal Information</h2>
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
                  value={studentInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value, "personal")}
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">{studentInfo.email}</p>
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
                  value={studentInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value, "personal")}
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">{studentInfo.phone}</p>
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
                  value={studentInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value, "personal")}
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 text-xs">{studentInfo.address}</p>
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
                  value={studentInfo.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value, "personal")}
                  className="text-gray-600 text-xs bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-600 text-xs">{studentInfo.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Academic Information</h2>
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
                  value={studentInfo.major}
                  onChange={(e) => handleInputChange("major", e.target.value, "personal")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">{studentInfo.major}</p>
              )}
            </div>
            <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Minor</p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={studentInfo.minor}
                  onChange={(e) => handleInputChange("minor", e.target.value, "personal")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">{studentInfo.minor}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Enrollment Date</p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={studentInfo.enrollmentDate}
                  onChange={(e) => handleInputChange("enrollmentDate", e.target.value, "personal")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">{studentInfo.enrollmentDate}</p>
              )}
            </div>
            <div className="p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Expected Graduation</p>
              {isEditingSection("academic") ? (
                <input
                  type="text"
                  value={studentInfo.expectedGraduation}
                  onChange={(e) =>
                    handleInputChange("expectedGraduation", e.target.value, "personal")
                  }
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">
                  {studentInfo.expectedGraduation}
                </p>
              )}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Academic Advisor</p>
            {isEditingSection("academic") ? (
              <input
                type="text"
                value={studentInfo.advisor}
                onChange={(e) => handleInputChange("advisor", e.target.value, "personal")}
                className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-900 font-semibold text-sm">{studentInfo.advisor}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Emergency Contact</h2>
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
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Contact Person</p>
            {isEditingSection("emergency") ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={emergencyContact.name}
                  onChange={(e) => handleInputChange("name", e.target.value, "emergency")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={emergencyContact.relationship}
                  onChange={(e) => handleInputChange("relationship", e.target.value, "emergency")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Relationship"
                />
              </div>
            ) : (
              <p className="text-gray-900 font-semibold text-sm">
                {emergencyContact.name} ({emergencyContact.relationship})
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Phone</p>
              {isEditingSection("emergency") ? (
                <input
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value, "emergency")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">{emergencyContact.phone}</p>
              )}
            </div>
            <div className="p-2 bg-green-50/50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Email</p>
              {isEditingSection("emergency") ? (
                <input
                  type="email"
                  value={emergencyContact.email}
                  onChange={(e) => handleInputChange("email", e.target.value, "emergency")}
                  className="text-gray-900 font-semibold text-sm bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-sm">{emergencyContact.email}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements (Read-only) */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Recent Achievements</h2>
        <div className="grid grid-cols-1 gap-2">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-[#647FBC] to-[#5a73b3] rounded-full flex items-center justify-center mr-3">
                <span className="text-sm">{achievement.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{achievement.title}</p>
                <p className="text-gray-600 text-xs">
                  {achievement.semester || achievement.date || achievement.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
