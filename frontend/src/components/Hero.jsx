import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imgY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="hero">
      <motion.div style={{ y: y1, opacity }} className="hero-content">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          iPhone 17 Pro
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Sức mạnh vô song. Thiết kế Titanium.
        </motion.p>
      </motion.div>
      <motion.img 
        src="/img/ip17p-512-blu.webp" 
        alt="iPhone 17 Pro" 
        className="hero-img"
        width="600"
        height="338"
        fetchpriority="high"
        loading="eager"
        style={{ y: imgY, width: '100%', maxWidth: '600px', height: 'auto', objectFit: 'contain' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </section>
  );
};

export default Hero;
