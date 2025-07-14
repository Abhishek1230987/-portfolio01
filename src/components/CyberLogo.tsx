import React from 'react';

interface CyberLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CyberLogo: React.FC<CyberLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer hexagon frame */}
        <path
          d="M50 5 L80 25 L80 75 L50 95 L20 75 L20 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary"
        />
        
        {/* Inner circuit pattern */}
        <path
          d="M50 15 L70 30 L70 70 L50 85 L30 70 L30 30 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-primary/60"
        />
        
        {/* Central diamond */}
        <path
          d="M50 35 L60 50 L50 65 L40 50 Z"
          fill="currentColor"
          className="text-primary animate-pulse"
        />
        
        {/* Corner accent lines */}
        <g className="text-primary/80" stroke="currentColor" strokeWidth="1.5">
          <line x1="50" y1="5" x2="50" y2="20" />
          <line x1="80" y1="25" x2="70" y2="30" />
          <line x1="80" y1="75" x2="70" y2="70" />
          <line x1="50" y1="95" x2="50" y2="85" />
          <line x1="20" y1="75" x2="30" y2="70" />
          <line x1="20" y1="25" x2="30" y2="30" />
        </g>
        
        {/* Circuit nodes */}
        <g className="text-primary" fill="currentColor">
          <circle cx="50" cy="25" r="2" />
          <circle cx="65" cy="40" r="2" />
          <circle cx="65" cy="60" r="2" />
          <circle cx="50" cy="75" r="2" />
          <circle cx="35" cy="60" r="2" />
          <circle cx="35" cy="40" r="2" />
        </g>
        
        {/* Glitch effect lines */}
        <g className="text-primary/40" stroke="currentColor" strokeWidth="0.5">
          <line x1="25" y1="35" x2="35" y2="35" className="animate-pulse" />
          <line x1="65" y1="45" x2="75" y2="45" className="animate-pulse" />
          <line x1="25" y1="65" x2="35" y2="65" className="animate-pulse" />
          <line x1="65" y1="55" x2="75" y2="55" className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
};

export default CyberLogo;
