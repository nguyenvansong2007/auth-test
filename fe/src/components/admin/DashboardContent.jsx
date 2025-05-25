// src/components/admin/DashboardContent.jsx
import React from "react";
import { Grid, Users, DollarSign, Activity, Building } from "lucide-react";
import { Card, Row, Col, Table } from "antd";

const DashboardContent = () => {
  const statsData = [
    { title: "Tổng Tài Khoản", value: "2,450", icon: <Users /> },
    { title: "Tổng Công Ty", value: "120", icon: <Building /> },
    { title: "Doanh Thu", value: "$35,680", icon: <DollarSign /> },
    { title: "Truy cập hôm nay", value: "1,340", icon: <Activity /> },
  ];

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      role: "Admin",
      date: "2025-04-01",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "b@example.com",
      role: "User",
      date: "2025-04-02",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "c@example.com",
      role: "Editor",
      date: "2025-04-03",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
        <div className="text-sm text-gray-500 flex items-center">
          <Grid className="mr-1 h-4 w-4" /> Tổng quan hệ thống
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsData.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="shadow-md rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.value}
                  </h2>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart Placeholder */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={16}>
          <Card title="Biểu đồ truy cập" className="shadow-md rounded-lg">
            {/* Giả lập biểu đồ với div nếu chưa có thư viện chart */}
            <div className="h-48 bg-white border border-gray-200 rounded p-4 flex items-center justify-center text-gray-400">
              Nơi hiển thị biểu đồ hoạt động...
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Hiệu suất" className="shadow-md rounded-lg h-full">
            <div className="h-48 bg-white border border-gray-200 rounded p-4 flex items-center justify-center text-gray-400">
              Hiệu suất tổng thể
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Users */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Người dùng gần đây" className="shadow-md rounded-lg">
            <Table dataSource={data} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
