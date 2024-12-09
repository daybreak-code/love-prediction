'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './DataVisualization.module.css';
import { getChartOptions } from '../../utils/chartConfig';

type ChartType = 'pie' | 'bar' | 'line' | 'radar';

interface ChartTab {
  type: ChartType;
  label: string;
  icon: string;
  description: string;
}

export default function DataVisualization() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeChart, setActiveChart] = useState<ChartType>('pie');
  const [chart, setChart] = useState<echarts.ECharts | null>(null);

  const chartTabs: ChartTab[] = [
    {
      type: 'pie',
      label: '情感分布',
      icon: '📊',
      description: '展示各种情感特征的占比分布'
    },
    {
      type: 'bar',
      label: '能力对比',
      icon: '📈',
      description: '与平均水平的能力对比分析'
    },
    {
      type: 'line',
      label: '发展趋势',
      icon: '📉',
      description: '情感能力的发展变化趋势'
    },
    {
      type: 'radar',
      label: '多维分析',
      icon: '🎯',
      description: '多个维度的综合能力分析'
    }
  ];

  useEffect(() => {
    if (chartRef.current) {
      if (!chart) {
        const newChart = echarts.init(chartRef.current);
        setChart(newChart);
      }
      
      const options = getChartOptions(activeChart);
      chart?.setOption(options, true);
    }

    return () => {
      chart?.dispose();
    };
  }, [activeChart, chart]);

  useEffect(() => {
    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chart]);

  const handleTabChange = (type: ChartType) => {
    setActiveChart(type);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>数据可视化分析</h2>
      
      <div className={styles.tabs}>
        {chartTabs.map(tab => (
          <button
            key={tab.type}
            className={`${styles.tab} ${activeChart === tab.type ? styles.active : ''}`}
            onClick={() => handleTabChange(tab.type)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className={styles.chartDescription}>
        {chartTabs.find(tab => tab.type === activeChart)?.description}
      </div>
      
      <div className={styles.chartContainer} ref={chartRef} />
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#FF6B6B' }} />
          <span>个人数据</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#4ECDC4' }} />
          <span>平均水平</span>
        </div>
      </div>
      
      <div className={styles.insights}>
        <h3 className={styles.insightsTitle}>数据洞察</h3>
        <ul className={styles.insightsList}>
          <li>您的情感表达能力高于平均水平20%</li>
          <li>沟通能力呈现稳定上升趋势</li>
          <li>在同理心方面有较大提升空间</li>
        </ul>
      </div>
    </div>
  );
} 