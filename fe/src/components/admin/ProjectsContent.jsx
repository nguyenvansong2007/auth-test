import React, { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import userService from "../../services/userService"; // Thêm mới
import { Search, PlusCircle } from "lucide-react";
import { Input, Button, Modal, Form, message, Select } from "antd";

const { Option } = Select;

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Lấy tất cả dự án
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAllProjects();
        setProjects(response.data || []);
      } catch (error) {
        message.error("Lỗi khi tải danh sách dự án " + error.message);
      }
    };

    fetchProjects();
  }, []);

  // Lọc dự án theo tên
  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mở modal thêm user
  const showAddUserModal = (project) => {
    setSelectedProject(project);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Xử lý submit form thêm user
  const handleAddUser = async (values) => {
    const { email, role } = values;

    setLoading(true);
    try {
      // Bước 1: Tìm user theo email
      const userResponse = await userService.findUserByEmail(email);
      const user = userResponse.data;

      if (!user) {
        throw new Error("Không tìm thấy người dùng với email này");
      }

      // Bước 2: Gọi API thêm thành viên
      await projectService.addProjectMember(selectedProject.id, {
        userId: user.id,
        role,
      });

      message.success("Thêm thành viên thành công");

      // Tải lại dữ liệu dự án
      const updated = await projectService.getAllProjects();
      setProjects(updated.data || []);

      setIsModalVisible(false);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Không thể thêm thành viên"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Dự án</h1>

      {/* Ô tìm kiếm */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className="w-4 h-4 text-gray-500 mr-1" />}
            className="w-full"
          />
        </div>
      </div>

      {/* Danh sách dự án */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600 mt-1">{project.description}</p>

            {/* Thành viên */}
            <div className="mt-3">
              <h3 className="font-medium">Thành viên:</h3>
              <ul className="text-sm">
                {project.members && project.members.length > 0 ? (
                  project.members.map((member) => (
                    <li key={member.id}>
                      {member.username} ({member.projectRole?.role})
                    </li>
                  ))
                ) : (
                  <li>Chưa có thành viên</li>
                )}
              </ul>
            </div>

            {/* Nút thêm thành viên */}
            <Button
              type="primary"
              icon={<PlusCircle className="w-4 h-4" />}
              onClick={() => showAddUserModal(project)}
              className="mt-4"
            >
              Thêm thành viên
            </Button>
          </div>
        ))}
      </div>

      {/* Modal thêm thành viên bằng email */}
      <Modal
        title={`Thêm thành viên vào "${selectedProject?.name}"`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item
            label="Email người dùng"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email người dùng" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="owner">Quản trị viên</Option>
              <Option value="member">Thành viên</Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectListPage;
