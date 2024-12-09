'use client';

import React from 'react';
import styles from './styles/Home.module.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CallToAction from './components/CallToAction';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className={styles.home}>
      <Header />
      <Hero />
      <Introduction />
      <CallToAction />
      <Instructions />
      <Footer />
    </main>
  );
}