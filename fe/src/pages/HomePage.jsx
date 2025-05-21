// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Typography, Row, Col } from "antd";
import {
  Layers,
  Users,
  Clock,
  BarChart3,
  CheckCircle2,
  Building2,
  ArrowRight,
} from "lucide-react";
import bimImage from "../assets/img/img_1.jpg";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 px-6 md:px-12 lg:px-20 py-12">
        {/* Hero Section */}
        <section className="text-center py-16">
          <Title
            level={1}
            className="text-4xl sm:text-5xl font-bold leading-tight"
          >
            Giải pháp BIM toàn diện
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 mb-8">
            Công cụ mạnh mẽ giúp bạn thiết kế, phân tích và quản lý dự án xây
            dựng hiệu quả.
          </Paragraph>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight className="ml-1" />}
            >
              Dùng thử miễn phí
            </Button>
            <Button size="large">
              <a href="https://www.youtube.com/watch?v=QEyCn8tDkxs&t=4s" target="_blank">
                Xem video giới thiệu
              </a>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <Title level={2} className="text-3xl font-bold">
              Tính năng nổi bật
            </Title>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              BIMSoft cung cấp đầy đủ các công cụ cần thiết để thiết kế, phân
              tích và quản lý dự án xây dựng của bạn.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <Layers size={40} />
                </div>
                <Title level={4}>Mô hình 3D chi tiết</Title>
                <Paragraph className="text-gray-600">
                  Tạo và quản lý mô hình 3D chi tiết với thông tin đầy đủ về các
                  thành phần công trình.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <Users size={40} />
                </div>
                <Title level={4}>Cộng tác thời gian thực</Title>
                <Paragraph className="text-gray-600">
                  Làm việc cùng nhau trên cùng một mô hình với khả năng cộng tác
                  thời gian thực.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <Clock size={40} />
                </div>
                <Title level={4}>Lập kế hoạch 4D</Title>
                <Paragraph className="text-gray-600">
                  Tích hợp lịch trình dự án với mô hình 3D để tạo mô phỏng tiến
                  độ xây dựng.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <BarChart3 size={40} />
                </div>
                <Title level={4}>Phân tích chi phí 5D</Title>
                <Paragraph className="text-gray-600">
                  Ước tính và theo dõi chi phí dự án dựa trên thông tin từ mô
                  hình BIM.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <Title level={4}>Kiểm tra xung đột</Title>
                <Paragraph className="text-gray-600">
                  Phát hiện và giải quyết xung đột giữa các hệ thống trước khi
                  xây dựng.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
                <div className="text-primary mb-4">
                  <Building2 size={40} />
                </div>
                <Title level={4}>Thư viện đối tượng</Title>
                <Paragraph className="text-gray-600">
                  Thư viện phong phú các đối tượng và vật liệu xây dựng có thể
                  tùy chỉnh.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Title level={2} className="text-3xl font-bold mb-4">
                Tối ưu hóa quy trình làm việc của bạn
              </Title>
              <Paragraph className="text-gray-600 mb-6">
                BIMSoft giúp các kiến trúc sư, kỹ sư và nhà thầu làm việc hiệu
                quả hơn, giảm thiểu lỗi và tiết kiệm chi phí.
              </Paragraph>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-500 mt-0.5" />
                  <span>
                    Giảm 40% thời gian thiết kế so với phương pháp truyền thống
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-500 mt-0.5" />
                  <span>
                    Giảm 30% chi phí xây dựng nhờ phát hiện xung đột sớm
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-500 mt-0.5" />
                  <span>
                    Cải thiện 50% hiệu quả cộng tác giữa các bên liên quan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-500 mt-0.5" />
                  <span>
                    Tăng 35% độ chính xác trong ước tính chi phí dự án
                  </span>
                </li>
              </ul>
              <Button type="primary" size="large" className="mt-8">
                Tìm hiểu thêm <ArrowRight className="ml-1" />
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={bimImage}
                alt="BIM Software Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="text-center mb-12">
            <Title level={2} className="text-3xl font-bold">
              Bảng giá linh hoạt
            </Title>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              Chọn gói phù hợp với nhu cầu và quy mô dự án của bạn.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} lg={8}>
              <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Title level={4}>Cơ bản</Title>
                <Paragraph className="text-gray-600">
                  Dành cho cá nhân & dự án nhỏ
                </Paragraph>
                <div className="my-4">
                  <span className="text-3xl font-bold">2.990.000đ</span>
                  <span className="text-gray-500 ml-1">/tháng</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Mô hình 3D cơ bản</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Thư viện tiêu chuẩn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Hỗ trợ email</span>
                  </li>
                </ul>
                <Button block>Khởi động dùng thử</Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card className="border border-primary rounded-lg shadow-md hover:shadow-lg relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-md">
                  Phổ biến
                </div>
                <Title level={4}>Chuyên nghiệp</Title>
                <Paragraph className="text-gray-600">
                  Dành cho doanh nghiệp vừa
                </Paragraph>
                <div className="my-4">
                  <span className="text-3xl font-bold">5.990.000đ</span>
                  <span className="text-gray-500 ml-1">/tháng</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Mô hình 3D nâng cao</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Lập kế hoạch 4D</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Cộng tác thời gian thực</span>
                  </li>
                </ul>
                <Button type="primary" block>
                  Đăng ký ngay
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Title level={4}>Doanh nghiệp</Title>
                <Paragraph className="text-gray-600">
                  Dành cho tổ chức lớn
                </Paragraph>
                <div className="my-4">
                  <span className="text-3xl font-bold">Liên hệ</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Tất cả tính năng Chuyên nghiệp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>API tùy chỉnh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Hỗ trợ 24/7</span>
                  </li>
                </ul>
                <Button block>Liên hệ với chúng tôi</Button>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white text-center rounded-lg">
          <Title level={2} className="text-3xl font-bold mb-4 text-white">
            Sẵn sàng nâng cao hiệu quả dự án của bạn?
          </Title>
          <Paragraph className="max-w-2xl mx-auto mb-6 text-white">
            Đăng ký dùng thử miễn phí 14 ngày và khám phá cách BIMSoft có thể
            cải thiện quy trình làm việc của bạn.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button type="primary" size="large">
              Xem demo
            </Button>
            <Button
              type="default"
              size="large"
              className="bg-white outline-2 text-primary hover:bg-gray-100"
            >
              Bắt đầu dùng thử miễn phí
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
