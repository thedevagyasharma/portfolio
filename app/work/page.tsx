'use client';
import './Work.styles.css';
import Header from '@/app/components/layout/Header/Header';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function WorkIndex() {
    const tile1Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile2Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile3Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile4Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile5Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile6Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });
    const tile7Ref = useGridSnap<HTMLAnchorElement>({
        groupId: 'work-tiles',
        contentSelector: { selector: '.project-tile-content', paddingTiles: 2 }
    });

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className="container">
                        <SectionTitle text="All Work" gridSpaces={7} mobileGridSpaces={9} />
                        <div className="work-row">
                            <a ref={tile1Ref} href="/work/gofit" className="project-tile">
                                <div className="project-tile-content">
                                    <div className="project-number">01</div>
                                    <div className="project-title">GoFit</div>
                                    <div className="project-description">Connecting fitness enthusiasts with nearby events and community, making it easier to stay active and accountable.</div>
                                    <div className="project-video">
                                        <video autoPlay loop muted playsInline>
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
                                        <video autoPlay loop muted playsInline>
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
                                        <video autoPlay loop muted playsInline>
                                            <source src="/assets/projects/dealeron/cover.webm" type="video/webm" />
                                        </video>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="work-row">
                            <a ref={tile5Ref} href="/work/lux" className="project-tile">
                                <div className="project-tile-content">
                                    <div className="project-number">05</div>
                                    <div className="project-title">Lux</div>
                                    <div className="project-description">Generate beautiful gradient Lissajous curve cards and download them as PNG.</div>
                                    <div className="project-video">
                                        <video autoPlay loop muted playsInline>
                                            <source src="/assets/projects/lux/cover.webm" type="video/webm" />
                                        </video>
                                    </div>
                                </div>
                            </a>
                            <a ref={tile6Ref} href="/work/multisig-transaction-flow" className="project-tile">
                                <div className="project-tile-content">
                                    <div className="project-number">06</div>
                                    <div className="project-title">Multi-Signature Transaction Flow</div>
                                    <div className="project-description">A scalable transaction flow designed for institutional crypto wallets, handling multi-chain complexity with clarity and precision.</div>
                                    <div className="project-image">
                                        <img src="/assets/projects/multisig-transaction-flow/cover.webp" alt="Multi-Signature Transaction Flow" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="work-row">
                            <a ref={tile7Ref} href="/work/nex" className="project-tile">
                                <div className="project-tile-content">
                                    <div className="project-number">07</div>
                                    <div className="project-title">NEX</div>
                                    <div className="project-description">Brand identity exploring generative pattern systems, inspired by John Maeda's philosophy of balancing simplicity and complexity.</div>
                                    <div className="project-image">
                                        <img src="/assets/projects/nex/nex-posters.webp" alt="NEX Brand Identity" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
