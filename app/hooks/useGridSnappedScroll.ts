'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to implement grid-snapped scrolling behavior
 * Scrolls exactly 1 grid tile per wheel/key input
 * Incomplete scrolls are blocked
 */
export const useGridScroll = () => {
  const [gridSize, setGridSize] = useState(48);
  const isScrollingRef = useRef(false);
  const currentGridPositionRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Read grid size from CSS variable
    const updateGridSize = () => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      // Use parseFloat to preserve decimal precision (Background sets exact decimal values)
      const size = parseFloat(style.getPropertyValue('--grid-size')) || 48;
      setGridSize(size);
    };

    updateGridSize();

    // Update grid size on resize (Background.tsx updates --grid-size)
    window.addEventListener('resize', updateGridSize);

    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const scrollToPosition = (targetPosition: number, tiles: number) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      // Shorter, snappier animation
      const baseDuration = 150;
      const duration = Math.min(baseDuration + (tiles - 1) * 30, 350); // Cap at 350ms
      const startTime = performance.now();

      const easeOutQuad = (t: number): number => {
        return 1 - (1 - t) * (1 - t);
      };

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);

        const newPosition = startPosition + (distance * easedProgress);
        window.scrollTo(0, newPosition);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          isScrollingRef.current = false;
          currentGridPositionRef.current = Math.round(targetPosition / gridSize);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Don't process new scrolls while animating
      if (isScrollingRef.current) return;

      // Determine direction from single event
      const direction = e.deltaY > 0 ? 1 : -1;
      const absDeltaY = Math.abs(e.deltaY);

      // Map single event deltaY to tiles
      // Mouse wheel: ~100 per click = 1 tile
      // Trackpad: varies based on scroll speed
      let tiles = 1;
      if (absDeltaY > 300) {
        tiles = Math.min(Math.floor(absDeltaY / 100), 8);
      } else if (absDeltaY > 150) {
        tiles = 3;
      } else if (absDeltaY > 80) {
        tiles = 2;
      }

      // Calculate target position
      const targetGridPosition = currentGridPositionRef.current + (direction * tiles);
      const targetScroll = targetGridPosition * gridSize;

      // Clamp to valid scroll range
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll));

      // Calculate actual tiles we'll move
      const actualTiles = Math.abs(Math.round((clampedTarget - currentGridPositionRef.current * gridSize) / gridSize));

      // Only scroll if we can move at least 1 tile
      if (actualTiles >= 1) {
        isScrollingRef.current = true;
        scrollToPosition(clampedTarget, actualTiles);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'];

      if (scrollKeys.includes(e.key)) {
        e.preventDefault();

        if (isScrollingRef.current) return;

        let direction = 0;
        let multiplier = 1;

        switch (e.key) {
          case 'ArrowDown':
            direction = 1;
            break;
          case 'ArrowUp':
            direction = -1;
            break;
          case 'PageDown':
          case 'Space':
            direction = 1;
            multiplier = 3;
            break;
          case 'PageUp':
            direction = -1;
            multiplier = 3;
            break;
          case 'Home':
            isScrollingRef.current = true;
            scrollToPosition(0, currentGridPositionRef.current);
            return;
          case 'End':
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const endGridPosition = Math.floor(maxScroll / gridSize);
            const tilesToEnd = Math.abs(endGridPosition - currentGridPositionRef.current);
            isScrollingRef.current = true;
            scrollToPosition(endGridPosition * gridSize, tilesToEnd);
            return;
        }

        const targetGridPosition = currentGridPositionRef.current + (direction * multiplier);
        const targetScroll = targetGridPosition * gridSize;

        // Clamp to valid scroll range
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll));

        isScrollingRef.current = true;
        scrollToPosition(clampedTarget, multiplier);
      }
    };

    const handleResize = () => {
      // Re-snap to current grid position on resize
      const targetScroll = currentGridPositionRef.current * gridSize;
      window.scrollTo(0, targetScroll);
    };

    // Initialize current grid position
    const initialScroll = window.scrollY;
    currentGridPositionRef.current = Math.round(initialScroll / gridSize);
    window.scrollTo(0, currentGridPositionRef.current * gridSize);

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [gridSize]);
};
