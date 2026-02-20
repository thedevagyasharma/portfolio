'use client';
import './Work.styles.css';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Work() {
    const tile1Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles1',
        contentSelector: {
            selector: '.project-tile-content',
            paddingTiles: 2 // 1 tile top + 1 tile bottom
        }
    });
    const tile2Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles1',
        contentSelector: {
            selector: '.project-tile-content',
            paddingTiles: 2
        }
    });
    const tile3Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles2',
        contentSelector: {
            selector: '.project-tile-content',
            paddingTiles: 2
        }
    });
    const tile4Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles2',
        contentSelector: {
            selector: '.project-tile-content',
            paddingTiles: 2
        }
    });

    return (
        <>
            <section>
                <div className="container">
                    <div className="work-section-header">
                        <SectionTitle text="Case Studies" gridSpaces={7} mobileGridSpaces={9} />
                        <a href="/work" className="navbar-button-base see-all-link">
                            <span className="link-label">All work</span>
                        </a>
                    </div>
                    <div className="work-row">
                        <a ref={tile1Ref} href="/work/gofit" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">01</div>
                                <div className="project-title">GoFit</div>
                                <div className="project-description">Connecting fitness enthusiasts with nearby events and community, making it easier to stay active and accountable.</div>
                                <div className="project-video">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/assets/projects/gofit/gofit-cover-bg.webm" type="video/webm" />
                                    </video>
                                </div>
                            </div>
                        </a>
                        <a ref={tile2Ref} href="/work/grid-overlay-pro" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">02</div>
                                <div className="project-title">Grid Overlay Pro</div>
                                <div className="project-description">Bringing Figma-style grid overlays to any live webpage, making pixel-perfect alignment a browser-native part of the design process.</div>
                                <div className="project-video">
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
                    <div className="work-row">
                        <a ref={tile3Ref} href="/work/aspire-design-system" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">03</div>
                                <div className="project-title">Aspire Design System</div>
                                <div className="project-description">A design system built to address UI inconsistencies, improve workflow efficiency, and ensure accessibility.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire-design-system/cover.webp" alt="Aspire Design System" />
                                </div>
                            </div>
                        </a>
                        <a ref={tile4Ref} href="/work/dealeron" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">04</div>
                                <div className="project-title">2x-ing Production Speed</div>
                                <div className="project-description">Bringing a scalable, reusable approach to development workflows to accelerate production speed through standardized HTML, CSS, JS, jQuery solutions.</div>
                                <div className="project-video">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/assets/projects/dealeron/cover.webm" type="video/webm" />
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