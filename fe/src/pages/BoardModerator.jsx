"use client";

import { useState, useEffect } from "react";
import UserService from "../services/userService";
import Sidebar from "../components/moderator/Sidebar";
import MobileNav from "../components/moderator/MobileNav";
import MembersContent from "../components/moderator/MembersContent";
import Dashboard from "../components/moderator/Dashboard";
import Reports from "../components/moderator/Reports";
import Approvals from "../components/moderator/Approvals";
import Settings from "../components/moderator/Settings";

const BoardModerator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const handleSidebarItemClick = (item) => {
    setActiveTab(item);
  };

  useEffect(() => {
    setIsLoading(true);
    UserService.getModeratorBoard()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={handleSidebarItemClick} />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "reports" && <Reports />}
          {activeTab === "Approvals" && <Approvals />}
          {activeTab === "users" && <MembersContent />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </div>
  );
};

export default BoardModerator;
