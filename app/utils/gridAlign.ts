/**
 * Grid alignment utility functions
 * For manual calculations or advanced scenarios
 */

/**
 * Get current grid size from CSS variable
 * @returns Grid size in pixels (defaults to 48 if not found)
 */
export function getGridSize(): number {
  if (typeof window === 'undefined') return 48; // SSR fallback

  const gridSize = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--grid-size')
  );

  return gridSize || 48; // Fallback to default
}

/**
 * Calculate grid-snapped value
 * @param value - Value to snap in pixels
 * @param gridSize - Grid size (defaults to current --grid-size)
 * @param direction - Snap direction: 'up', 'down', or 'nearest'
 * @returns Snapped value in pixels
 */
export function snapToGrid(
  value: number,
  gridSize?: number,
  direction: 'up' | 'down' | 'nearest' = 'up'
): number {
  const size = gridSize ?? getGridSize();

  switch (direction) {
    case 'up':
      return Math.ceil(value / size) * size;
    case 'down':
      return Math.floor(value / size) * size;
    case 'nearest':
      return Math.round(value / size) * size;
  }
}

/**
 * Calculate how many grid units a pixel value represents
 * @param pixels - Pixel value
 * @param gridSize - Grid size (defaults to current --grid-size)
 * @returns Number of grid units (can be fractional)
 */
export function pixelsToGridUnits(pixels: number, gridSize?: number): number {
  const size = gridSize ?? getGridSize();
  return pixels / size;
}

/**
 * Calculate pixel value from grid units
 * @param units - Number of grid units
 * @param gridSize - Grid size (defaults to current --grid-size)
 * @returns Pixel value
 */
export function gridUnitsToPixels(units: number, gridSize?: number): number {
  const size = gridSize ?? getGridSize();
  return units * size;
}

/**
 * Check if a value is grid-aligned
 * @param value - Value to check in pixels
 * @param gridSize - Grid size (defaults to current --grid-size)
 * @returns True if value is a multiple of grid size
 */
export function isGridAligned(value: number, gridSize?: number): boolean {
  const size = gridSize ?? getGridSize();
  return value % size === 0;
}
