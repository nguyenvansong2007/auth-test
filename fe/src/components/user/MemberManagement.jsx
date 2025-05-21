// src/components/MemberManagement.jsx
import React, { useState, useEffect } from "react";
import projectService from "../../services/projectService";

const MemberManagement = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await projectService.getProjectMembers(projectId);
        setMembers(res.data);
      } catch (err) {
        console.error("Failed to fetch members", err);
      }
    };
    if (projectId) fetchMembers();
  }, [projectId]);

  const handleAddMember = async () => {
    try {
      await projectService.addProjectMember(projectId, { userId });
      setUserId("");
      const res = await projectService.getProjectMembers(projectId);
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to add member", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Thành viên</h3>
      <ul className="mb-4 space-y-1">
        {members.map((member, index) => (
          <li key={index} className="text-sm">
            {member.username} - {member.role}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-3 py-2 border rounded flex-grow"
        />
        <button
          onClick={handleAddMember}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default MemberManagement;