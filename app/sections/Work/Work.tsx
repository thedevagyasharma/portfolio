'use client';
import './Work.styles.css';
import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Work() {
    const tile1Ref = useGridSnap<HTMLAnchorElement>({ groupId: 'work-tiles' });
    const tile2Ref = useGridSnap<HTMLAnchorElement>({ groupId: 'work-tiles' });

    return (
        <>
            <section>
                <div className="container">
                    <SectionTitle text="Selected Works" gridSpaces={8} />
                    <div className="work-grid">
                        <a ref={tile1Ref} href="/work/aspire-design-system" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">01</div>
                                <div className="project-title">Aspire Design System</div>
                                <div className="project-description">A design system built to address UI inconsistencies, improve workflow efficiency, and ensure accessibility.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire-design-system/cover.webp" alt="Aspire Design System" />
                                </div>
                            </div>
                        </a>
                        <a ref={tile2Ref} href="/work/multisig-transaction-flow" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">02</div>
                                <div className="project-title">Multi-Signature Transaction Flow</div>
                                <div className="project-description">A scalable transaction flow designed for institutional crypto wallets, handling multi-chain complexity with clarity and precision.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/multisig-transaction-flow/cover.webp" alt="Multi-Signature Transaction Flow" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}