// import { useState, useEffect } from "react"
// import {
//   Settings,
//   Users,
//   Building,
//   FileText,
//   BookOpen,
//   Grid,
//   HelpCircle,
//   ChevronDown,
//   Search,
//   Plus,
//   Calendar,
//   Clock,
//   CheckCircle,
//   Home,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Download,
// } from "lucide-react"
// import UserService from "../../services/userService"
// const MobileNav = () => {

//   return (
//     <>
//       <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
//         <button className="flex flex-col items-center text-blue-600">
//           <Home className="h-6 w-6" />
//           <span className="text-xs mt-1">Home</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <Grid className="h-6 w-6" />
//           <span className="text-xs mt-1">Projects</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <Calendar className="h-6 w-6" />
//           <span className="text-xs mt-1">Calendar</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FileText className="h-6 w-6" />
//           <span className="text-xs mt-1">Documents</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <Users className="h-6 w-6" />
//           <span className="text-xs mt-1">Team</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default MobileNav;



import React from "react";
import {
  Grid,
  Calendar,
  FileText,
  Users,
  Settings,
  ChevronDown,
  Building,
} from "lucide-react";

const MobileNav = ({ activeTab, onTabChange }) => {
  const tabs = [
      { id: "projects", label: "Dự án", icon: Grid },
      { id: "calendar", label: "Lịch", icon: Calendar },
      { id: "documents", label: "Tài liệu", icon: FileText },
      { id: "team", label: "Đội nhóm", icon: Users },
      { id: "companies", label: "Công ty", icon: Building },
      { id: "settings", label: "Cài đặt", icon: Settings },
    ];

  return (
    <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3 fixed bottom-0 left-0 right-0 z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
