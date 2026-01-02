'use client';
import './Lux.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { Breadcrumbs, VideoPlayer } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Lux() {
    const contentBoxRef = useGridSnap();

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
                <Breadcrumbs currentPage="Lux" />

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">
                            <a href="https://lux.devagyasharma.com" target="_blank" rel="noopener noreferrer" className="lux-app-button">
                                Try Lux
                            </a>

                            {/* Hero */}
                            <div className="aspire-hero">
                                <h1 className="aspire-title">Lux</h1>

                                <p className="large">Generate beautiful gradient Lissajous curve cards and download them as PNG.</p>

                                <div className="aspire-meta-cards">
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">My Role</div>
                                        <div className="aspire-meta-value">Developer & Designer</div>
                                    </div>
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">Tools</div>
                                        <div className="aspire-tools">
                                            <div className="aspire-tool-tag">React</div>
                                            <div className="aspire-tool-tag">Canvas API</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="aspire-divider" />

                            {/* Video Player */}
                            <VideoPlayer
                                src="/assets/projects/lux/lux-video.webm"
                                autoplay={true}
                                loop={true}
                                className="lux-video-player"
                                showMuteControl={false}
                            />

                            {/* Overview */}
                            <h2>Overview</h2>
                            <p>Lux is a generative art tool that creates mesmerizing Lissajous curves with gradient effects. Users can customize parameters to generate unique parametric curves and export them as high-quality PNG images.</p>

                            <hr className="aspire-divider" />

                            {/* Process */}
                            <h2>Process</h2>
                            <ul>
                                <li>
                                    Arc browser's generative cards demonstrated the appeal of algorithmic beauty. I built my own version with deeper parameter control for more intentional outputs
                                </li>
                                <li>
                                    Designed constrained parameter ranges instead of infinite values. Every combination guarantees visually appealing curves rather than random noise
                                </li>
                                <li>
                                    Hand-crafted each gradient palette by studying color theory and digital art references. Experimented with neomorphic UI as a stylistic departure from my usual work
                                </li>
                                <li>
                                    Solved Canvas API positioning and sizing challenges to achieve pixel-perfect curve rendering at any viewport size
                                </li>
                                <li>
                                    Used GitHub Copilot to accelerate implementation while maintaining full control over UI design and user experience
                                </li>
                                <li>
                                    Built with modular architecture to enable future feature expansion while maintaining real-time performance
                                </li>
                            </ul>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
