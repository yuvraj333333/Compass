
import React, { useMemo } from 'react';
import { DIRECTIONS } from '../constants';
import { DirectionData } from '../types';

interface CompassDialProps {
  heading: number;
  onSelectDirection: (dir: DirectionData) => void;
  selectedId: string;
}

export const CompassDial: React.FC<CompassDialProps> = ({ heading, onSelectDirection, selectedId }) => {
  const rotation = -heading;

  // Generate 360 degree scale ticks
  const degreeTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 360; i += 2) {
      const isMajor = i % 10 === 0;
      const isDirection = i % 22.5 === 0;
      ticks.push({ degree: i, isMajor, isDirection });
    }
    return ticks;
  }, []);

  return (
    <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] mx-auto compass-shadow transition-all duration-300">
      {/* The Dial */}
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full transform-gpu"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s linear' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring */}
        <circle cx="250" cy="250" r="245" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" strokeWidth="2" />
        
        {/* Precise Degree Scale */}
        {degreeTicks.map((tick) => (
          <line
            key={`tick-${tick.degree}`}
            x1="250"
            y1={tick.isMajor ? "10" : "15"}
            x2="250"
            y2="25"
            stroke={tick.isMajor ? "#64748b" : "#334155"}
            strokeWidth={tick.isMajor ? "1.5" : "1"}
            transform={`rotate(${tick.degree} 250 250)`}
          />
        ))}

        {/* Inner Decorative Dashed Ring */}
        <circle cx="250" cy="250" r="215" fill="transparent" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

        {/* 16 Directions & Degree Labels */}
        {DIRECTIONS.map((dir) => {
          const angle = dir.degree;
          const isSelected = selectedId === dir.id;
          
          // Position for Direction Label (N, NE, etc)
          const labelRadius = 185;
          const lx = 250 + labelRadius * Math.sin((angle * Math.PI) / 180);
          const ly = 250 - labelRadius * Math.cos((angle * Math.PI) / 180);

          // Position for Degree Number (0°, 22.5°, etc)
          const degreeRadius = 155;
          const dx = 250 + degreeRadius * Math.sin((angle * Math.PI) / 180);
          const dy = 250 - degreeRadius * Math.cos((angle * Math.PI) / 180);
          
          return (
            <g 
              key={dir.id} 
              className="cursor-pointer group"
              onClick={() => onSelectDirection(dir)}
            >
              {/* Sector highlight if selected */}
              {isSelected && (
                <path 
                  d={`M 250 250 L ${250 + 245 * Math.sin(((angle - 11.25) * Math.PI) / 180)} ${250 - 245 * Math.cos(((angle - 11.25) * Math.PI) / 180)} A 245 245 0 0 1 ${250 + 245 * Math.sin(((angle + 11.25) * Math.PI) / 180)} ${250 - 245 * Math.cos(((angle + 11.25) * Math.PI) / 180)} Z`}
                  fill={`${dir.color}22`}
                />
              )}
              
              {/* Main Direction Marker Ticks */}
              <line 
                x1="250" y1="5" x2="250" y2="35" 
                stroke={isSelected ? dir.color : "#475569"} 
                strokeWidth={isSelected ? "3" : "2"}
                transform={`rotate(${angle} 250 250)`}
              />

              {/* Direction Label (e.g., NNE) */}
              <text 
                x={lx} 
                y={ly} 
                fill={isSelected ? dir.color : "#cbd5e1"} 
                fontSize={isSelected ? "20" : "15"}
                fontWeight={isSelected ? "bold" : "600"}
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="transition-all duration-200 select-none"
                style={{ filter: isSelected ? 'url(#glow)' : 'none' }}
              >
                {dir.name}
              </text>

              {/* Degree Number Label (e.g., 22.5°) */}
              <text 
                x={dx} 
                y={dy} 
                fill={isSelected ? dir.color : "#64748b"} 
                fontSize={isSelected ? "12" : "10"}
                fontWeight="500"
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="transition-all duration-200 select-none opacity-80"
              >
                {dir.degree}°
              </text>
            </g>
          );
        })}

        {/* Inner Decorative Rings */}
        <circle cx="250" cy="250" r="130" fill="transparent" stroke="#1e293b" strokeWidth="1" />
        <path d="M 250 120 L 250 380 M 120 250 L 380 250" stroke="#1e293b" strokeWidth="1" />

        {/* 8 Main Direction Pillars */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
           <line 
            key={`pillar-${angle}`}
            x1="250" y1="230" x2="250" y2="210" 
            stroke="#334155" 
            strokeWidth="1"
            transform={`rotate(${angle} 250 250)`}
          />
        ))}

        {/* Center Hub */}
        <circle cx="250" cy="250" r="18" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <circle cx="250" cy="250" r="8" fill="#38bdf8" className="animate-pulse" />
        <circle cx="250" cy="250" r="3" fill="white" />
      </svg>

      {/* Static Compass Needle / Indicator (Fixed at Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-12 z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-red-500 via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rotate-45 -translate-y-1/2 rounded-sm border border-red-400"></div>
      </div>
    </div>
  );
};
