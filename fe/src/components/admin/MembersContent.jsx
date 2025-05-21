import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  Space,
} from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";

const MembersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const roleOptions = ["admin", "moderator", "user"];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUser();
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (values) => {
    try {
      await userService.createUser(values);
      message.success("User created successfully");
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      message.error("Failed to create user");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await userService.updateUser(editingId, values);
      message.success("User updated successfully");
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      message.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: "text-gray-700",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-700",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      // render: (roles) => roles.join(", ") || "-",
      render: (roles) =>
        Array.isArray(roles)
          ? roles.map((role) => role.name).join(", ")
          : "-",
    },
    {
      title: "Actions",
      key: "actions",
      className: "text-gray-700",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            <Pencil size={16} />
            <span>Edit</span>
          </Button>
          <Button
            danger
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600"
            onClick={() => handleDelete(record.id)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    
    <div className="p-6">
      <div className="mb-4">
        <Button
          type="primary"
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          <Plus size={16} />
          <span>Add User</span>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        className="bg-white rounded-lg shadow"
      />

      <Modal
        title={editingId ? "Edit User" : "Create User"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        footer={null}
        className="rounded-lg"
      >
        <Form
          form={form}
          onFinish={editingId ? handleUpdate : handleCreate}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input username!" }]}
            className="mb-4"
          >
            <Input className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className="mb-4"
          >
            <Input className="rounded-md" />
          </Form.Item>
          {!editingId && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input password!" }]}
              className="mb-4"
            >
              <Input.Password className="rounded-md" />
            </Form.Item>
          )}
          <Form.Item
            name="roles"
            label="Roles"
            rules={[
              { required: true, message: "Please select at least one role!" },
            ]}
            className="mb-4"
          >
            <Select
              mode="tags"
              options={roleOptions.map((role) => ({
                value: role,
                label: role,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              {editingId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MembersContent;
