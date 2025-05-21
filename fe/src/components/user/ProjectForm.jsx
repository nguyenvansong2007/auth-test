// src/components/ProjectForm.jsx
import React, { useState } from "react";
import projectService from "../../services/projectService";

const ProjectForm = ({ projectToEdit, onSave }) => {
  const [name, setName] = useState(projectToEdit?.name || "");
  const [description, setDescription] = useState(projectToEdit?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description };

    try {
      if (projectToEdit) {
        await projectService.updateProject(projectToEdit.id, data);
      } else {
        await projectService.createProject(data);
      }
      onSave();
    } catch (err) {
      console.error("Lỗi khi lưu dự án:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">{projectToEdit ? "Sửa Dự Án" : "Tạo Dự Án"}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tên dự án</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows="3"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {projectToEdit ? "Cập nhật" : "Tạo mới"}
      </button>
    </form>
  );
};

export default ProjectForm;