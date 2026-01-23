'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageSlideshow.styles.css';

interface ImageSlideshowProps {
  images: string[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export default function ImageSlideshow({
  images,
  autoplay = false,
  autoplayInterval = 4000,
  className = ''
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const showNextImage = useCallback(() => {
    if (isTransitioning) return;

    const next = (currentIndex + 1) % images.length;
    setNextIndex(next);
    setDirection('forward');
    setIsTransitioning(true);

    transitionTimerRef.current = setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, images.length, isTransitioning]);

  const showPrevImage = useCallback(() => {
    if (isTransitioning) return;

    const prev = (currentIndex - 1 + images.length) % images.length;
    setNextIndex(prev);
    setDirection('backward');
    setIsTransitioning(true);

    transitionTimerRef.current = setTimeout(() => {
      setCurrentIndex(prev);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, images.length, isTransitioning]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;

    autoplayTimerRef.current = setInterval(() => {
      showNextImage();
    }, autoplayInterval);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayInterval, showNextImage]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!autoplay) return;

    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      showNextImage();
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, showNextImage]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      showNextImage();
    } else if (isRightSwipe) {
      showPrevImage();
    }
  }, [touchStart, touchEnd, showNextImage, showPrevImage]);

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextImage();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [showNextImage, showPrevImage]);

  return (
    <div className={`slideshow ${className}`}>
      <div
        ref={containerRef}
        className="slideshow-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
      >
        {/* Image wrapper */}
        <div className="slideshow-image-wrapper">
          {/* Current image */}
          <img
            src={images[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            className="slideshow-image"
          />

          {/* Transitioning image */}
          {isTransitioning && nextIndex !== null && (
            <div className={`slideshow-transition-container slideshow-transition-${direction}`}>
              <img
                src={images[nextIndex]}
                alt={`Screenshot ${nextIndex + 1}`}
                className="slideshow-image-next"
              />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={showPrevImage}
          className="slideshow-nav-button slideshow-nav-button-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={showNextImage}
          className="slideshow-nav-button slideshow-nav-button-next"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="slideshow-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning || index === currentIndex) return;
              const next = index;
              const dir = index > currentIndex ? 'forward' : 'backward';
              setNextIndex(next);
              setDirection(dir);
              setIsTransitioning(true);

              transitionTimerRef.current = setTimeout(() => {
                setCurrentIndex(next);
                setNextIndex(null);
                setIsTransitioning(false);
              }, 600);
            }}
            className={`slideshow-dot ${index === currentIndex ? 'slideshow-dot-active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
