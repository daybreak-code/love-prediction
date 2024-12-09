'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { getRadarChartConfig } from '../../utils/chartConfig';
import styles from './EmotionAnalysis.module.css';

interface DimensionDetail {
  score: number;
  explanation: string;
  suggestion: string;
}

interface EmotionData {
  expressiveness: DimensionDetail;
  empathy: DimensionDetail;
  communication: DimensionDetail;
  valueAlignment: DimensionDetail;
  personalityMatch: DimensionDetail;
}

export default function EmotionAnalysis() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  
  const emotionData: EmotionData = {
    expressiveness: {
      score: 85,
      explanation: '您在情感表达方面表现出色，能够清晰地传达自己的感受。',
      suggestion: '可以尝试在更多场合练习表达深层情感。'
    },
    empathy: {
      score: 75,
      explanation: '您具备良好的同理心，能够理解他人的情感状态。',
      suggestion: '建议多倾听他人的故事，培养更深的共情能力。'
    },
    communication: {
      score: 80,
      explanation: '您的沟通能力较强，善于表达和倾听。',
      suggestion: '可以学习更多非语言沟通技巧。'
    },
    valueAlignment: {
      score: 90,
      explanation: '您的价值观非常明确，有助于建立稳定的关系。',
      suggestion: '建议与伴侣多交流共同价值观。'
    },
    personalityMatch: {
      score: 70,
      explanation: '您的性格特征展现出较好的适应性。',
      suggestion: '可以探索更多性格互补的可能性。'
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const newChart = echarts.init(chartRef.current);
      setChart(newChart);
      
      const userData = [
        emotionData.expressiveness.score,
        emotionData.empathy.score,
        emotionData.communication.score,
        emotionData.valueAlignment.score,
        emotionData.personalityMatch.score
      ];
      
      const standardData = [80, 80, 80, 80, 80];
      
      newChart.setOption(getRadarChartConfig(userData, standardData));
    }
    
    return () => {
      chart?.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      chart?.resize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chart]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>情感维度分析</h2>
      <div className={styles.chartContainer} ref={chartRef} />
      <div className={styles.detailsContainer}>
        {Object.entries(emotionData).map(([key, value]) => (
          <div key={key} className={styles.dimensionCard}>
            <h3 className={styles.dimensionTitle}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className={styles.score}>{value.score}</span>
            </h3>
            <p className={styles.explanation}>{value.explanation}</p>
            <p className={styles.suggestion}>{value.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 