// AIWindow.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  GraduationCap,
  User,
  Clock,
  BookOpen,
  Calendar,
  FileText,
  HelpCircle,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIWindow: React.FC<AIWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your School AI Assistant. I can help with timetables, grades, assignments, and more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const schoolQuickActions = [
    { icon: BookOpen, text: "Check timetable", color: "text-blue-500" },
    { icon: FileText, text: "View grades", color: "text-emerald-500" },
    { icon: Calendar, text: "Upcoming exams", color: "text-amber-500" },
    { icon: HelpCircle, text: "School policies", color: "text-purple-500" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response with school-related messages
    const schoolResponses = [
      "I'll help you with that school-related query! The full AI integration for the school management system is coming soon.",
      "That's a great question about school management. This feature will be fully integrated in the next update.",
      "I can assist with that! The AI capabilities for our school system are being enhanced and will be available shortly.",
      "Thank you for your inquiry. Our school AI assistant is learning and will be fully operational soon!",
    ];

    setTimeout(() => {
      const randomResponse =
        schoolResponses[Math.floor(Math.random() * schoolResponses.length)];
      const aiResponse: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickAction = (actionText: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: actionText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: `I understand you want information about ${actionText.toLowerCase()}. This feature is part of our upcoming school management AI integration.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Window */}
      <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg">School AI Assistant</h3>
              <p className="text-xs text-slate-300">Powered by SchoolSync AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-3 bg-slate-800/5 border-b border-slate-200">
          <p className="text-xs text-slate-500 mb-2 font-medium">
            Quick actions:
          </p>
          <div className="flex flex-wrap gap-2">
            {schoolQuickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.text)}
                className="flex items-center gap-2 px-3 py-2 bg-white text-slate-700 text-sm rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <action.icon className={`w-4 h-4 ${action.color}`} />
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-br-none"
                    : "bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.sender === "ai" ? (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-xs font-semibold">
                    {message.sender === "ai" ? "School AI" : "Student"}
                  </span>
                  <Clock className="w-3 h-3 ml-auto text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-semibold">School AI</span>
                </div>
                <div className="flex space-x-1 pl-8">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-300 bg-gradient-to-r from-slate-50 to-white p-4">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about timetables, grades, assignments..."
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none bg-white placeholder:text-slate-400"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`px-4 rounded-xl flex items-center justify-center transition-all ${
                inputText.trim() && !isLoading
                  ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:shadow-lg hover:scale-105"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-slate-500">
              SchoolSync AI • Coming Soon
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-600">Learning mode</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIWindow;
