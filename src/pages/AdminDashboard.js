// src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>📊 Tổng Quan Hệ Thống</h1>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Card 1: Doanh thu */}
                <div style={{ flex: 1, minWidth: '250px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #2ecc71' }}>
                    <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '1rem' }}>Doanh thu tháng này</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', margin: '10px 0' }}>15.400.000 đ</p>
                </div>

                {/* Card 2: Số sân */}
                <div style={{ flex: 1, minWidth: '250px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #3498db' }}>
                    <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '1rem' }}>Tổng số sân</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', margin: '10px 0' }}>12 Sân</p>
                </div>

                {/* Card 3: Đơn đặt */}
                <div style={{ flex: 1, minWidth: '250px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #f1c40f' }}>
                    <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '1rem' }}>Đơn đặt hôm nay</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', margin: '10px 0' }}>25 Đơn</p>
                </div>
            </div>

            <div style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3>🔔 Hoạt động gần đây</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>👤 <b>Nguyễn Văn A</b> vừa đặt sân <b>Sân 1</b> (17:00 - 18:00)</li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>👤 <b>Trần Thị B</b> vừa đăng ký tài khoản mới.</li>
                    <li style={{ padding: '10px 0' }}>✅ <b>Admin</b> vừa cập nhật giá sân <b>Sân Vip</b>.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;