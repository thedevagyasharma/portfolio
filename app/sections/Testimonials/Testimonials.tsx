'use client';

import './Testimonials.styles.css';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    quote: string;
    author: string;
    title: string;
    company?: string;
}

const ITEMS: Testimonial[] = [
    {
        quote: "A rare ability to step into roles outside his own and excel. His intelligence and acumen were well beyond his years.",
        author: "Angel Guerrero",
        title: "Founder",
        company: "Center for Societal Aspiration"
    },
    {
        quote: "A disciplined technical mind paired with a truly creative soul. A natural leader who brings professional excellence and great energy.",
        author: "Elena Godin",
        title: "Designer, Researcher, Educator",
        company: "University of Michigan"
    },
    {
        quote: "Extremely talented designer and developer, always pushing limits. Strong UX/UI skills elevated our projects with attention to detail and passion.",
        author: "Kevin Jamieson",
        title: "Frontend Developer",
        company: "Covalent Logic"
    },
    {
        quote: "One of the hardest-working and most versatile web designers I've collaborated with. Consistently delivers high-quality work at an impressive pace.",
        author: "Steve Pelletier",
        title: "Web Designer, Front-End Developer",
        company: "DealerOn"
    },
    {
        quote: "Sharp eye for UI design with a sense of polish and clarity. Calm, positive demeanor made collaboration easy. Patient and always willing to help.",
        author: "Lev Bakin",
        title: "Frontend Web Developer"
    }
];

const LEN = ITEMS.length;

function getItemAt(currentIndex: number, offset: number): Testimonial {
    return ITEMS[((currentIndex + offset) % LEN + LEN) % LEN];
}

function shortestPath(from: number, to: number): { steps: number; direction: 'next' | 'prev' } {
    const forward = ((to - from) % LEN + LEN) % LEN;
    const backward = LEN - forward;
    if (forward <= backward) {
        return { steps: forward, direction: 'next' };
    }
    return { steps: backward, direction: 'prev' };
}

function isMobile(): boolean {
    return window.matchMedia('(max-width: 675px)').matches;
}

function createCardElement(item: Testimonial, position: number): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'testimonial-card card-hidden';
    card.dataset.position = String(position);

    const content = document.createElement('div');
    content.className = 'card-content';

    const quote = document.createElement('blockquote');
    quote.className = 'testimonial-quote';
    quote.textContent = `\u201C${item.quote}\u201D`;

    const authorDiv = document.createElement('div');
    authorDiv.className = 'testimonial-author';

    const name = document.createElement('div');
    name.className = 'author-name';
    name.textContent = item.author;

    const title = document.createElement('div');
    title.className = 'author-title';
    title.textContent = item.title + (item.company ? ` @ ${item.company}` : '');

    authorDiv.appendChild(name);
    authorDiv.appendChild(title);
    content.appendChild(quote);
    content.appendChild(authorDiv);
    card.appendChild(content);

    return card;
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const isAnimatingRef = useRef(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const gridSnapRef = useGridSnap({
        groupId: 'testimonials',
        contentSelector: {
            selector: '.testimonials-track',
            paddingTiles: 1
        }
    });

    const setCarouselRef = useCallback((node: HTMLDivElement | null) => {
        (carouselRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (gridSnapRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }, [gridSnapRef]);

    /**
     * Calculate card width: max(350, containerWidth / 3)
     */
    const getCardWidth = useCallback((): number => {
        const carousel = carouselRef.current;
        if (!carousel) return 350;
        return Math.max(350, carousel.clientWidth / 3);
    }, []);

    /**
     * Recenter the track so that the center card (middle of N cards) is
     * visually centered in the container. Optionally pass a card count
     * override for when extra DOM cards have been injected.
     */
    const recenterTrack = useCallback((cardCountOverride?: number) => {
        const track = trackRef.current;
        const carousel = carouselRef.current;
        if (!track || !carousel) return;

        // On mobile, only the center card is visible (display:none on others).
        // No track transform needed — just reset to 0.
        if (isMobile()) {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0px)';
            return;
        }

        const containerWidth = carousel.clientWidth;
        const cardWidth = getCardWidth();
        const totalCards = cardCountOverride ?? track.children.length;
        const centerCardIdx = Math.floor(totalCards / 2);

        const centerOffset = containerWidth / 2;
        const cardCenterX = centerCardIdx * cardWidth + cardWidth / 2;
        const trackX = centerOffset - cardCenterX;

        track.style.transition = 'none';
        track.style.transform = `translateX(${trackX}px)`;
    }, [getCardWidth]);

    /**
     * Update --card-width and recenter track. Called by ResizeObserver
     * and on mount/index change.
     */
    const updateLayout = useCallback(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const cardWidth = getCardWidth();
        carousel.style.setProperty('--card-width', `${cardWidth}px`);
        if (!isAnimatingRef.current) {
            recenterTrack();
        }
    }, [getCardWidth, recenterTrack]);

    // Store updateLayout in a ref so the ResizeObserver always calls the latest version
    // without needing to re-subscribe on every render.
    const updateLayoutRef = useRef(updateLayout);
    updateLayoutRef.current = updateLayout;

    // Setup ResizeObserver (once) and call updateLayout on mount + currentIndex change
    useEffect(() => {
        updateLayoutRef.current();
    }, [currentIndex]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const ro = new ResizeObserver(() => updateLayoutRef.current());
        ro.observe(carousel);

        return () => ro.disconnect();
    }, []);

    /**
     * Apply end-state CSS classes to all cards in the track based on
     * where they'll end up after sliding.
     */
    const applyEndStateClasses = useCallback((
        track: HTMLDivElement,
        steps: number,
        direction: 'next' | 'prev'
    ) => {
        const cards = track.children;
        const half = Math.floor(cards.length / 2);

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            const position = i - half; // position relative to current center

            // Calculate where this card ends up in the viewport
            const endViewportPos = direction === 'next'
                ? position - steps
                : position + steps;

            card.classList.remove('card-center', 'card-side', 'card-hidden');
            if (endViewportPos === 0) {
                card.classList.add('card-center');
            } else if (endViewportPos === -1 || endViewportPos === 1) {
                card.classList.add('card-side');
            } else {
                card.classList.add('card-hidden');
            }
        }
    }, []);

    /**
     * Core animation: slide the track by `steps` card widths in `direction`,
     * then update React state.
     */
    const animateSlide = useCallback((
        targetIndex: number,
        steps: number,
        direction: 'next' | 'prev'
    ) => {
        const track = trackRef.current;
        const carousel = carouselRef.current;
        if (!track || !carousel) return;

        isAnimatingRef.current = true;
        setIsAnimating(true);

        const cardWidth = getCardWidth();
        const currentIndexRef = currentIndex; // capture for closure

        // Step 1: For multi-step, inject extra DOM cards
        const extraCards: HTMLDivElement[] = [];
        if (steps > 1) {
            // Prepend cards for positions -(steps+2) to -3
            const leftCards: HTMLDivElement[] = [];
            for (let pos = -(steps + 2); pos <= -3; pos++) {
                const item = getItemAt(currentIndexRef, pos);
                const card = createCardElement(item, pos);
                leftCards.push(card);
                extraCards.push(card);
            }
            // Insert left cards at the beginning of track (in order)
            for (let i = leftCards.length - 1; i >= 0; i--) {
                track.prepend(leftCards[i]);
            }

            // Append cards for positions 3 to (steps+2)
            for (let pos = 3; pos <= steps + 2; pos++) {
                const item = getItemAt(currentIndexRef, pos);
                const card = createCardElement(item, pos);
                track.append(card);
                extraCards.push(card);
            }
        }

        const totalCards = track.children.length;

        // Step 2: Recenter with new card count (no transition)
        recenterTrack(totalCards);
        void track.offsetHeight; // force reflow

        // Step 3: Apply end-state classes for simultaneous CSS transitions
        applyEndStateClasses(track, steps, direction);

        // Step 4: Read the current trackX, calculate target
        const currentTransform = track.style.transform;
        const match = currentTransform.match(/translateX\(([^)]+)px\)/);
        const currentX = match ? parseFloat(match[1]) : 0;

        const slideAmount = steps * cardWidth;
        const targetX = direction === 'next'
            ? currentX - slideAmount
            : currentX + slideAmount;

        // Force reflow so end-state classes paint before slide starts
        void track.offsetHeight;

        // Step 5: Animate the slide
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${targetX}px)`;

        // Step 6: Cleanup on transitionend
        let finished = false;
        const onEnd = (e?: TransitionEvent) => {
            // Only react to the track's own transform transition, not bubbled events
            if (e && (e.target !== track || e.propertyName !== 'transform')) return;
            if (finished) return;
            finished = true;
            track.removeEventListener('transitionend', onEnd);

            // Remove extra DOM cards
            for (const card of extraCards) {
                card.remove();
            }

            // Remove transition, update React state.
            // The key includes currentIndex so React will create fresh
            // DOM nodes with correct classes — no manual class restoration needed.
            track.style.transition = 'none';
            setCurrentIndex(targetIndex);
            isAnimatingRef.current = false;
            setIsAnimating(false);
        };

        track.addEventListener('transitionend', onEnd);
        // Safety fallback in case transitionend doesn't fire
        setTimeout(() => onEnd(), 700);
    }, [currentIndex, getCardWidth, recenterTrack, applyEndStateClasses]);

    const showNext = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (isMobile()) {
            setCurrentIndex(prev => (prev + 1) % LEN);
            return;
        }
        const target = (currentIndex + 1) % LEN;
        animateSlide(target, 1, 'next');
    }, [currentIndex, animateSlide]);

    const showPrev = useCallback(() => {
        if (isAnimatingRef.current) return;
        if (isMobile()) {
            setCurrentIndex(prev => (prev - 1 + LEN) % LEN);
            return;
        }
        const target = (currentIndex - 1 + LEN) % LEN;
        animateSlide(target, 1, 'prev');
    }, [currentIndex, animateSlide]);

    const goToTestimonial = useCallback((index: number) => {
        if (isAnimatingRef.current || index === currentIndex) return;
        if (isMobile()) {
            setCurrentIndex(index);
            return;
        }
        const { steps, direction } = shortestPath(currentIndex, index);
        animateSlide(index, steps, direction);
    }, [currentIndex, animateSlide]);

    // Cleanup raf on unmount
    useEffect(() => {
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <section className="testimonials-section">
            <div className="container">
                <SectionTitle text="Testimonials" gridSpaces={7} mobileGridSpaces={9} />
                <div className="testimonials-wrapper">
                    <div className="testimonials-carousel" ref={setCarouselRef}>
                        <div ref={trackRef} className="testimonials-track">
                            {[-2, -1, 0, 1, 2].map(pos => {
                                const item = getItemAt(currentIndex, pos);
                                const isCenter = pos === 0;
                                const isSide = pos === -1 || pos === 1;
                                const isHidden = !isCenter && !isSide;

                                return (
                                    <div
                                        key={`${currentIndex}-${pos}`}
                                        className={`testimonial-card ${isCenter ? 'card-center' : ''} ${isSide ? 'card-side' : ''} ${isHidden ? 'card-hidden' : ''}`}
                                        data-position={pos}
                                    >
                                        <div className="card-content">
                                            <blockquote className="testimonial-quote">
                                                &ldquo;{item.quote}&rdquo;
                                            </blockquote>
                                            <div className="testimonial-author">
                                                <div className="author-name">{item.author}</div>
                                                <div className="author-title">
                                                    {item.title}
                                                    {item.company && ` @ ${item.company}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={showPrev}
                            className="nav-btn nav-prev"
                            aria-label="Previous testimonial"
                            disabled={isAnimating}
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            onClick={showNext}
                            className="nav-btn nav-next"
                            aria-label="Next testimonial"
                            disabled={isAnimating}
                        >
                            <ChevronRight />
                        </button>

                        {/* Dot Indicators */}
                        <div className="testimonial-dots">
                            {ITEMS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToTestimonial(index)}
                                    className={`testimonial-dot ${index === currentIndex ? 'dot-active' : ''}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
