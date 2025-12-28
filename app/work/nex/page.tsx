'use client';
import './NEX.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { Breadcrumbs } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function NEX() {
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
                <Breadcrumbs currentPage="NEX" />

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">

                            {/* Hero */}
                            <div className="aspire-hero">
                                <h1 className="aspire-title">NEX</h1>

                                <p className="large">Electronic Music Records Company</p>

                                <div className="aspire-meta-cards">
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">My Role</div>
                                        <div className="aspire-meta-value">Visual Designer</div>
                                    </div>
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">Tools</div>
                                        <div className="aspire-tools">
                                            <div className="aspire-tool-tag">Processing</div>
                                            <div className="aspire-tool-tag">Adobe Illustrator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="aspire-divider" />

                            {/* Logo */}
                            <img src="/assets/projects/nex/nex-logo.webp" alt="NEX Logo System" className="aspire-image" />

                            {/* Posters */}
                            <img src="/assets/projects/nex/nex-posters.webp" alt="NEX ARIA Posters" className="aspire-image" />

                            {/* Icons */}
                            <img src="/assets/projects/nex/nex-icons.webp" alt="NEX Icon System" className="aspire-image" />

                            {/* Mockups */}
                            <img src="/assets/projects/nex/nex-mockups.webp" alt="NEX Mockups" className="aspire-image" />

                            {/* LP Cover */}
                            <img src="/assets/projects/nex/nex-lp-cover.webp" alt="NEX LP Cover" className="aspire-image" />

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
