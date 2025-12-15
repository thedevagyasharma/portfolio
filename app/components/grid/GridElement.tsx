'use client';

import React, { CSSProperties, ReactNode } from 'react';

export interface GridElementProps {
  col: number;           // Grid column position (0-indexed)
  row: number;           // Grid row position (0-indexed)
  width?: number;        // Width in grid units (default 1)
  height?: number;       // Height in grid units (default 1)
  zindex?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * GridElement - Position elements on the 48px grid
 *
 * @example
 * <GridElement col={5} row={3} width={2} height={1}>
 *   <button>Click me</button>
 * </GridElement>
 */
export const GridElement: React.FC<GridElementProps> = ({
  col,
  row,
  width = 1,
  height = 1,
  zindex = 0,
  children,
  className = '',
  style = {},
}) => {
  const gridStyle: CSSProperties = {
    position: 'absolute',
    left: `calc(${col} * var(--grid-size) + var(--grid-offset-x))`,
    top: `calc(${row} * var(--grid-size) + var(--grid-offset-y))`,
    width: `calc(${width} * var(--grid-size))`,
    height: `calc(${height} * var(--grid-size))`,
    zIndex: `${zindex}`,
    ...style,
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
};

export default GridElement;
