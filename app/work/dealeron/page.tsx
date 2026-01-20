'use client';
import './DealerOn.styles.css';
import Header from '@/app/components/layout/Header/Header';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { Breadcrumbs, VideoPlayer } from '@/app/components/common';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function DealerOn() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs currentPage="DealerOn" />

                {/* Main Content Box */}
                <ProjectContent ref={contentBoxRef}>
                    <ProjectHero
                        title="2x-ing Production Speed with Reusable Systems"
                        description="Bringing a scalable, reusable approach to development workflows to accelerate production speed through standardized HTML, CSS, JS, jQuery solutions."
                        role="Frontend Developer / Web Designer"
                        tags={["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"]}
                    />

                    <ProjectSection id="context">
                        <h2>Context.</h2>
                        <p>Built websites for automotive dealerships across the USA. Handled site migrations, SEO/homepage creation, accessibility compliance, direct client support.</p>
                    </ProjectSection>

                    <ProjectSection id="problems">
                        <h2>Problems.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4}`}>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> Writing boilerplate from scratch for every page/component</h3>
                                <p>Repeated effort on solved problems slowed delivery and created missed deadlines</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> Common patterns recreated repeatedly</h3>
                                <p>Inconsistent solutions across the team made code harder to maintain and review</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> Bootstrap layout issues required custom CSS every time</h3>
                                <p>Time spent debugging the same layout bugs instead of shipping features</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> No standard solutions for recurring problems</h3>
                                <p>Developer frustration from reinventing the wheel, technical debt accumulation</p>
                            </div>
                        </div>
                    </ProjectSection>

                    <ProjectSection id="solution">
                        <h2>Solution.</h2>

                        <h3><span className="toHighlight">★</span> Standardized Web Components</h3>
                        <p>11 structural components, 3 UI components with up to 9 design variations each</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <h4 className={projectStyles.projectCardGroupLabel}>Result</h4>
                            <div className={projectStyles.projectCard}>
                                <p>Up to 15 mins saved per page</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p>Refined and standardized UI across sites</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p>Improved accessibility and usability</p>
                            </div>
                        </div>

                        <h3><span className="toHighlight">★</span> Standardized CSS and JS Utilities</h3>
                        <p>4 CSS utilities, 8 JS utilities</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup2}`}>
                            <h4 className={projectStyles.projectCardGroupLabel}>Result</h4>
                            <div className={projectStyles.projectCard}>
                                <p>Up to 30 mins saved from reinventing solutions</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p>Standard solutions across sites increasing maintainability</p>
                            </div>
                        </div>

                        <h3><span className="toHighlight">★</span> Development Tools</h3>
                        <p>8 navigation bookmarklets, 2 development tools, 1 browser automation</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <h4 className={projectStyles.projectCardGroupLabel}>Result</h4>
                            <div className={projectStyles.projectCard}>
                                <p>Multi-step workflows reduced to single clicks</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p>Reduced code errors and sped up development</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p>Manual click workflows reduced by 75%</p>
                            </div>
                        </div>
                    </ProjectSection>

                    <ProjectSection id="impact">
                        <h2>Impact.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4}`}>
                            <div className={projectStyles.projectCard}>
                                <div className="bigStat">
                                    <div className="bigStatValue">2x</div>
                                    <h3>faster development</h3>
                                </div>
                                <p>50% reduction in build time</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className="bigStat">
                                    <div className="bigStatValue">↑</div>
                                    <h3>UI consistency</h3>
                                </div>
                                <p>Improved accessibility and usability across all sites</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className="bigStat">
                                    <div className="bigStatValue">↑</div>
                                    <h3>scalability</h3>
                                </div>
                                <p>Codebase easier to extend and maintain with standardized solutions</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <div className="bigStat">
                                    <div className="bigStatValue">↑</div>
                                    <h3>developer satisfaction</h3>
                                </div>
                                <p>Reduced repetitive work and frustration from reinventing solutions</p>
                            </div>
                        </div>
                    </ProjectSection>

                    <ProjectSection id="examples">
                        <h2>Examples.</h2>

                        <h3>Skeletons</h3>
                        <p>Without skeletons.html: 14 seconds to write HTML for a single section boilerplate.<br />
                        With skeletons.html: 2 seconds to copy-paste the desired layout.<br />
                        On pages with 4-5 sections on average (up to 12 sections), this saves significant development time.</p>
                        <video
                            src="/assets/projects/dealeron/skeletons.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />

                        <h3>Cards</h3>
                        <h4>Before</h4>
                        <p>Using default CSS classes resulted in inconsistent card heights, misaligned buttons, and images requiring manual resizing.</p>
                        <video
                            src="/assets/projects/dealeron/before.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />

                        <h4>After</h4>
                        <p>CSS utility automatically handles equal-height cards, auto-resizes images regardless of original dimensions, and aligns buttons at the bottom for a polished, cohesive layout.</p>
                        <video
                            src="/assets/projects/dealeron/after.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />

                        <h3>Tabs</h3>
                        <p>9 documented variants of the tabs component, ready to copy and use across any DealerOn website. Other complex components were designed and documented with similar comprehensive variations.</p>
                        <video
                            src="/assets/projects/dealeron/tabs.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />

                        <h3>Link Copier</h3>
                        <p>Browser bookmarklet tool that eliminated manual link creation.<br />
                        Without tool: 70 seconds to write 3 links, manually selecting tagging templates and ordering elements.<br />
                        With tool: 15 seconds to copy-paste 3 links with automatic template selection and proper ordering.</p>
                        <video
                            src="/assets/projects/dealeron/links.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />
                    </ProjectSection>

                    <ProjectSection id="takeaways">
                        <h2>Takeaways.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Repetition signals opportunity</h3>
                                <p>Solving the same problem multiple times creates a clear signal to build a standardized solution.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Measure the invisible work</h3>
                                <p>Time spent on micro-tasks like selecting templates and debugging layout issues rarely gets tracked, yet eliminating these creates the biggest productivity gains.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Small wins compound into transformation</h3>
                                <p>Systematically addressing dozens of small friction points can achieve significant productivity improvements.</p>
                            </div>
                        </div>
                    </ProjectSection>
                </ProjectContent>
            </main>
        </>
    )
}