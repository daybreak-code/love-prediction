'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { FiMenu, FiX } from 'react-icons/fi';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  const handleStartTest = () => {
    console.log('start jump to test analysis')
    router.push('/TestAnalysis');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Love Prediction
        </div>

        <nav className={styles.nav}>
          <a href="#home" className={styles.navItem}>首页</a>
          <a href="#about" className={styles.navItem}>关于</a>
          <a href="#features" className={styles.navItem}>特点</a>
          <a href="#contact" className={styles.navItem}>联系我们</a>
        </nav>

        <button className={styles.menuButton} onClick={handleStartTest}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
          <a href="#home" className={styles.mobileNavItem} onClick={toggleMobileMenu}>首页</a>
          <a href="#about" className={styles.mobileNavItem} onClick={toggleMobileMenu}>关于</a>
          <a href="#features" className={styles.mobileNavItem} onClick={toggleMobileMenu}>特点</a>
          <a href="#contact" className={styles.mobileNavItem} onClick={toggleMobileMenu}>联系我们</a>
        </div>
      </div>
    </header>
  );
} 