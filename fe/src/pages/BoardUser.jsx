import { useState } from "react";
import UserService from "../services/userService";
import Sidebar from "../components/user/Sidebar";
import Projects from "../components/projects/Projects";
import MyProject from "../components/user/MyProject";
import Documents from "../components/user/Documents";
import Team from "../components/user/Team";
import Library from "../components/user/Library";
import Settings from "../components/user/Settings";
import { Users, FileText, Grid, CalendarClock, Cog, BookA } from "lucide-react";

const BoardUser = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("myProject");

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
        <main className="flex-1  p-6">
          {/* {activeTab === "projects" && <Projects />} */}
          {activeTab === "myProject" && <MyProject />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "team" && <Team />}
          {/* {activeTab === "companies" && <Companies />} */}
          {activeTab === "library" && <Library />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        {/* <button
          className={`flex flex-col items-center ${
            activeTab === "projects" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("projects")}
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Dự án</span>
        </button> */}
        <button
          className={`flex flex-col items-center ${
            activeTab === "calendar" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("calendar")}
        >
          <BookA className="h-6 w-6" />
          <span className="text-xs mt-1">Dự án của tôi</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "documents" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("documents")}
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs mt-1">Tài liệu</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "team" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleSidebarItemClick("team")}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Đội nhóm</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "companies" ? "text-blue-600" : "text-gray-500"
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

export default BoardUser;
