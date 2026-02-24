'use client';
import './GridOverlayPro.styles.css';
import gridStyles from './GridOverlayPro.module.css';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs, ImageSlideshow } from '@/app/components/common';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function GridOverlayPro() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header />

            <main>
                <Breadcrumbs currentPage="Grid Overlay Pro" />
                <ProjectContent ref={contentBoxRef}>

                    {/* ── Hero ──────────────────────────────────────── */}
                    <ProjectHero
                        title={<>
                            Grid Overlay Pro <a href="https://github.com/thedevagyasharma/grid-overlay-extension/" target="_blank" rel="noopener noreferrer" className={gridStyles.releaseBadge}>View Source Code</a>
                        </>}
                        description="Bringing Figma-style grid overlays to any live webpage, making pixel-perfect alignment a browser-native part of the design process."
                        role="Design Engineer"
                        tags={["Competitive Analysis", "Information Architecture", "UX Iteration", "Figma", "Chrome Extension APIs", "HTML / CSS / JavaScript"]}
                        tagsLabel="Skills"
                        cta={<a href="https://chromewebstore.google.com/detail/grid-overlay-pro/dffjjhlaagddjjjdjgihgjnhcmpbpcjl" target="_blank" rel="noopener noreferrer" className={projectStyles.projectCtaButton}>
                            Install Extension
                        </a>}
                    >
                    </ProjectHero>

                    {/* ── Overview ──────────────────────────────────── */}
                    <ProjectSection id="overview">
                        <h2>Overview</h2>
                        <p>Grid Overlay Pro is a Chrome extension that lets developers and designers overlay fully customizable, responsive grid systems on any webpage in real time. It bridges the gap between design tool grid systems and browser-based implementation, removing the constant context switching between Figma, CSS, and DevTools during layout work.</p>
                        <ImageSlideshow
                            images={[
                                '/assets/projects/grid-overlay-pro/Screenshot 1.webp',
                                '/assets/projects/grid-overlay-pro/Screenshot 2.webp',
                                '/assets/projects/grid-overlay-pro/Screenshot 3.webp',
                                '/assets/projects/grid-overlay-pro/Screenshot 4.webp',
                                '/assets/projects/grid-overlay-pro/Screenshot 5.webp'
                            ]}
                            autoplay={true}
                            autoplayInterval={4000}
                        />
                    </ProjectSection>

                    {/* ── The Problem ───────────────────────────────── */}
                    <ProjectSection id="problem">
                        <h2>The Problem</h2>
                        <p>Design tools like Figma make grid systems visible. Browsers don&apos;t.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup2}`}>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/grid-overlay-pro/Grids%20Available.png" alt="Grid systems visible in Figma" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/grid-overlay-pro/Grids%20Not%20Available.png" alt="Grid systems not visible in the browser" />
                            </div>
                        </div>
                        <p>Verifying a grid system during development meant constant switching between CSS, the browser, and DevTools. The reference existed in the design file but not in the environment where the work was happening.</p>
                    </ProjectSection>

                    {/* ── Iteration 1: Bookmarklet ──────────────────── */}
                    <ProjectSection id="iteration-1">
                        <h2>Iteration 1: Bookmarklet</h2>
                        <p>The fastest path to a working grid overlay was a bookmarklet.</p>
                        <video
                            src="/assets/projects/grid-overlay-pro/Bookmarklet%20Demo.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={projectStyles.projectImage}
                        />
                        <p>It worked, but any change meant going back into the code.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> Hard to customize</h3>
                                <p>Changing any grid value means editing raw code and repacking the bookmarklet.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> One config only</h3>
                                <p>No way to switch between different grid setups.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="toHighlight">×</span> No project management</h3>
                                <p>Using separate bookmarklets for separate projects breaks down fast.</p>
                            </div>
                        </div>
                    </ProjectSection>

                    {/* ── Looking at Existing Extensions ────────────── */}
                    <ProjectSection id="competitor-analysis">
                        <h2>Looking at Existing Extensions</h2>
                        <p>Before building further, I checked what was already out there.</p>
                        <table className="gop-competitor-table">
                            <thead>
                                <tr>
                                    <th>Extension</th>
                                    <th>UI-based config</th>
                                    <th>Custom breakpoints</th>
                                    <th>Preset management</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CSS Grid Overlay</td>
                                    <td data-label="UI-based config"><span className="gop-indicator-partial">JSON only</span></td>
                                    <td data-label="Custom breakpoints"><span className="gop-indicator-yes">√</span></td>
                                    <td data-label="Preset management"><span className="gop-indicator-partial">Hidden</span></td>
                                </tr>
                                <tr>
                                    <td>NOV Grid</td>
                                    <td data-label="UI-based config"><span className="gop-indicator-yes">√</span></td>
                                    <td data-label="Custom breakpoints"><span className="gop-indicator-partial">Max 3</span></td>
                                    <td data-label="Preset management"><span className="gop-indicator-no">×</span></td>
                                </tr>
                                <tr>
                                    <td>Grid Overlay</td>
                                    <td data-label="UI-based config"><span className="gop-indicator-yes">√</span></td>
                                    <td data-label="Custom breakpoints"><span className="gop-indicator-no">×</span></td>
                                    <td data-label="Preset management"><span className="gop-indicator-no">×</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Every existing option had at least one critical gap. None combined a UI-based config, custom breakpoints, and preset management in the same tool.</p>
                    </ProjectSection>

                    {/* ── Iteration 2: Chrome Extension V1 ─────────── */}
                    <ProjectSection id="iteration-2">
                        <h2>Iteration 2: Chrome Extension V1</h2>
                        <p>A Chrome extension solved the repacking problem with a persistent UI panel and settings that persisted across sessions.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="gop-indicator-yes">√</span> UI-based config</h3>
                                <p>Adjust any grid value live from the panel — no code editing required.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="gop-indicator-yes">√</span> Custom breakpoints</h3>
                                <p>Define as many breakpoints as needed, each with its own grid configuration.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3><span className="gop-indicator-yes">√</span> Preset management</h3>
                                <p>Save, name, and switch between grid configurations across projects.</p>
                            </div>
                        </div>
                        <img
                            src="/assets/projects/grid-overlay-pro/GRID%20OVERLAY%20PRO%20%E2%80%94%20VERSION%201.png"
                            alt="Grid Overlay Pro V1 in-browser screenshot"
                            className={projectStyles.projectImage}
                        />
                        <h3>Testing</h3>
                        <p>Testing revealed three categories of UX problems.</p>

                        <h4>Hierarchy and Indicators</h4>
                        <p>Secondary controls competed with primary ones for attention, and the breakpoint list used multiple overlapping indicators with no clear meaning.</p>
                        <img
                            src="/assets/projects/grid-overlay-pro/ISSUE%201%20%26%202.png"
                            alt="Issues 1 and 2 — hierarchy and indicator problems"
                            className={projectStyles.projectImage}
                        />

                        <h4>Data Model</h4>
                        <p>Loading a preset overwrote the active working state, and saved presets were snapshots that didn&apos;t reflect any edits made after saving.</p>
                        <img
                            src="/assets/projects/grid-overlay-pro/ISSUE%203%20%26%204.png"
                            alt="Issues 3 and 4 — data model problems"
                            className={projectStyles.projectImage}
                        />

                        <h4>Information Architecture</h4>
                        <p>Every control lived on a single screen, creating overload regardless of what the user was trying to do.</p>
                        <img
                            src="/assets/projects/grid-overlay-pro/ISSUE%205.png"
                            alt="Issue 5 — information architecture problem"
                            className={projectStyles.projectImage}
                        />
                    </ProjectSection>

                    {/* ── Iteration 3: Chrome Extension V2 ─────────── */}
                    <ProjectSection id="iteration-3">
                        <h2>Iteration 3: Chrome Extension V2</h2>
                        <p>The V2 redesign started with architecture — mapping the new structure in Figma before writing any code.</p>

                        <h3>Refreshed Architecture</h3>
                        <p>Presets, breakpoints, and grid params became separate screens instead of one overloaded panel.</p>
                        <img
                            src="/assets/projects/grid-overlay-pro/REFRESHED%20ARCHITECTURE.png"
                            alt="Refreshed architecture diagram"
                            className={projectStyles.projectImage}
                        />

                        <h3>Interaction Diagram</h3>
                        <p>Edits autosave to the active preset. One indicator marks the active breakpoint.</p>
                        <img
                            src="/assets/projects/grid-overlay-pro/INTERACTION%20DIAGRAM.png"
                            alt="Interaction diagram"
                            className={projectStyles.projectImage}
                        />

                        <h3>Version 1 vs Version 2</h3>
                        <img
                            src="/assets/projects/grid-overlay-pro/V1%20vs%20V2.png"
                            alt="V1 vs V2 in-browser side-by-side comparison"
                            className={projectStyles.projectImage}
                        />

                        <h3>Screens</h3>
                        <img
                            src="/assets/projects/grid-overlay-pro/GRID%20OVERLAY%20PRO%20%E2%80%94%20VERSION%202_1.png"
                            alt="Grid Overlay Pro V2 screen 1"
                            className={projectStyles.projectImage}
                        />
                        <img
                            src="/assets/projects/grid-overlay-pro/GRID%20OVERLAY%20PRO%20%E2%80%94%20VERSION%202_2.png"
                            alt="Grid Overlay Pro V2 screen 2"
                            className={projectStyles.projectImage}
                        />
                        <img
                            src="/assets/projects/grid-overlay-pro/GRID%20OVERLAY%20PRO%20%E2%80%94%20VERSION%202_3.png"
                            alt="Grid Overlay Pro V2 screen 3"
                            className={projectStyles.projectImage}
                        />
                    </ProjectSection>

                    {/* ── Outcome ───────────────────────────────────── */}
                    <ProjectSection id="outcome">
                        <h2>Outcome</h2>
                        <p>194 users on the Chrome Web Store without a dedicated launch.</p>
                    </ProjectSection>

                    {/* ── Learnings ─────────────────────────────────── */}
                    <ProjectSection id="learnings">
                        <h2>Learnings</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Prototype to validate, redesign to scale</h3>
                                <p>The bookmarklet proved the idea fast. Testing V1 revealed what actually needed fixing before any V2 code was written.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Real problems compound</h3>
                                <p>Built for one project, it resonated with designers and developers hitting the same gap independently.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Design before code (eventually)</h3>
                                <p>Mapping the architecture and interactions before writing V2 solved structural problems that a code-first approach couldn&apos;t have caught.</p>
                            </div>
                        </div>
                    </ProjectSection>

                </ProjectContent>
            </main>
        </>
    );
}
