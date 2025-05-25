import { useState } from "react";
import Sidebar from "../components/moderator/Sidebar";
import MembersContent from "../components/admin/MembersContent";
import Dashboard from "../components/moderator/Dashboard";
import Approvals from "../components/moderator/Approvals";
import Settings from "../components/moderator/Settings";
import ProjectManagement from "../components/admin/ProjectsContent"

import { Cog, Users, FileCheck, Home, ClipboardMinus } from "lucide-react";

const BoardModerator = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSidebarItemClick = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSidebarItemClick={handleSidebarItemClick}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "projects" && <ProjectManagement/>}
          {activeTab === "Approvals" && <Approvals />}
          {activeTab === "users" && <MembersContent />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>

      {/* Mobile navigation */}
      {/* <MobileNav /> */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        <button
          className={`flex flex-col items-center ${
            activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("dashboard")}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Bảng điều khiển</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "reports" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("reports")}
        >
          <ClipboardMinus className="h-6 w-6" />
          <span className="text-xs mt-1">Báo cáo</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "approvals" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("approvals")}
        >
          <FileCheck className="h-6 w-6" />
          <span className="text-xs mt-1">Phê duyệt</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "users" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("users")}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Quản lý thành viên</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "settings" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("settings")}
        >
          <Cog className="h-6 w-6" />
          <span className="text-xs mt-1">Cài đặt</span>
        </button>
      </div>
    </div>
  );
};

export default BoardModerator;
