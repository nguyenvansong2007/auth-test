import { useState, useEffect } from "react"
import {
  Settings,
  Users,
  Building,
  FileText,
  BookOpen,
  Grid,
  HelpCircle,
  ChevronDown,
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Home,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react"
import UserService from "../../services/userService"
const MobileNav = () => {
  return (
    <>
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        <button className="flex flex-col items-center text-blue-600">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Projects</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">Calendar</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FileText className="h-6 w-6" />
          <span className="text-xs mt-1">Documents</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Team</span>
        </button>
      </div>
    </>
  );
};

export default MobileNav;
