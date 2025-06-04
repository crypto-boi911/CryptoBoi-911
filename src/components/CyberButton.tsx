
import React from 'react';
import { motion } from 'framer-motion';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'lg';
  className?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'default',
  className = '' 
}) => {
  const sizeClasses = size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3';
  
  return (
    <motion.button
      onClick={onClick}
      className={`cyber-button ${sizeClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{children}</span>
    </motion.button>
  );
};

export default CyberButton;
