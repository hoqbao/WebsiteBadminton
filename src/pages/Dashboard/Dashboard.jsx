// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, DollarOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'T2', doanhThu: 4000000 },
  { name: 'T3', doanhThu: 3000000 },
  { name: 'T4', doanhThu: 2000000 },
  { name: 'T5', doanhThu: 2780000 },
  { name: 'T6', doanhThu: 1890000 },
  { name: 'T7', doanhThu: 9390000 }, // Cuối tuần cao
  { name: 'CN', doanhThu: 8490000 },
];

const Dashboard = () => {
  return (
    <div>
      <h2>Tổng quan hệ thống</h2>
      
      {/* Các thẻ thống kê số liệu */}
      <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#e6f7ff' }}>
            <Statistic title="Doanh thu hôm nay" value={11289300} prefix={<DollarOutlined />} suffix="VNĐ" />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#f6ffed' }}>
            <Statistic title="Lượt đặt sân mới" value={15} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#fff7e6' }}>
            <Statistic title="Khách hàng mới" value={8} prefix={<UserOutlined />} suffix={<ArrowUpOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <h3>Biểu đồ doanh thu tuần này</h3>
      <div style={{ height: 400, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
            <Legend />
            <Bar dataKey="doanhThu" name="Doanh Thu" fill="#1677ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;