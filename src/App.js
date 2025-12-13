// src/App.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// --- IMPORT CÁC TRANG ---
import Auth from './pages/Login/Auth'; // Trang Login
import AdminLayout from './layouts/AdminLayout'; // Khung giao diện Admin
import Dashboard from './pages/Dashboard/Dashboard'; // Thống kê
import BookingManager from './pages/Booking/BookingManager'; // Quản lý đặt sân
import CourtManager from './pages/Court/CourtManager'; // Quản lý sân bãi

// 1. Dữ liệu giả (Giữ nguyên)
const DUMMY_COURTS = [
  {
    id: 1,
    name: "Sân Cầu Lông Khánh Phạm",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    area: "Quận 5",
    price: 60000,
    image: "https://cdn.shopvnb.com/uploads/images/tin_tuc/bo-cau-long-1.webp",
    rating: 4.5
  },
  {
    id: 2,
    name: "Sân VinaSports Thủ Đức",
    address: "45 Võ Văn Ngân, Thủ Đức, TP.HCM",
    area: "Thủ Đức",
    price: 55000,
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=500&q=60",
    rating: 4.8
  },
  {
    id: 3,
    name: "CLB Cầu Lông Tuổi Trẻ",
    address: "88 Lê Duẩn, Quận 1, TP.HCM",
    area: "Quận 1",
    price: 80000,
    image: "https://cdn.shopvnb.com/uploads/images/tin_tuc/cau-long-la-gi-tim-hieu-so-bo-ve-bo-mon-cau-long-1.webp",
    rating: 4.2
  },
  {
    id: 4,
    name: "Sân Cầu Lông Gò Vấp",
    address: "12 Phan Văn Trị, Gò Vấp, TP.HCM",
    area: "Gò Vấp",
    price: 50000,
    image: "https://www.shutterstock.com/image-vector/badminton-abstract-background-design-vector-600nw-2640301293.jpg",
    rating: 4.0
  }
];

// ----------------------------------------------------------
// COMPONENT 1: HomePage (Trang khách hàng)
// ----------------------------------------------------------
function HomePage() {
  // --- STATE QUẢN LÝ USER (MỚI THÊM) ---
  const [user, setUser] = useState(null);

  // --- STATE QUẢN LÝ TÌM KIẾM & ĐẶT SÂN ---
  const [filters, setFilters] = useState({ keyword: '', area: 'all', priceRange: 'all' });
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({ date: '', time: '17:00', name: '', phone: '' });

  // --- EFFECT: KIỂM TRA ĐĂNG NHẬP (MỚI THÊM) ---
  useEffect(() => {
    // Lấy thông tin user từ bộ nhớ trình duyệt
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- HÀM ĐĂNG XUẤT (MỚI THÊM) ---
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem('currentUser'); // Xoá session
      setUser(null); // Reset state
    }
  };

  // --- LOGIC LỌC SÂN (GIỮ NGUYÊN) ---
  const filteredCourts = useMemo(() => {
    return DUMMY_COURTS.filter(court => {
      const matchName = court.name.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchArea = filters.area === 'all' || court.area === filters.area;
      let matchPrice = true;
      if (filters.priceRange === 'low') matchPrice = court.price < 60000;
      if (filters.priceRange === 'mid') matchPrice = court.price >= 60000 && court.price <= 70000;
      if (filters.priceRange === 'high') matchPrice = court.price > 70000;
      return matchName && matchArea && matchPrice;
    });
  }, [filters]);

  const handleFilterChange = (e) => { const { name, value } = e.target; setFilters(prev => ({ ...prev, [name]: value })); };
  const handleBookClick = (court) => setSelectedCourt(court);
  const handleCloseModal = () => { setSelectedCourt(null); setBookingInfo({ date: '', time: '17:00', name: '', phone: '' }); };
  const handleInputChange = (e) => { const { name, value } = e.target; setBookingInfo({ ...bookingInfo, [name]: value }); };
  const handleSubmitBooking = (e) => { e.preventDefault(); alert(`Đặt thành công!\nSân: ${selectedCourt.name}`); handleCloseModal(); };

  return (
    <>
      <header className="header">
        <div className="logo">🏸 BadmintonPro</div>
        <nav className="nav-links">
          <Link to="/">Trang chủ</Link>
          <a href="#search">Tìm sân</a>

{/* --- LOGIC HIỂN THỊ: ẢNH + TÊN --- */}
{user ? (
  // Nếu ĐÃ đăng nhập
  <div 
    className="user-profile" 
    onClick={handleLogout} 
    title="Bấm để đăng xuất"
  >
    {/* Hiển thị tên */}
    <span className="user-welcome">Chào, {user.name}</span>
    
    {/* Hiển thị ảnh */}
    <img 
      src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
      alt="Avatar" 
      className="user-avatar-circle"
    />
  </div>
) : (
  // Nếu CHƯA đăng nhập
  <Link to="/login" className="btn-login">Đăng nhập</Link>
)}
        </nav>
      </header>

      <section className="hero">
        <h1>Đặt Sân Cầu Lông Dễ Dàng</h1>
        <p>Tìm sân gần bạn nhất và đặt ngay trong 30 giây</p>
      </section>

      <div className="container" id="search">
        <div className="search-section">
          <div className="search-group">
            <label>Tìm tên sân</label>
            <input 
              type="text" name="keyword" className="search-input" 
              placeholder="Nhập tên sân..." 
              value={filters.keyword} onChange={handleFilterChange}
            />
          </div>
          <div className="search-group">
            <label>Khu vực</label>
            <select name="area" className="search-select" value={filters.area} onChange={handleFilterChange}>
              <option value="all">Tất cả khu vực</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 5">Quận 5</option>
              <option value="Thủ Đức">Thủ Đức</option>
              <option value="Gò Vấp">Gò Vấp</option>
            </select>
          </div>
          <div className="search-group">
            <label>Mức giá</label>
            <select name="priceRange" className="search-select" value={filters.priceRange} onChange={handleFilterChange}>
              <option value="all">Tất cả mức giá</option>
              <option value="low">Dưới 60k</option>
              <option value="mid">60k - 70k</option>
              <option value="high">Trên 70k</option>
            </select>
          </div>
          <button className="btn-search">Tìm kiếm</button>
        </div>
      </div>

      <main className="container">
        <h2 className="section-title">
          {filteredCourts.length > 0 ? "Kết quả tìm kiếm" : "Không tìm thấy sân phù hợp"}
        </h2>
        {filteredCourts.length > 0 ? (
          <div className="court-grid">
            {filteredCourts.map((court) => (
              <div key={court.id} className="court-card">
                <img src={court.image} alt={court.name} className="card-img" />
                <div className="card-body">
                  <h3 className="court-name">{court.name}</h3>
                  <div className="court-info">📍 {court.address}</div>
                  <div className="court-info">⭐ {court.rating}/5.0</div>
                  <div className="price">{court.price.toLocaleString()} VND / giờ</div>
                  <button className="btn-book" onClick={() => handleBookClick(court)}>
                    Đặt Sân Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-result">😞 Rất tiếc, không có sân nào khớp với tìm kiếm của bạn.</div>
        )}
      </main>

      <footer style={{textAlign: 'center', padding: '20px', background: '#ddd', marginTop: '50px'}}>
        <p>&copy; 2025 BadmintonPro. All rights reserved.</p>
      </footer>

      {selectedCourt && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            <h2 style={{color: 'var(--primary-dark)'}}>Đặt sân: {selectedCourt.name}</h2>
            <p style={{marginBottom: '20px'}}>Giá: <b>{selectedCourt.price.toLocaleString()} VND/h</b></p>
            <form onSubmit={handleSubmitBooking}>
              <div className="form-group">
                <label>Họ tên:</label>
                <input type="text" name="name" required placeholder="Nhập tên" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>SĐT:</label>
                <input type="tel" name="phone" required placeholder="09xxxx" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Ngày:</label>
                <input type="date" name="date" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Giờ:</label>
                <select name="time" onChange={handleInputChange}>
                  <option value="17:00">17:00 - 18:00</option>
                  <option value="18:00">18:00 - 19:00</option>
                </select>
              </div>
              <button type="submit" className="btn-book">Xác nhận</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ----------------------------------------------------------
// COMPONENT 2: App Chính (Điều hướng Router)
// ----------------------------------------------------------
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. KHÁCH HÀNG: Trang chủ mặc định */}
        <Route path="/" element={<HomePage />} />
        
        {/* 2. AUTH: Trang đăng nhập */}
        <Route path="/login" element={<Auth />} />

        {/* 3. ADMIN: Các trang quản trị (Bắt đầu bằng /admin) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />             
          <Route path="bookings" element={<BookingManager />} /> 
          <Route path="courts" element={<CourtManager />} />    
        </Route>

      </Routes>
    </Router>
  );
}

export default App;