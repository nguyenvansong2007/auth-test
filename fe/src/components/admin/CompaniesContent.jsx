import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, message, Spin } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";
import companyService from "../../services/companyService";

const CompaniesContent = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await companyService.getAllCompanies();
      setCompanies(res.data);
    } catch (err) {
      message.error("Lỗi tải dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async (values) => {
    try {
      setSubmitLoading(true);
      await companyService.createCompany(values);
      message.success("Thêm công ty thành công");
      closeModal();
      fetchCompanies();
    } catch (err) {
      message.error("Không thể thêm công ty: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setSubmitLoading(true);
      await companyService.updateCompany(editingId, values);
      message.success("Cập nhật công ty thành công");
      closeModal();
      fetchCompanies();
    } catch (err) {
      message.error("Không thể cập nhật: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await companyService.deleteCompany(id);
      message.success("Xóa công ty thành công");
      fetchCompanies();
    } catch (err) {
      message.error("Không thể xóa: " + err.message);
    }
  };

  const openEditModal = (company) => {
    setEditingId(company.id);
    form.setFieldsValue(company);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };

  const onOk = () => {
    form.validateFields().then((values) => {
      editingId ? handleUpdate(values) : handleCreate(values);
    });
  };

  const columns = [
    {
      title: "Tên công ty",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2 justify-center">
          <Button
            onClick={() => openEditModal(record)}
            icon={<Pencil size={16} />}
          />
          <Button
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Quản lý Công ty</h2>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setModalVisible(true)}
        >
          Thêm Công ty
        </Button>
      </div>

      {/* Bảng danh sách */}
      <Spin spinning={loading}>
        <Table
          dataSource={companies}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Spin>

      {/* Modal Ant Design */}
      <Modal
        title={editingId ? "Chỉnh sửa công ty" : "Thêm công ty mới"}
        visible={modalVisible}
        onOk={onOk}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitLoading}
            onClick={onOk}
          >
            {editingId ? "Cập nhật" : "Tạo mới"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item
            label="Tên công ty"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
          >
            <Input placeholder="Nhập tên công ty" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompaniesContent;
