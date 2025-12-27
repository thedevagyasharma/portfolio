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
                    <h1 className="font-mono"><span className="toHighlight">Design Engineer</span> building systems that help teams ship faster</h1>
                </div>
                <div className="pixelArt">
                    <PixelArtDisplay
                        gridTiles={4}
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