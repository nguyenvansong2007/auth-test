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
      setCompanies(res.data || []);
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
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa công ty này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await companyService.deleteCompany(id);
          message.success("Xóa công ty thành công");
          fetchCompanies();
        } catch (err) {
          message.error("Không thể xóa: " + err.message);
        }
      },
    });
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
      width: 180,
      onCell: () => ({ className: "whitespace-nowrap" }),
    },
    {
      title: "Email Moderator",
      key: "moderatorEmail",
      width: 200,
      onCell: () => ({ className: "hidden sm:table-cell whitespace-nowrap" }),
      render: (_, record) =>
        record.moderators && record.moderators.length > 0
          ? record.moderators[0].email
          : "N/A",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 200,
      onCell: () => ({ className: "hidden md:table-cell whitespace-nowrap" }),
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      onCell: () => ({ className: "hidden sm:table-cell whitespace-nowrap" }),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <div className="flex space-x-2 justify-center">
          <Button
            size="small"
            onClick={() => openEditModal(record)}
            icon={<Pencil size={14} />}
          />
          <Button
            size="small"
            danger
            icon={<Trash2 size={14} />}
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

// // src/pages/CompaniesContent.jsx
// import React, { useState, useEffect } from "react";
// import { Table, Modal, Form, Input, Button, message, Spin } from "antd";
// import { Plus, Pencil, Trash2 } from "lucide-react";
// import companyService from "../../services/companyService";

// const CompaniesContent = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form] = Form.useForm();
//   const [submitLoading, setSubmitLoading] = useState(false);

//   // Lấy danh sách công ty
//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);
//       const res = await companyService.getAllCompanies();
//       setCompanies(res.data || []);
//     } catch (err) {
//       message.error("Lỗi tải dữ liệu: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Thêm mới công ty
//   const handleCreate = async (values) => {
//     try {
//       setSubmitLoading(true);
//       await companyService.createCompany(values);
//       message.success("Thêm công ty thành công");
//       closeModal();
//       fetchCompanies();
//     } catch (err) {
//       message.error("Không thể thêm công ty: " + err.message);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // Cập nhật công ty
//   const handleUpdate = async (values) => {
//     try {
//       setSubmitLoading(true);
//       await companyService.updateCompany(editingId, values);
//       message.success("Cập nhật công ty thành công");
//       closeModal();
//       fetchCompanies();
//     } catch (err) {
//       message.error("Không thể cập nhật: " + err.message);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // Xóa công ty
//   const handleDelete = async (id) => {
//     Modal.confirm({
//       title: "Xác nhận xóa",
//       content: "Bạn có chắc chắn muốn xóa công ty này không?",
//       okText: "Xóa",
//       cancelText: "Hủy",
//       onOk: async () => {
//         try {
//           await companyService.deleteCompany(id);
//           message.success("Xóa công ty thành công");
//           fetchCompanies();
//         } catch (err) {
//           message.error("Không thể xóa: " + err.message);
//         }
//       },
//     });
//   };

//   // Mở modal sửa
//   const openEditModal = (company) => {
//     setEditingId(company.id);
//     form.setFieldsValue(company);
//     setModalVisible(true);
//   };

//   // Đóng modal
//   const closeModal = () => {
//     setModalVisible(false);
//     setEditingId(null);
//     form.resetFields();
//   };

//   // Submit form
//   const onOk = () => {
//     form.validateFields().then((values) => {
//       editingId ? handleUpdate(values) : handleCreate(values);
//     });
//   };

//   const columns = [
//     {
//       title: "Tên công ty",
//       dataIndex: "name",
//       key: "name",
//       width: 180,
//       onCell: () => ({ className: "whitespace-nowrap" }),
//     },
//     {
//       title: "Email Moderator",
//       key: "moderatorEmail",
//       width: 200,
//       onCell: () => ({ className: "hidden sm:table-cell whitespace-nowrap" }),
//       render: (_, record) =>
//         record.moderators && record.moderators.length > 0
//           ? record.moderators[0].email
//           : "N/A",
//     },
//     {
//       title: "Địa chỉ",
//       dataIndex: "address",
//       key: "address",
//       width: 200,
//       onCell: () => ({ className: "hidden md:table-cell whitespace-nowrap" }),
//     },
//     {
//       title: "SĐT",
//       dataIndex: "phone",
//       key: "phone",
//       width: 150,
//       onCell: () => ({ className: "hidden sm:table-cell whitespace-nowrap" }),
//     },
//     {
//       title: "Hành động",
//       key: "actions",
//       width: 120,
//       fixed: "right",
//       render: (_, record) => (
//         <div className="flex space-x-2 justify-center">
//           <Button
//             size="small"
//             onClick={() => openEditModal(record)}
//             icon={<Pencil size={14} />}
//           />
//           <Button
//             size="small"
//             danger
//             icon={<Trash2 size={14} />}
//             onClick={() => handleDelete(record.id)}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-4 md:p-6">
//       {/* Tiêu đề + Nút thêm */}
//       <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h2 className="text-xl font-semibold">Quản lý Công ty</h2>
//         <Button
//           type="primary"
//           icon={<Plus size={16} />}
//           onClick={() => setModalVisible(true)}
//         >
//           Thêm Công ty
//         </Button>
//       </div>

//       {/* Bảng danh sách công ty - Responsive */}
//       <Spin spinning={loading}>
//         <div className="overflow-x-auto rounded-lg border">
//           <Table
//             dataSource={companies}
//             columns={columns}
//             rowKey="id"
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: "max-content" }}
//             className="ant-table-rounded w-full"
//           />
//         </div>
//       </Spin>

//       {/* Modal tạo/sửa công ty */}
//       <Modal
//         title={editingId ? "Chỉnh sửa công ty" : "Thêm công ty mới"}
//         visible={modalVisible}
//         onOk={onOk}
//         onCancel={closeModal}
//         footer={[
//           <Button key="cancel" onClick={closeModal}>
//             Hủy
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             loading={submitLoading}
//             onClick={onOk}
//           >
//             {editingId ? "Cập nhật" : "Tạo mới"}
//           </Button>,
//         ]}
//         width="90%"
//         style={{ maxWidth: 600 }}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           requiredMark="optional"
//           className="px-2"
//         >
//           <Form.Item
//             label="Tên công ty"
//             name="name"
//             rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
//           >
//             <Input placeholder="Nhập tên công ty" />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, type: "email", message: "Email không hợp lệ!" },
//             ]}
//           >
//             <Input placeholder="Nhập email" />
//           </Form.Item>
//           <Form.Item label="Địa chỉ" name="address">
//             <Input placeholder="Nhập địa chỉ" />
//           </Form.Item>
//           <Form.Item label="Số điện thoại" name="phone">
//             <Input placeholder="Nhập số điện thoại" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CompaniesContent;
