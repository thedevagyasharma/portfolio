'use client';

import './Hero.styles.css';
import { PixelArtDisplay } from '@/app/components/features';
import { useGridSnap } from '@/app/hooks/useGridSnap';
import { usePageTransition } from '@/app/components/providers';
import { useState, useEffect } from 'react';


export default function Hero() {
    const textRef = useGridSnap();
    const { phase } = usePageTransition();
    const [isAnimationReady, setIsAnimationReady] = useState(false);

    const [gridTiles, setGridTiles] = useState(4);

    useEffect(() => {
        const query = window.matchMedia('(max-width: 675px)');
        
        // Define the handler
        const handler = (e: MediaQueryListEvent) => setGridTiles(e.matches ? 6 : 4);
        
        // Set initial value
        setGridTiles(query.matches ? 6 : 4);

        // Listen for the change (only fires when crossing the 675px mark)
        query.addEventListener('change', handler);
        return () => query.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        // Start pixel animation only when page transition is complete
        if (phase === 'idle') {
            setIsAnimationReady(true);
        }
    }, [phase]);

    return (
        <section className='hero'>
            <div className="content container">
                <div ref={textRef} className="hero-text">
                    <h1><span className="toHighlight">Design Engineer</span> building systems that help teams ship faster</h1>
                </div>
                <div className="pixelArt">
                    <PixelArtDisplay
                        gridTiles={gridTiles}
                        config={{
                            gridSize: 24,
                            displayDuration: 4000,
                            morphDuration: 100,
                            morphSteps: 20,
                        }}
                        morphStyle="scatter"
                        paused={!isAnimationReady}
                    />
                </div>
            </div>
        </section>
    )
}