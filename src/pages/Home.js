import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import courtApi from "../api/courtApi"; // Đi ra 1 cấp folder để vào api
import BookingModal from "../components/BookingModal"; // Đi ra 1 cấp để vào components

const Home = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    area: "all",
    priceRange: "all",
  });
  const [selectedCourt, setSelectedCourt] = useState(null);

  // 1. Gọi API lấy danh sách sân
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await courtApi.getAll();
        console.log("Data sân:", response.data);
        if (Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          setCourts([]);
        }
      } catch (error) {
        console.error("Lỗi tải sân:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  // 2. Logic lọc sân
  const filteredCourts = useMemo(() => {
    if (!Array.isArray(courts)) return [];
    return courts.filter((court) => {
      const matchName = court.name
        .toLowerCase()
        .includes(filters.keyword.toLowerCase());
      // Logic giá (dựa vào pricePerHour)
      let matchPrice = true;
      const price = court.pricePerHour || 0;
      if (filters.priceRange === "low") matchPrice = price < 60000;
      if (filters.priceRange === "mid")
        matchPrice = price >= 60000 && price <= 70000;
      if (filters.priceRange === "high") matchPrice = price > 70000;

      return matchName && matchPrice;
    });
  }, [filters, courts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Banner */}
      <section className="hero">
        <h1>Đặt Sân Cầu Lông Dễ Dàng</h1>
      </section>

      {/* Bộ lọc */}
      <div className="container" id="search">
        <div className="search-section">
          <div className="search-group">
            <label>Tìm tên sân</label>
            <input
              type="text"
              name="keyword"
              className="search-input"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Nhập tên sân..."
            />
          </div>
          <div className="search-group">
            <label>Mức giá</label>
            <select
              name="priceRange"
              className="search-select"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="all">Tất cả</option>
              <option value="low">Dưới 60k</option>
              <option value="mid">60k - 70k</option>
              <option value="high">Trên 70k</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách sân */}
      <main className="container">
        <h2 className="section-title">
          {loading ? "Đang tải..." : "Danh sách sân cầu lông"}
        </h2>
        <div className="court-grid">
          {filteredCourts.map((court) => (
            <div key={court.id} className="court-card">
<Link to={`/court/${court.id}`}>
    <img 
        // Ưu tiên lấy ảnh từ DB, nếu không có thì dùng ảnh mẫu
        src={court.imageUrl ? court.imageUrl : "https://cdn.shopvnb.com/uploads/images/tin_tuc/bo-cau-long-1.webp"} 
        
        alt={court.name} 
        className="card-img"
        
        // Kỹ thuật thay thế ảnh lỗi (QUAN TRỌNG)
        onError={(e) => {
            e.target.onerror = null; // Chặn lặp vô hạn
            e.target.src = "https://cdn.shopvnb.com/uploads/images/tin_tuc/bo-cau-long-1.webp"; // Ảnh thay thế xịn xò
        }}
    />
</Link>              <div className="card-body">
                <h3 className="court-name">{court.name}</h3>
                <div className="court-info">📍 {court.address}</div>
                <div className="price">
                  {court.pricePerHour
                    ? Number(court.pricePerHour).toLocaleString()
                    : 0}{" "}
                  đ/h
                </div>
                <button
                  className="btn-book"
                  onClick={() => setSelectedCourt(court)}
                >
                  Đặt Sân Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Đặt Sân */}
      {selectedCourt && (
        <BookingModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </>
  );
};

export default Home;
