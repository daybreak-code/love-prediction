'use client';

import React, { useEffect, useState } from 'react';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score?: number;
}

export default function ScoreDisplay({ score = 85 }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [progressStyle, setProgressStyle] = useState({});
  
  // 根据分数获取颜色
  const getColor = (score: number) => {
    if (score >= 80) return '#4ECDC4';
    if (score >= 60) return '#FFD93D';
    return '#FF6B6B';
  };
  
  // 动画效果
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentScore = Math.floor(progress * score);
      setDisplayScore(currentScore);
      
      setProgressStyle({
        background: `conic-gradient(
          ${getColor(score)} ${currentScore * 3.6}deg,
          #F0F0F0 ${currentScore * 3.6}deg
        )`,
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);
  
  return (
    <div className={styles.container}>
      <div className={styles.scoreCircle} style={progressStyle}>
        <div className={styles.scoreValue}>
          <span className={styles.number}>{displayScore}</span>
          <span className={styles.label}>契合度</span>
        </div>
      </div>
      <div className={styles.description}>
        {score >= 80 && '非常匹配'}
        {score >= 60 && score < 80 && '较好匹配'}
        {score < 60 && '需要改善'}
      </div>
    </div>
  );
} 