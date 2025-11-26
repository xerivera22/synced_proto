import Banner from "@/components/shared/Banner";
import { useState, useEffect } from "react";
import { eventService } from "@/services/eventService";

// Define the type for an event
interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  audience: string;
  status: string;
}

const CreateEventModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Omit<Event, 'id' | 'status'>) => void;
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("all");

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
          Create New Event
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
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-sky-500 focus:bg-white"
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
              onChange={(e) => setDate(e.target..value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-sky-500 focus:bg-white"
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
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-sky-500 focus:bg-white"
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
              className="w-full p-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-sky-500 focus:bg-white"
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
              className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData: Omit<Event, 'id' | 'status'>) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Events & Schedule"
        subtitle="Coordinate school-wide events, faculty sessions, and parent activities."
      />

      <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Upcoming calendar
            </h2>
            <p className="text-sm text-slate-600">
              Track planning status and ensure the right groups are informed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
          >
            Create New Event
          </button>
        </header>

        <div className="mt-6 space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                <p className="mt-2 text-sm text-gray-500">{event.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Audience: {event.audience}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No upcoming events.</p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <CreateEventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default Events;
