'use client';
import './Lux.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
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
                {/* Breadcrumbs */}
                <section>
                    <div className="container">
                        <div className="aspire-breadcrumbs">
                            <a href="/" className="aspire-breadcrumb-link">Home</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <a href="/work" className="aspire-breadcrumb-link">Work</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <span className="aspire-breadcrumb-current">Lux</span>
                        </div>
                    </div>
                </section>

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">

                            {/* Hero */}
                            <div className="aspire-hero">
                                <div className="aspire-tags">
                                    <div className="aspire-tag">Creative Tool</div>
                                    <div className="aspire-tag">Web App</div>
                                </div>

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

                                <a href="https://lux.devagyasharma.com" target="_blank" rel="noopener noreferrer" className="lux-app-button">
                                    Try Lux
                                </a>
                            </div>

                            <hr className="aspire-divider" />

                            {/* Overview */}
                            <h2>Overview</h2>
                            <p>Lux is a generative art tool that creates mesmerizing Lissajous curves with gradient effects. Users can customize parameters to generate unique parametric curves and export them as high-quality PNG images.</p>

                            <hr className="aspire-divider" />

                            {/* Demo */}
                            <h2>In Action</h2>
                            <p>Explore the interactive curve generation:</p>
                            {/* Placeholder for your clip */}
                            <div className="lux-demo-placeholder">
                                <p>Demo video coming soon</p>
                            </div>


                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
