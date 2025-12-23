'use client';

import Navbar from "../components/layout/Navbar/Navbar";
import NavLogo from "../components/layout/Navbar/NavLogo";
import { SectionTitle, ValueCard } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';
import './About.styles.css';

export default function About() {
    const bioRef = useGridSnap();
    const statsRef = useGridSnap();

    return (
        <>
            <header className="header-wrapper">
                <div className="container">
                    <div className="header-content">
                        <NavLogo />
                        <Navbar />
                    </div>
                </div>
            </header>
            <main>
                {/* Photo + Bio Section */}
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

                {/* Stats / By The Numbers */}
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

                {/* Core Values */}
                <section>
                    <div className="container">
                        <SectionTitle text="Core Values" gridSpaces={8} />
                        <div className="values-grid">
                            <ValueCard
                                value="honesty"
                                title="Honesty"
                                description="Say what you mean, mean what you say"
                            />
                            <ValueCard
                                value="openCommunication"
                                title="Candor"
                                description="Say what you need, say what you feel"
                            />
                            <ValueCard
                                value="mutualRespect"
                                title="Mutual Respect"
                                description="Everyone brings something valuable"
                            />
                            <ValueCard
                                value="havingFun"
                                title="Having Fun"
                                description="Life's too short for boring work"
                            />
                            <ValueCard
                                value="growth"
                                title="Growth"
                                description="Comfort zones are where skills go to die"
                            />
                            <ValueCard
                                value="sanity"
                                title="Sanity"
                                description="Mental peace enables purposeful work"
                            />
                        </div>
                    </div>
                </section>

                {/* My Setup */}
                <section>
                    <div className="container">
                        <SectionTitle text="My Setup" gridSpaces={10} />
                        <div className="desk-image-container">
                            <img src="/assets/profile/8bitdesk.jpg" alt="8-bit desk setup" />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
