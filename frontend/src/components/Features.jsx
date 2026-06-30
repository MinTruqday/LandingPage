import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    id: 1,
    title: "Chip A19 Pro. Trí tuệ đột phá.",
    desc: "Hiệu năng xử lý đồ họa vượt bậc, hỗ trợ chơi game mượt mà và các tác vụ học máy mạnh mẽ nhất.",
  },
  {
    id: 2,
    title: "Thiết kế Titanium tinh tế",
    desc: "Vật liệu chuẩn hàng không vũ trụ. Bền bỉ đáng kinh ngạc. Nhẹ hơn bao giờ hết.",
  },
  {
    id: 3,
    title: "Camera 48MP. Khám phá chi tiết.",
    desc: "Thuật toán nhiếp ảnh điện toán thế hệ mới, cho phép chụp ảnh thiếu sáng xuất sắc.",
  }
];

const Features = () => {
  return (
    <section id="features" className="features">
      <h2 className="section-title">Điểm nổi bật</h2>
      {featureData.map((feature, index) => (
        <motion.div 
          key={feature.id}
          className="feature-item"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>{feature.title}</h2>
          <p>{feature.desc}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Features;
