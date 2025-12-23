'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Frame, AnimationConfig, defaultConfig } from './types';

type PixelCanvasProps = {
  frame: Frame;
  config?: Partial<AnimationConfig>;
  className?: string;
  style?: React.CSSProperties;
  /** Number of grid tiles the canvas should span (uses --grid-size CSS var) */
  gridTiles?: number;
};

export function PixelCanvas({
  frame,
  config: configOverrides,
  className,
  style,
  gridTiles,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const config = { ...defaultConfig, ...configOverrides };
  const { gridSize, fillColor, backgroundColor } = config;

  // CSS display size (can be non-integer, scaled via CSS)
  const [displaySize, setDisplaySize] = useState(config.pixelSize * gridSize);

  const updateSize = useCallback(() => {
    if (!containerRef.current) return;

    // Read --grid-size from CSS
    const computedStyle = getComputedStyle(document.documentElement);
    const gridSizeVar = computedStyle.getPropertyValue('--grid-size').trim();

    if (gridSizeVar && gridTiles) {
      // Parse the CSS value (e.g., "48px" -> 48)
      const gridUnitSize = parseFloat(gridSizeVar);
      if (!isNaN(gridUnitSize)) {
        // Canvas spans gridTiles number of grid units
        const totalSize = gridUnitSize * gridTiles;
        setDisplaySize(totalSize);
        return;
      }
    }

    // Fallback to config pixelSize
    setDisplaySize(config.pixelSize * gridSize);
  }, [gridTiles, gridSize, config.pixelSize]);

  // Update size on mount and resize
  useEffect(() => {
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  // Draw the frame - canvas is always gridSize x gridSize (1px per pixel)
  // CSS scales it up to displaySize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gridSize, gridSize);

    // Draw filled pixels (1px = 1 pixel art pixel)
    ctx.fillStyle = fillColor;
    for (let row = 0; row < gridSize; row++) {
      const rowMask = frame[row] || 0;
      for (let col = 0; col < gridSize; col++) {
        if ((rowMask >> (gridSize - 1 - col)) & 1) {
          ctx.fillRect(col, row, 1, 1);
        }
      }
    }
  }, [frame, gridSize, fillColor, backgroundColor]);

  return (
    <div ref={containerRef} style={{ display: 'block', lineHeight: 0 }}>
      <canvas
        ref={canvasRef}
        width={gridSize}
        height={gridSize}
        className={className}
        style={{
          width: displaySize,
          height: displaySize,
          imageRendering: 'pixelated',
          ...style,
        }}
      />
    </div>
  );
}
