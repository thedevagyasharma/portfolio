'use client';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Explorations() {
    const tile1Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'explorations-row1',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile2Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'explorations-row1',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile3Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'explorations-row2',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });

    return (
        <section id="explorations">
            <div className="container">
                <SectionTitle text="Interactive Explorations" gridSpaces={12} mobileGridSpaces={16} />

                {/* Row 1: Syntropy + Tactus */}
                <div className="work-row">
                    <a ref={tile1Ref} href="https://syntropy.devagyasharma.com" target="_blank" rel="noopener noreferrer" className="project-tile">
                        <div className="project-tile-content">
                            <div className="project-title">Syntropy ↗</div>
                            <div className="project-description">8192 generative tile patterns from 13 binary decisions</div>
                            <div className="project-video">
                                <video autoPlay loop muted playsInline>
                                    <source src="/assets/explorations/syntropy.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </a>
                    <a ref={tile2Ref} href="https://tactus.devagyasharma.com" target="_blank" rel="noopener noreferrer" className="project-tile">
                        <div className="project-tile-content">
                            <div className="project-title">Tactus ↗</div>
                            <div className="project-description">Sound and motion interactions that feel physical</div>
                            <div className="project-video">
                                <video autoPlay loop muted playsInline>
                                    <source src="/assets/explorations/tactus.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Row 2: Lux solo, left-aligned */}
                <div className="work-row">
                    <a ref={tile3Ref} href="https://lux.devagyasharma.com" target="_blank" rel="noopener noreferrer" className="project-tile">
                        <div className="project-tile-content">
                            <div className="project-title">Lux ↗</div>
                            <div className="project-description">Lissajous curve card generator with gradient controls</div>
                            <div className="project-video">
                                <video autoPlay loop muted playsInline>
                                    <source src="/assets/explorations/lux.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
