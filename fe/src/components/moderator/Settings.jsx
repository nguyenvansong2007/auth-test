// SettingsDashboard.jsx

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Switch } from 'antd';
import { Home, User, Bell, Settings } from 'lucide-react';

// ================== Components ==================

const SettingSidebar = () => {
  const menuItems = [
    { name: 'Tổng quan', path: '.', icon: <Home size={18} /> },
    { name: 'Thông tin tài khoản', path: 'account', icon: <User size={18} /> },
    { name: 'Thông báo', path: 'notifications', icon: <Bell size={18} /> },
    { name: 'Cài đặt hệ thống', path: 'general', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Cài đặt</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SettingsLayout = ({ children }) => {
  return (
    <div className="flex gap-6 p-6">
      <SettingSidebar />
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        {children}
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <Card title="Cài đặt hệ thống" bordered={false}>
      <p>Chức năng tùy chỉnh giao diện, ngôn ngữ, đơn vị tiền tệ...</p>
    </Card>
  );
};

const AccountSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Lưu thông tin:', values);
  };

  return (
    <Card title="Thông tin tài khoản" bordered={false}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ name: 'Nguyen Van A', email: 'a@example.com' }}>
        <Form.Item label="Tên người dùng" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu thay đổi
        </Button>
      </Form>
    </Card>
  );
};

const NotificationSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Thiết lập thông báo</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 border rounded">
          <span>Nhận thông báo qua Email</span>
          <Switch defaultChecked />
        </div>
        <div className="flex justify-between items-center p-3 border rounded">
          <span>Nhận thông báo qua SMS</span>
          <Switch />
        </div>
        <div className="flex justify-between items-center p-3 border rounded">
          <span>Thông báo hàng ngày</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
};

// ================== Main Component ==================

const SettingsDashboard = () => {
  return (
    <SettingsLayout>
      <Routes>
        <Route index element={<GeneralSettings />} />
        <Route path="general" element={<GeneralSettings />} />
        <Route path="account" element={<AccountSettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
      </Routes>
    </SettingsLayout>
  );
};

export default SettingsDashboard;