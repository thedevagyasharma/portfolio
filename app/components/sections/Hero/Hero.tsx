'use client';

import './Hero.styles.css';
import { PixelArtDisplay } from '@/app/components/PixelArt';
import { useGridSnap } from '@/app/hooks/useGridSnap';


export default function Hero() {
    const textRef = useGridSnap();

    return (
        <section className='hero'>
            <div className="content container">
                <div ref={textRef} className="hero-text">
                    <h1 className="font-mono"><span className="toHighlight">Design Engineer</span> crafting faster production pipelines with AI.</h1>
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
                    />
                </div>
            </div>
        </section>
    )
}