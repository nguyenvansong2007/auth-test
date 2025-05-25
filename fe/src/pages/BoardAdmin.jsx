import { useState } from "react";
import { Settings, Users, Grid, Building, Package } from "lucide-react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import DashboardContent from "../components/admin/DashboardContent";
import MembersContent from "../components/admin/MembersContent";
import CompaniesContent from "../components/admin/CompaniesContent";
import TemplatesContent from "../components/admin/TemplatesContent";
import SettingsContent from "../components/admin/SettingsContent";
import ProjectsContent from "../components/admin/ProjectsContent";
const BoardAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSidebarItemClick = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarAdmin
          activeTab={activeTab}
          onSidebarItemClick={handleSidebarItemClick}
        />

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "members" && <MembersContent />}
          {activeTab === "companies" && <CompaniesContent />}
          {activeTab === "projects" && <ProjectsContent />}
          {activeTab === "templates" && <TemplatesContent />}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>

      {/* <MobileNav /> */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        <button
          className={`flex flex-col items-center ${
            activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("dashboard")}
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Bảng điều khiển</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "members" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("members")}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Quản lý tài khoản</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "companies" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("companies")}
        >
          <Building className="h-6 w-6" />
          <span className="text-xs mt-1">công ty</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "templates" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("templates")}
        >
          <Package className="h-6 w-6" />
          <span className="text-xs mt-1">Mẫu dự án</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "settings" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("settings")}
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Cài đặt</span>
        </button>
      </div>
    </div>
  );
};

export default BoardAdmin;
