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
                        <a ref={tile1Ref} href="/projects/aspire" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">01</div>
                                <div className="project-title">Aspire Platform</div>
                                <div className="project-description">A comprehensive platform for managing aspirations and goals with intuitive design.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire/cover.webp" alt="Aspire Platform" />
                                </div>
                            </div>
                        </a>
                        <a ref={tile2Ref} href="/projects/project-two" className="project-tile">
                            <div className="project-tile-content">
                                <div className="project-number">02</div>
                                <div className="project-title">Project Two</div>
                                <div className="project-description">Innovative solution combining cutting-edge technology with thoughtful design.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire/cover.webp" alt="Project Two" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}