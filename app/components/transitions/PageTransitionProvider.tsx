'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PageTransition } from './PageTransition';

type TransitionPhase = 'idle' | 'exit' | 'covering' | 'enter';

interface PageTransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
  loadingProgress: number;
  showProgress: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

const GRACE_PERIOD = 500; // ms - don't show progress bar if page loads within this time

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [phase, setPhase] = useState<TransitionPhase>('covering'); // Start fully covered
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const isInitialMount = useRef(true);
  const graceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnimationRef = useRef<number | null>(null);
  const isNavigating = useRef(false);

  // Start loading progress with grace period
  const startLoadingProgress = useCallback(() => {
    // Clear any existing timers
    if (graceTimerRef.current) {
      clearTimeout(graceTimerRef.current);
    }
    if (progressAnimationRef.current) {
      cancelAnimationFrame(progressAnimationRef.current);
    }

    // Reset state
    setShowProgress(false);
    setLoadingProgress(0);

    // Start grace period timer
    graceTimerRef.current = setTimeout(() => {
      // Check if still loading
      if (!isNavigating.current) {
        // Already loaded - no need for progress bar
        return;
      }

      // Grace period exceeded - show progress bar
      setShowProgress(true);

      // Start fake progress animation
      let progress = 0;
      let lastTimestamp = performance.now();

      const animate = (timestamp: number) => {
        if (!isNavigating.current) {
          // Navigation complete - stop animating
          return;
        }

        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // Progress speed (adjust based on current progress)
        if (progress < 70) {
          // Fast initial progress: 0→70 in ~2 seconds
          progress += (delta / 2000) * 70;
        } else if (progress < 90) {
          // Slow middle section: 70→90 in ~4 seconds
          progress += (delta / 4000) * 20;
        }
        // Stay at 90% until page loads

        progress = Math.min(progress, 90);
        setLoadingProgress(Math.round(progress));

        if (progress < 90 && isNavigating.current) {
          progressAnimationRef.current = requestAnimationFrame(animate);
        }
      };

      progressAnimationRef.current = requestAnimationFrame(animate);
    }, GRACE_PERIOD);
  }, []);

  // Complete loading progress and trigger enter animation
  const completeLoadingProgress = useCallback(() => {
    isNavigating.current = false;

    // Clear grace timer if still running
    if (graceTimerRef.current) {
      clearTimeout(graceTimerRef.current);
      graceTimerRef.current = null;
    }

    // Cancel animation frame
    if (progressAnimationRef.current) {
      cancelAnimationFrame(progressAnimationRef.current);
      progressAnimationRef.current = null;
    }

    // If progress bar is showing, jump to 100%
    if (showProgress) {
      setLoadingProgress(100);
      // Hide after brief moment, then trigger enter animation
      setTimeout(() => {
        setShowProgress(false);
        setLoadingProgress(0);
        setPhase('enter');
      }, 200);
    } else {
      // Page loaded within grace period - trigger enter immediately
      setShowProgress(false);
      setLoadingProgress(0);
      setPhase('enter');
    }
  }, [showProgress]);

  // Show enter animation on initial page load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsTransitioning(true);

      // Wait for covering bars to be rendered, then remove body::before and start animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Add 'loaded' class to trigger body::before fadeout
          document.body.classList.add('loaded');

          // Start enter animation
          setTimeout(() => {
            setPhase('enter');
          }, 20);
        });
      });
    }
  }, []);

  // Watch isPending from useTransition - this tells us when navigation is done
  useEffect(() => {
    if (!isInitialMount.current && !isPending && isNavigating.current) {
      // React has finished the transition - page is loaded
      // Wait for paint before showing enter animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          completeLoadingProgress();
        });
      });
    }
  }, [isPending, completeLoadingProgress]);

  const handleExitComplete = useCallback(() => {
    // Exit animation finished, start covering phase and navigate
    setPhase('covering');
    isNavigating.current = true;

    // Start loading progress tracking
    startLoadingProgress();

    // Navigate using startTransition to track loading state
    const href = window.location.pathname + window.location.search + window.location.hash;
    const targetHref = sessionStorage.getItem('pendingNavigation');

    if (targetHref) {
      sessionStorage.removeItem('pendingNavigation');
      startTransition(() => {
        router.push(targetHref);
      });
    }
  }, [router, startLoadingProgress, startTransition]);

  const handleEnterComplete = useCallback(() => {
    // Enter animation finished, reset to idle
    setPhase('idle');
    setIsTransitioning(false);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (phase === 'exit') {
      handleExitComplete();
    } else if (phase === 'enter') {
      handleEnterComplete();
    }
  }, [phase, handleExitComplete, handleEnterComplete]);

  const navigateWithTransition = useCallback((href: string) => {
    // Don't navigate if already transitioning or going to same page
    if (isTransitioning || href === pathname) {
      return;
    }

    // Don't animate hash links
    if (href.startsWith('#')) {
      return;
    }

    // Store the destination in sessionStorage and start exit animation
    sessionStorage.setItem('pendingNavigation', href);
    setIsTransitioning(true);
    setPhase('exit');
  }, [isTransitioning, pathname]);

  // Global click handler for all links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip if:
      // - External link
      // - Hash link only
      // - Opens in new tab
      // - Modifier key pressed
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        link.target === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return;
      }

      // Intercept navigation
      e.preventDefault();
      navigateWithTransition(href);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigateWithTransition]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      // On popstate, pathname will change, triggering enter animation
      setIsTransitioning(true);
      setPhase('enter');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (graceTimerRef.current) {
        clearTimeout(graceTimerRef.current);
      }
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, navigateWithTransition, loadingProgress, showProgress }}>
      <PageTransition
        isTransitioning={isTransitioning}
        phase={phase}
        onAnimationComplete={handleAnimationComplete}
        loadingProgress={loadingProgress}
        showProgress={showProgress}
      />
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};
