// src/pages/Booking/BookingManager.jsx
import React, { useState } from 'react';
import { Table, Tag, Button, Space, Modal, message } from 'antd';

const BookingManager = () => {
  // Dữ liệu giả lập
  const [data, setData] = useState([
    { key: '1', customer: 'Nguyễn Văn A', court: 'Sân 1', date: '2025-11-29', time: '18:00 - 19:00', status: 'pending', total: 120000 },
    { key: '2', customer: 'Trần Thị B', court: 'Sân VIP', date: '2025-11-29', time: '19:00 - 21:00', status: 'approved', total: 300000 },
    { key: '3', customer: 'Lê Văn C', court: 'Sân 2', date: '2025-11-30', time: '08:00 - 09:00', status: 'rejected', total: 100000 },
  ]);

  // Hàm xử lý duyệt đơn
  const handleApprove = (id) => {
    const newData = data.map(item => item.key === id ? { ...item, status: 'approved' } : item);
    setData(newData);
    message.success('Đã duyệt đơn đặt sân!');
  };

  // Hàm xử lý hủy đơn
  const handleReject = (id) => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn hủy đơn này?',
      content: 'Hành động này không thể hoàn tác.',
      onOk: () => {
        const newData = data.map(item => item.key === id ? { ...item, status: 'rejected' } : item);
        setData(newData);
        message.info('Đã hủy đơn.');
      }
    });
  };

  const columns = [
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Sân', dataIndex: 'court', key: 'court' },
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Khung giờ', dataIndex: 'time', key: 'time' },
    { title: 'Thành tiền', dataIndex: 'total', key: 'total', render: (val) => val.toLocaleString() + ' đ' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red';
        let text = status === 'approved' ? 'Đã duyệt' : status === 'pending' ? 'Chờ duyệt' : 'Đã hủy';
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button type="primary" size="small" onClick={() => handleApprove(record.key)}>Duyệt</Button>
              <Button danger size="small" onClick={() => handleReject(record.key)}>Hủy</Button>
            </>
          )}
          {record.status === 'approved' && <Button size="small">Check-in</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Đặt Sân</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BookingManager;