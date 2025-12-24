'use client';

import { useEffect } from 'react';

/**
 * Ensures page always loads at scroll position 0
 * Prevents browser scroll restoration and auto-scrolling
 */
export default function ScrollRestoration() {
  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return null;
}
