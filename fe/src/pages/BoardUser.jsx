// import React, { useState, useEffect } from "react";

// import UserService from "../services/userService";

// const BoardUser = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getUserBoard().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container mx-auto px-4">
//       <header className="bg-gray-100 p-6 rounded-lg shadow">
//         <h3 className="text-xl font-semibold">{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default BoardUser;



"use client"

import { useState, useEffect } from "react"
import {
  Settings,
  Users,
  Building,
  FileText,
  BookOpen,
  Grid,
  HelpCircle,
  ChevronDown,
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Home,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react"
import UserService from "../services/userService"

const BoardUser = () => {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")

  useEffect(() => {
    setIsLoading(true)
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data)
        setIsLoading(false)
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        setContent(_content)
        setIsLoading(false)
      },
    )
  }, [])

  // Sample data for the user dashboard
  const myProjects = [
    { id: 1, name: "Construction Sample Project", role: "Contributor", status: "Active", lastUpdated: "Today" },
    { id: 2, name: "Office Renovation", role: "Viewer", status: "Active", lastUpdated: "Yesterday" },
    { id: 3, name: "Residential Building", role: "Owner", status: "Completed", lastUpdated: "Last week" },
  ]

  const myTasks = [
    {
      id: 1,
      name: "Review blueprint changes",
      project: "Construction Sample Project",
      dueDate: "Today",
      priority: "High",
    },
    { id: 2, name: "Submit inspection report", project: "Office Renovation", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, name: "Update project timeline", project: "Residential Building", dueDate: "Next week", priority: "Low" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2">
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-600 p-1.5 rounded-md mr-2">
                <Settings className="h-5 w-5" />
              </div>
              <span className="text-gray-700 font-medium">Account Admin</span>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
            </div>

            <div className="md:hidden">
              <div className="bg-red-400 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium">
                SN
              </div>
            </div>
          </div>

          <div className="flex items-center mt-2 md:mt-0 w-full md:w-auto justify-between">
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-md mr-2">
                <span className="text-gray-700">S</span>
              </div>
              <div className="text-gray-700 text-sm mr-2 hidden md:block">
                songnguyenvan2@gmail.com
                <ChevronDown className="h-4 w-4 inline ml-1 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-red-500 text-sm mr-2">2 days remaining on your trial - Autodesk Docs</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
                View buying options
              </button>
              <div className="ml-2 text-gray-500">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div className="ml-2 hidden md:flex bg-red-400 rounded-full h-8 w-8 items-center justify-center text-white font-medium">
                SN
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 hidden md:block">
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
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendar</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <FileText className="h-5 w-5 mr-3" />
              <span>Documents</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <Users className="h-5 w-5 mr-3" />
              <span>Team</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <Building className="h-5 w-5 mr-3" />
              <span>Companies</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <BookOpen className="h-5 w-5 mr-3" />
              <span>Library</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">My Dashboard</h1>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Status message from API */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">{content}</p>
                    </div>
                  </div>
                </div>

                {/* Stats overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                      <Grid className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">My Projects</p>
                      <p className="text-2xl font-semibold text-gray-800">3</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-amber-500 text-white p-3 rounded-lg mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Tasks Due Soon</p>
                      <p className="text-2xl font-semibold text-gray-800">2</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Completed Tasks</p>
                      <p className="text-2xl font-semibold text-gray-800">15</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`pb-2 relative ${
                        activeTab === "projects"
                          ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      My Projects
                    </button>
                    <button
                      onClick={() => setActiveTab("tasks")}
                      className={`pb-2 relative ${
                        activeTab === "tasks"
                          ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      My Tasks
                    </button>
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                  <div className="flex space-x-2">
                    {activeTab === "projects" && (
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <Plus className="h-5 w-5 mr-2" />
                        Join Project
                      </button>
                    )}
                    {activeTab === "tasks" && (
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Task
                      </button>
                    )}
                    <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
                      <Download className="h-5 w-5 mr-2" />
                      Export
                    </button>
                  </div>

                  <div className="relative w-full md:w-64">
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

                {/* Content based on active tab */}
                {activeTab === "projects" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Project Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Your Role
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Last Updated
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {myProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">{project.name}</td>
                            <td className="px-4 py-4 text-sm text-gray-500">{project.role}</td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center">
                                <div
                                  className={`h-4 w-1 rounded-full mr-2 ${
                                    project.status === "Active" ? "bg-green-500" : "bg-blue-500"
                                  }`}
                                ></div>
                                <span className="text-gray-900">{project.status}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">{project.lastUpdated}</td>
                            <td className="px-4 py-4 text-sm text-gray-500 text-right">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "tasks" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Task Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Project
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Due Date
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Priority
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {myTasks.map((task) => (
                          <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">{task.name}</td>
                            <td className="px-4 py-4 text-sm text-gray-500">{task.project}</td>
                            <td className="px-4 py-4 text-sm text-gray-500">{task.dueDate}</td>
                            <td className="px-4 py-4 text-sm">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  task.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 text-right">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                  <div>Showing all items</div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded hover:bg-gray-100" disabled>
                      <ChevronsLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100" disabled>
                      <ChevronLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <span className="px-2">1 of 1</span>
                    <button className="p-1 rounded hover:bg-gray-100" disabled>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100" disabled>
                      <ChevronsRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </>
            )}
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
          <FileText className="h-6 w-6" />
          <span className="text-xs mt-1">Documents</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Team</span>
        </button>
      </div>
    </div>
  )
}

export default BoardUser
