import Banner from "@/components/shared/Banner";
import { announcementService } from "@/services/announcementService";
import { eventService } from "@/services/eventService";
import {
    Calendar,
    Filter,
    Megaphone,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminPortalDate } from "../utils/date";

// Event interface
interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  audience: string;
  status: string;
}

// Announcement interface
interface Announcement {
  _id: string;
  id: string;
  title: string;
  content: string;
  target: string;
  scheduledFor: string;
  status: string;
  createdBy: string;
  authorRole: string;
  authorName: string;
}

// Create Event Modal
const CreateEventModal = ({
  onClose,
  onSubmit,
  initialData,
}: {
  onClose: () => void;
  onSubmit: (data: Omit<Event, "id" | "status">) => void;
  initialData?: Event | null;
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date?.split("T")[0] || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [audience, setAudience] = useState(initialData?.audience || "all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, date, description, audience });
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
          {initialData ? "Edit Event" : "Create New Event"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="eventTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Event Title
            </label>
            <input
              type="text"
              id="eventTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="eventDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="eventDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              rows={4}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="eventAudience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Audience
            </label>
            <select
              id="eventAudience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
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
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#647FBC] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a73b3]"
            >
              {initialData ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Create Announcement Modal
const CreateAnnouncementModal = ({
  onClose,
  onSubmit,
  initialData,
}: {
  onClose: () => void;
  onSubmit: (data: Omit<Announcement, "_id">) => void;
  initialData?: Announcement | null;
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [scheduledFor, setScheduledFor] = useState(
    initialData?.scheduledFor?.split("T")[0] || ""
  );
  const [target, setTarget] = useState(initialData?.target || "all");
  const [status, setStatus] = useState(initialData?.status || "Draft");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = initialData?.id || `announcement-${Date.now()}`;
    onSubmit({ 
      id, 
      title, 
      content,
      target, 
      scheduledFor, 
      status,
      createdBy: "",
      authorRole: "admin",
      authorName: "Admin"
    });
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
          {initialData ? "Edit Announcement" : "New Announcement"}
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
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="announcementContent"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="announcementContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              rows={3}
              placeholder="Announcement details..."
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="announcementScheduledFor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Scheduled For
              </label>
              <input
                type="date"
                id="announcementScheduledFor"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
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
                className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
              >
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="announcementTarget"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Target Audience
            </label>
            <select
              id="announcementTarget"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] focus:bg-white"
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
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#647FBC] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a73b3]"
            >
              {initialData ? "Update" : "Create"} Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Events = () => {
  const dateLabel = getAdminPortalDate();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [announcementSearchTerm, setAnnouncementSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [announcementFilter, setAnnouncementFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  const handleCreateEvent = async (eventData: Omit<Event, "id" | "status">) => {
    try {
      if (editingEvent) {
        const updated = await eventService.updateEvent(editingEvent.id, eventData);
        setEvents(events.map((e) => (e.id === editingEvent.id ? updated : e)));
        toast.success("Event updated successfully");
      } else {
        const newEvent = await eventService.createEvent(eventData);
        setEvents([...events, newEvent]);
        toast.success("Event created successfully");
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error("Failed to save event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
    }
  };

  const handleCreateAnnouncement = async (data: Omit<Announcement, "_id">) => {
    try {
      if (editingAnnouncement) {
        const updated = await announcementService.updateAnnouncement(
          editingAnnouncement._id,
          data
        );
        setAnnouncements(
          announcements.map((a) =>
            a._id === editingAnnouncement._id ? updated : a
          )
        );
        toast.success("Announcement updated successfully");
      } else {
        const newAnnouncement =
          await announcementService.createAnnouncement(data);
        setAnnouncements([...announcements, newAnnouncement]);
        toast.success("Announcement created successfully");
      }
      setIsAnnouncementModalOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      console.error("Failed to save announcement:", error);
      toast.error("Failed to save announcement");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    try {
      await announcementService.deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a._id !== id));
      toast.success("Announcement deleted successfully");
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      toast.error("Failed to delete announcement");
    }
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(eventSearchTerm.toLowerCase());
    const matchesFilter =
      eventFilter === "all" || event.audience === eventFilter;
    return matchesSearch && matchesFilter;
  });

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title
      .toLowerCase()
      .includes(announcementSearchTerm.toLowerCase());
    const matchesFilter =
      announcementFilter === "all" || announcement.target === announcementFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Banner
        title="Events & Schedule"
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
        subtitle="Manage school-wide events and announcements in one place."
      />

      {/* Events Table Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#647FBC]/10">
              <Calendar className="h-5 w-5 text-[#647FBC]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Events</h2>
              <p className="text-sm text-gray-600">
                {filteredEvents.length} event
                {filteredEvents.length !== 1 ? "s" : ""} scheduled
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setIsEventModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#647FBC] hover:bg-[#5a73b3] rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>

        {/* Event Search and Filter */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search events..."
                value={eventSearchTerm}
                onChange={(e) => setEventSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC]"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] appearance-none bg-white"
              >
                <option value="all">All Audiences</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="parents">Parents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Audience</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {event.title}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {event.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 capitalize">
                      {event.audience}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${event.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(event);
                          setIsEventModalOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-[#647FBC] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEvents.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No events found.
            </div>
          )}
        </div>
      </section>

      {/* Announcements Table Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Megaphone className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Announcements
              </h2>
              <p className="text-sm text-gray-600">
                {filteredAnnouncements.length} announcement
                {filteredAnnouncements.length !== 1 ? "s" : ""} in queue
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingAnnouncement(null);
              setIsAnnouncementModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#647FBC] hover:bg-[#5a73b3] rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Announcement
          </button>
        </div>

        {/* Announcement Search and Filter */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search announcements..."
                value={announcementSearchTerm}
                onChange={(e) => setAnnouncementSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC]"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={announcementFilter}
                onChange={(e) => setAnnouncementFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647FBC] focus:border-[#647FBC] appearance-none bg-white"
              >
                <option value="all">All Targets</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="parents">Parents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcements Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Scheduled For</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAnnouncements.map((announcement) => (
                <tr
                  key={announcement._id}
                  className="bg-white hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {announcement.title}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(announcement.scheduledFor).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 capitalize">
                      {announcement.target}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${announcement.status === "Scheduled"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                        }`}
                    >
                      {announcement.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingAnnouncement(announcement);
                          setIsAnnouncementModalOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-[#647FBC] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteAnnouncement(announcement._id)
                        }
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAnnouncements.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No announcements found.
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {isEventModalOpen && (
        <CreateEventModal
          onClose={() => {
            setIsEventModalOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={handleCreateEvent}
          initialData={editingEvent}
        />
      )}

      {/* Announcement Modal */}
      {isAnnouncementModalOpen && (
        <CreateAnnouncementModal
          onClose={() => {
            setIsAnnouncementModalOpen(false);
            setEditingAnnouncement(null);
          }}
          onSubmit={handleCreateAnnouncement}
          initialData={editingAnnouncement}
        />
      )}
    </div>
  );
};

export default Events;
