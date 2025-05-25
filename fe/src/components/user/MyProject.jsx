// import React, { useEffect, useState } from "react";
// import userService from "../../services/userService";
// import projectService from "../../services/projectService";
// import fileService from "../../services/fileService";
// import { Form, Input, Button, Card, Modal, Select, Space, message, Upload } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   TeamOutlined,
//   PlusOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";

// const { Option } = Select;
// const { TextArea } = Input;

// const Dashboard = () => {
//   const [formCreate] = Form.useForm();
//   const [formEdit] = Form.useForm();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [createModalVisible, setCreateModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [uploadModalVisible, setUploadModalVisible] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [members, setMembers] = useState([]);

//   // Lấy danh sách dự án
//   const fetchProjects = async () => {
//     try {
//       const res = await userService.getAllProjectsCreatedByUser();
//       setProjects(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Tạo mới dự án
//   const onFinishCreate = async (values) => {
//     try {
//       setLoading(true);
//       await projectService.createProject(values);
//       formCreate.resetFields();
//       message.success("Project created successfully!");
//       fetchProjects();
//       setCreateModalVisible(false);
//     } catch (err) {
//       message.error("Failed to create project.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Chỉnh sửa dự án - mở modal
//   const openEditModal = (project) => {
//     setSelectedProject(project);
//     formEdit.setFieldsValue({
//       name: project.name,
//       description: project.description,
//     });
//     setEditModalVisible(true);
//   };

//   // Chỉnh sửa dự án - submit
//   const onFinishEdit = async (values) => {
//     try {
//       setLoading(true);
//       await projectService.updateProject(selectedProject.id, values);
//       message.success("Project updated successfully!");
//       fetchProjects();
//       setEditModalVisible(false);
//     } catch (err) {
//       message.error("Failed to update project.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Xóa dự án - mở modal xác nhận
//   const openDeleteModal = (project) => {
//     setSelectedProject(project);
//     setDeleteModalVisible(true);
//   };

//   // Xóa dự án - thực hiện
//   const handleDeleteProject = async () => {
//     try {
//       setLoading(true);
//       await projectService.deleteProject(selectedProject.id);
//       message.success("Project deleted successfully!");
//       fetchProjects();
//     } catch (err) {
//       message.error("Failed to delete project.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setDeleteModalVisible(false);
//     }
//   };
//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("file", fileList[0]);

//     try {
//       setUploading(true);
//       await fileService.uploadProjectFile(currentProject.id, formData);
//       message.success("File uploaded successfully!");
//       setUploadModalVisible(false);
//     } catch (err) {
//       message.error("Failed to upload file.");
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Quản lý thành viên
//   const openMemberModal = async (project) => {
//     setSelectedProject(project);
//     try {
//       const res = await projectService.getProjectMembers(project.id);
//       setMembers(res.data.project.members || []);
//       setModalVisible(true);
//     } catch (err) {
//       message.error("Failed to load members.");
//       console.error(err);
//     }
//   };

//   // Thêm thành viên
//   const addMember = async (values) => {
//     try {
//       await projectService.addProjectMember(selectedProject.id, values);
//       message.success("Member added successfully!");
//       openMemberModal(selectedProject); // refresh
//     } catch (err) {
//       message.error("Failed to add member.");
//       console.error(err);
//     }
//   };

//   // Xóa thành viên
//   const removeMember = async (email) => {
//     try {
//       await projectService.removeProjectMember(selectedProject.id, { email });
//       message.success("Member removed successfully!");
//       openMemberModal(selectedProject); // refresh
//     } catch (err) {
//       message.error("Failed to remove member.");
//       console.error(err);
//     }
//   };

//   const openUploadModal = (project) => {
//     setCurrentProject(project);
//     setFileList([]);
//     setUploadModalVisible(true);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Tiêu đề + Nút tạo mới */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Your Projects</h2>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => setCreateModalVisible(true)}
//         >
//           Create New Project
//         </Button>
//       </div>

//       {/* Danh Sách Dự Án */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <Card
//               key={project.id}
//               title={project.name}
//               extra={
//                 <Space>
//                   <EditOutlined onClick={() => openEditModal(project)} />
//                   <DeleteOutlined onClick={() => openDeleteModal(project)} />
//                   <TeamOutlined onClick={() => openMemberModal(project)} />
//                   <UploadOutlined onClick={() => openUploadModal(project)} />
//                 </Space>
//               }
//             >
//               <p>{project.description}</p>
//             </Card>
//           ))
//         ) : (
//           <p>No projects found.</p>
//         )}
//       </div>

//       {/* Modal - Tạo Dự Án */}
//       <Modal
//         title="Create New Project"
//         open={createModalVisible}
//         onCancel={() => setCreateModalVisible(false)}
//         footer={null}
//       >
//         <Form form={formCreate} layout="vertical" onFinish={onFinishCreate}>
//           <Form.Item label="Name" name="name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Description" name="description">
//             <TextArea rows={3} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Create Project
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Modal - Chỉnh Sửa Dự Án */}
//       <Modal
//         title="Edit Project"
//         open={editModalVisible}
//         onCancel={() => setEditModalVisible(false)}
//         footer={null}
//       >
//         <Form form={formEdit} layout="vertical" onFinish={onFinishEdit}>
//           <Form.Item label="Name" name="name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Description" name="description">
//             <TextArea rows={3} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Update Project
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Modal - Xác Nhận Xóa Dự Án */}
//       <Modal
//         title="Confirm Delete"
//         open={deleteModalVisible}
//         onOk={handleDeleteProject}
//         onCancel={() => setDeleteModalVisible(false)}
//         okText="Yes, Delete"
//         okType="danger"
//         cancelText="Cancel"
//         confirmLoading={loading}
//       >
//         <p>
//           Are you sure you want to delete project "{selectedProject?.name}"?
//         </p>
//       </Modal>

//       {/* Modal - Quản Lý Thành Viên */}
//       <Modal
//         title={`Manage Members - ${selectedProject?.name}`}
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//       >
//         <Form onFinish={addMember} layout="inline" className="mb-4">
//           <Form.Item
//             name="email"
//             rules={[{ required: true, type: "email" }]}
//             label="Email"
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           <Form.Item name="role" label="Role" initialValue="member">
//             <Select style={{ width: 120 }}>
//               <Option value="member">Member</Option>
//               <Option value="owner">Owner</Option>
//             </Select>
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             Add Member
//           </Button>
//         </Form>
//         <Modal
//           title={`Upload File - ${currentProject?.name}`}
//           open={uploadModalVisible}
//           onCancel={() => setUploadModalVisible(false)}
//           footer={null}
//         >
//           <Form layout="vertical">
//             <Form.Item label="Select File">
//               <input
//                 type="file"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setFileList([file]);
//                   }
//                 }}
//               />
//             </Form.Item>

//             <Button
//               type="primary"
//               block
//               loading={uploading}
//               disabled={!fileList.length}
//               onClick={handleUpload}
//             >
//               Upload
//             </Button>
//           </Form>
//         </Modal>
//         <ul className="space-y-2">
//           {members.length > 0 ? (
//             members.map((member, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <span>{member.email}</span>
//                 <Button
//                   danger
//                   size="small"
//                   onClick={() => removeMember(member.email)}
//                 >
//                   Remove
//                 </Button>
//               </li>
//             ))
//           ) : (
//             <p>No members yet.</p>
//           )}
//         </ul>
//       </Modal>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import projectService from "../../services/projectService";
import fileService from "../../services/fileService"; // service mới
import {
  Form,
  Input,
  Button,
  Card,
  Modal,
  Select,
  Space,
  message,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  PlusOutlined,
  UploadOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const Dashboard = () => {
  const [formCreate] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]); // Danh sách file
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Lấy tất cả dự án
  const fetchProjects = async () => {
    try {
      const res = await userService.getAllProjectsCreatedByUser();
      setProjects(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Tạo mới dự án
  const onFinishCreate = async (values) => {
    try {
      setLoading(true);
      await projectService.createProject(values);
      formCreate.resetFields();
      message.success("Project created successfully!");
      fetchProjects();
      setCreateModalVisible(false);
    } catch (err) {
      message.error("Failed to create project.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Chỉnh sửa dự án
  const openEditModal = (project) => {
    setSelectedProject(project);
    formEdit.setFieldsValue({
      name: project.name,
      description: project.description,
    });
    setEditModalVisible(true);
  };

  const onFinishEdit = async (values) => {
    try {
      setLoading(true);
      await projectService.updateProject(selectedProject.id, values);
      message.success("Project updated successfully!");
      fetchProjects();
      setEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update project.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa dự án
  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setDeleteModalVisible(true);
  };

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      await projectService.deleteProject(selectedProject.id);
      message.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      message.error("Failed to delete project.");
      console.error(err);
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
    }
  };

  // Quản lý thành viên
  const openMemberModal = async (project) => {
    setSelectedProject(project);
    try {
      const res = await projectService.getProjectMembers(project.id);
      setMembers(res.data.project.members || []);
      setModalVisible(true);
    } catch (err) {
      message.error("Failed to load members.");
      console.error(err);
    }
  };

  const addMember = async (values) => {
    try {
      await projectService.addProjectMember(selectedProject.id, values);
      message.success("Member added successfully!");
      openMemberModal(selectedProject);
    } catch (err) {
      message.error("Failed to add member.");
      console.error(err);
    }
  };

  const removeMember = async (email) => {
    try {
      await projectService.removeProjectMember(selectedProject.id, { email });
      message.success("Member removed successfully!");
      openMemberModal(selectedProject);
    } catch (err) {
      message.error("Failed to remove member.");
      console.error(err);
    }
  };

  // Quản lý file
  const openUploadModal = async (project) => {
    setSelectedProject(project);
    try {
      const res = await fileService.getProjectFiles(project.id);
      setFiles(res.data.files || []);
    } catch (err) {
      message.error("Failed to load files. Please try again." + err.message);
    }
    setFileList([]);
    setUploadModalVisible(true);
  };

  const handleUpload = async () => {
    if (!fileList.length) return;

    const formData = new FormData();
    formData.append("file", fileList[0]);

    try {
      setUploading(true);
      await fileService.uploadProjectFile(selectedProject.id, formData);
      message.success("File uploaded successfully!");

      // Reload danh sách file
      const res = await fileService.getProjectFiles(selectedProject.id);
      setFiles(res.data.files || []);
      setFileList([]);
    } catch (err) {
      message.error("Failed to upload file.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (fileName) => {
    try {
      await fileService.deleteProjectFile(selectedProject.id, { fileName });
      message.success("File deleted successfully!");

      setFiles(files.filter((f) => f !== fileName));
    } catch (err) {
      message.error("Failed to delete file.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tiêu đề + Nút tạo mới */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create New Project
        </Button>
      </div>

      {/* Danh Sách Dự Án */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              title={project.name}
              extra={
                <Space>
                  <EditOutlined onClick={() => openEditModal(project)} />
                  <DeleteOutlined onClick={() => openDeleteModal(project)} />
                  <TeamOutlined onClick={() => openMemberModal(project)} />
                  <FolderOpenOutlined
                    onClick={() => openUploadModal(project)}
                  />
                </Space>
              }
            >
              <p>{project.description}</p>
            </Card>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      {/* Modal - Tạo Dự Án */}
      <Modal
        title="Create New Project"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <Form form={formCreate} layout="vertical" onFinish={onFinishCreate}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal - Chỉnh Sửa Dự Án */}
      <Modal
        title="Edit Project"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={formEdit} layout="vertical" onFinish={onFinishEdit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Update Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal - Xác Nhận Xóa Dự Án */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteProject}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <p>
          Are you sure you want to delete project "{selectedProject?.name}"?
        </p>
      </Modal>

      {/* Modal - Quản Lý Thành Viên */}
      <Modal
        title={`Manage Members - ${selectedProject?.name}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={addMember} layout="inline" className="mb-4">
          <Form.Item
            name="email"
            rules={[{ required: true, type: "email" }]}
            label="Email"
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="role" label="Role" initialValue="member">
            <Select style={{ width: 120 }}>
              <Option value="member">Member</Option>
              <Option value="owner">Owner</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Member
          </Button>
        </Form>

        <ul className="space-y-2">
          {members.length > 0 ? (
            members.map((member, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{member.email}</span>
                <Button
                  danger
                  size="small"
                  onClick={() => removeMember(member.email)}
                >
                  Remove
                </Button>
              </li>
            ))
          ) : (
            <p>No members yet.</p>
          )}
        </ul>
      </Modal>

      {/* Modal - Upload File */}
      <Modal
        title={`Upload Files - ${selectedProject?.name}`}
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Select File">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileList([file]);
                }
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            block
            loading={uploading}
            disabled={!fileList.length}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Form>

        <h3 className="mt-6 mb-2 font-semibold">Uploaded Files</h3>
        <ul className="space-y-2">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{file}</span>
                <Button danger size="small" onClick={() => removeFile(file)}>
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </ul>
      </Modal>
    </div>
  );
};

export default Dashboard;
