import '../app/home/styles/globals.css';

export const metadata = {
  title: 'Love Prediction - AI智能情感分析',
  description: '通过AI智能分析，帮助你找到真正的缘分',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
} 