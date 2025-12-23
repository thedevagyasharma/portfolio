'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Frame, Shape, AnimationConfig, AnimationState, defaultConfig } from './types';
import { createMorph, MorphStyle } from './morph';

type UsePixelAnimationOptions = {
  shapes: Shape[];
  config?: Partial<AnimationConfig>;
  morphStyle?: MorphStyle;
  paused?: boolean;
};

type UsePixelAnimationReturn = {
  currentFrame: Frame;
  currentShapeName: string;
  isDisplaying: boolean;
  isMorphing: boolean;
  pause: () => void;
  resume: () => void;
  skipToShape: (index: number) => void;
};

export function usePixelAnimation({
  shapes,
  config: configOverrides,
  morphStyle = 'scatter',
  paused: initialPaused = false,
}: UsePixelAnimationOptions): UsePixelAnimationReturn {
  const config = { ...defaultConfig, ...configOverrides };
  const { displayDuration, morphDuration, morphSteps, gridSize } = config;

  // Empty frame as fallback
  const emptyFrame: Frame = new Array(gridSize).fill(0);

  // State
  const [currentFrame, setCurrentFrame] = useState<Frame>(
    shapes.length > 0 ? shapes[0].frames[0] : emptyFrame
  );
  const [paused, setPaused] = useState(initialPaused);

  // Refs for animation state (avoid re-renders during animation)
  const stateRef = useRef<AnimationState>({
    phase: 'displaying',
    shapeIndex: 0,
    frameIndex: 0,
    elapsed: 0,
    displayElapsed: 0,
  });
  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);

  // Get current shape name for external use
  const getCurrentShapeName = useCallback(() => {
    const state = stateRef.current;
    if (state.phase === 'displaying') {
      return shapes[state.shapeIndex]?.name || '';
    } else {
      return `${shapes[state.fromShapeIndex]?.name} → ${shapes[state.toShapeIndex]?.name}`;
    }
  }, [shapes]);

  const [currentShapeName, setCurrentShapeName] = useState(getCurrentShapeName());

  // Animation loop
  useEffect(() => {
    if (shapes.length === 0) return;

    const tick = (now: number) => {
      if (paused) {
        lastTimeRef.current = now;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const delta = lastTimeRef.current ? now - lastTimeRef.current : 0;
      lastTimeRef.current = now;

      const state = stateRef.current;

      if (state.phase === 'displaying') {
        const shape = shapes[state.shapeIndex];
        if (!shape) {
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        // Update elapsed time
        state.elapsed += delta;
        state.displayElapsed += delta;

        // Check if we need to advance to next frame within shape
        if (state.elapsed >= shape.frameDuration) {
          state.elapsed = 0;
          state.frameIndex = (state.frameIndex + 1) % shape.frames.length;
          setCurrentFrame(shape.frames[state.frameIndex]);
        }

        // Check if display duration is complete -> start morph
        if (state.displayElapsed >= displayDuration) {
          const nextShapeIndex = (state.shapeIndex + 1) % shapes.length;
          const fromFrame = shape.frames[state.frameIndex];
          const toFrame = shapes[nextShapeIndex].frames[0];

          // Generate morph frames
          const morphFrames = createMorph(fromFrame, toFrame, morphSteps, morphStyle, gridSize);

          stateRef.current = {
            phase: 'morphing',
            fromShapeIndex: state.shapeIndex,
            toShapeIndex: nextShapeIndex,
            morphFrameIndex: 0,
            elapsed: 0,
            morphFrames,
          };

          setCurrentShapeName(getCurrentShapeName());
        }
      } else if (state.phase === 'morphing') {
        // Morphing phase
        state.elapsed += delta;

        const frameDuration = morphDuration / state.morphFrames.length;

        if (state.elapsed >= frameDuration) {
          state.elapsed = 0;
          state.morphFrameIndex++;

          if (state.morphFrameIndex >= state.morphFrames.length) {
            // Morph complete, switch to displaying next shape
            stateRef.current = {
              phase: 'displaying',
              shapeIndex: state.toShapeIndex,
              frameIndex: 0,
              elapsed: 0,
              displayElapsed: 0,
            };

            setCurrentFrame(shapes[state.toShapeIndex].frames[0]);
            setCurrentShapeName(shapes[state.toShapeIndex].name);
          } else {
            setCurrentFrame(state.morphFrames[state.morphFrameIndex]);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [shapes, paused, displayDuration, morphDuration, morphSteps, morphStyle, gridSize, getCurrentShapeName]);

  // Control functions
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  const skipToShape = useCallback(
    (index: number) => {
      if (index < 0 || index >= shapes.length) return;

      stateRef.current = {
        phase: 'displaying',
        shapeIndex: index,
        frameIndex: 0,
        elapsed: 0,
        displayElapsed: 0,
      };

      setCurrentFrame(shapes[index].frames[0]);
      setCurrentShapeName(shapes[index].name);
    },
    [shapes]
  );

  return {
    currentFrame,
    currentShapeName,
    isDisplaying: stateRef.current.phase === 'displaying',
    isMorphing: stateRef.current.phase === 'morphing',
    pause,
    resume,
    skipToShape,
  };
}
