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

const HeroBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 600, y: 400 });
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
      const { x: mouseX, y: mouseY } = mouseRef.current;
      const { width, height, size } = dimensionsRef.current;
      
      // Decay scroll velocity each frame
      scrollRef.current.velocity *= scrollDecay;
      const scrollVel = scrollRef.current.velocity;
      
      // Clear canvas
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);
      
      const mouseCol = Math.floor(mouseX / size);
      const mouseRow = Math.floor(mouseY / size);
      
      // Update and draw tiles
      for (let tile of tilesRef.current) {
        const dx = mouseX - tile.x;
        const dy = mouseY - tile.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxRadius = 50;
        const shrinkAmt = 0.0;
        
        if (dist < maxRadius) {
          const falloff = 1 - dist / maxRadius;
          tile.renderSize = tile.baseSize * (1 - shrinkAmt * falloff);
        } else {
          tile.renderSize = tile.baseSize;
        }
        
        // Calculate darkness for cross pattern
        const distX = Math.abs(tile.col - mouseCol);
        const distY = Math.abs(tile.row - mouseRow);
        
        if (distX === 0 && distY === 0) {
          // Center tile - full darkness
          tile.fillColor = darkenColor(COLORS.tileDefault, TILE_DARKNESS);
        } else if (distX + distY === 1) {
          // Cross tiles (up/down/left/right)
          // Calculate offset within the center tile
          const centerTileX = mouseCol * size + size / 2;
          const centerTileY = mouseRow * size + size / 2;
          const offsetX = (mouseX - centerTileX) / (size / 2); // -1 to 1
          const offsetY = (mouseY - centerTileY) / (size / 2); // -1 to 1
          
          let darkenPercent = 0;
          
          // Adjust based on which cross tile this is
          if (tile.col < mouseCol) {
            // Left tile - darker when cursor moves left
            darkenPercent = TILE_DARKNESS * (1 - offsetX) / 2;
          } else if (tile.col > mouseCol) {
            // Right tile - darker when cursor moves right
            darkenPercent = TILE_DARKNESS * (1 + offsetX) / 2;
          } else if (tile.row < mouseRow) {
            // Top tile - darker when cursor moves up
            darkenPercent = TILE_DARKNESS * (1 - offsetY) / 2;
          } else if (tile.row > mouseRow) {
            // Bottom tile - darker when cursor moves down
            darkenPercent = TILE_DARKNESS * (1 + offsetY) / 2;
          }
          
          tile.fillColor = darkenColor(COLORS.tileDefault, darkenPercent);
        } else {
          // All other tiles - default
          tile.fillColor = COLORS.tileDefault;
        }
        
        // Draw filled tile
        ctx.fillStyle = tile.fillColor;
        ctx.fillRect(
          tile.x - tile.renderSize / 2,
          tile.y - tile.renderSize / 2,
          tile.renderSize,
          tile.renderSize
        );
        
        // Draw outline
        ctx.strokeStyle = COLORS.tileOutline;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          tile.x - tile.baseSize / 2,
          tile.y - tile.baseSize / 2,
          tile.baseSize,
          tile.baseSize
        );
      }
      
      // Update and draw dots
      for (let dot of dotsRef.current) {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate mouse attraction force
        let attractX = 0;
        let attractY = 0;
        
        if (dist < attractRadius && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const force = attractStrength * (1 - dist / attractRadius);
          attractX = nx * force;
          attractY = ny * force;
        } else {
          // Return to home when outside attract radius
          attractX = (dot.homeX - dot.x) * returnStrength;
          attractY = (dot.homeY - dot.y) * returnStrength;
        }
        
        // Calculate how much to negate mouse force based on scroll intensity
        const scrollIntensity = Math.min(1, Math.abs(scrollVel) / 2);
        
        // Apply mouse attraction (negated proportionally by scroll)
        dot.vx += attractX * (1 - scrollIntensity);
        dot.vy += attractY * (1 - scrollIntensity);
        
        // When scrolling, also add return-to-home force to center dots
        if (scrollIntensity > 0.1) {
          dot.vx += (dot.homeX - dot.x) * 0.02 * scrollIntensity;
          dot.vy += (dot.homeY - dot.y) * 0.02 * scrollIntensity;
        }
        
        // Apply scroll force
        dot.vy -= scrollVel * scrollInfluence;
        
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= 0.92;
        dot.vy *= 0.92;
        
        // Wrap vertically within tile (only when scrolling)
        const offX = dot.x - dot.homeX;
        const offY = dot.y - dot.homeY;
        const halfSize = size / 2;
        
        if (scrollIntensity > 0.1) {
          // Scrolling - wrap vertically
          if (offY > halfSize) {
            dot.y = dot.homeY - halfSize;
          } else if (offY < -halfSize) {
            dot.y = dot.homeY + halfSize;
          }
          // Clamp horizontal
          if (Math.abs(offX) > maxPullDistance) {
            dot.x = dot.homeX + Math.sign(offX) * maxPullDistance;
          }
        } else {
          // Not scrolling - clamp to max distance
          const distFromHome = Math.sqrt(offX * offX + offY * offY);
          if (distFromHome > maxPullDistance) {
            const ratio = maxPullDistance / distFromHome;
            dot.x = dot.homeX + offX * ratio;
            dot.y = dot.homeY + offY * ratio;
          }
        }
        
        // Color based on distance
        const factor = Math.max(0, Math.min(1, 1 - dist / attractRadius));
        const darkenPercent = factor * 50; // 0% to 50% darker
        dot.fillColor = darkenColor(COLORS.dotDefault, darkenPercent);
        
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