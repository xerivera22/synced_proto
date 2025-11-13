import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Download, Eye, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

export function StudentDocuments() {
  const requiredDocuments = [
    { 
      name: "Academic Transcript", 
      description: "Official transcript for current semester",
      status: "available", 
      uploadDate: "Aug 15, 2025",
      size: "2.3 MB"
    },
    { 
      name: "Fee Receipt", 
      description: "Payment receipt for tuition fees",
      status: "available", 
      uploadDate: "Sep 10, 2025",
      size: "1.1 MB"
    },
    { 
      name: "ID Card Copy", 
      description: "Student identification card",
      status: "available", 
      uploadDate: "Aug 10, 2025",
      size: "0.8 MB"
    },
    { 
      name: "Medical Certificate", 
      description: "Health clearance certificate",
      status: "pending", 
      uploadDate: null,
      size: null
    },
    { 
      name: "Course Registration", 
      description: "Semester course registration form",
      status: "available", 
      uploadDate: "Aug 20, 2025",
      size: "1.5 MB"
    },
  ];

  const certificates = [
    { 
      name: "Dean's List Certificate", 
      description: "Academic excellence recognition",
      issueDate: "May 2025",
      type: "Achievement"
    },
    { 
      name: "Scholarship Award", 
      description: "Merit-based scholarship certificate",
      issueDate: "Aug 2025",
      type: "Financial Aid"
    },
    { 
      name: "Course Completion", 
      description: "Python Programming Certificate",
      issueDate: "Jul 2025",
      type: "Course"
    },
  ];

  const recentActivity = [
    { action: "Downloaded", document: "Academic Transcript", date: "2 hours ago" },
    { action: "Uploaded", document: "Fee Receipt", date: "1 day ago" },
    { action: "Viewed", document: "Course Registration", date: "3 days ago" },
    { action: "Downloaded", document: "ID Card Copy", date: "1 week ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  // Removed unused getStatusColor helper (was not referenced)

  return (
    <div className="space-y-3">
      {/* Header (standardized height and spacing like Overview) */}
      <div className="bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm">
        <div className="h-full flex items-center px-3 md:px-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Student Documents</h1>
            <p className="text-white/80 text-sm mt-0.5">Manage your academic documents</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1">
            <CheckCircle className="w-3 h-3 text-green-600" />
          </div>
          <p className="text-sm font-bold text-green-600">4</p>
          <p className="text-xs text-gray-600">Available</p>
        </Card>
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-1">
            <Clock className="w-3 h-3 text-orange-600" />
          </div>
          <p className="text-sm font-bold text-orange-600">1</p>
          <p className="text-xs text-gray-600">Pending</p>
        </Card>
        <Card className="p-3 text-center shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="w-6 h-6 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-1">
            <FileText className="w-3 h-3 text-[#647FBC]" />
          </div>
          <p className="text-sm font-bold text-[#647FBC]">3</p>
          <p className="text-xs text-gray-600">Certificates</p>
        </Card>
      </div>

      {/* Required Documents */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Required Documents</h2>
        <div className="space-y-2">
          {requiredDocuments.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center mr-3 shadow-sm">
                  {getStatusIcon(doc.status)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-600">{doc.description}</p>
                  {doc.uploadDate && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Uploaded: {doc.uploadDate} • {doc.size}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {doc.status === "available" ? (
                  <>
                    <Button size="sm" variant="outline" className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white">
                      <Download className="w-3 h-3" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="bg-gradient-to-r from-[#647FBC] to-[#5a73b3] hover:from-[#5a73b3] hover:to-[#4d6aa3] text-white h-6 text-xs px-2">
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certificates & Awards */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Certificates & Awards</h2>
        <div className="space-y-2">
          {certificates.map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow">
              <div className="flex items-center">
                <div className="w-7 h-7 bg-gradient-to-br from-[#647FBC] to-[#5a73b3] rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.description}</p>
                  <p className="text-xs text-[#647FBC] font-medium mt-0.5">
                    {cert.type} • Issued: {cert.issueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button size="sm" variant="outline" className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white">
                  <Eye className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-3 shadow-sm border-0">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-[#647FBC] to-[#5a73b3] rounded-full flex items-center justify-center mr-3">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">
                  <span className="font-semibold">{activity.action}</span> {activity.document}
                </p>
                <p className="text-xs text-gray-600">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upload New Document */}
      <Card className="p-3 border-dashed border-2 border-[#647FBC] bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
        <div className="text-center">
          <div className="w-10 h-10 bg-[#647FBC]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5 text-[#647FBC]" />
          </div>
          <h3 className="text-sm font-semibold text-[#647FBC] mb-1">Upload New Document</h3>
          <p className="text-gray-600 mb-3 text-xs">
            Upload additional documents or updated versions
          </p>
          <Button className="bg-gradient-to-r from-[#647FBC] to-[#5a73b3] hover:from-[#5a73b3] hover:to-[#4d6aa3] text-white px-4 py-1 shadow-sm text-xs h-7">
            Choose File
          </Button>
        </div>
      </Card>
    </div>
  );
}