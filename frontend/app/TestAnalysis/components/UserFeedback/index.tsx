'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UserFeedback.module.css';

export default function UserFeedback() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || feedback.trim() === '') {
      setError('请填写所有字段');
      return;
    }

    try {
      // 模拟提交反馈
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('提交失败:', error);
      setError('提交失败，请重试');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>用户反馈</h2>
      
      <AnimatePresence>
        {submitted ? (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            感谢您的反馈！
          </motion.div>
        ) : (
          <motion.form
            className={styles.feedbackForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.rating}>
              <span className={styles.ratingLabel}>评分:</span>
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.star} ${rating && rating >= value ? styles.filled : ''}`}
                  onClick={() => handleRating(value)}
                  aria-label={`评分 ${value}`}
                >
                  ★
                </button>
              ))}
            </div>
            
            <textarea
              className={styles.feedbackInput}
              placeholder="请留下您的反馈..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={200}
            />
            
            {error && <div className={styles.error}>{error}</div>}
            
            <button type="submit" className={styles.submitButton}>
              提交反馈
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
} 