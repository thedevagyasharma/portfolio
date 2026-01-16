'use client';
import gridStyles from './GridOverlayPro.module.css';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs, VideoPlayer } from '@/app/components/common';
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
                    <ProjectHero
                        title={<>
                            Grid Overlay Pro <a href="https://github.com/thedevagyasharma/grid-overlay-extension/" target="_blank" rel="noopener noreferrer" className={gridStyles.releaseBadge}>View Source Code</a>
                        </>}
                        description="An open source browser extension for designers and developers to visualize grid layouts directly on any webpage."
                        role="Design Engineer"
                        tags={["HTML", "CSS", "JavaScript", "Figma", "Chrome APIs"]}
                        cta={<a href="https://chromewebstore.google.com/detail/grid-overlay-pro/dffjjhlaagddjjjdjgihgjnhcmpbpcjl" target="_blank" rel="noopener noreferrer" className={projectStyles.projectCtaButton}>
                            Install Extension
                        </a>}
                    >
                    </ProjectHero>
                    <ProjectSection id="video">
                        {/* Video Demo */}
                        <VideoPlayer
                            src="/assets/projects/grid-overlay-pro/video.webm"
                            autoplay={false}
                            loop={false}
                            showMuteControl={true}
                        />
                    </ProjectSection>
                    <ProjectSection id="overview">
                        {/* Overview */}
                        <h2>Overview</h2>
                        <p>Grid Overlay Pro is a browser extension that helps designers and developers ensure pixel-perfect alignment by overlaying customizable grid systems on any webpage. Unlike static design tool overlays, it features responsive grid adaptation—automatically adjusting column widths and spacing when the viewport resizes, maintaining consistent proportions across any screen size.</p>
                    </ProjectSection>
                    <ProjectSection id="challenge">
                        {/* Challenge */}
                        <h2>Challenge</h2>
                        <p>Designers rely on grid overlays in tools like Figma to ensure precise alignment and spacing. However, this capability doesn't translate to the browser during development. Developers are left eyeballing measurements or switching between design files and code, slowing down the implementation process and increasing the risk of visual inconsistencies.</p>
                    </ProjectSection>
                    <ProjectSection id="approach">
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
                    </ProjectSection>
                </ProjectContent>
            </main>
        </>
    );
}
