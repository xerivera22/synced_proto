import { X, Download, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    description: string;
    uploadDate?: string | null;
    size?: string | null;
    type?: string;
    issueDate?: string;
  } | null;
}

export function DocumentModal({ isOpen, onClose, document }: DocumentModalProps) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#647FBC] rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{document.name}</h2>
              <p className="text-xs text-gray-600">{document.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Document Info */}
        <div className="p-4 space-y-3">
          {document.uploadDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Upload Date:</span>
              <span className="font-medium">{document.uploadDate}</span>
            </div>
          )}
          {document.size && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">File Size:</span>
              <span className="font-medium">{document.size}</span>
            </div>
          )}
          {document.issueDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{document.issueDate}</span>
            </div>
          )}
          {document.type && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{document.type}</span>
            </div>
          )}
        </div>

        {/* Preview Area (placeholder) */}
        <div className="p-4 border-t border-b bg-gray-50">
          <div className="aspect-video bg-white border border-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Document Preview</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, or Image files</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>
          <Button className="flex-1 bg-[#647FBC] hover:bg-[#5a73b3] text-white">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
