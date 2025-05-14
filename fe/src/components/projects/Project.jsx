import React, { useState } from "react";
import {
  Settings,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Globe,
  FileText,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  LayoutGrid,
  Building,
  ArrowUpDownIcon as ArrowsUpDown,
  HelpCircle,
} from "lucide-react";
const Project = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const projects = [
    {
      id: 1,
      name: "Construction : Sample Project - Seaport Civic Center",
      address: "300 Mission Street",
      defaultAccess: "Docs",
      account: "songnguyen@gmail.com",
      createdOn: "12 thg 4, 2025",
    },
    {
      id: 2,
      name: "Construction : Sample Project - Seaport Civic Center",
      address: "300 Mission Street",
      defaultAccess: "Docs",
      account: "songnguyen@gmail.com",
      createdOn: "11 thg 4, 2025",
    },
  ];

  return (
    <>
      {/* Main content */}
      <main className="p-4 md:p-6">
        {/* Welcome section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-normal text-gray-800 mb-1">
            Welcome, song
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            What would you like to do today?
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab("home")}
              className={`mr-6 py-3 border-b-2 text-sm md:text-base ${
                activeTab === "home"
                  ? "border-blue-500 text-blue-500 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              My Home
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`mr-6 py-3 border-b-2 text-sm md:text-base ${
                activeTab === "projects"
                  ? "border-blue-500 text-blue-500 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`mr-6 py-3 border-b-2 text-sm md:text-base ${
                activeTab === "templates"
                  ? "border-blue-500 text-blue-500 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              Project Templates
            </button>
          </div>
        </div>

        {/* Project actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            <Plus className="h-5 w-5" />
            Create project
          </button>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects by name or number..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded w-full"
              />
            </div>
            <button className="bg-white border border-gray-200 p-2 rounded hover:bg-gray-50">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Projects table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Default access
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created on
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <ArrowsUpDown className="h-4 w-4" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Settings className="h-4 w-4" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center">
                      <Globe className="h-3.5 w-3.5 text-white" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">
                      {project.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {project.address}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap"></td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-500">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Docs
                      <ChevronDown className="h-3.5 w-3.5 ml-1" />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.account}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.createdOn}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap"></td>
                  <td className="px-4 py-4 whitespace-nowrap"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
          <div className="mb-4 md:mb-0">Showing 1-2 of 2</div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 border border-gray-200 rounded bg-white hover:bg-gray-50">
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 border border-gray-200 rounded bg-white hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2">1 of 1</span>
            <button className="p-1.5 border border-gray-200 rounded bg-white hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="p-1.5 border border-gray-200 rounded bg-white hover:bg-gray-50">
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Project;
