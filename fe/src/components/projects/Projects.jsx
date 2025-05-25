import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Tabs } from "antd";
import {
  Plus as PlusIcon,
  Pencil as EditIcon,
  Trash2 as DeleteIcon,
  Users as TeamIcon,
  UserPlus as AddMemberIcon,
} from "lucide-react";

import projectService from "../../services/projectService";

const { TabPane } = Tabs;

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectService.getAllProjects();
      setProjects(res.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      // message.error("Không thể tải danh sách dự án");
    }
    setLoading(false);
  };

  // Handle create or update project
  const handleFinish = async (values) => {
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, values);
        console.log("Project updated:", values);
        // message.success("Cập nhật thành công");
      } else {
        await projectService.createProject(values);
        console.log("Project created:", values);
        // message.success("Tạo mới thành công");
      }
      fetchProjects();
      setIsModalVisible(false);
    } catch (err) {
      console.error("Error saving project:", err);
      // message.error("Thao tác thất bại");
    }
  };

  // Open edit modal
  const openEditModal = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setIsModalVisible(true);
  };

  // Delete a project
  const deleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      console.log("Project deleted:", id);
      // message.success("Xóa thành công");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      // message.error("Không thể xóa dự án");
    }
  };

  const columns = [
    {
      title: "Tên Dự Án",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      responsive: ["lg"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            size="small"
            icon={<EditIcon size={16} />}
            onClick={() => openEditModal(record)}
          />
          <Button
            size="small"
            danger
            icon={<DeleteIcon size={16} />}
            onClick={() => deleteProject(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Quản Lý Dự Án</h1>
        <Button
          type="primary"
          icon={<PlusIcon size={16} />}
          onClick={() => {
            setEditingProject(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Thêm Dự Án
        </Button>
      </div>

      {/* Project Table */}
      <Table
        dataSource={projects}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      {/* Modal Create/Edit Project */}
      <Modal
        title={editingProject ? "Sửa Dự Án" : "Thêm Dự Án"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        okText={editingProject ? "Cập nhật" : "Tạo mới"}
        cancelText="Hủy"
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item label="Tên Dự Án" name="name" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên dự án" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả dự án" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Tabs for Members */}
      {editingProject && (
        <Tabs
          defaultActiveKey="1"
          className="mt-6"
          items={[
            {
              key: "1",
              label: (
                <span>
                  <TeamIcon size={14} className="inline mr-1" /> Thành Viên
                </span>
              ),
              children: <ProjectMembers projectId={editingProject.id} />,
            },
          ]}
        />
      )}
    </div>
  );
}

// Component quản lý thành viên trong project
function ProjectMembers({ projectId }) {
  const [members, setMembers] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [memberForm] = Form.useForm();

  const fetchMembers = async () => {
    try {
      const res = await projectService.getProjectMembers(projectId);
      setMembers(res.data || []);
    } catch (err) {
      console.error("Error fetching members:", err);
      // message.error("Không thể tải danh sách thành viên");
    }
  };

  const addMember = async (values) => {
    try {
      await projectService.addProjectMember(projectId, values);
      console.log("Member added:", values);
      // message.success("Thêm thành viên thành công");
      fetchMembers();
      setIsAddModalVisible(false);
    } catch (err) {
      console.error("Error adding member:", err);
      // message.error("Thêm thất bại");
    }
  };

  const memberColumns = [
    {
      title: "Tên Thành Viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vai Trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Hành động",
      key: "action",
      render: () => <Button size="small" danger icon={<Trash2 size={14} />} />,
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          icon={<AddMemberIcon size={14} />}
          onClick={() => {
            // memberForm.resetFields();
            setIsAddModalVisible(true);
          }}
        >
          Thêm Thành Viên
        </Button>
      </div>

      <Table
        dataSource={members}
        columns={memberColumns}
        pagination={false}
        size="small"
      />

      {/* Add Member Modal */}
      <Modal
        title="Thêm Thành Viên"
        open={isAddModalVisible}
        onOk={() => memberForm.submit()}
        onCancel={() => setIsAddModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={memberForm} onFinish={addMember} layout="vertical">
          <Form.Item
            label="Email Thành Viên"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Nhập email thành viên" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
