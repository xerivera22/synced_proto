import React from "react";
import { MessageSquare, GraduationCap } from "lucide-react";

interface AIChatIconProps {
  onClick: () => void;
  hasNotification?: boolean;
}

const AIChatIcon: React.FC<AIChatIconProps> = ({
  onClick,
  hasNotification = true,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-20 z-50 group"
      aria-label="Open School AI Assistant"
    >
      {/* Main icon container */}
      <div className="relative w-14 h-14 bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-slate-700">
        {/* Message icon */}
        <MessageSquare className="w-6 h-6 text-white" />

        {/* AI badge */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-slate-800">
          <span className="text-white text-xs font-bold">AI</span>
        </div>

        {/* Notification dot */}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-800"></div>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>SyncEd Assistant</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AIChatIcon;
