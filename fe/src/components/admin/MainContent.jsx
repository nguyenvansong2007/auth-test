import React, { useState, useEffect } from "react";
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
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Mail,
} from "lucide-react";
import UserService from "../../services/userService";

const MainContent = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    UserService.getAdminBoard().then(
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

  // Function to fetch all users from the database
  const fetchAllUsers = () => {
    setIsLoadingUsers(true);
    // In a real application, you would call your API to get users
    // For example: UserService.getAllUsers()

    // Simulating API call with setTimeout
    setTimeout(() => {
      // Sample user data - in a real app, this would come from your API
      const sampleUsers = [
        {
          id: 1,
          username: "johndoe",
          email: "john.doe@example.com",
          roles: ["ROLE_USER"],
          status: "Active",
          lastLogin: "2023-05-10T10:30:00Z",
          createdAt: "2023-01-15T08:20:00Z",
        },
        {
          id: 2,
          username: "janedoe",
          email: "jane.doe@example.com",
          roles: ["ROLE_USER", "ROLE_MODERATOR"],
          status: "Active",
          lastLogin: "2023-05-11T14:45:00Z",
          createdAt: "2023-01-20T09:15:00Z",
        },
        {
          id: 3,
          username: "adminuser",
          email: "admin@example.com",
          roles: ["ROLE_USER", "ROLE_ADMIN"],
          status: "Active",
          lastLogin: "2023-05-12T08:30:00Z",
          createdAt: "2023-01-10T11:30:00Z",
        },
        {
          id: 4,
          username: "sarahsmith",
          email: "sarah.smith@example.com",
          roles: ["ROLE_USER"],
          status: "Inactive",
          lastLogin: "2023-04-28T16:20:00Z",
          createdAt: "2023-02-05T10:45:00Z",
        },
        {
          id: 5,
          username: "mikebrown",
          email: "mike.brown@example.com",
          roles: ["ROLE_USER", "ROLE_MODERATOR"],
          status: "Active",
          lastLogin: "2023-05-09T11:10:00Z",
          createdAt: "2023-02-10T13:25:00Z",
        },
        {
          id: 6,
          username: "emilyjones",
          email: "emily.jones@example.com",
          roles: ["ROLE_USER"],
          status: "Active",
          lastLogin: "2023-05-08T09:50:00Z",
          createdAt: "2023-02-15T14:40:00Z",
        },
        {
          id: 7,
          username: "davidwilson",
          email: "david.wilson@example.com",
          roles: ["ROLE_USER"],
          status: "Active",
          lastLogin: "2023-05-07T15:30:00Z",
          createdAt: "2023-02-20T08:55:00Z",
        },
        {
          id: 8,
          username: "oliviataylor",
          email: "olivia.taylor@example.com",
          roles: ["ROLE_USER"],
          status: "Pending",
          lastLogin: null,
          createdAt: "2023-05-01T10:15:00Z",
        },
        {
          id: 9,
          username: "noahmartin",
          email: "noah.martin@example.com",
          roles: ["ROLE_USER"],
          status: "Active",
          lastLogin: "2023-05-06T12:40:00Z",
          createdAt: "2023-03-05T09:30:00Z",
        },
        {
          id: 10,
          username: "sophiaanderson",
          email: "sophia.anderson@example.com",
          roles: ["ROLE_USER", "ROLE_MODERATOR"],
          status: "Active",
          lastLogin: "2023-05-05T14:20:00Z",
          createdAt: "2023-03-10T11:10:00Z",
        },
        {
          id: 11,
          username: "liamthomas",
          email: "liam.thomas@example.com",
          roles: ["ROLE_USER"],
          status: "Inactive",
          lastLogin: "2023-04-20T09:15:00Z",
          createdAt: "2023-03-15T13:45:00Z",
        },
        {
          id: 12,
          username: "avajackson",
          email: "ava.jackson@example.com",
          roles: ["ROLE_USER"],
          status: "Active",
          lastLogin: "2023-05-04T10:50:00Z",
          createdAt: "2023-03-20T15:30:00Z",
        },
      ];

      setUsers(sampleUsers);
      setIsLoadingUsers(false);
    }, 1000);
  };

  // Handle sidebar item click
  const handleSidebarItemClick = (item) => {
    setActiveSidebarItem(item);

    if (item === "members") {
      fetchAllUsers();
      setActiveTab("users");
    } else {
      setActiveTab("overview");
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Sample data for the admin dashboard
  const adminData = [
    { id: 1, name: "User Management", count: 24, status: "Active" },
    { id: 2, name: "Role Assignments", count: 8, status: "Active" },
    { id: 3, name: "System Configuration", count: 12, status: "Pending" },
    { id: 4, name: "Security Audit", count: 5, status: "Completed" },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "bg-red-100 text-red-800";
      case "ROLE_MODERATOR":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  return (
    <div>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-medium text-gray-800 mb-6">
            {activeSidebarItem === "members"
              ? "User Management"
              : "Admin Dashboard"}
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

              {activeSidebarItem === "members" ? (
                /* Members Management Section */
                <>
                  {/* Action bar */}
                  <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="flex space-x-2">
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Add User
                      </button>
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
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Users table */}
                  {isLoadingUsers ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Username
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Roles
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Last Login
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                              Created
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {user.username}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {user.email}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <div className="flex flex-wrap gap-1">
                                  {user.roles.map((role, index) => (
                                    <span
                                      key={index}
                                      className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(
                                        role
                                      )}`}
                                    >
                                      {role.replace("ROLE_", "")}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(
                                    user.status
                                  )}`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {formatDate(user.lastLogin)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {formatDate(user.createdAt)}
                              </td>
                              <td className="px-4 py-4 text-sm text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                    title="Edit User"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="p-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                                    title="Reset Password"
                                  >
                                    <Lock className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                    title="Send Email"
                                  >
                                    <Mail className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                    title="Delete User"
                                  >
                                    <Trash2 className="h-4 w-4" />
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
                  {!isLoadingUsers && filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                      <div>
                        Showing {indexOfFirstUser + 1}-
                        {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                        {filteredUsers.length} users
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(1)}
                        >
                          <ChevronsLeft
                            className={`h-5 w-5 ${
                              currentPage === 1
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          <ChevronLeft
                            className={`h-5 w-5 ${
                              currentPage === 1
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                        <span className="px-2">
                          {currentPage} of {totalPages}
                        </span>
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          <ChevronRight
                            className={`h-5 w-5 ${
                              currentPage === totalPages
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          <ChevronsRight
                            className={`h-5 w-5 ${
                              currentPage === totalPages
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {!isLoadingUsers && filteredUsers.length === 0 && (
                    <div className="text-center py-10">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No users found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter to find what you're
                        looking for.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Default Admin Dashboard */
                <>
                  {/* Tabs */}
                  <div className="border-b border-gray-200 mb-4">
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
                        onClick={() => setActiveTab("users")}
                        className={`pb-2 relative ${
                          activeTab === "users"
                            ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Users
                      </button>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className={`pb-2 relative ${
                          activeTab === "settings"
                            ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Settings
                      </button>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="flex space-x-2">
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        <Plus className="h-5 w-5 mr-2" />
                        Add New
                      </button>
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

                  {/* Admin data table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            ID
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Count
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {adminData.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.id}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.count}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center">
                                <div
                                  className={`h-4 w-1 rounded-full mr-2 ${
                                    item.status === "Active"
                                      ? "bg-green-500"
                                      : item.status === "Pending"
                                      ? "bg-yellow-500"
                                      : "bg-blue-500"
                                  }`}
                                ></div>
                                <span className="text-gray-900">
                                  {item.status}
                                </span>
                              </div>
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

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                    <div>Showing 1-4 of 4</div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        disabled
                      >
                        <ChevronsLeft className="h-5 w-5 text-gray-400" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        disabled
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-400" />
                      </button>
                      <span className="px-2">1 of 1</span>
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        disabled
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        disabled
                      >
                        <ChevronsRight className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainContent;
