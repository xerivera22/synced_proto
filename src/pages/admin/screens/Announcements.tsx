
import Banner from "@/components/shared/Banner";
import { useEffect, useState } from "react";
import { announcementService } from "@/services/announcementService";

interface Announcement {
  _id: string;
  title: string;
  date: string;
  audience: string;
  status: string;
}

const AddAnnouncementModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Omit<Announcement, "_id">) => void;
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [audience, setAudience] = useState("all");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, date, audience, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-slate-900 mb-6">
          New Announcement
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="announcementTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="announcementTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-purple-500 focus:bg-white"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="announcementDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="announcementDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-purple-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="announcementStatus"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="announcementStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-purple-500 focus:bg-white"
              >
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="announcementAudience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Audience
            </label>
            <select
              id="announcementAudience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-purple-500 focus:bg-white"
            >
              <option value="all">All</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
              <option value="parents">Parents</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-purple-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-purple-600"
            >
              Create Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Announcements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    announcementService.getAnnouncements().then(setAnnouncements).catch(error => console.error("Failed to fetch announcements:", error));
  }, []);

  const handleNewAnnouncement = async (data: Omit<Announcement, "_id">) => {
    try {
      const newAnnouncement = await announcementService.createAnnouncement(data);
      setAnnouncements([...announcements, newAnnouncement]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create announcement:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Announcements"
        subtitle="Draft, schedule, and monitor communications for the school community."
      />

      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-purple-900">Communication queue</h2>
            <p className="text-sm text-purple-700/80">
              Draft, schedule, and monitor communications for the school community.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-50"
          >
            New announcement
          </button>
        </header>
        <div className="mt-6 divide-y divide-purple-100/60">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-semibold text-purple-900">{announcement.title}</p>
                <p className="text-xs text-slate-500">
                  Scheduled for {new Date(announcement.date).toLocaleDateString()} &bull; Audience: {announcement.audience}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${announcement.status === "Scheduled"
                      ? "bg-sky-100 text-sky-800"
                      : "bg-amber-100 text-amber-800"
                    }`}>{announcement.status}</span>
              </div>
            </div>
          ))}
           {announcements.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No announcements found.
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <AddAnnouncementModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewAnnouncement}
        />
      )}
    </div>
  );
};

export default Announcements;
