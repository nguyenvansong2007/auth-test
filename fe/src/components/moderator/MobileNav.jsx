import React from "react";
import { Home, AlertCircle, FileCheck, Users, Settings } from "lucide-react";

const MobileNav = () => {
  return (
    <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
      <button className="flex flex-col items-center text-blue-600">
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <AlertCircle className="h-6 w-6" />
        <span className="text-xs mt-1">Reports</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <FileCheck className="h-6 w-6" />
        <span className="text-xs mt-1">Approvals</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Users</span>
      </button>
      <button className="flex flex-col items-center text-gray-500">
        <Settings className="h-6 w-6" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default MobileNav;
