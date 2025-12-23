'use client';
import './Tools.styles.css';
import SectionTitle from "../../../components/layout/SectionTitle/SectionTitle";
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
                        <a ref={tile1Ref} href="/tools/lux" className="tool-tile">
                            <div className="tool-tile-content">
                                <div className="tool-number">01</div>
                                <div className="tool-title">Lux</div>
                                <div className="tool-description">Generate beautiful gradient Lissajous curve cards and download them as PNG.</div>
                            </div>
                        </a>
                        <a ref={tile2Ref} href="/tools/grid-overlay-pro" className="tool-tile">
                            <div className="tool-tile-content">
                                <div className="tool-number">02</div>
                                <div className="tool-title">Grid Overlay Pro <span className="wip-badge">[WIP]</span></div>
                                <div className="tool-description">Professional grid overlay system for precise design alignment.</div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
