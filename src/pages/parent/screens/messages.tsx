import Banner from "@/components/shared/Banner";
import { getParentPortalDate } from "../utils/date";

const conversations = [
  {
    id: "conversation-1",
    subject: "Upcoming parent-teacher conference",
    sender: "Ms. Patel",
    timestamp: "Yesterday",
    preview: "Hi Jordan, I wanted to confirm our meeting...",
  },
  {
    id: "conversation-2",
    subject: "Attendance update",
    sender: "Attendance Office",
    timestamp: "Aug 24",
    preview: "Avery was marked excused for the doctor's visit...",
  },
  {
    id: "conversation-3",
    subject: "Field trip permission slip",
    sender: "Mr. Peters",
    timestamp: "Aug 20",
    preview: "Please return the signed form by Friday...",
  },
];

const ParentMessages = () => {
  const dateLabel = getParentPortalDate();

  return (
    <div className="space-y-6">
      <Banner
        title="Messages"
        subtitle="Stay in touch with teachers, staff, and administrators."
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              Compose
            </button>
            <button
              type="button"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 md:text-sm"
            >
              Mark all read
            </button>
            <p className="hidden text-white/80 text-xs md:block md:text-sm whitespace-nowrap">
              {dateLabel}
            </p>
          </div>
        }
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <article
              key={conversation.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-100 p-4 hover:border-slate-200"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-slate-900">{conversation.subject}</p>
                <span className="text-xs font-medium text-slate-400">{conversation.timestamp}</span>
              </div>
              <p className="text-xs font-medium text-slate-500">From {conversation.sender}</p>
              <p className="text-sm text-slate-500">{conversation.preview}</p>
              <div className="flex gap-3 text-xs font-medium">
                <button type="button" className="text-slate-600 transition hover:text-slate-900">
                  Open thread
                </button>
                <button type="button" className="text-slate-600 transition hover:text-slate-900">
                  Archive
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParentMessages;
