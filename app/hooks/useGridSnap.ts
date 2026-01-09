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

  /**
   * CSS selector for the inner content element to measure
   * If provided, measures the content element and adds padding separately
   * Format: { selector: '.content-class', paddingTiles: 2 }
   * @default undefined (measures the element itself)
   */
  contentSelector?: {
    selector: string;
    paddingTiles: number;
  };
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
 * 1. Waits for --grid-size to be set by Background component
 * 2. Reads --grid-size from CSS variables
 * 3. Measures element's natural scrollHeight
 * 4. Rounds to nearest grid multiple (UP by default)
 * 5. Sets explicit height
 * 6. Recalculates on window resize for responsive layouts
 */
// Global registry to track element groups
const elementGroups = new Map<string, Set<HTMLElement>>();

export function useGridSnap<T extends HTMLElement = HTMLDivElement>(
  options: GridSnapOptions = {}
) {
  const ref = useRef<T>(null);
  const { direction = 'up', enabled = true, groupId, contentSelector } = options;

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

        // Measure all elements
        group.forEach((el) => {
          el.style.height = 'auto';
          void el.offsetHeight;

          let measuredHeight: number;

          if (contentSelector) {
            // Measure inner content element and add padding
            const innerContent = el.querySelector(contentSelector.selector);
            if (innerContent) {
              measuredHeight = innerContent.scrollHeight + (contentSelector.paddingTiles * gridSize);
            } else {
              console.warn(`useGridSnap: Content selector "${contentSelector.selector}" not found, falling back to element measurement`);
              measuredHeight = el.scrollHeight;
            }
          } else {
            // Measure the element itself
            measuredHeight = el.scrollHeight;
          }

          maxHeight = Math.max(maxHeight, measuredHeight);
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

        let measuredHeight: number;

        if (contentSelector) {
          // Measure inner content element and add padding
          const innerContent = element.querySelector(contentSelector.selector);
          if (innerContent) {
            measuredHeight = innerContent.scrollHeight + (contentSelector.paddingTiles * gridSize);
          } else {
            console.warn(`useGridSnap: Content selector "${contentSelector.selector}" not found, falling back to element measurement`);
            measuredHeight = element.scrollHeight;
          }
        } else {
          // Measure the element itself
          measuredHeight = element.scrollHeight;
        }

        let snappedHeight: number;
        if (direction === 'up') {
          snappedHeight = Math.ceil(measuredHeight / gridSize) * gridSize;
        } else {
          snappedHeight = Math.round(measuredHeight / gridSize) * gridSize;
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

    // Retry mechanism to wait for grid size to be set by Background component
    const measureWithRetry = async () => {
      const maxRetries = 10;
      let retries = 0;

      const checkAndMeasure = () => {
        const gridSize = parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--grid-size')
        );

        // If grid size is valid (not NaN and not the default fallback), measure
        if (gridSize && !isNaN(gridSize)) {
          measure();
          return true;
        }

        // If still invalid and we have retries left, try again
        if (retries < maxRetries) {
          retries++;
          setTimeout(checkAndMeasure, 50);
          return false;
        }

        // Out of retries, measure anyway (will use fallback)
        measure();
        return true;
      };

      checkAndMeasure();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureWithRetry();
      });
    } else {
      // Fallback if fonts API not available
      measureWithRetry();
    }

    // Handle window resize - recalculate grid snap
    const handleResize = () => {
      // Reset height first to let content reflow naturally
      if (groupId) {
        const group = elementGroups.get(groupId);
        if (group) {
          group.forEach((el) => {
            el.style.height = 'auto';
          });
        }
      } else {
        element.style.height = 'auto';
      }

      // Force reflow before measuring
      void element.offsetHeight;

      // Then recalculate and apply new snapped height
      snapToGrid();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove element from group and resize listener
    return () => {
      window.removeEventListener('resize', handleResize);
      if (groupId && elementGroups.has(groupId)) {
        elementGroups.get(groupId)!.delete(element);
        if (elementGroups.get(groupId)!.size === 0) {
          elementGroups.delete(groupId);
        }
      }
    };
  }, [direction, enabled, groupId, contentSelector]);

  return ref;
}
