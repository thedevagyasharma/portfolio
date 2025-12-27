'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ensures page always loads at scroll position 0
 * Prevents browser scroll restoration and auto-scrolling
 */
export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Reset scroll on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
