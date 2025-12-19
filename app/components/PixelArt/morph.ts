import { Frame } from './types';

type PixelChange = {
  row: number;
  col: number;
  toBlack: boolean;
};

/**
 * Shuffle array in place using Fisher-Yates algorithm
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Find all pixels that differ between two frames
 */
function findChanges(from: Frame, to: Frame, gridSize: number): PixelChange[] {
  const changes: PixelChange[] = [];

  for (let row = 0; row < gridSize; row++) {
    const fromMask = from[row] || 0;
    const toMask = to[row] || 0;
    const diffMask = fromMask ^ toMask; // XOR finds differences

    if (diffMask === 0) continue;

    for (let col = 0; col < gridSize; col++) {
      const bitPos = gridSize - 1 - col;
      if ((diffMask >> bitPos) & 1) {
        changes.push({
          row,
          col,
          toBlack: ((toMask >> bitPos) & 1) === 1,
        });
      }
    }
  }

  return changes;
}

/**
 * Apply a change to a frame (mutates the frame)
 */
function applyChange(frame: Frame, change: PixelChange, gridSize: number): void {
  const bitPos = gridSize - 1 - change.col;
  if (change.toBlack) {
    frame[change.row] |= 1 << bitPos;
  } else {
    frame[change.row] &= ~(1 << bitPos);
  }
}

/**
 * Create a morph sequence between two frames using random scatter
 */
export function createMorphSequence(
  from: Frame,
  to: Frame,
  steps: number,
  gridSize: number = 24
): Frame[] {
  const changes = findChanges(from, to, gridSize);

  if (changes.length === 0) {
    // No changes needed, return single frame
    return [to];
  }

  // Shuffle for random scatter effect
  shuffle(changes);

  // Distribute changes across steps
  const perStep = Math.ceil(changes.length / steps);
  const sequence: Frame[] = [];

  // Start with a copy of the 'from' frame
  let current = [...from];

  for (let step = 0; step < steps; step++) {
    const startIdx = step * perStep;
    const endIdx = Math.min(startIdx + perStep, changes.length);
    const batch = changes.slice(startIdx, endIdx);

    for (const change of batch) {
      applyChange(current, change, gridSize);
    }

    // Push a copy of current state
    sequence.push([...current]);
  }

  return sequence;
}

/**
 * Create a morph sequence with radial effect (center outward or inward)
 * This reveals the target frame in a circular pattern from center
 */
export function createRadialMorphSequence(
  from: Frame,
  to: Frame,
  steps: number,
  gridSize: number = 24,
  outward: boolean = true
): Frame[] {
  const sequence: Frame[] = [];
  const center = gridSize / 2;
  const maxDist = Math.sqrt(2) * center; // Corner distance

  for (let step = 1; step <= steps; step++) {
    const progress = step / steps;
    const threshold = progress * maxDist;
    const frame: Frame = [];

    for (let row = 0; row < gridSize; row++) {
      let rowMask = 0;

      for (let col = 0; col < gridSize; col++) {
        const bitPos = gridSize - 1 - col;
        const fromBit = ((from[row] || 0) >> bitPos) & 1;
        const toBit = ((to[row] || 0) >> bitPos) & 1;

        // Calculate distance from center
        const dist = Math.sqrt((row - center + 0.5) ** 2 + (col - center + 0.5) ** 2);

        // Determine if this pixel should show 'to' or 'from'
        const showTo = outward ? dist < threshold : dist > (maxDist - threshold);

        const bit = showTo ? toBit : fromBit;
        if (bit) {
          rowMask |= 1 << bitPos;
        }
      }

      frame.push(rowMask);
    }

    sequence.push(frame);
  }

  return sequence;
}

/**
 * Create a morph sequence with directional wipe effect
 * This reveals the target frame column-by-column or row-by-row
 */
export function createWipeMorphSequence(
  from: Frame,
  to: Frame,
  steps: number,
  gridSize: number = 24,
  direction: 'left' | 'right' | 'up' | 'down' = 'left'
): Frame[] {
  const sequence: Frame[] = [];

  for (let step = 1; step <= steps; step++) {
    const progress = step / steps;
    const threshold = Math.floor(progress * gridSize);
    const frame: Frame = [];

    for (let row = 0; row < gridSize; row++) {
      let rowMask = 0;

      for (let col = 0; col < gridSize; col++) {
        const bitPos = gridSize - 1 - col;
        const fromBit = ((from[row] || 0) >> bitPos) & 1;
        const toBit = ((to[row] || 0) >> bitPos) & 1;

        // Determine if this pixel should show 'to' or 'from' based on wipe progress
        let showTo = false;
        switch (direction) {
          case 'left':
            showTo = col < threshold;
            break;
          case 'right':
            showTo = col >= gridSize - threshold;
            break;
          case 'up':
            showTo = row < threshold;
            break;
          case 'down':
            showTo = row >= gridSize - threshold;
            break;
        }

        const bit = showTo ? toBit : fromBit;
        if (bit) {
          rowMask |= 1 << bitPos;
        }
      }

      frame.push(rowMask);
    }

    sequence.push(frame);
  }

  return sequence;
}

export type MorphStyle = 'scatter' | 'radial-out' | 'radial-in' | 'wipe-left' | 'wipe-right' | 'wipe-up' | 'wipe-down';

/**
 * Create a morph sequence with the specified style
 */
export function createMorph(
  from: Frame,
  to: Frame,
  steps: number,
  style: MorphStyle = 'scatter',
  gridSize: number = 24
): Frame[] {
  switch (style) {
    case 'scatter':
      return createMorphSequence(from, to, steps, gridSize);
    case 'radial-out':
      return createRadialMorphSequence(from, to, steps, gridSize, true);
    case 'radial-in':
      return createRadialMorphSequence(from, to, steps, gridSize, false);
    case 'wipe-left':
      return createWipeMorphSequence(from, to, steps, gridSize, 'left');
    case 'wipe-right':
      return createWipeMorphSequence(from, to, steps, gridSize, 'right');
    case 'wipe-up':
      return createWipeMorphSequence(from, to, steps, gridSize, 'up');
    case 'wipe-down':
      return createWipeMorphSequence(from, to, steps, gridSize, 'down');
  }
}
