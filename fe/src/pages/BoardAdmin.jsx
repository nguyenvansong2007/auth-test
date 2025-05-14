"use client";

import { useState } from "react";
import { Settings, Users, Grid } from "lucide-react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import DashboardContent from "../components/admin/DashboardContent";
import MembersContent from "../components/admin/MembersContent";
import CompaniesContent from "../components/admin/CompaniesContent";
import RolesContent from "../components/admin/RolesContent";
import TemplatesContent from "../components/admin/TemplatesContent";
import LibraryContent from "../components/admin/LibraryContent";
import AppsContent from "../components/admin/AppsContent";
import ProductsContent from "../components/admin/ProductsContent";
import IntegrationsContent from "../components/admin/IntegrationsContent";
import SettingsContent from "../components/admin/SettingsContent";
import Bim360Content from "../components/admin/Bim360Content";

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
          {activeTab === "roles" && <RolesContent />}
          {activeTab === "templates" && <TemplatesContent />}
          {activeTab === "library" && <LibraryContent />}
          {activeTab === "apps" && <AppsContent />}
          {activeTab === "products" && <ProductsContent />}
          {activeTab === "integrations" && <IntegrationsContent />}
          {activeTab === "settings" && <SettingsContent />}
          {activeTab === "bim360" && <Bim360Content />}
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        <button
          className={`flex flex-col items-center ${
            activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("dashboard")}
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "members" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("members")}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Members</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "settings" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("settings")}
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BoardAdmin;
