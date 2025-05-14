import {
  Users,
  Building,
  FileText,
  Grid,
  Plus,
  Calendar,
  Clock,
  BarChart2,
  PieChart,
  CheckCircle,
  AlertCircle,
  Bell,
  Home,
  Folder,
  MessageSquare,
  Search,
  MoreHorizontal,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
        <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
          <Calendar className="h-5 w-5 mr-2" />
          Schedule Meeting
        </button>
        <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
          <MessageSquare className="h-5 w-5 mr-2" />
          Send Message
        </button>
        <div className="relative ml-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
