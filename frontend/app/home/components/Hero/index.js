'use client';

import Image from 'next/image';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  
  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            AI智能情感分析
          </h1>
          <p className={styles.subtitle}>
            科技赋能，助力寻找真爱
          </p>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/TestAnalysis')}
          >
            开始测试
          </motion.button>
        </motion.div>

        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/hero-illustration.svg"
            alt="AI Love Analysis Illustration"
            fill
            priority
            className={styles.image}
          />
        </motion.div>
      </div>
    </section>
  );
} 