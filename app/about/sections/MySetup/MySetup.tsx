'use client';

import { SectionTitle } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function MySetup() {
    const imageContainerRef = useGridSnap<HTMLDivElement>();

    return (
        <section>
            <div className="container">
                <SectionTitle text="My Setup" gridSpaces={6} mobileGridSpaces={7}/>
                <div ref={imageContainerRef} className="desk-image-container">
                    <img src="/assets/profile/8bitdesk.jpg" alt="8-bit desk setup" />
                </div>
            </div>
        </section>
    );
}
