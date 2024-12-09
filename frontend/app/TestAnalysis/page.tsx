'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/TestAnalysis.module.css';
import TestAnalysisContent from './components/TestAnalysisContent';

export default function TestAnalysisPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button 
        onClick={() => router.push('/')} 
        className={styles.backButton}
      >
        返回首页
      </button>
      <TestAnalysisContent />
    </div>
  );
} 