// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        if(window.confirm("Bạn muốn đăng xuất?")) {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            navigate('/login');
            window.location.reload(); 
        }
    };

    return (
        <nav className="navbar" style={{
            // --- [SỬA MÀU Ở ĐÂY] ---
            // Đổi từ #333 (Đen) sang màu Xanh Dương (#007bff)
            background: 'linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)', 
            color: '#fff', 
            padding: '10px 30px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' // Thêm chút bóng đổ cho đẹp
        }}>
            <div className="logo">
                <Link to="/" style={{color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    🏸 BadmintonPro
                </Link>
            </div>
            
            <div className="menu" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <Link to="/" style={{color: '#fff', textDecoration: 'none', fontWeight: '500'}}>Trang chủ</Link>
                <Link to="/#search" style={{color: '#fff', textDecoration: 'none', fontWeight: '500'}}>Tìm sân</Link>
                
                {user ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <span style={{fontWeight: 'bold'}}>Hi, {user.name}</span>
                        
                        {/* Chỉ hiện Admin nếu role là ADMIN */}
                        {user.role === 'ADMIN' && (
                            <Link to="/admin" style={{color: '#ffc107', textDecoration: 'none', fontWeight: 'bold'}}>Quản trị</Link>
                        )}
                        
                        <img 
                            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                            alt="Avatar" 
                            style={{width: '35px', height: '35px', borderRadius: '50%', border: '2px solid white', cursor: 'pointer'}}
                            onClick={handleLogout}
                            title="Bấm để đăng xuất"
                        />
                    </div>
                ) : (
                    <Link to="/login" style={{
                        color: '#27ae60', 
                        textDecoration: 'none', 
                        background: '#fff', 
                        padding: '8px 20px', 
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        transition: '0.3s'
                    }}>
                        Đăng nhập
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;