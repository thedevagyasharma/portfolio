'use client';
import './GridOverlayPro.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { Breadcrumbs, VideoPlayer } from '@/app/components/common';
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
                <Breadcrumbs currentPage="Grid Overlay Pro" />

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">
                            <a href="https://github.com/thedevagyasharma/grid-overlay-extension?tab=readme-ov-file#-installation" target="_blank" rel="noopener noreferrer" className="github-repo-button">
                                Install Extension
                            </a>

                            {/* Hero */}
                            <div className="aspire-hero">
                                <h1 className="aspire-title">Grid Overlay Pro <a href="https://github.com/thedevagyasharma/grid-overlay-extension/releases" target="_blank" rel="noopener noreferrer" className="release-badge">View Latest Release</a></h1>

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

                            {/* Video Demo */}
                            <VideoPlayer
                                src="/assets/projects/grid-overlay-pro/video.webm"
                                autoplay={false}
                                loop={false}
                                className="grid-overlay-video-player"
                                showMuteControl={true}
                            />

                            {/* Overview */}
                            <h2>Overview</h2>
                            <p>Grid Overlay Pro is a browser extension that helps designers and developers ensure pixel-perfect alignment by overlaying customizable grid systems on any webpage. Unlike static design tool overlays, it features responsive grid adaptation—automatically adjusting column widths and spacing when the viewport resizes, maintaining consistent proportions across any screen size.</p>

                            <hr className="aspire-divider" />

                            {/* Challenge */}
                            <h2>Challenge</h2>
                            <p>Designers rely on grid overlays in tools like Figma to ensure precise alignment and spacing. However, this capability doesn't translate to the browser during development. Developers are left eyeballing measurements or switching between design files and code, slowing down the implementation process and increasing the risk of visual inconsistencies.</p>

                            <hr className="aspire-divider" />

                            {/* Approach */}
                            <h2>Approach</h2>
                            <ul>
                                <li>
                                    Initially prototyped as a browser bookmarklet to quickly test the concept, but pivoted to a full browser extension to enable public distribution and persistent settings
                                </li>
                                <li>
                                    Collaborated with Claude AI to iteratively build and refine features, testing different overlay rendering approaches and control mechanisms
                                </li>
                                <li>
                                    Implemented responsive grid adaptation as a key differentiator—grids automatically recalculate and adjust when the window resizes, a feature not available in static design tools
                                </li>
                                <li>
                                    Focused on developer ergonomics with persistent settings, keyboard shortcuts, and minimal UI that stays out of the way
                                </li>
                                <li>
                                    Open-sourced the project to allow the community to contribute features and adapt the tool to their workflows
                                </li>
                            </ul>


                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
