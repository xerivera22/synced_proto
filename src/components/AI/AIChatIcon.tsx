// AIChatIcon.tsx
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
      {/* Main icon */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-active:scale-95 flex items-center justify-center border-2 border-slate-600">
        {/* School cap outline */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-2 bg-slate-500 rounded-t-lg"></div>
        </div>

        {/* AI badge */}
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
          <span className="text-white text-xs font-bold">AI</span>
        </div>

        {/* Message icon */}
        <MessageSquare className="w-7 h-7 text-slate-200" />

        {/* Academic cap in corner */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700">
          <GraduationCap className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* Pulsing ring */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-ping"></div>

      {/* Notification */}
      {hasNotification && (
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-500 items-center justify-center">
              <span className="text-xs font-bold text-white">!</span>
            </span>
          </span>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute right-20 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>SyncEd</span>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2">
          <div className="w-2 h-2 bg-slate-800 rotate-45"></div>
        </div>
      </div>
    </button>
  );
};

export default AIChatIcon;
