'use client';
import './GridOverlayPro.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function GridOverlayPro() {
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
                            <span className="aspire-breadcrumb-current">Grid Overlay Pro</span>
                        </div>
                    </div>
                </section>

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">
                            <a href="https://github.com/thedevagyasharma/grid-overlay-extension" target="_blank" rel="noopener noreferrer" className="github-repo-button">
                                GitHub Repo
                            </a>

                            {/* Hero */}
                            <div className="aspire-hero">
                                <h1 className="aspire-title">Grid Overlay Pro <span className="in-progress-badge">[IN PROGRESS]</span></h1>

                                <p className="large">An open source browser extension for designers and developers to visualize grid layouts directly on any webpage.</p>

                                <div className="aspire-meta-cards">
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">My Role</div>
                                        <div className="aspire-meta-value">Developer</div>
                                    </div>
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">Tools</div>
                                        <div className="aspire-tools">
                                            <div className="aspire-tool-tag">JavaScript</div>
                                            <div className="aspire-tool-tag">Chrome APIs</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="aspire-divider" />

                            {/* Overview */}
                            <h2>Overview</h2>
                            <p>Grid Overlay Pro is a browser extension that helps designers and developers ensure pixel-perfect alignment by overlaying customizable grid systems on any webpage. The tool provides real-time control over grid parameters like column count, gutter width, and margins.</p>

                            <hr className="aspire-divider" />

                            {/* Demo */}
                            <h2>In Action</h2>
                            <p>Watch how the grid overlay adapts to different configurations in real-time:</p>
                            {/* Placeholder for your clip */}
                            <div className="grid-demo-placeholder">
                                <p>Demo video coming soon. Meanwhile, <a href="https://chromewebstore.google.com/detail/grid-overlay-pro/your-extension-id" target="_blank" rel="noopener noreferrer">install the extension</a> or <a href="https://github.com/thedevagyasharma/grid-overlay-extension" target="_blank" rel="noopener noreferrer">view the source code</a>.</p>
                            </div>


                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
