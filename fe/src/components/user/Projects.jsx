// import React from "react";
// import { Plus } from "lucide-react";
// const Projects = () => {
//   return (
//     <div>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Projects</h2>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
//             <Plus className="h-5 w-5 mr-2" />
//             New Project
//           </button>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-600">No projects found</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projects;

// src/views/ProjectsPage.jsx
import React, { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";
import MemberManagement from "./MemberManagement";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSave = () => {
    setSelectedProject(null); // Refresh
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý Dự án</h1>

      <div className="space-y-6">

        {/* Project Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ProjectForm projectToEdit={selectedProject} onSave={handleSave} />
        </div>

        {/* Project List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ProjectList onSelectProject={setSelectedProject} />
        </div>
        {/* Member Management */}
        {selectedProject && (
          <div className="bg-white p-6 rounded-lg shadow">
            <MemberManagement projectId={selectedProject.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
