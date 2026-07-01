import React, { useState, useEffect } from 'react';

const AdminTracking = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/webhook/tracking-stats`);
        if (!response.ok) throw new Error('Không thể tải dữ liệu tracking');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Lỗi: {error}</div>;
  if (!stats) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>📊 Bảng điều khiển Theo dõi (Tracking Dashboard)</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--secondary-bg)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-color-secondary)', marginBottom: '10px' }}>Tổng Tương Tác</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.total_events}</p>
        </div>
        
        <div style={{ background: 'var(--secondary-bg)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-color-secondary)', marginBottom: '15px', textAlign: 'center' }}>Loại Tương Tác</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(stats.event_types).map(([type, count]) => (
              <li key={type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ textTransform: 'uppercase', fontWeight: '500' }}>{type}</span>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 10px', borderRadius: '10px' }}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--secondary-bg)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>🖱️ Click Nhiều Nhất</h3>
          {Object.keys(stats.top_clicks).length === 0 ? <p>Chưa có dữ liệu click</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(stats.top_clicks).map(([el, count]) => (
                <li key={el} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>{el}</span>
                  <span>{count} lượt</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ background: 'var(--secondary-bg)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>👁️ Trang Xem Nhiều Nhất</h3>
          {Object.keys(stats.top_views).length === 0 ? <p>Chưa có dữ liệu page view</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(stats.top_views).map(([path, count]) => (
                <li key={path} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>{path}</span>
                  <span>{count} lượt</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ background: 'var(--secondary-bg)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>🕒 Hoạt động gần đây (Real-time)</h3>
        {stats.recent_events.length === 0 ? <p>Chưa có hoạt động nào</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px' }}>Thời gian</th>
                  <th style={{ padding: '12px' }}>Hành động</th>
                  <th style={{ padding: '12px' }}>Đường dẫn (Path)</th>
                  <th style={{ padding: '12px' }}>Phần tử (Element)</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_events.map((e, idx) => {
                  let timeDisplay = e.timestamp;
                  try {
                    const dt = new Date(e.timestamp);
                    timeDisplay = dt.toLocaleString('vi-VN');
                  } catch (err) {}
                  
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-color-secondary)' }}>{timeDisplay}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{e.event_type}</td>
                      <td style={{ padding: '12px' }}>{e.path || '-'}</td>
                      <td style={{ padding: '12px', color: 'var(--primary-color)' }}>{e.element_id || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTracking;
