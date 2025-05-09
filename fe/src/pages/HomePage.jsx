// import React, { useState, useEffect } from "react";

// import UserService from "../services/userService";

// const Home = () => {
//   const [content, setContent] = useState("");
//   // const [activeTab, setActiveTab] = useState("home")

//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <header className="bg-gray-100 p-6 rounded-lg shadow">
//         <h3 className="text-xl font-semibold">{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default Home;

"use client"

import { useState } from "react"
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
  HelpCircle,
  ChevronDown,
  Plus,
  Calendar,
  Clock,
  BarChart2,
  PieChart,
  CheckCircle,
  AlertCircle,
  Bell,
  Home,
  Folder,
  MessageSquare,
  Search,
  MoreHorizontal,
} from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  // Sample data for the dashboard
  const projectStats = [
    { name: "Active Projects", count: 5, icon: <Folder className="h-5 w-5" />, color: "bg-blue-500" },
    { name: "Tasks Due Today", count: 8, icon: <Clock className="h-5 w-5" />, color: "bg-amber-500" },
    { name: "Completed Tasks", count: 24, icon: <CheckCircle className="h-5 w-5" />, color: "bg-green-500" },
    { name: "Pending Issues", count: 3, icon: <AlertCircle className="h-5 w-5" />, color: "bg-red-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Project Update: Construction Sample",
      description: "New documents were added to the project",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      id: 2,
      title: "Task Completed",
      description: "Foundation inspection was completed",
      time: "Yesterday",
      user: "Sarah Johnson",
    },
    {
      id: 3,
      title: "New Comment",
      description: "New comment on blueprint revision",
      time: "Yesterday",
      user: "Mike Smith",
    },
    {
      id: 4,
      title: "Meeting Scheduled",
      description: "Weekly progress meeting scheduled for tomorrow",
      time: "2 days ago",
      user: "Project Manager",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Progress Meeting",
      date: "Tomorrow, 10:00 AM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Site Inspection",
      date: "May 12, 2023, 9:00 AM",
      location: "Construction Site",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "May 15, 2023, 2:00 PM",
      location: "Main Office",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
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

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-2xl font-medium text-gray-800 mb-2">Welcome, Song</h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {projectStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                  <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>{stat.icon}</div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-800">{stat.count}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2 relative ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`pb-2 relative ${
                    activeTab === "activity"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`pb-2 relative ${
                    activeTab === "calendar"
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </button>
              <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Meeting
              </button>
              <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
                <MessageSquare className="h-5 w-5 mr-2" />
                Send Message
              </button>
              <div className="relative ml-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent activity */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
                  <button className="text-blue-600 text-sm hover:text-blue-800">View All</button>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{activity.title}</h3>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{activity.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Upcoming events */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-800">Upcoming Events</h2>
                    <button className="text-blue-600 text-sm hover:text-blue-800">View Calendar</button>
                  </div>

                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-gray-800">{event.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Building className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
                    <button className="text-blue-600 text-sm hover:text-blue-800">Mark All as Read</button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-blue-50 rounded-md">
                      <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-800">Your trial will expire in 2 days</p>
                        <p className="text-xs text-gray-500 mt-1">Upgrade now to continue using all features</p>
                      </div>
                    </div>

                    <div className="flex items-start p-3 rounded-md">
                      <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-800">New comment on "Foundation Plan"</p>
                        <p className="text-xs text-gray-500 mt-1">John commented: "Looks good, approved!"</p>
                      </div>
                    </div>

                    <div className="flex items-start p-3 rounded-md">
                      <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-800">Document updated</p>
                        <p className="text-xs text-gray-500 mt-1">Sarah updated "Site Plan v2.3"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Project Progress</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-16 w-16 text-gray-300 mx-auto" />
                    <p className="mt-2 text-gray-500 text-sm">Project progress chart will appear here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Task Distribution</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-gray-300 mx-auto" />
                    <p className="mt-2 text-gray-500 text-sm">Task distribution chart will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-gray-200 py-3">
        <button className="flex flex-col items-center text-blue-600">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Projects</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">Calendar</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Bell className="h-6 w-6" />
          <span className="text-xs mt-1">Notifications</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Team</span>
        </button>
      </div>
    </div>
  )
}
