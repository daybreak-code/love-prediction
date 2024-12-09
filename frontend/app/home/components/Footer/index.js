'use client';

import styles from './Footer.module.css';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.links}>
          <a href="#about" className={styles.link}>关于我们</a>
          <a href="#privacy" className={styles.link}>隐私政策</a>
          <a href="#contact" className={styles.link}>联系方式</a>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Love Prediction. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
} 