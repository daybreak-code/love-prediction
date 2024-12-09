'use client';

import styles from './Instructions.module.css';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: "填写基本信息",
    description: "提供你的基本个人信息，帮助我们更好地了解你。"
  },
  {
    number: 2,
    title: "回答核心问题",
    description: "完成精心设计的问卷，让AI深入了解你的性格和需求。"
  },
  {
    number: 3,
    title: "获取AI分析报告",
    description: "获得详细的分析报告和个性化的情感建议。"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const stepVariants = {
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

export default function Instructions() {
  return (
    <section className={styles.instructions}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          使用流程
        </motion.h2>

        <motion.div 
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.number}
              className={styles.step}
              variants={stepVariants}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 