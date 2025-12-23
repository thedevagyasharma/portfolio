'use client';

import { PixelCanvas } from './PixelCanvas';
import { valueShapes } from './valueShapes';

type ValuePixelArtProps = {
  value: keyof typeof valueShapes;
  className?: string;
  style?: React.CSSProperties;
};

export function ValuePixelArt({ value, className, style }: ValuePixelArtProps) {
  const shape = valueShapes[value];

  // Read accent color from CSS variable
  const accentColor = typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#FF4000'
    : '#FF4000';

  return (
    <PixelCanvas
      frame={shape.frames[0]}
      config={{
        gridSize: 12, // 12x12 grid for 2x2 tiles
        fillColor: accentColor,
        backgroundColor: 'transparent',
      }}
      gridTiles={2}
      className={className}
      style={style}
    />
  );
}
