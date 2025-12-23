/**
 * Pixel Art Animation System Types
 *
 * Each shape is stored as an array of frames.
 * Each frame is a 24-element array of 24-bit numbers (bitmasks).
 * Bit 23 = leftmost pixel, Bit 0 = rightmost pixel.
 */

// A single frame: 24 rows, each row is a 24-bit bitmask
export type Frame = number[];

// A shape with multiple animation frames
export type Shape = {
  name: string;
  frames: Frame[];
  frameDuration: number; // ms per frame
};

// Animation configuration
export type AnimationConfig = {
  displayDuration: number; // ms to show each shape before morphing
  morphDuration: number; // ms for morph transition
  morphSteps: number; // number of intermediate frames in morph
  pixelSize: number; // size of each pixel in px
  gridSize: number; // number of pixels per row/column (24)
  fillColor: string; // color for filled pixels
  backgroundColor: string; // color for empty pixels
};

// Animation state
export type AnimationState =
  | {
      phase: 'displaying';
      shapeIndex: number;
      frameIndex: number;
      elapsed: number;
      displayElapsed: number;
    }
  | {
      phase: 'morphing';
      fromShapeIndex: number;
      toShapeIndex: number;
      morphFrameIndex: number;
      elapsed: number;
      morphFrames: Frame[];
    };

// Default configuration
export const defaultConfig: AnimationConfig = {
  displayDuration: 3000,
  morphDuration: 800,
  morphSteps: 12,
  pixelSize: 8,
  gridSize: 24,
  fillColor: '#000',
  backgroundColor: '#fff',
};
