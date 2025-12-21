'use client';

import { useGridScroll } from '@/app/hooks/useGridSnappedScroll';

/**
 * Provider component that activates grid-snapped scrolling
 * Must be rendered after Background to ensure --grid-size is set
 */
export default function GridScrollProvider() {
  useGridScroll();
  return null;
}
