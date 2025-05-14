import { Building, Calendar } from "lucide-react";

const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Progress Meeting",
      date: "Tomorrow, 10:00 AM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Site Inspection",
      date: "May 12, 2023, 9:00 AM",
      location: "Construction Site",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "May 15, 2023, 2:00 PM",
      location: "Main Office",
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Upcoming Events</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <h3 className="font-medium text-gray-800">{event.title}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {event.date}
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Building className="h-4 w-4 mr-1" />
                {event.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
