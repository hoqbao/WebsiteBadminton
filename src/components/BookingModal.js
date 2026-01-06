// src/components/BookingModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ court, onClose }) => {
    const navigate = useNavigate();

    if (!court) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }} onClick={onClose}>
            <div className="modal-content" style={{background: '#fff', padding: '25px', borderRadius: '8px', minWidth: '400px', maxWidth:'90%'}} onClick={(e) => e.stopPropagation()}>
                <h2 style={{marginTop:0, color:'#2ecc71'}}>{court.name}</h2>
                <p>📍 Địa chỉ: {court.address}</p>
                {/* Chú ý: pricePerHour thay vì price */}
                <p>💰 Giá: <b style={{fontSize:'1.2rem', color:'#e74c3c'}}>{court.pricePerHour ? Number(court.pricePerHour).toLocaleString() : 0} đ/h</b></p>
                
                <div style={{marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                    <button onClick={onClose} style={{padding:'10px 20px', border:'1px solid #ddd', background:'white', cursor:'pointer', borderRadius:'5px'}}>Đóng</button>
                    
                    <button onClick={() => navigate(`/court/${court.id}`)} style={{padding:'10px 20px', border:'none', background:'#2ecc71', color:'white', fontWeight:'bold', cursor:'pointer', borderRadius:'5px'}}>
                        Xem chi tiết & Đặt lịch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;