import Banner from "@/components/shared/Banner";
import { documentAPI } from "@/services";
import { AlertCircle, CheckCircle, Clock, Download, Eye, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { DocumentModal } from "./DocumentModal";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Document {
  name: string;
  description: string;
  status?: string;
  uploadDate?: string | null;
  size?: string | null;
  type?: string;
  issueDate?: string;
}

export function StudentDocuments() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [requiredDocuments, setRequiredDocuments] = useState<Document[]>([]);
  const [certificates, setCertificates] = useState<Document[]>([]);
  const [recentActivity, setRecentActivity] = useState<
    Array<{ action: string; document: string; date: string }>
  >([]);

  // Fetch documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await documentAPI.getAll();

        if (data.requiredDocuments) {
          setRequiredDocuments(data.requiredDocuments);
        }
        if (data.certificates) {
          setCertificates(data.certificates);
        }
        if (data.recentActivity) {
          setRecentActivity(data.recentActivity);
        }
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        // Set fallback data if API fails
        setRequiredDocuments([
          {
            name: "Academic Transcript",
            description: "Official transcript for current semester",
            status: "available",
            uploadDate: "Aug 15, 2025",
            size: "2.3 MB",
          },
          {
            name: "Fee Receipt",
            description: "Payment receipt for tuition fees",
            status: "available",
            uploadDate: "Sep 10, 2025",
            size: "1.1 MB",
          },
          {
            name: "ID Card Copy",
            description: "Student identification card",
            status: "available",
            uploadDate: "Aug 10, 2025",
            size: "0.8 MB",
          },
          {
            name: "Medical Certificate",
            description: "Health clearance certificate",
            status: "pending",
            uploadDate: null,
            size: null,
          },
          {
            name: "Course Registration",
            description: "Semester course registration form",
            status: "available",
            uploadDate: "Aug 20, 2025",
            size: "1.5 MB",
          },
        ]);
        setCertificates([
          {
            name: "Dean's List Certificate",
            description: "Academic excellence recognition",
            issueDate: "May 2025",
            type: "Achievement",
          },
          {
            name: "Scholarship Award",
            description: "Merit-based scholarship certificate",
            issueDate: "Aug 2025",
            type: "Financial Aid",
          },
          {
            name: "Course Completion",
            description: "Python Programming Certificate",
            issueDate: "Jul 2025",
            type: "Course",
          },
        ]);
        setRecentActivity([
          { action: "Downloaded", document: "Academic Transcript", date: "2 hours ago" },
          { action: "Uploaded", document: "Fee Receipt", date: "1 day ago" },
          { action: "Viewed", document: "Course Registration", date: "3 days ago" },
          { action: "Downloaded", document: "ID Card Copy", date: "1 week ago" },
        ]);
      }
    };

    loadDocuments();
  }, []);

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const getStatusIcon = (status: string | undefined) => {
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

  // Dynamic summary cards based on fetched data
  const summaryCards = [
    {
      label: "Available",
      value: String(requiredDocuments.filter((doc) => doc.status === "available").length),
      subtext: "Ready to download",
      icon: CheckCircle,
      containerClass: "border-emerald-100 bg-emerald-50",
      labelClass: "text-emerald-700",
      iconClass: "text-emerald-700",
    },
    {
      label: "Pending",
      value: String(requiredDocuments.filter((doc) => doc.status === "pending").length),
      subtext: "Awaiting upload",
      icon: Clock,
      containerClass: "border-amber-100 bg-amber-50",
      labelClass: "text-amber-700",
      iconClass: "text-amber-700",
    },
    {
      label: "Certificates",
      value: String(certificates.length),
      subtext: "On file",
      icon: FileText,
      containerClass: "border-sky-100 bg-sky-50",
      labelClass: "text-sky-700",
      iconClass: "text-sky-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Banner
        title="Documents"
        subtitle="Manage your academic documents and certificates."
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className={`p-5 text-center ${card.containerClass} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold uppercase tracking-wide ${card.labelClass}`}>
                  {card.label}
                </p>
                <Icon className={`h-4 w-4 ${card.iconClass}`} />
              </div>
              <div>
                <p className={`mt-3 text-3xl font-semibold ${card.iconClass}`}>{card.value}</p>
                <p className="text-xs text-slate-600">{card.subtext}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Required Documents */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Required Documents</h2>
        <div className="space-y-2">
          {requiredDocuments.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white"
                      onClick={() => handleViewDocument(doc)} // Add this onClick
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#647FBC] to-[#5a73b3] hover:from-[#5a73b3] hover:to-[#4d6aa3] text-white h-6 text-xs px-2"
                  >
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
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Certificates & Awards</h2>
        <div className="space-y-2">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow"
            >
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
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white"
                  onClick={() => handleViewDocument(cert)} // Add this onClick
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-6 w-6 border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-3 text-[#647FBC]">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
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

      {/* Add the Modal at the end */}
      <DocumentModal isOpen={isModalOpen} onClose={handleCloseModal} document={selectedDocument} />

      {/* Upload New Document */}
      <Card className="border-2 border-dashed border-[#647FBC] bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
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
