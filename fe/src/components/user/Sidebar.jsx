import React from "react";
import { Users, FileText, Grid, Cog, BookA } from "lucide-react";

const Sidebar = ({ activeTab, onSidebarItemClick }) => {
  const tabs = [
    // { id: "projects", label: "Dự án", icon: Grid },
    { id: "myProject", label: "Dự án của tôi", icon: BookA },
    { id: "documents", label: "Tài liệu", icon: FileText },
    { id: "team", label: "Đội nhóm", icon: Users },
    { id: "settings", label: "Cài đặt", icon: Cog },
  ];

  return (
    <>
      <aside className="w-64 border-r border-gray-200 hidden md:block">
        <nav className="p-4 space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => onSidebarItemClick(tab.id)}
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
    </>
  );
};

export default Sidebar;
