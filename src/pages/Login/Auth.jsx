import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
  
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Xử lý khi nhập liệu
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Xử lý khi bấm nút Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // --- LOGIC ĐĂNG NHẬP (QUAN TRỌNG: Cần lưu vào localStorage) ---
      
      // 1. Tạo dữ liệu người dùng giả lập (Mock Data)
      // Trong thực tế, dữ liệu này sẽ do Backend trả về sau khi check DB
      const mockUser = {
        // Nếu nhập email thì lấy tên trước @, nếu không thì lấy nguyên chuỗi
        name: formData.email.includes('@') ? formData.email.split('@')[0] : formData.email, 
        email: formData.email,
        avatar: "https://i.pravatar.cc/150?img=12", // Ảnh đại diện ngẫu nhiên
        role: "user" 
      };

      // 2. LƯU VÀO BỘ NHỚ TRÌNH DUYỆT -> Để App.js đọc được
      localStorage.setItem('currentUser', JSON.stringify(mockUser));

      // 3. Thông báo và chuyển hướng
      alert("Đăng nhập thành công!");
      navigate('/'); // Chuyển về trang chủ
    } else {
      // --- LOGIC ĐĂNG KÝ ---
      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      console.log("Đang đăng ký:", formData);
      // Với demo, đăng ký xong chỉ cần báo thành công và chuyển qua tab đăng nhập
      alert("Đăng ký tài khoản thành công! Mời bạn đăng nhập.");
      setIsLogin(true); // Chuyển sang tab đăng nhập
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h2>🏸 BadmintonPro</h2>
          <p>Chào mừng bạn quay trở lại!</p>
        </div>

        {/* Nút chuyển đổi Login / Register */}
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Đăng nhập
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Chỉ hiện tên khi Đăng Ký */}
          {!isLogin && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input 
                type="text" 
                name="fullName"
                className="form-control" 
                placeholder="Nguyễn Văn A"
                required={!isLogin}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email / Số điện thoại</label>
            <input 
              type="text" 
              name="email"
              className="form-control" 
              placeholder="example@gmail.com"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              name="password"
              className="form-control" 
              placeholder="******"
              required
              onChange={handleChange}
            />
          </div>

          {/* Chỉ hiện xác nhận mật khẩu khi Đăng Ký */}
          {!isLogin && (
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="form-control" 
                placeholder="******"
                required={!isLogin}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="btn-submit">
            {isLogin ? "Đăng Nhập Ngay" : "Tạo Tài Khoản"}
          </button>
        </form>

        <div className="auth-footer">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            &larr; Quay lại trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;