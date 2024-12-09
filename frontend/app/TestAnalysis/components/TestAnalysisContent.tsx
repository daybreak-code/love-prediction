'use client';

import React from 'react';
import styles from './TestAnalysisContent.module.css';
import ScoreDisplay from './ScoreDisplay';
import EmotionAnalysis from './EmotionAnalysis';
import DetailedReport from './DetailedReport';
import PersonalizedAdvice from './PersonalizedAdvice';
import DataVisualization from './DataVisualization';
import ShareResults from './ShareResults';
import UserFeedback from './UserFeedback';

export default function TestAnalysisContent() {
  return (
    <div className={styles.container}>
      <section className={styles.scoreSection}>
        <ScoreDisplay />
      </section>
      
      <section className={styles.analysisSection}>
        <EmotionAnalysis />
      </section>
      
      <section className={styles.reportSection}>
        <DetailedReport />
      </section>
      
      <section className={styles.adviceSection}>
        <PersonalizedAdvice />
      </section>
      
      <section className={styles.visualizationSection}>
        <DataVisualization />
      </section>
      
      <section className={styles.shareSection}>
        <ShareResults />
      </section>
      
      <section className={styles.feedbackSection}>
        <UserFeedback />
      </section>
    </div>
  );
} 