import React from "react";
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
const Notifications = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start p-3 bg-blue-50 rounded-md">
            <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-800">
                Your trial will expire in 2 days
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Upgrade now to continue using all features
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 rounded-md">
            <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-800">
                New comment on "Foundation Plan"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                John commented: "Looks good, approved!"
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 rounded-md">
            <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-800">Document updated</p>
              <p className="text-xs text-gray-500 mt-1">
                Sarah updated "Site Plan v2.3"
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
