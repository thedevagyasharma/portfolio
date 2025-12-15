'use client';

import { useState, useEffect } from 'react';

export interface GridPosition {
  x: number;
  y: number;
}

export interface GridCoordinates {
  col: number;
  row: number;
}

export interface GridSystem {
  gridSize: number;
  gridCols: number;
  gridRows: number;
  offsetX: number;
  offsetY: number;
  getPosition: (col: number, row: number) => GridPosition;
  snapToGrid: (x: number, y: number) => GridCoordinates;
}

/**
 * Hook to access the 48px grid system
 * Reads CSS variables set by HeroBackground canvas
 */
export const useGrid = (): GridSystem => {
  const [gridSize, setGridSize] = useState(48);
  const [gridCols, setGridCols] = useState(0);
  const [gridRows, setGridRows] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const updateGridValues = () => {
      const root = document.documentElement;
      const style = getComputedStyle(root);

      const size = parseInt(style.getPropertyValue('--grid-size')) || 48;
      const cols = parseInt(style.getPropertyValue('--grid-cols')) || 0;
      const rows = parseInt(style.getPropertyValue('--grid-rows')) || 0;
      const offX = parseInt(style.getPropertyValue('--grid-offset-x')) || 0;
      const offY = parseInt(style.getPropertyValue('--grid-offset-y')) || 0;

      setGridSize(size);
      setGridCols(cols);
      setGridRows(rows);
      setOffsetX(offX);
      setOffsetY(offY);
    };

    // Initial read
    updateGridValues();

    // Update on resize (grid system recalculates)
    window.addEventListener('resize', updateGridValues);

    return () => {
      window.removeEventListener('resize', updateGridValues);
    };
  }, []);

  /**
   * Get pixel position from grid coordinates
   */
  const getPosition = (col: number, row: number): GridPosition => {
    return {
      x: col * gridSize + offsetX,
      y: row * gridSize + offsetY,
    };
  };

  /**
   * Snap pixel position to nearest grid coordinates
   */
  const snapToGrid = (x: number, y: number): GridCoordinates => {
    return {
      col: Math.round((x - offsetX) / gridSize),
      row: Math.round((y - offsetY) / gridSize),
    };
  };

  return {
    gridSize,
    gridCols,
    gridRows,
    offsetX,
    offsetY,
    getPosition,
    snapToGrid,
  };
};
