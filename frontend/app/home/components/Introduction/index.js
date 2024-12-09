'use client';

import styles from './Introduction.module.css';
import { FiBarChart2, FiMessageCircle } from 'react-icons/fi'; // 移除 FiBrain
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FiBarChart2 size={32} />,
    title: "AI智能分析",
    description: "运用先进的人工智能算法，深入分析情感特征，提供准确的匹配建议。"
  },
  {
    icon: <FiMessageCircle size={32} />,
    title: "科学的评估体系",
    description: "基于心理学理论构建的多维度评估体系，全方位了解情感需求。"
  },
  // 如果需要，可以添加其他图标
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function Introduction() {
  return (
    <section className={styles.introduction} id="features">
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          为什么选择我们
        </motion.h2>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              variants={itemVariants}
            >
              <div className={styles.iconContainer}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}