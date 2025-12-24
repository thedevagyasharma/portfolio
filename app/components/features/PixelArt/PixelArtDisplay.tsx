'use client';

import { PixelCanvas } from './PixelCanvas';
import { usePixelAnimation } from './usePixelAnimation';
import { Shape, AnimationConfig } from './types';
import { MorphStyle } from './morph';
import { allShapes } from './shapes';

type PixelArtDisplayProps = {
  shapes?: Shape[];
  config?: Partial<AnimationConfig>;
  morphStyle?: MorphStyle;
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
  /** Number of grid tiles the canvas should span (uses --grid-size CSS var) */
  gridTiles?: number;
  paused?: boolean;
};

export function PixelArtDisplay({
  shapes = allShapes,
  config,
  morphStyle = 'scatter',
  className,
  style,
  showLabel = false,
  gridTiles,
  paused,
}: PixelArtDisplayProps) {
  const { currentFrame, currentShapeName } = usePixelAnimation({
    shapes,
    config,
    morphStyle,
    paused,
  });

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <PixelCanvas frame={currentFrame} config={config} gridTiles={gridTiles} />
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: -24,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#666',
          }}
        >
          {currentShapeName}
        </div>
      )}
    </div>
  );
}

// Re-export everything for convenience
export { PixelCanvas } from './PixelCanvas';
export { usePixelAnimation } from './usePixelAnimation';
export { allShapes } from './shapes';
export * from './types';
export * from './morph';
