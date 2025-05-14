import React, { useState } from "react";
import {
  Settings,
  Users,
  Building,
  UserCheck,
  FileText,
  BookOpen,
  Grid,
  Package,
  LinkIcon,
  HelpCircle,
  ChevronDown,
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Mail,
} from "lucide-react";

const ActionBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex space-x-2">
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            <UserPlus className="h-5 w-5 mr-2" />
            Add User
          </button>
          <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
