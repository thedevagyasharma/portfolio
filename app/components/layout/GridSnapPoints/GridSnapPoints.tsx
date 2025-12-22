'use client';

import { useEffect, useRef } from 'react';

/**
 * Implements smooth momentum scrolling with grid snapping
 * Allows continuous scrolling with velocity accumulation
 */
export default function GridSnapPoints() {
  const scrollTimeoutRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);
  const velocityRef = useRef(0);
  const targetScrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    let gridSize = parseFloat(style.getPropertyValue('--grid-size')) || 48;

    const updateGridSize = () => {
      gridSize = parseFloat(getComputedStyle(root).getPropertyValue('--grid-size')) || 48;
    };

    // Smooth continuous scrolling with momentum
    const smoothScroll = () => {
      if (velocityRef.current !== 0) {
        targetScrollRef.current += velocityRef.current;

        // Clamp to valid scroll range
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current, maxScroll));

        // Apply friction to velocity
        velocityRef.current *= 0.92;

        // Stop when velocity is negligible
        if (Math.abs(velocityRef.current) < 0.1) {
          velocityRef.current = 0;
          // Trigger snap when scrolling stops
          handleScrollEnd();
        }
      }

      // Smoothly interpolate current position to target
      const currentScroll = window.scrollY;
      const difference = targetScrollRef.current - currentScroll;
      const delta = difference * 0.15; // Smooth interpolation factor

      if (Math.abs(delta) > 0.1) {
        window.scrollTo(0, currentScroll + delta);
      }

      animationFrameRef.current = requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Cancel any ongoing snap animation
      if (isSnappingRef.current) {
        isSnappingRef.current = false;
      }

      // Clear snap timeout
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }

      const now = performance.now();
      const timeDelta = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Add to velocity (accumulate momentum)
      // Scale down for smoother, more controlled feel
      velocityRef.current += e.deltaY * 0.3;

      // Cap maximum velocity
      const maxVelocity = 50;
      velocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current));

      // Initialize target if not scrolling
      if (targetScrollRef.current === 0 || Math.abs(velocityRef.current) < 1) {
        targetScrollRef.current = window.scrollY;
      }

      // Start animation loop if not running
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    const snapToNearestGrid = () => {
      if (isSnappingRef.current || velocityRef.current !== 0) return;

      const currentScroll = window.scrollY;
      const nearestGridLine = Math.round(currentScroll / gridSize) * gridSize;
      const distance = Math.abs(currentScroll - nearestGridLine);

      if (distance > 0.5) {
        isSnappingRef.current = true;

        // Stop the smooth scroll loop to prevent conflict
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        // Sync target with snap target
        targetScrollRef.current = nearestGridLine;

        const startPosition = currentScroll;
        const scrollDistance = nearestGridLine - startPosition;
        const duration = 400;
        const startTime = performance.now();

        // Gentle ease-in-out
        const easeInOutCubic = (t: number): number => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateSnap = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          const newPosition = startPosition + (scrollDistance * easedProgress);
          window.scrollTo(0, newPosition);

          if (progress < 1) {
            requestAnimationFrame(animateSnap);
          } else {
            isSnappingRef.current = false;
            targetScrollRef.current = nearestGridLine;
          }
        };

        requestAnimationFrame(animateSnap);
      }
    };

    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        snapToNearestGrid();
      }, 200) as unknown as number;
    };

    const handleScroll = () => {
      // Handle native scroll (touch/trackpad)
      if (velocityRef.current === 0 && !isSnappingRef.current) {
        handleScrollEnd();
      }
    };

    // Initialize
    targetScrollRef.current = window.scrollY;

    // Event listeners
    window.addEventListener('resize', updateGridSize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateGridSize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return null;
}
