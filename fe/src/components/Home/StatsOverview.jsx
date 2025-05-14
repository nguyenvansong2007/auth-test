import { Clock, CheckCircle, AlertCircle, Folder } from "lucide-react";

const StatsOverview = () => {
  const projectStats = [
    {
      name: "Active Projects",
      count: 5,
      icon: <Folder className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      name: "Tasks Due Today",
      count: 8,
      icon: <Clock className="h-5 w-5" />,
      color: "bg-amber-500",
    },
    {
      name: "Completed Tasks",
      count: 24,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      name: "Pending Issues",
      count: 3,
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {projectStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center"
          >
            <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-800">
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
