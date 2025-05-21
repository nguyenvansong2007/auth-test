import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
import UserService from "../services/userService";
import Sidebar from "../components/user/Sidebar";
import MobileNav from "../components/user/MobileNav";
import Projects from "../components/projects/Projects";
import Calendar from "../components/user/Calendar";
import Documents from "../components/user/Documents";
import Team from "../components/user/Team";
import Companies from "../components/user/Companies";
import Library from "../components/user/Library";
import Settings from "../components/user/Settings";
const BoardUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  const handleSidebarItemClick = (item) => {
    setActiveTab(item);
  };

  useEffect(() => {
    setIsLoading(true);
    UserService.getUserBoard()
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
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "projects" && <Projects />}
          {activeTab === "calendar" && <Calendar />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "team" && <Team />}
          {activeTab === "companies" && <Companies />}
          {activeTab === "library" && <Library />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </div>
  );
};

export default BoardUser;
