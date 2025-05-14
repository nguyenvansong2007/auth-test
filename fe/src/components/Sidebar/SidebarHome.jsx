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
  Home,
} from "lucide-react";
const Sidebar = () => {
  return (
    <div>
      <aside className="w-64 border-r border-gray-200 bg-white hidden md:block">
        <nav className="p-4 space-y-4">
          <div className="flex items-center text-blue-600 font-medium">
            <Home className="h-5 w-5 mr-3" />
            <span>Home</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Grid className="h-5 w-5 mr-3" />
            <span>Projects</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Users className="h-5 w-5 mr-3" />
            <span>Members</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Building className="h-5 w-5 mr-3" />
            <span>Companies</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <UserCheck className="h-5 w-5 mr-3" />
            <span>Roles</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <FileText className="h-5 w-5 mr-3" />
            <span>Project templates</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <BookOpen className="h-5 w-5 mr-3" />
            <span>Library</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Grid className="h-5 w-5 mr-3" />
            <span>Apps</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Package className="h-5 w-5 mr-3" />
            <span>Products and tools</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <LinkIcon className="h-5 w-5 mr-3" />
            <span>Custom integrations</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5 mr-3" />
            <span>BIM 360 admin</span>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
