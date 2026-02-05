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

    const PH_REMOTE_SRC = 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1071967&theme=light&t=1770308484675';
    const PH_LOCAL_SRC  = '/assets/general/producthunt-badge-grid-overlay-pro.svg';
    const [phBadgeSrc, setPhBadgeSrc] = useState(PH_LOCAL_SRC);

    useEffect(() => {
        const img = new Image();
        img.onload  = () => setPhBadgeSrc(PH_REMOTE_SRC);
        img.onerror = () => {}; // stay on local fallback
        img.src = PH_REMOTE_SRC;
    }, []);

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
                    <hr className="hero-divider" />
                    <div className="hero-badges">
                        <a
                            className="hero-badge"
                            href="https://www.wallofportfolios.in/portfolios/devagya-sharma/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/assets/general/WOP_Featured_Badge_White.svg"
                                alt="Wall of Portfolios — Featured Badge"
                            />
                        </a>
                        <a
                            className="hero-badge"
                            href="https://www.producthunt.com/products/grid-overlay-pro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-grid-overlay-pro"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                alt="Grid Overlay Pro | Product Hunt"
                                width="250"
                                height="54"
                                src={phBadgeSrc}
                            />
                        </a>
                    </div>
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