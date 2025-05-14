import {
  Settings,
  Users,
  Building,
  UserCheck,
  FileText,
  BookOpen,
  Grid,
  Package,
  LinkIcon,
  Link,
} from "lucide-react";

const SidebarAdmin = ({ activeTab, onSidebarItemClick }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Grid },
    { id: "members", label: "Members", icon: Users },
    { id: "companies", label: "Companies", icon: Building },
    { id: "roles", label: "Roles", icon: UserCheck },
    { id: "templates", label: "Project templates", icon: Package },
    { id: "library", label: "Lybrary", icon: BookOpen },
    { id: "apps", label: "Apps", icon: Grid },
    { id: "products", label: "Products and tools", icon: Package },
    { id: "integrations", label: "Custom integrations", icon: LinkIcon },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "bim360", label: "BIM 360 admin", icon: Settings },
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
