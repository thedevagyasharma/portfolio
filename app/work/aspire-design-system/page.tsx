'use client';
import './AspireDesignSystem.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { Breadcrumbs } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function AspireDesignSystem() {
    // Single content box ref
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
            <Breadcrumbs currentPage="Aspire Design System" />

            {/* Main Content Box */}
            <section className="aspire-content-section">
                <div className="container">
                    <div ref={contentBoxRef} className="aspire-content-box">

                        {/* Hero */}
                        <div className="aspire-hero">
                            <div className="aspire-tags">
                                <div className="aspire-tag">UX Design</div>
                                <div className="aspire-tag">Visual Design</div>
                            </div>
                            <h1 className="aspire-title">Aspire Design System</h1>
                            <p className="large">A design system built to address UI inconsistencies, improve workflow efficiency, and ensure accessibility.<br /></p>
                            <div className="aspire-meta-cards">
                                <div className="aspire-meta-card">
                                    <div className="aspire-meta-label">My Role</div>
                                    <div className="aspire-meta-value">UX/UI Designer<sup>*</sup></div>
                                </div>
                                <div className="aspire-meta-card aspire-meta-card-large">
                                    <div className="aspire-meta-label">Tools</div>
                                    <div className="aspire-tools">
                                        <div className="aspire-tool-tag">Figma</div>
                                        <div className="aspire-tool-tag">typescale.com</div>
                                        <div className="aspire-tool-tag">Adobe Colors</div>
                                    </div>
                                </div>
                            </div>
                            <p className="aspire-footnote"><sup>*</sup> While I was actively involved in defining the product vision, conducting user research, mapping our user flows and various other aspects of the product, for the purpose of this case study, I'll focus on my work as a UX/UI Designer.</p>
                        </div>
                        <hr className="aspire-divider" />

                        {/* Kickoff & Chaos */}
                        <h2>Kickoff & Chaos.</h2>
                        <p>My journey at the <a href="https://www.centerforaspire.org/" className="aspire-link" target="_blank" rel="noopener noreferrer">Center for Societal Aspiration</a> began when I joined as a UX/UI Designer, tasked with designing a platform that connects people with the right resources through a personalized approach. In our startup environment, we took an scrappy, outcome-based approach—aimed at saving time ✅ and speeding up development ⬆️.<br />‍<br />At first, I set up typography styles and created a color palette with extensions—just enough to make something usable, even if the Figma file wasn't perfectly organized. This method worked well from a product standpoint, but as the designer, I soon found myself overwhelmed 🥵 by the constant need to navigate between pages, update components, and keep track of countless details.<br />‍<br />Committed to delivering a prototype, I decided to wait until the business requirements were sorted out before tackling these deeper design issues. Then, drawing from my experience in developing Brand Guides and Brand Identities, I realized I could solve these challenges by creating a ✨<span className="aspire-text-uppercase">Design System</span>✨.<br /></p>

                        <h3>My Journey.</h3>
                        <img src="/assets/projects/aspire-design-system/682a6cd392514d91b4fe7445_journey_map.webp" alt="Journey Map" className="aspire-image" />

                        <hr className="aspire-divider" />

                        {/* Issues with the design */}
                        <h2>Issues with the design.</h2>
                        <div className="aspire-card-group">
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🗃️</div>
                                <h3>Disorganized File Structure</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🧱</div>
                                <h3>Inconsistent Designs</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">ℹ️</div>
                                <h3>Accessibility Concerns</h3>
                            </div>
                        </div>
                        <div className="aspire-card-group">
                            <div className="aspire-card">
                                <img src="/assets/projects/aspire-design-system/6828a27da406b7094b779689_Evidence No Intent.webp" alt="Incomplete Tokenization" className="aspire-image" />
                                <h3>Incomplete Tokenization</h3>
                            </div>
                            <div className="aspire-card">
                                <img src="/assets/projects/aspire-design-system/6828a27dbc98a5225dbe4ed1_Evidence Inconsistence.webp" alt="Inconsistent Iconography" className="aspire-image" />
                                <h3>Inconsistent Iconography</h3>
                            </div>
                            <div className="aspire-card">
                                <img src="/assets/projects/aspire-design-system/6828a27d4e674ab14f3d5dc7_Evidence Accessibility.webp" alt="Low Contrast UI Elements" className="aspire-image" />
                                <h3>Low Contrast UI Elements</h3>
                            </div>
                        </div>

                        {/* Impact on workflow */}
                        <h2>Impact on my workflow.</h2>
                        <div className="aspire-card-group">
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🔁</div>
                                <h3>Repetitive Work</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🐌</div>
                                <h3>Slow to Make Changes</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">😵‍💫</div>
                                <h3>Too Much in my Head</h3>
                            </div>
                        </div>

                        <hr className="aspire-divider" />

                        {/* Goal Statement */}
                        <h2>It was clear that I needed to...</h2>
                        <div className="aspire-goal-statement">Create a Design System in Figma to — reduce <strong>inconsistencies ⬇️</strong>, improve <strong>accessibility 👌🏻</strong>, and streamline the <strong>workflow</strong> 🚀.</div>

                        <hr className="aspire-divider" />

                        {/* The Plan */}
                        <h2>The Plan.</h2>
                        <div className="aspire-card-group">
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🏢</div>
                                <h3>Create a Structure</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🧰</div>
                                <h3>Organize the Foundations</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">⚙️</div>
                                <h3>Build Core Components</h3>
                            </div>
                        </div>

                        {/* File Structure */}
                        <h2>File Structure.</h2>
                        <p>Taking inspiration from the concepts of Object Oriented Programming, specifically Abstraction, I created two distinct files – one for the Foundational pieces, and another for Components – to isolate them from wireframes of the designs.</p>
                        <div className="aspire-two-col">
                            <div className="aspire-sub-box">
                                <h3>Foundations.</h3>
                                <img src="/assets/projects/aspire-design-system/6823f188c0623716cd0bcfd3_fs_foundations.webp" alt="Foundations" className="aspire-image" />
                            </div>
                            <div className="aspire-sub-box">
                                <h3>Components.</h3>
                                <img src="/assets/projects/aspire-design-system/6823f188ee0b31edb9c65aef_fs_components.webp" alt="Components" className="aspire-image" />
                            </div>
                        </div>

                        <hr className="aspire-divider" />

                        {/* Design Foundations */}
                        <h2>Design Foundations.</h2>
                        <h3>Colors.</h3>
                        <div className="aspire-color-grid">
                            <img src="/assets/projects/aspire-design-system/6828dd9dbc98a5225ddc0caf_fo_color_primary.png" alt="Primary Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9d41e2a4ca9e108820_fo_color_neutral.png" alt="Neutral Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9dbc98a5225ddc0cab_fo_color_success.png" alt="Success Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9dec7dc180f82d3140_fo_color_warning.png" alt="Warning Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9d3b32e2ea35fd2bae_fo_color_error.png" alt="Error Colors" />
                        </div>

                        <div className="aspire-two-col">
                            <div className="aspire-sub-box">
                                <h3>Typography / Desktop.</h3>
                                <img src="/assets/projects/aspire-design-system/6828ded434450f4a544af943_fo_type_desktop.webp" alt="Desktop Typography" className="aspire-image" />
                            </div>
                            <div className="aspire-sub-box">
                                <h3>Typography / Mobile.</h3>
                                <img src="/assets/projects/aspire-design-system/6828ded4583d2384040fc4b3_fo_type_mobile.webp" alt="Mobile Typography" className="aspire-image" />
                            </div>
                        </div>

                        <h3>Color Tokens.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e119f6ea2287d94ee621_fo_tokens.webp" alt="Color Tokens" className="aspire-image" />

                        <h3>Layouts and Spacing.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e3f1d8c30949b2bfc5eb_fo_layout.webp" alt="Layouts and Spacing" className="aspire-image" />

                        <h3>Styles.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e7ad583d238404140fc8_fo_styles.webp" alt="Styles" className="aspire-image" />

                        {/* Key Components */}
                        <h2>Key Components.</h2>
                        <div className="aspire-two-col">
                            <div className="aspire-sub-box">
                                <h3>Icons.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d404034ffd912431719_comp_icons.webp" alt="Icons" className="aspire-image" />
                            </div>
                            <div className="aspire-sub-box">
                                <h3>Buttons.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d40583d238404263f02_comp_buttons.webp" alt="Buttons" className="aspire-image" />
                            </div>
                        </div>
                        <div className="aspire-two-col">
                            <div className="aspire-sub-box">
                                <h3>Checkbox.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d40a81045968f868e66_comp_checkbox.webp" alt="Checkbox" className="aspire-image" />
                            </div>
                            <div className="aspire-sub-box">
                                <h3>Input Field.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d404034ffd912431755_comp_input.webp" alt="Input Field" className="aspire-image" />
                            </div>
                        </div>

                        <hr className="aspire-divider" />

                        {/* Outcomes */}
                        <h2>Outcomes.</h2>
                        <div className="aspire-card-group">
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🗂️</div>
                                <h3>A scalable, organized Design System now supports future development.</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🪄</div>
                                <h3>Reduced repetitive design tasks and improved consistency.</h3>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">👥</div>
                                <h3>Easier onboarding for new designers and developers.</h3>
                            </div>
                        </div>

                        <hr className="aspire-divider" />

                        {/* What I Learned */}
                        <h2>What I Learned.</h2>
                        <div className="aspire-card-group aspire-card-group-with-text">
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🔍</div>
                                <h3>Small issues compound</h3>
                                <p>Inconsistencies, inaccessible styles, or missing documentation may seem minor — but they multiply fast and hurt the user experience and developer handoff.</p>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">🧭</div>
                                <h3>Systems prevent chaos</h3>
                                <p>Without a structured design system, even small changes create ripple effects and slow everything down.</p>
                            </div>
                            <div className="aspire-card">
                                <div className="aspire-card-icon">📘</div>
                                <h3>Design systems are more than components</h3>
                                <p>It's not just reusable UI — it's a shared language for design, dev, and product to work faster, smarter, and together.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            </main>
        </>
    );
}
