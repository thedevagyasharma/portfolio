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

  return (
    <PixelCanvas
      frame={shape.frames[0]}
      config={{
        gridSize: 12, // 12x12 grid for 2x2 tiles
        fillColor: '#ff4000',
        backgroundColor: 'transparent',
      }}
      gridTiles={2}
      className={className}
      style={style}
    />
  );
}
