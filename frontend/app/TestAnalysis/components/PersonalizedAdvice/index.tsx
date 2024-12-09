'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PersonalizedAdvice.module.css';

interface AdviceItem {
  id: string;
  type: 'emotional' | 'behavioral' | 'improvement';
  title: string;
  description: string;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

const typeConfig = {
  emotional: {
    icon: '❤️',
    color: '#FF6B6B',
    label: '情感建议'
  },
  behavioral: {
    icon: '🤝',
    color: '#4ECDC4',
    label: '行为建议'
  },
  improvement: {
    icon: '⭐',
    color: '#FFD93D',
    label: '提升建议'
  }
};

export default function PersonalizedAdvice() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeType, setActiveType] = useState<string>('all');

  const adviceData: AdviceItem[] = [
    {
      id: '1',
      type: 'emotional',
      title: '培养情感表达',
      description: '学会更好地表达自己的情感需求和感受',
      actionItems: [
        '每天记录自己的情绪变化',
        '练习用"我感觉"开始的句子',
        '与信任的人分享内心想法'
      ],
      priority: 'high'
    },
    {
      id: '2',
      type: 'behavioral',
      title: '改善沟通方式',
      description: '采用更有效的沟通策略',
      actionItems: [
        '保持眼神交流',
        '练习积极倾听',
        '使用开放式问题'
      ],
      priority: 'medium'
    },
    {
      id: '3',
      type: 'improvement',
      title: '建立情感连接',
      description: '增强与他人的情感联系',
      actionItems: [
        '定期进行深度交谈',
        '共同参与活动',
        '表达感激之情'
      ],
      priority: 'high'
    }
    // 可以添加更多建议...
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const shareAdvice = async (advice: AdviceItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: advice.title,
          text: `${advice.description}\n\n行动建议:\n${advice.actionItems.join('\n')}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('分享失败:', error);
      }
    } else {
      // 降级处理：复制到剪贴板
      const text = `${advice.title}\n${advice.description}\n\n行动建议:\n${advice.actionItems.join('\n')}`;
      navigator.clipboard.writeText(text);
      // 可以添加一个提示
    }
  };

  const filteredAdvice = activeType === 'all' 
    ? adviceData 
    : adviceData.filter(item => item.type === activeType);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>个性化建议</h2>
      
      <div className={styles.filters}>
        <button 
          className={`${styles.filterButton} ${activeType === 'all' ? styles.active : ''}`}
          onClick={() => setActiveType('all')}
        >
          全部
        </button>
        {Object.entries(typeConfig).map(([type, config]) => (
          <button
            key={type}
            className={`${styles.filterButton} ${activeType === type ? styles.active : ''}`}
            onClick={() => setActiveType(type)}
            style={{ '--accent-color': config.color } as any}
          >
            <span>{config.icon}</span>
            {config.label}
          </button>
        ))}
      </div>

      <motion.div 
        className={styles.adviceGrid}
        layout
      >
        {filteredAdvice.map(advice => (
          <motion.div
            key={advice.id}
            className={styles.adviceCard}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ '--card-color': typeConfig[advice.type].color } as any}
          >
            <div className={styles.cardHeader}>
              <span className={styles.typeIcon}>{typeConfig[advice.type].icon}</span>
              <h3 className={styles.cardTitle}>{advice.title}</h3>
              <div className={styles.cardActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => toggleFavorite(advice.id)}
                  aria-label={favorites.has(advice.id) ? "取消收藏" : "收藏"}
                >
                  {favorites.has(advice.id) ? '★' : '☆'}
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => shareAdvice(advice)}
                  aria-label="分享"
                >
                  📤
                </button>
              </div>
            </div>
            
            <p className={styles.description}>{advice.description}</p>
            
            <ul className={styles.actionList}>
              {advice.actionItems.map((item, index) => (
                <li key={index} className={styles.actionItem}>{item}</li>
              ))}
            </ul>
            
            <div className={styles.priority}>
              优先级：
              <span className={styles[`priority-${advice.priority}`]}>
                {advice.priority === 'high' ? '高' : advice.priority === 'medium' ? '中' : '低'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 