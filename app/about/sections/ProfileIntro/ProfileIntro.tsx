'use client';

import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function ProfileIntro() {
    const bioRef = useGridSnap();

    return (
        <section>
            <div className="container">
                <div className="about-intro-grid">
                    {/* Photo */}
                    <div className="about-photo">
                        <img src="/assets/profile/photo.jpg" alt="Devagya Sharma" />
                    </div>

                    {/* Bio Text */}
                    <div ref={bioRef} className="about-bio-box">
                        <h1 className="about-greeting">Hello! I'm <span className="highlight">Dev</span>agya Sharma.</h1>
                        <p className="about-description">
                            I'm a UX Engineer focused on creating scalable, accessible web and mobile experiences.
                            I design interfaces and build prototypes that help teams work more efficiently while
                            keeping accessibility and consistency at the center. I collaborate closely with designers
                            and developers to ensure products are practical, maintainable, and ready for real users.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
