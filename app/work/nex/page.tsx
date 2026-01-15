'use client';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs } from '@/app/components/common';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function NEX() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header/>

            <main>
                <Breadcrumbs currentPage="NEX" />
                <ProjectContent ref={contentBoxRef}>
                    <ProjectHero
                        title="NEX"
                        description="Electronic Music Records Company"
                        role="Visual Designer"
                        tags={["Processing", "Adobe Illustrator"]}
                    />
                    <ProjectSection id="gallery">
                        {/* Logo */}
                        <img src="/assets/projects/nex/nex-logo.webp" alt="NEX Logo System" className={projectStyles.projectImage} />

                        {/* Posters */}
                        <img src="/assets/projects/nex/nex-posters.webp" alt="NEX ARIA Posters" className={projectStyles.projectImage} />

                        {/* Icons */}
                        <img src="/assets/projects/nex/nex-icons.webp" alt="NEX Icon System" className={projectStyles.projectImage} />

                        {/* Mockups */}
                        <img src="/assets/projects/nex/nex-mockups.webp" alt="NEX Mockups" className={projectStyles.projectImage} />

                        {/* LP Cover */}
                        <img src="/assets/projects/nex/nex-lp-cover.webp" alt="NEX LP Cover" className={projectStyles.projectImage} />
                    </ProjectSection>
                </ProjectContent>
            </main>
        </>
    );
}
