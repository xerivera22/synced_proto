import Banner from "@/components/shared/Banner";
import { Check, Eye, FileUp, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { getStudentPortalDate } from "../utils/date";
import { Button } from "./ui/button";

interface RequestedDocument {
  id: string;
  documentName: string;
  requestedBy: string;
  requestDate: string;
  deadline: string;
  status: "pending" | "submitted" | "approved";
  notes?: string;
}

interface SubmittedRequirement {
  id: string;
  documentName: string;
  submittedDate: string;
  fileSize: string;
  status: "under_review" | "approved" | "rejected";
  feedback?: string;
}

export function StudentDocuments() {
  const dateLabel = getStudentPortalDate();

  const [requestedDocs, _setRequestedDocs] = useState<RequestedDocument[]>([
    {
      id: "1",
      documentName: "Birth Certificate",
      requestedBy: "Registrar Office",
      requestDate: "Dec 10, 2025",
      deadline: "Dec 20, 2025",
      status: "pending",
      notes: "Original or certified true copy",
    },
    {
      id: "2",
      documentName: "Medical Certificate",
      requestedBy: "Health Services",
      requestDate: "Dec 8, 2025",
      deadline: "Dec 15, 2025",
      status: "submitted",
    },
    {
      id: "3",
      documentName: "Good Moral Certificate",
      requestedBy: "Guidance Office",
      requestDate: "Dec 5, 2025",
      deadline: "Dec 12, 2025",
      status: "approved",
    },
  ]);

  const [submittedReqs, setSubmittedReqs] = useState<SubmittedRequirement[]>([
    {
      id: "1",
      documentName: "Form 137",
      submittedDate: "Dec 1, 2025",
      fileSize: "2.3 MB",
      status: "approved",
      feedback: "Document verified",
    },
    {
      id: "2",
      documentName: "PSA Birth Certificate",
      submittedDate: "Dec 5, 2025",
      fileSize: "1.8 MB",
      status: "under_review",
    },
    {
      id: "3",
      documentName: "Report Card",
      submittedDate: "Nov 28, 2025",
      fileSize: "3.1 MB",
      status: "rejected",
      feedback: "Image quality too low, please resubmit",
    },
  ]);

  const [isAddingSubmission, setIsAddingSubmission] = useState(false);
  const [newSubmission, setNewSubmission] = useState({
    documentName: "",
    file: null as File | null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const getRequestStatusBadge = (status: RequestedDocument["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
            Pending
          </span>
        );
      case "submitted":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700">
            Submitted
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
            Approved
          </span>
        );
    }
  };

  const getSubmissionStatusBadge = (status: SubmittedRequirement["status"]) => {
    switch (status) {
      case "under_review":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
            Under Review
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-700">
            Rejected
          </span>
        );
    }
  };

  const handleAddSubmission = () => {
    if (!newSubmission.documentName.trim()) return;
    const newDoc: SubmittedRequirement = {
      id: Date.now().toString(),
      documentName: newSubmission.documentName,
      submittedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      fileSize: newSubmission.file
        ? `${(newSubmission.file.size / 1024 / 1024).toFixed(1)} MB`
        : "0 MB",
      status: "under_review",
    };
    setSubmittedReqs([newDoc, ...submittedReqs]);
    setNewSubmission({ documentName: "", file: null });
    setIsAddingSubmission(false);
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmittedReqs(submittedReqs.filter((doc) => doc.id !== id));
  };

  const handleEditSubmission = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveEdit = (id: string) => {
    setSubmittedReqs(
      submittedReqs.map((doc) => (doc.id === id ? { ...doc, documentName: editName } : doc))
    );
    setEditingId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Documents"
        subtitle="Manage your academic documents and requirements."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Requested Documents Table */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-base font-semibold text-slate-900">Requested Documents</h2>
          <p className="text-sm text-slate-500 mt-0.5">Documents requested by the administration</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Document Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requestedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{doc.documentName}</p>
                    {doc.notes && <p className="text-xs text-slate-500 mt-0.5">{doc.notes}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.requestedBy}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.requestDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.deadline}</td>
                  <td className="px-6 py-4">{getRequestStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 text-xs border-[#647FBC] text-[#647FBC] hover:bg-[#647FBC] hover:text-white"
                        disabled={doc.status === "approved"}
                      >
                        <FileUp className="w-3 h-3 mr-1" />
                        Submit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-slate-500 hover:text-[#647FBC]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {requestedDocs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-500 text-sm">No document requests at this time</p>
          </div>
        )}
      </section>

      {/* Submitted Requirements Table */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Submitted Requirements</h2>
            <p className="text-sm text-slate-500 mt-0.5">Documents you have submitted</p>
          </div>
          <Button
            size="sm"
            className="!bg-[#647FBC] hover:!bg-[#5a73b3] !text-white"
            onClick={() => setIsAddingSubmission(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Document
          </Button>
        </div>

        {/* Add New Submission Form */}
        {isAddingSubmission && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Document Name
                </label>
                <input
                  type="text"
                  value={newSubmission.documentName}
                  onChange={(e) =>
                    setNewSubmission({ ...newSubmission, documentName: e.target.value })
                  }
                  placeholder="Enter document name"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]/50 focus:border-[#647FBC]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Upload File
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewSubmission({ ...newSubmission, file: e.target.files?.[0] || null })
                  }
                  className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#647FBC] file:text-white hover:file:bg-[#5a73b3]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-9 px-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleAddSubmission}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-3 border-slate-300"
                  onClick={() => {
                    setIsAddingSubmission(false);
                    setNewSubmission({ documentName: "", file: null });
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Document Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Submitted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  File Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submittedReqs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === doc.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#647FBC]/50"
                        autoFocus
                      />
                    ) : (
                      <>
                        <p className="text-sm font-medium text-slate-900">{doc.documentName}</p>
                        {doc.feedback && (
                          <p
                            className={`text-xs mt-0.5 ${doc.status === "rejected" ? "text-rose-600" : "text-slate-500"}`}
                          >
                            {doc.feedback}
                          </p>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.submittedDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.fileSize}</td>
                  <td className="px-6 py-4">{getSubmissionStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {editingId === doc.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleSaveEdit(doc.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700"
                            onClick={handleCancelEdit}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-500 hover:text-[#647FBC]"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-500 hover:text-[#647FBC]"
                            onClick={() => handleEditSubmission(doc.id, doc.documentName)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600"
                            onClick={() => handleDeleteSubmission(doc.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {submittedReqs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-500 text-sm">No documents submitted yet</p>
          </div>
        )}
      </section>
    </div>
  );
}
