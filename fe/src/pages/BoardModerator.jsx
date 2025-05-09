// import React, { useState, useEffect } from "react";

// import UserService from "../services/userService";

// const BoardModerator = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getModeratorBoard().then(
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

// export default BoardModerator;

"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Users,
  Building,
  FileText,
  BookOpen,
  Grid,
  Package,
  HelpCircle,
  ChevronDown,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Home,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Shield,
  Eye,
  CheckSquare,
  XSquare,
} from "lucide-react";
import UserService from "../services/userService";

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    setIsLoading(true);
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        setIsLoading(false);
      }
    );
  }, []);

  // Sample data for the moderator dashboard
  const projectsData = [
    {
      id: 1,
      name: "Construction Sample Project",
      members: 12,
      status: "Active",
      lastUpdated: "Today",
      pendingApprovals: 3,
    },
    {
      id: 2,
      name: "Office Renovation",
      members: 8,
      status: "Active",
      lastUpdated: "Yesterday",
      pendingApprovals: 1,
    },
    {
      id: 3,
      name: "Residential Building",
      members: 15,
      status: "Completed",
      lastUpdated: "Last week",
      pendingApprovals: 0,
    },
  ];

  const pendingApprovalsData = [
    {
      id: 1,
      type: "Document",
      name: "Site Plan Revision",
      project: "Construction Sample Project",
      requestedBy: "John Doe",
      requestedDate: "Today",
    },
    {
      id: 2,
      type: "User Access",
      name: "Contractor Access Request",
      project: "Construction Sample Project",
      requestedBy: "ABC Contractors",
      requestedDate: "Today",
    },
    {
      id: 3,
      type: "Change Request",
      name: "Material Substitution",
      project: "Construction Sample Project",
      requestedBy: "Sarah Johnson",
      requestedDate: "Yesterday",
    },
    {
      id: 4,
      type: "Document",
      name: "Floor Plan Update",
      project: "Office Renovation",
      requestedBy: "Mike Smith",
      requestedDate: "Yesterday",
    },
  ];

  const userRequestsData = [
    {
      id: 1,
      name: "David Wilson",
      email: "david.wilson@example.com",
      requestType: "Access Request",
      project: "Construction Sample Project",
      date: "Today",
    },
    {
      id: 2,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      requestType: "Role Change",
      project: "Office Renovation",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      requestType: "Access Request",
      project: "Residential Building",
      date: "2 days ago",
    },
  ];

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
              <span className="text-red-500 text-sm mr-2">
                2 days remaining on your trial - Autodesk Docs
              </span>
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
            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </div>

            <div className="flex items-center text-blue-600 font-medium">
              <Shield className="h-5 w-5 mr-3" />
              <span>Moderator Dashboard</span>
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
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendar</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <FileText className="h-5 w-5 mr-3" />
              <span>Documents</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <BookOpen className="h-5 w-5 mr-3" />
              <span>Library</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-900">
              <Package className="h-5 w-5 mr-3" />
              <span>Products and tools</span>
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
            <h1 className="text-2xl font-medium text-gray-800 mb-6">
              Moderator Dashboard
            </h1>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                      <Grid className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Managed Projects</p>
                      <p className="text-2xl font-semibold text-gray-800">3</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-amber-500 text-white p-3 rounded-lg mr-4">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Pending Approvals</p>
                      <p className="text-2xl font-semibold text-gray-800">4</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-purple-500 text-white p-3 rounded-lg mr-4">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">User Requests</p>
                      <p className="text-2xl font-semibold text-gray-800">3</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
                    <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Approved Today</p>
                      <p className="text-2xl font-semibold text-gray-800">7</p>
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
                      Managed Projects
                    </button>
                    <button
                      onClick={() => setActiveTab("approvals")}
                      className={`pb-2 relative ${
                        activeTab === "approvals"
                          ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Pending Approvals
                    </button>
                    <button
                      onClick={() => setActiveTab("users")}
                      className={`pb-2 relative ${
                        activeTab === "users"
                          ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      User Requests
                    </button>
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                  <div className="flex space-x-2">
                    {activeTab === "projects" && (
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <Eye className="h-5 w-5 mr-2" />
                        View All Projects
                      </button>
                    )}
                    {activeTab === "approvals" && (
                      <>
                        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                          <CheckSquare className="h-5 w-5 mr-2" />
                          Approve Selected
                        </button>
                        <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                          <XSquare className="h-5 w-5 mr-2" />
                          Reject Selected
                        </button>
                      </>
                    )}
                    {activeTab === "users" && (
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <Users className="h-5 w-5 mr-2" />
                        Manage Users
                      </button>
                    )}
                    <button className="flex items-center border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded">
                      <Filter className="h-5 w-5 mr-2" />
                      Filter
                    </button>
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
                            Members
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Last Updated
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Pending Approvals
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projectsData.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {project.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {project.members}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center">
                                <div
                                  className={`h-4 w-1 rounded-full mr-2 ${
                                    project.status === "Active"
                                      ? "bg-green-500"
                                      : "bg-blue-500"
                                  }`}
                                ></div>
                                <span className="text-gray-900">
                                  {project.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {project.lastUpdated}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {project.pendingApprovals > 0 ? (
                                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                                  {project.pendingApprovals} pending
                                </span>
                              ) : (
                                <span className="text-gray-500">None</span>
                              )}
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

                {activeTab === "approvals" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider w-10">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Project
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Requested By
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingApprovalsData.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-500 w-10">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  item.type === "Document"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.type === "User Access"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {item.type}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.project}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.requestedBy}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.requestedDate}
                            </td>
                            <td className="px-4 py-4 text-sm text-right">
                              <div className="flex justify-end space-x-2">
                                <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                  <CheckSquare className="h-4 w-4" />
                                </button>
                                <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                                  <XSquare className="h-4 w-4" />
                                </button>
                                <button className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "users" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Request Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Project
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userRequestsData.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {user.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  user.requestType === "Access Request"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {user.requestType}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {user.project}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {user.date}
                            </td>
                            <td className="px-4 py-4 text-sm text-right">
                              <div className="flex justify-end space-x-2">
                                <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                  <CheckSquare className="h-4 w-4" />
                                </button>
                                <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                                  <XSquare className="h-4 w-4" />
                                </button>
                                <button className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
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
          <Shield className="h-6 w-6" />
          <span className="text-xs mt-1">Moderate</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Projects</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <AlertCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Approvals</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Users</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
      </div>
    </div>
  );
};

export default BoardModerator;
