import React, { useState } from "react";
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
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 relative ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`pb-2 relative ${
              activeTab === "activity"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`pb-2 relative ${
              activeTab === "calendar"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
