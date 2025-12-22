'use client';

import React, { useEffect, useState } from 'react';
import './PageTransition.styles.css';

interface PageTransitionProps {
  isTransitioning: boolean;
  phase: 'idle' | 'exit' | 'covering' | 'enter';
  onAnimationComplete?: () => void;
  loadingProgress: number;
  showProgress: boolean;
}

const ANIMATION_DURATION = 400; // Individual bar animation time (ms) - matches CSS
const STAGGER_PER_COLUMN = 5; // milliseconds per column stagger

export const PageTransition: React.FC<PageTransitionProps> = ({
  isTransitioning,
  phase,
  onAnimationComplete,
  loadingProgress,
  showProgress
}) => {
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    // Read the dynamic --grid-cols CSS variable
    const updateColumns = () => {
      const cols = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')) || 0;
      setColumns(cols);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Notify when exit or enter animations complete
  useEffect(() => {
    if ((phase === 'exit' || phase === 'enter') && columns > 0 && onAnimationComplete) {
      // Calculate total duration: last column delay + animation duration
      const totalDuration = (columns * STAGGER_PER_COLUMN) + ANIMATION_DURATION;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [phase, columns, onAnimationComplete]);

  if (!isTransitioning && phase === 'idle') return null;

  return (
    <div className="page-transition" data-phase={phase}>
      {Array.from({ length: columns }, (_, i) => {
        // Alternate direction: even columns from bottom, odd columns from top
        const direction = i % 2 === 0 ? 'bottom' : 'top';

        return (
          <div
            key={i}
            className="page-transition__bar"
            data-direction={direction}
            style={{
              '--column-index': i,
              '--total-columns': columns,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Loading progress indicator */}
      {showProgress && phase === 'covering' && (
        <div className="page-transition__progress">
          <div
            className="page-transition__progress-bar"
            style={{ width: `${loadingProgress}%` }}
          />
          <div className="page-transition__progress-text">
            {loadingProgress}%
          </div>
        </div>
      )}
    </div>
  );
};
