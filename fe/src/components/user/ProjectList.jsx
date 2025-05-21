// src/components/ProjectList.jsx
import { useEffect, useState } from "react";
import projectService from '../../services/projectService';

const ProjectList = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getAllProjects();
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Danh sách Dự án</h2>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            <strong>{project.name}</strong> - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;