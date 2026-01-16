'use client';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs, VideoPlayer } from '@/app/components/common';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function Lux() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header />

            <main>
                <Breadcrumbs currentPage="Lux" />
                <ProjectContent ref={contentBoxRef}>
                    <ProjectHero
                        title="Lux"
                        description="Generate beautiful gradient Lissajous curve cards and download them as PNG."
                        role="Developer & Designer"
                        tags={["React", "Canvas API"]}
                        cta={<a href="https://lux.devagyasharma.com" target="_blank" rel="noopener noreferrer" className={projectStyles.projectCtaButton}>
                            Try Lux
                        </a>}
                    />

                    <ProjectSection id="demo">
                        {/* Video Player */}
                        <VideoPlayer
                            src="/assets/projects/lux/lux-video.webm"
                            autoplay={true}
                            loop={true}
                            showMuteControl={false}
                        />
                    </ProjectSection>

                    <ProjectSection id="overview">
                        {/* Overview */}
                        <h2>Overview</h2>
                        <p>Lux is a generative art tool that creates mesmerizing Lissajous curves with gradient effects. Users can customize parameters to generate unique parametric curves and export them as high-quality PNG images.</p>
                    </ProjectSection>

                    <ProjectSection id="process">
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
                    </ProjectSection>
                </ProjectContent>
            </main>
        </>
    );
}
