'use client';
import aspireStyles from './AspireDesignSystem.module.css';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs } from '@/app/components/common';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function AspireDesignSystem() {
    // Single content box ref
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs currentPage="Aspire Design System" />
                <ProjectContent ref={contentBoxRef}>
                    <ProjectHero
                        title="Aspire Design System"
                        description="A design system built to address UI inconsistencies, improve workflow efficiency, and ensure accessibility."
                        role={<>
                            UX/UI Designer<sup>*</sup>
                        </>}
                        tags={["Figma", "typescale.com", "Adobe Colors"]}
                        footnote={
                            <>
                                <sup>*</sup> While I was actively involved in defining the product vision, conducting user research, mapping our user flows and various other aspects of the product, for the purpose of this case study, I'll focus on my work as a UX/UI Designer.
                            </>
                        }
                    >
                    </ProjectHero>
                    <ProjectSection id="kickoff">
                        {/* Kickoff & Chaos */}
                        <h2>Kickoff & Chaos.</h2>
                        <p>My journey at the <a href="https://www.centerforaspire.org/" className={projectStyles.link} target="_blank" rel="noopener noreferrer">Center for Societal Aspiration</a> began when I joined as a UX/UI Designer, tasked with designing a platform that connects people with the right resources through a personalized approach. In our startup environment, we took an scrappy, outcome-based approach—aimed at saving time ✅ and speeding up development ⬆️.<br />‍<br />At first, I set up typography styles and created a color palette with extensions—just enough to make something usable, even if the Figma file wasn't perfectly organized. This method worked well from a product standpoint, but as the designer, I soon found myself overwhelmed 🥵 by the constant need to navigate between pages, update components, and keep track of countless details.<br />‍<br />Committed to delivering a prototype, I decided to wait until the business requirements were sorted out before tackling these deeper design issues. Then, drawing from my experience in developing Brand Guides and Brand Identities, I realized I could solve these challenges by creating a ✨<span className={aspireStyles.textUppercase}>Design System</span>✨.<br /></p>

                        <h3>My Journey.</h3>
                        <img src="/assets/projects/aspire-design-system/682a6cd392514d91b4fe7445_journey_map.webp" alt="Journey Map" />
                    </ProjectSection>
                    <ProjectSection id="issues">
                        {/* Issues with the design */}
                        <h2>Issues with the design.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🗃️</div>
                                <h3>Disorganized File Structure</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🧱</div>
                                <h3>Inconsistent Designs</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>ℹ️</div>
                                <h3>Accessibility Concerns</h3>
                            </div>
                        </div>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Incomplete Tokenization</h3>
                                <img src="/assets/projects/aspire-design-system/6828a27da406b7094b779689_Evidence No Intent.webp" alt="Incomplete Tokenization" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Inconsistent Iconography</h3>
                                <img src="/assets/projects/aspire-design-system/6828a27dbc98a5225dbe4ed1_Evidence Inconsistence.webp" alt="Inconsistent Iconography" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Low Contrast UI Elements</h3>
                                <img src="/assets/projects/aspire-design-system/6828a27d4e674ab14f3d5dc7_Evidence Accessibility.webp" alt="Low Contrast UI Elements" />
                            </div>
                        </div>
                        {/* Impact on workflow */}
                        <h2>Impact on my workflow.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🔁</div>
                                <h3>Repetitive Work</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🐌</div>
                                <h3>Slow to Make Changes</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>😵‍💫</div>
                                <h3>Too Much in my Head</h3>
                            </div>
                        </div>
                    </ProjectSection>
                    <ProjectSection id="statement">
                        {/* Goal Statement */}
                        <h2>It was clear that I needed to...</h2>
                        <p className={projectStyles.projectStatement}>Create a Design System in Figma to — reduce <strong>inconsistencies ⬇️</strong>, improve <strong>accessibility 👌🏻</strong>, and streamline the <strong>workflow</strong> 🚀.</p>
                    </ProjectSection>
                    <ProjectSection id="plan">
                        {/* The Plan */}
                        <h2>The Plan.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🏢</div>
                                <h3>Create a Structure</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🧰</div>
                                <h3>Organize the Foundations</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>⚙️</div>
                                <h3>Build Core Components</h3>
                            </div>
                        </div>
                    </ProjectSection>
                    <ProjectSection id="structure">
                        {/* File Structure */}
                        <h2>File Structure.</h2>
                        <p>Taking inspiration from the concepts of Object Oriented Programming, specifically Abstraction, I created two distinct files – one for the Foundational pieces, and another for Components – to isolate them from wireframes of the designs.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup2}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Foundations.</h3>
                                <img src="/assets/projects/aspire-design-system/6823f188c0623716cd0bcfd3_fs_foundations.webp" alt="Foundations" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Components.</h3>
                                <img src="/assets/projects/aspire-design-system/6823f188ee0b31edb9c65aef_fs_components.webp" alt="Components" />
                            </div>
                        </div>
                    </ProjectSection>
                    <ProjectSection id="assets">
                        {/* Design Foundations */}
                        <h2>Design Foundations.</h2>
                        <h3>Colors.</h3>
                        <div className={aspireStyles.colorGrid}>
                            <img src="/assets/projects/aspire-design-system/6828dd9dbc98a5225ddc0caf_fo_color_primary.png" alt="Primary Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9d41e2a4ca9e108820_fo_color_neutral.png" alt="Neutral Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9dbc98a5225ddc0cab_fo_color_success.png" alt="Success Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9dec7dc180f82d3140_fo_color_warning.png" alt="Warning Colors" />
                            <img src="/assets/projects/aspire-design-system/6828dd9d3b32e2ea35fd2bae_fo_color_error.png" alt="Error Colors" />
                        </div>

                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup2}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Typography / Desktop.</h3>
                                <img src="/assets/projects/aspire-design-system/6828ded434450f4a544af943_fo_type_desktop.webp" alt="Desktop Typography" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Typography / Mobile.</h3>
                                <img src="/assets/projects/aspire-design-system/6828ded4583d2384040fc4b3_fo_type_mobile.webp" alt="Mobile Typography" />
                            </div>
                        </div>

                        <h3>Color Tokens.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e119f6ea2287d94ee621_fo_tokens.webp" alt="Color Tokens" />

                        <h3>Layouts and Spacing.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e3f1d8c30949b2bfc5eb_fo_layout.webp" alt="Layouts and Spacing" />

                        <h3>Styles.</h3>
                        <img src="/assets/projects/aspire-design-system/6828e7ad583d238404140fc8_fo_styles.webp" alt="Styles" />

                        {/* Key Components */}
                        <h2>Key Components.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Icons.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d404034ffd912431719_comp_icons.webp" alt="Icons" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Buttons.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d40583d238404263f02_comp_buttons.webp" alt="Buttons" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Checkbox.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d40a81045968f868e66_comp_checkbox.webp" alt="Checkbox" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Input Field.</h3>
                                <img src="/assets/projects/aspire-design-system/68290d404034ffd912431755_comp_input.webp" alt="Input Field" />
                            </div>
                        </div>
                    </ProjectSection>
                    <ProjectSection id="outcomes">
                        {/* Outcomes */}
                        <h2>Outcomes.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🗂️</div>
                                <h3>A scalable, organized Design System now supports future development.</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🪄</div>
                                <h3>Reduced repetitive design tasks and improved consistency.</h3>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>👥</div>
                                <h3>Easier onboarding for new designers and developers.</h3>
                            </div>
                        </div>
                    </ProjectSection>
                    <ProjectSection id="learnings">
                        <h2>What I Learned.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🔍</div>
                                <h3>Small issues compound</h3>
                                <p>Inconsistencies, inaccessible styles, or missing documentation may seem minor — but they multiply fast and hurt the user experience and developer handoff.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>🧭</div>
                                <h3>Systems prevent chaos</h3>
                                <p>Without a structured design system, even small changes create ripple effects and slow everything down.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className={projectStyles.projectCardIcon}>📘</div>
                                <h3>Design systems are more than components</h3>
                                <p>It's not just reusable UI — it's a shared language for design, dev, and product to work faster, smarter, and together.</p>
                            </div>
                        </div>
                    </ProjectSection>
                </ProjectContent>
                {/* Main Content Box */}
            </main>
        </>
    );
}
