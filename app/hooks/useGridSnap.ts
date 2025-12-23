'use client';

import { useEffect, useRef } from 'react';

export interface GridSnapOptions {
  /**
   * Snap direction for height adjustment
   * - 'up': Always round up (prevents cutoff) - RECOMMENDED
   * - 'nearest': Round to nearest grid multiple
   * @default 'up'
   */
  direction?: 'up' | 'nearest';

  /**
   * Whether to enable grid snapping
   * @default true
   */
  enabled?: boolean;

  /**
   * Group ID for synchronizing heights across multiple elements
   * Elements with the same groupId will all receive the maximum height
   * @default undefined (each element snaps independently)
   */
  groupId?: string;
}

/**
 * Hook to snap container heights to grid multiples
 *
 * @example
 * ```tsx
 * const containerRef = useGridSnap();
 * return <div ref={containerRef}>Content here</div>
 * ```
 *
 * @example With options
 * ```tsx
 * const containerRef = useGridSnap({ direction: 'nearest' });
 * ```
 *
 * How it works:
 * 1. Reads --grid-size from CSS variables
 * 2. Measures element's natural scrollHeight
 * 3. Rounds to nearest grid multiple (UP by default)
 * 4. Sets explicit height
 * 5. Only runs on mount (no resize handling)
 */
// Global registry to track element groups
const elementGroups = new Map<string, Set<HTMLElement>>();

export function useGridSnap<T extends HTMLElement = HTMLDivElement>(
  options: GridSnapOptions = {}
) {
  const ref = useRef<T>(null);
  const { direction = 'up', enabled = true, groupId } = options;

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    // Register element in group if groupId is provided
    if (groupId) {
      if (!elementGroups.has(groupId)) {
        elementGroups.set(groupId, new Set());
      }
      elementGroups.get(groupId)!.add(element);
    }

    const snapToGrid = async () => {
      // Wait for images to load first
      const images = element.querySelectorAll('img');
      const imageLoadPromises = Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = () => resolve(undefined);
          img.onerror = () => resolve(undefined); // Resolve even on error to not block
        });
      });

      await Promise.all(imageLoadPromises);

      // Read current grid size from CSS variable
      const gridSize = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--grid-size')
      );

      // Fallback to 48px if grid-size not found
      if (!gridSize || isNaN(gridSize)) {
        console.warn('useGridSnap: --grid-size not found, using default 48px');
        return;
      }

      if (groupId) {
        // Group mode: measure all elements in group and find max
        const group = elementGroups.get(groupId);
        if (!group) return;

        let maxHeight = 0;

        // Measure all elements - use scrollHeight for content-only measurement
        group.forEach((el) => {
          el.style.height = 'auto';
          void el.offsetHeight;

          // scrollHeight gives us content height without the element's own padding/border
          // offsetHeight would include padding/border which inflates the measurement
          maxHeight = Math.max(maxHeight, el.scrollHeight);
        });

        // Calculate snapped height from max
        let snappedHeight: number;
        if (direction === 'up') {
          snappedHeight = Math.ceil(maxHeight / gridSize) * gridSize;
        } else {
          snappedHeight = Math.round(maxHeight / gridSize) * gridSize;
        }

        // Apply to all elements in group
        group.forEach((el) => {
          el.style.height = `${snappedHeight}px`;
        });
      } else {
        // Individual mode: snap this element only
        element.style.height = 'auto';
        void element.offsetHeight;

        // Use scrollHeight for content-only measurement
        const contentHeight = element.scrollHeight;

        let snappedHeight: number;
        if (direction === 'up') {
          snappedHeight = Math.ceil(contentHeight / gridSize) * gridSize;
        } else {
          snappedHeight = Math.round(contentHeight / gridSize) * gridSize;
        }

        element.style.height = `${snappedHeight}px`;
      }
    };

    // Wait for fonts to load before measuring
    const measure = () => {
      if (groupId) {
        // For grouped elements, add a microtask delay to ensure all elements are registered
        // This prevents race conditions during page navigation
        queueMicrotask(() => {
          snapToGrid();
        });
      } else {
        snapToGrid();
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure();
      });
    } else {
      // Fallback if fonts API not available
      measure();
    }

    // Cleanup: remove element from group
    return () => {
      if (groupId && elementGroups.has(groupId)) {
        elementGroups.get(groupId)!.delete(element);
        if (elementGroups.get(groupId)!.size === 0) {
          elementGroups.delete(groupId);
        }
      }
    };
  }, [direction, enabled, groupId]);

  return ref;
}
