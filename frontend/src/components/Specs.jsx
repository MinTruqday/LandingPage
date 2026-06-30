import React from 'react';
import { motion } from 'framer-motion';

const Specs = () => {
  const specsData = [
    { label: 'Màn hình', value: 'Super Retina XDR 6.1 inch và 6.7 inch, ProMotion 120Hz, Always-On Display' },
    { label: 'Vi xử lý', value: 'A19 Pro (Tiến trình 2nm), CPU 6 lõi, GPU 6 lõi với Ray Tracing' },
    { label: 'Camera chính', value: '48MP, khẩu độ f/1.78, chống rung quang học OIS thế hệ 2' },
    { label: 'Camera Ultra Wide', value: '48MP, góc nhìn 120 độ, hỗ trợ chụp Macro siêu nét' },
    { label: 'Camera Telephoto', value: 'Zoom quang học 5x với thiết kế tetraprism, 12MP' },
    { label: 'Chất liệu', value: 'Titanium chuẩn hàng không vũ trụ cao cấp, nhẹ và siêu bền' },
    { label: 'Pin và sạc', value: 'Lên đến 33 giờ xem video, sạc MagSafe 25W, USB-C 10Gb/s' },
    { label: 'Hệ điều hành', value: 'iOS 19 tích hợp sâu Apple Intelligence' }
  ];

  return (
    <section id="specs" style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}
        >
          Thông số kỹ thuật đột phá
        </motion.h2>

        <div className="specs-table">
          {specsData.map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="spec-row"
            >
              <div className="spec-label">{spec.label}</div>
              <div className="spec-value">{spec.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specs;
