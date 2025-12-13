// src/pages/Court/CourtManager.jsx
import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal, Form, Input, InputNumber, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CourtManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dữ liệu giả
  const courts = [
    { id: 1, name: 'Sân 01', type: 'Thường', price: 100000, active: true },
    { id: 2, name: 'Sân 02', type: 'Thường', price: 100000, active: true },
    { id: 3, name: 'Sân VIP', type: 'VIP (Thảm xịn)', price: 150000, active: true },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Danh sách Sân Cầu Lông</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm sân mới
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {courts.map((court) => (
          <Col xs={24} sm={12} md={8} lg={6} key={court.id}>
            <Card
              title={court.name}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" style={{ color: 'red' }} />,
              ]}
            >
              <p><b>Loại sân:</b> {court.type}</p>
              <p><b>Giá:</b> {court.price.toLocaleString()} đ/giờ</p>
              <p><b>Trạng thái:</b> {court.active ? <span style={{color:'green'}}>Hoạt động</span> : 'Bảo trì'}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Thêm sân (Chỉ là giao diện, chưa xử lý logic) */}
      <Modal title="Thêm Sân Mới" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)}>
        <Form layout="vertical">
          <Form.Item label="Tên sân"><Input placeholder="Ví dụ: Sân 04" /></Form.Item>
          <Form.Item label="Giá theo giờ"><InputNumber style={{ width: '100%' }} defaultValue={100000} /></Form.Item>
          <Form.Item label="Mô tả"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item label="Đang hoạt động"><Switch defaultChecked /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourtManager;