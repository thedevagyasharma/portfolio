'use client';

import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function ByTheNumbers() {
    const statsRef = useGridSnap();

    return (
        <section>
            <div className="container">
                <SectionTitle text="By The Numbers" gridSpaces={8} />
                <div ref={statsRef} className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">3</div>
                        <div className="stat-label">Years of Experience</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">2</div>
                        <div className="stat-label">Design Systems Built</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">6</div>
                        <div className="stat-label">Industries Served</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">80+</div>
                        <div className="stat-label">Students Taught</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
