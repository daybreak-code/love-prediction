'use client';

import React from 'react';
import Image from 'next/image';
import CollapsiblePanel from '../common/CollapsiblePanel';
import styles from './DetailedReport.module.css';

interface ReportSection {
  title: string;
  content: string[];
  icon: string;
  highlight?: boolean;
}

export default function DetailedReport() {
  const reportData: ReportSection[] = [
    {
      title: '总体评价',
      icon: '📊',
      content: [
        '您的情感能力整体表现优秀，展现出良好的情感认知和表达能力。',
        '在人际交往中，您善于理解他人的情感需求，这有助于建立稳定的关系。',
        '您的价值观清晰，这为建立长期关系奠定了良好基础。'
      ],
      highlight: true
    },
    {
      title: '优势分析',
      icon: '💪',
      content: [
        '强大的情感表达能力，能够清晰传达自己的想法和感受',
        '良好的同理心，善于理解和回应他人的情感需求',
        '稳定的情绪管理能力，能够在压力下保持冷静',
        '积极的沟通态度，愿意倾听和分享'
      ]
    },
    {
      title: '改善建议',
      icon: '🎯',
      content: [
        '在处理冲突时，可以尝试更多换位思考',
        '培养更多积极的情绪表达方式',
        '在重要决定前，可以多与伴侣沟通交流',
        '保持开放心态，接纳不同的观点和建议'
      ]
    },
    {
      title: '行动计划',
      icon: '📝',
      content: [
        '每天记录3个感恩的事物，培养积极情绪',
        '每周与伴侣进行一次深度交谈',
        '学习一个新的情绪管理技巧',
        '参与情感能力提升工作坊或课程'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>详细分析报告</h2>
      
      {reportData.map((section, index) => (
        <CollapsiblePanel
          key={index}
          title={section.title}
          defaultOpen={index === 0}
          icon={<span className={styles.sectionIcon}>{section.icon}</span>}
        >
          <div className={styles.sectionContent}>
            {section.content.map((item, itemIndex) => (
              <p
                key={itemIndex}
                className={`${styles.contentItem} ${
                  section.highlight ? styles.highlight : ''
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        </CollapsiblePanel>
      ))}
      
      <div className={styles.illustration}>
        <Image
          src="/images/report-illustration.svg"
          alt="Report illustration"
          width={200}
          height={200}
          priority={false}
        />
      </div>
    </div>
  );
} 