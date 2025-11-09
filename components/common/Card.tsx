import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div
      style={style}
      className={`bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 hover:border-gray-500/50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
