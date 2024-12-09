'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ShareResults.module.css';

interface SharePlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  action: () => void;
}

interface ShareStats {
  shares: number;
  views: number;
  interactions: number;
}

export default function ShareResults() {
  const [showQR, setShowQR] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [shareStats, setShareStats] = useState<ShareStats>({
    shares: 128,
    views: 356,
    interactions: 89
  });
  
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const sharePlatforms: SharePlatform[] = [
    {
      id: 'wechat',
      name: '微信',
      icon: '💬',
      color: '#07C160',
      action: () => setShowQR(true)
    },
    {
      id: 'weibo',
      name: '微博',
      icon: '🌐',
      color: '#FF8200',
      action: () => handleShare('weibo')
    },
    {
      id: 'qq',
      name: 'QQ',
      icon: '💫',
      color: '#12B7F5',
      action: () => handleShare('qq')
    }
  ];

  const handleShare = async (platform: string) => {
    const shareData = {
      title: '我的情感分析测试结果',
      text: customMessage || '快来看看我的情感分析测试结果吧！',
      url: window.location.href
    };

    try {
      if (navigator.share && platform === 'native') {
        await navigator.share(shareData);
      } else {
        // 平台特定的分享逻辑
        console.log(`Sharing to ${platform}`, shareData);
      }
      
      // 更新分享统计
      setShareStats(prev => ({
        ...prev,
        shares: prev.shares + 1
      }));
      
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>分享结果</h2>
      
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <h3>分享预览</h3>
          <span className={styles.previewNote}>这是他人将看到的内容</span>
        </div>
        
        <textarea
          className={styles.messageInput}
          placeholder="添加个性化分享文案..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          maxLength={100}
        />
        
        <div className={styles.previewStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{shareStats.shares}</span>
            <span className={styles.statLabel}>分享</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{shareStats.views}</span>
            <span className={styles.statLabel}>浏览</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{shareStats.interactions}</span>
            <span className={styles.statLabel}>互动</span>
          </div>
        </div>
      </div>
      
      <div className={styles.shareOptions}>
        <div className={styles.platformButtons}>
          {sharePlatforms.map(platform => (
            <motion.button
              key={platform.id}
              className={styles.platformButton}
              style={{ '--platform-color': platform.color } as any}
              onClick={platform.action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.platformIcon}>{platform.icon}</span>
              <span className={styles.platformName}>{platform.name}</span>
            </motion.button>
          ))}
        </div>
        
        <button 
          className={styles.copyLinkButton}
          onClick={copyShareLink}
        >
          📋 复制链接
          <AnimatePresence>
            {showCopySuccess && (
              <motion.span
                className={styles.copySuccess}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                已复制！
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      <AnimatePresence>
        {showQR && (
          <motion.div
            className={styles.qrModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.qrContent}>
              <button 
                className={styles.closeButton}
                onClick={() => setShowQR(false)}
              >
                ✕
              </button>
              <QRCode 
                value={window.location.href}
                size={200}
                level="H"
                includeMargin
              />
              <p>扫描二维码分享</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 