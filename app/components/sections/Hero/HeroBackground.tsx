'use client';

import React, { useEffect, useRef } from 'react';

// Helper function to darken a hex color by a percentage
const darkenColor = (color, percent) => {
  const hex = (c) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const c = hex(color);
  if (!c) return color;
  
  const factor = 1 - (percent / 100);
  const r = Math.round(c.r * factor);
  const g = Math.round(c.g * factor);
  const b = Math.round(c.b * factor);
  
  return `rgb(${r}, ${g}, ${b})`;
};

// Color configuration - adjust these to change the appearance
const COLORS = {
  background: '#fff',         // Canvas background color
  tileDefault: '#f2f2f2',     // Default tile fill (far from cursor)
  tileOutline: '#dcdcdc',     // Tile border/stroke color
  dotDefault: '#dcdcdc',      // Default dot color (far from cursor)
  dotHover: '#646464',        // Dot color when cursor is close
};

// Darkness configuration
const TILE_DARKNESS = 5; // Percentage darkness for tiles (0-100)

// Pre-calculate darkened colors to avoid repeated calculations
const darkenedColorCache = {};
const getCachedDarkenedColor = (color, percent) => {
  const key = `${color}_${percent.toFixed(2)}`;
  if (!darkenedColorCache[key]) {
    darkenedColorCache[key] = darkenColor(color, percent);
  }
  return darkenedColorCache[key];
};

const HeroBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 600, y: 400 });
  const smoothMouseRef = useRef({ x: 600, y: 400 }); // Lagged mouse position for effects
  const mouseVelocityRef = useRef({ vx: 0, vy: 0 }); // Track mouse velocity for direction
  const lastTileRef = useRef({ col: 0, row: 0 }); // Track which tile we were in
  const scrollRef = useRef({ velocity: 0, lastScrollY: 0, lastTime: Date.now() });
  const tilesRef = useRef([]);
  const dotsRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, size: 48 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    });
    
    // Grid configuration - tiles stay as 40x40 squares
    const size = 48;
    
    const initializeCanvas = () => {
      // Get full viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      dimensionsRef.current = { width, height, size };
      
      // Set proper DPI scaling - use 2 for retina displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
      
      // Enable image smoothing for crisp lines
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      const cols = Math.ceil(width / size);
      const rows = Math.ceil(height / size);
      
      // Initialize tiles and dots
      tilesRef.current = [];
      dotsRef.current = [];
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cx = j * size + size / 2;
          const cy = i * size + size / 2;
          
          tilesRef.current.push({
            x: cx,
            y: cy,
            baseSize: size,
            renderSize: size,
            corner: 0,
            fillColor: COLORS.tileDefault,
            currentDarkness: 0, // Current darkness percentage
            targetDarkness: 0,  // Target darkness percentage for lerping
            col: j,
            row: i
          });
          
          dotsRef.current.push({
            homeX: cx,
            homeY: cy,
            x: cx,
            y: cy,
            vx: 0,
            vy: 0,
            fillColor: COLORS.dotDefault
          });
        }
      }
    };
    
    initializeCanvas();
    
    // Physics constants
    const attractStrength = 0.03;
    const attractRadius = 160;
    const returnStrength = 0.001;
    const maxPullDistance = 8;
    const mouseLagFactor = 0.12; // How quickly the effect follows the cursor (0.1 = slow, 0.5 = fast)
    
    // Scroll physics constants
    const scrollInfluence = 0.010; // How much scroll velocity affects dots
    const scrollDecay = 0.9; // How quickly scroll velocity decays
    
    // Mouse tracking - use window mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Scroll tracking
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(1, now - scrollRef.current.lastTime);
      
      // Calculate scroll velocity (pixels per ms, then scale up)
      const rawVelocity = (currentScrollY - scrollRef.current.lastScrollY) / dt;
      scrollRef.current.velocity = rawVelocity * 16; // Scale to roughly per-frame
      
      scrollRef.current.lastScrollY = currentScrollY;
      scrollRef.current.lastTime = now;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation loop
    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current;
      const { width, height, size } = dimensionsRef.current;

      // Calculate mouse velocity
      const prevX = smoothMouseRef.current.x;
      const prevY = smoothMouseRef.current.y;

      // Smoothly interpolate the effect position toward the actual cursor
      smoothMouseRef.current.x += (targetX - smoothMouseRef.current.x) * mouseLagFactor;
      smoothMouseRef.current.y += (targetY - smoothMouseRef.current.y) * mouseLagFactor;

      const { x: mouseX, y: mouseY } = smoothMouseRef.current;

      // Update velocity with smoothing
      const currentVx = mouseX - prevX;
      const currentVy = mouseY - prevY;
      mouseVelocityRef.current.vx = mouseVelocityRef.current.vx * 0.7 + currentVx * 0.3;
      mouseVelocityRef.current.vy = mouseVelocityRef.current.vy * 0.7 + currentVy * 0.3;

      // Clear canvas
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);

      const mouseCol = Math.floor(mouseX / size);
      const mouseRow = Math.floor(mouseY / size);

      // Check if we've moved to a different tile
      const hasCrossedTile = mouseCol !== lastTileRef.current.col || mouseRow !== lastTileRef.current.row;

      // Determine movement direction
      const { vx, vy } = mouseVelocityRef.current;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const movementThreshold = 0.5; // Minimum speed to trigger diagonal pattern

      // Determine if moving diagonally (both vx and vy are significant)
      // Only trigger L-pattern if we've crossed at least one tile boundary
      const isDiagonal = hasCrossedTile && speed > movementThreshold && Math.abs(vx) > 0.3 && Math.abs(vy) > 0.3;

      // Determine direction quadrant
      let directionX = 0; // -1 = left, 0 = none, 1 = right
      let directionY = 0; // -1 = up, 0 = none, 1 = down

      if (isDiagonal) {
        directionX = vx > 0 ? 1 : -1;
        directionY = vy > 0 ? 1 : -1;
      }

      // Update last tile position
      lastTileRef.current.col = mouseCol;
      lastTileRef.current.row = mouseRow;

      // Pre-calculate values for cross pattern (only if needed)
      const centerTileX = mouseCol * size + size / 2;
      const centerTileY = mouseRow * size + size / 2;
      const offsetX = (mouseX - centerTileX) / (size / 2); // -1 to 1
      const offsetY = (mouseY - centerTileY) / (size / 2); // -1 to 1
      const lerpSpeed = 0.15;

      // Only update tiles that need updating (within range of cursor)
      const updateRange = 3; // Only check tiles within 3 tiles of cursor
      const minCol = Math.max(0, mouseCol - updateRange);
      const maxCol = Math.min(Math.ceil(width / size), mouseCol + updateRange + 1);
      const minRow = Math.max(0, mouseRow - updateRange);
      const maxRow = Math.min(Math.ceil(height / size), mouseRow + updateRange + 1);

      // Update and draw tiles
      for (let tile of tilesRef.current) {
        // Skip tiles far from cursor for darkness calculation
        const distX = Math.abs(tile.col - mouseCol);
        const distY = Math.abs(tile.row - mouseRow);

        let targetDarkness = 0;

        // Only calculate darkness for nearby tiles
        if (distX <= updateRange && distY <= updateRange) {
          const relCol = tile.col - mouseCol;
          const relRow = tile.row - mouseRow;

          if (distX === 0 && distY === 0) {
            // Center tile - always full darkness
            targetDarkness = TILE_DARKNESS;
          } else if (isDiagonal) {
            // L-shaped pattern when moving diagonally
            if (relCol === -directionX && relRow === 0) {
              targetDarkness = TILE_DARKNESS * 0.8;
            } else if (relCol === 0 && relRow === -directionY) {
              targetDarkness = TILE_DARKNESS * 0.8;
            }
          } else if (distX + distY === 1) {
            // Standard cross pattern - use pre-calculated offsets
            if (relCol === -1) {
              targetDarkness = TILE_DARKNESS * (1 - offsetX) / 2;
            } else if (relCol === 1) {
              targetDarkness = TILE_DARKNESS * (1 + offsetX) / 2;
            } else if (relRow === -1) {
              targetDarkness = TILE_DARKNESS * (1 - offsetY) / 2;
            } else if (relRow === 1) {
              targetDarkness = TILE_DARKNESS * (1 + offsetY) / 2;
            }
          }
        }

        // Smoothly lerp current darkness toward target darkness
        tile.currentDarkness += (targetDarkness - tile.currentDarkness) * lerpSpeed;

        // Only update color if darkness changed significantly
        if (tile.currentDarkness > 0.01) {
          tile.fillColor = getCachedDarkenedColor(COLORS.tileDefault, tile.currentDarkness);
        } else if (tile.currentDarkness !== 0) {
          tile.currentDarkness = 0;
          tile.fillColor = COLORS.tileDefault;
        }

        // Draw filled tile
        ctx.fillStyle = tile.fillColor;
        ctx.fillRect(
          tile.x - tile.baseSize / 2,
          tile.y - tile.baseSize / 2,
          tile.baseSize,
          tile.baseSize
        );
      }

      // Draw all outlines in one pass (more efficient)
      ctx.strokeStyle = COLORS.tileOutline;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let tile of tilesRef.current) {
        ctx.rect(
          tile.x - tile.baseSize / 2,
          tile.y - tile.baseSize / 2,
          tile.baseSize,
          tile.baseSize
        );
      }
      ctx.stroke();
      
      // Update and draw dots
      for (let dot of dotsRef.current) {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt

        if (distSq < attractRadius * attractRadius && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const force = attractStrength * (1 - dist / attractRadius);

          dot.vx += nx * force;
          dot.vy += ny * force;
        } else {
          const hx = dot.homeX - dot.x;
          const hy = dot.homeY - dot.y;

          dot.vx += hx * returnStrength;
          dot.vy += hy * returnStrength;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;

        dot.vx *= 0.88;
        dot.vy *= 0.88;

        // Limit distance from home
        const offX = dot.x - dot.homeX;
        const offY = dot.y - dot.homeY;
        const distFromHomeSq = offX * offX + offY * offY;
        if (distFromHomeSq > maxPullDistance * maxPullDistance) {
          const distFromHome = Math.sqrt(distFromHomeSq);
          const ratio = maxPullDistance / distFromHome;
          dot.x = dot.homeX + offX * ratio;
          dot.y = dot.homeY + offY * ratio;
        }

        // Color based on distance - use cached colors
        const dist = Math.sqrt(distSq);
        const factor = Math.max(0, Math.min(1, 1 - dist / attractRadius));
        const darkenPercent = factor * 50; // 0% to 50% darker
        dot.fillColor = getCachedDarkenedColor(COLORS.dotDefault, darkenPercent);

        // Draw dot
        ctx.fillStyle = dot.fillColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size / 32, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      initializeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="background fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          display: 'block',
          width: '100vw',
          height: '100vh'
        }}
      />
    </div>
  );
};

export default HeroBackground;