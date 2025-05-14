import React from "react";
import { Plus } from "lucide-react";
const Projects = () => {
  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">No projects found</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
