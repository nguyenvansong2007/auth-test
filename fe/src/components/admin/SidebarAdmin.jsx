import { Settings, Users, Building, Grid, Package } from "lucide-react";

const SidebarAdmin = ({ activeTab, onSidebarItemClick }) => {
  const tabs = [
    { id: "dashboard", label: "Bảng điều khiển", icon: Grid },
    { id: "members", label: "Quản lý tài khoản", icon: Users },
    { id: "companies", label: "Quản lý công ty", icon: Building },
    { id: "templates", label: "Mẫu  dự án", icon: Package },
    { id: "settings", label: "Cài đặt", icon: Settings },
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

export default SidebarAdmin;
