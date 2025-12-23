'use client';

import { SectionTitle } from '@/app/components/common';

export default function MySetup() {
    return (
        <section>
            <div className="container">
                <SectionTitle text="My Setup" gridSpaces={10} />
                <div className="desk-image-container">
                    <img src="/assets/profile/8bitdesk.jpg" alt="8-bit desk setup" />
                </div>
            </div>
        </section>
    );
}
