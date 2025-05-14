import React from "react";
import {
  Settings,
  Users,
  AlertCircle,
  FileCheck,
  Shield,
  Home,
} from "lucide-react";

const Sidebar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "reports", label: "Reports", icon: AlertCircle },
    { id: "approvals", label: "Approvals", icon: FileCheck },
    { id: "users", label: "Users Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div>
      <aside className="w-64 border-r border-gray-200 hidden md:block">
        <nav className="p-4 space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center cursor-pointer ${
                  activeTab === tab.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{tab.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
