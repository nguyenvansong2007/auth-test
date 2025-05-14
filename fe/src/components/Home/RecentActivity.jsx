const RecentActivity = () => {
  const recentActivities = [
    {
      id: 1,
      title: "Project Update: Construction Sample",
      description: "New documents were added to the project",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      id: 2,
      title: "Task Completed",
      description: "Foundation inspection was completed",
      time: "Yesterday",
      user: "Sarah Johnson",
    },
    {
      id: 3,
      title: "New Comment",
      description: "New comment on blueprint revision",
      time: "Yesterday",
      user: "Mike Smith",
    },
    {
      id: 4,
      title: "Meeting Scheduled",
      description: "Weekly progress meeting scheduled for tomorrow",
      time: "2 days ago",
      user: "Project Manager",
    },
  ];

  return (
    <>
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
              <div className="flex items-center mt-2">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {activity.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentActivity;
