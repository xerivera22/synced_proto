import Banner from "@/components/shared/Banner";
import { useState } from "react";

const CreateEventModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: any) => void;
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
              onChange={(e) => setDate(e.target.value)}
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

  const handleCreateEvent = (eventData: any) => {
    console.log("New Event Data:", eventData);
    setIsModalOpen(false);
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
            Create new event (mock)
          </button>
        </header>

        {/* List of events would go here */}
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
