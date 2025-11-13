import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit } from "lucide-react";

export function Profile() {
  const studentInfo = {
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
  };

  const emergencyContact = {
    name: "Sarah Thompson",
    relationship: "Mother",
    phone: "+1 (555) 987-6543",
    email: "sarah.thompson@email.com",
  };

  // Settings-related sections have been moved to the dedicated Settings page

  const achievements = [
    { title: "Dean's List", semester: "Spring 2025", icon: "🏆" },
    { title: "Programming Contest Winner", date: "March 2025", icon: "🥇" },
    { title: "Scholarship Recipient", year: "2024-2025", icon: "🎓" },
    { title: "Volunteer Service Award", date: "Dec 2024", icon: "🌟" },
  ];

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
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
      <Card className="p-3 shadow-sm border-0 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-3 shadow-sm">
              <AvatarImage src="/placeholder-avatar.jpg" alt={studentInfo.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white text-sm">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{studentInfo.name}</h2>
              <p className="text-gray-500 font-medium text-xs">ID: {studentInfo.studentId}</p>
              <p className="text-[#647FBC] font-medium mt-0.5 text-sm">{studentInfo.major}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2">
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
              <p className="text-xs text-gray-500">Current GPA</p>
              <p className="font-semibold text-gray-900 text-sm">{studentInfo.gpa}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-2">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Credit Hours</p>
              <p className="font-semibold text-gray-900 text-sm">{studentInfo.creditHours}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Personal Information</h2>
          <Button variant="outline" size="sm" className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2">
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
              <p className="text-gray-600 text-xs">{studentInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Phone className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Phone</p>
              <p className="text-gray-600 text-xs">{studentInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <MapPin className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Address</p>
              <p className="text-gray-600 text-xs">{studentInfo.address}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-gray-50/50 rounded-lg">
            <div className="w-6 h-6 bg-[#647FBC]/10 rounded-md flex items-center justify-center mr-3">
              <Calendar className="w-3 h-3 text-[#647FBC]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">Date of Birth</p>
              <p className="text-gray-600 text-xs">{studentInfo.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Academic Information</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Major</p>
              <p className="text-gray-900 font-semibold text-sm">{studentInfo.major}</p>
            </div>
            <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Minor</p>
              <p className="text-gray-900 font-semibold text-sm">{studentInfo.minor}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Enrollment Date</p>
              <p className="text-gray-900 font-semibold text-sm">{studentInfo.enrollmentDate}</p>
            </div>
            <div className="p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <p className="font-medium text-gray-700 mb-0.5 text-xs">Expected Graduation</p>
              <p className="text-gray-900 font-semibold text-sm">{studentInfo.expectedGraduation}</p>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Academic Advisor</p>
            <p className="text-gray-900 font-semibold text-sm">{studentInfo.advisor}</p>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-3 shadow-sm border-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#647FBC]">Emergency Contact</h2>
          <Button variant="outline" size="sm" className="border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white h-6 text-xs px-2">
            <Edit className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-red-50/50 rounded-lg border border-red-100">
            <p className="font-medium text-gray-700 mb-0.5 text-xs">Contact Person</p>
            <p className="text-gray-900 font-semibold text-sm">{emergencyContact.name} ({emergencyContact.relationship})</p>
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

      {/* Achievements */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Recent Achievements</h2>
        <div className="grid grid-cols-1 gap-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow">
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

      {/* Settings moved: Notification/App preferences and action buttons now live under Settings page */}
    </div>
  );
}