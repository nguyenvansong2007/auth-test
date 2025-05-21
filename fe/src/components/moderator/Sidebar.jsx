import { Settings, Users, FileCheck, Home } from "lucide-react";

const Sidebar = ({ activeTab, onSidebarItemClick }) => {
  const tabs = [
    { id: "dashboard", label: "Bảng điều khiển", icon: Home },
    { id: "approvals", label: "Phê duyệt", icon: FileCheck },
    { id: "users", label: "Quản lý thành viên", icon: Users },
    { id: "settings", label: "Cài đặt", icon: Settings },
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
    </div>
  );
};

export default Sidebar;
