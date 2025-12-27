'use client';
import './Tools.styles.css';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Tools() {
    const tile1Ref = useGridSnap<HTMLAnchorElement>({ groupId: 'tool-tiles' });
    const tile2Ref = useGridSnap<HTMLAnchorElement>({ groupId: 'tool-tiles' });

    return (
        <>
            <section>
                <div className="container">
                    <SectionTitle text="Personal Projects" gridSpaces={9} />
                    <div className="tools-grid">
                        <a ref={tile1Ref} href="/work/lux" className="tool-tile">
                            <div className="tool-tile-content">
                                <div className="tool-number">01</div>
                                <div className="tool-title">Lux</div>
                                <div className="tool-description">Generate beautiful gradient Lissajous curve cards and download them as PNG.</div>
                                <div className="tool-video">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/assets/projects/lux/cover.webm" type="video/webm" />
                                    </video>
                                </div>
                            </div>
                        </a>
                        <a ref={tile2Ref} href="/work/grid-overlay-pro" className="tool-tile">
                            <div className="tool-tile-content">
                                <div className="tool-number">02</div>
                                <div className="tool-title">Grid Overlay Pro <span className="wip-badge">[WIP]</span></div>
                                <div className="tool-description">Professional grid overlay system for precise design alignment.</div>
                                <div className="tool-video">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/assets/projects/grid-overlay-pro/cover.webm" type="video/webm" />
                                    </video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
