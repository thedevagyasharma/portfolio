'use client';

import { HomeIcon, Briefcase, BookUser, FileText, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Navbar.styles.css';

// Animation timing constants
const ANIMATION_TIMING = {
    FLATTEN_DURATION: 50,
    SLIDE_DURATION: 300,
    STAGGER_DELAY: 100,
    SHADOW_DURATION: 50,
} as const;

// Animation state type
type AnimationState = {
    isCollapsed: boolean;
    direction: 'opening' | 'closing' | null;
    shouldClip: boolean;
    shouldFlatten: boolean;
    shouldAddShadow: boolean;
};

// Helper function to extract section ID from href
const getSectionId = (href: string): string => href.replace('#', '');

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [animState, setAnimState] = useState<AnimationState>({
        isCollapsed: false,
        direction: null,
        shouldClip: false,
        shouldFlatten: false,
        shouldAddShadow: false,
    });

    const navLinks = [
        { name: 'Home', href: "#home", icon: <HomeIcon /> },
        { name: 'Work', href: "#work", icon: <Briefcase /> },
        { name: 'About', href: "#about", icon: <BookUser /> },
        { name: 'Resume', href: "#resume", icon: <FileText /> },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach((link) => {
            const section = document.getElementById(getSectionId(link.href));
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    const toggleMenu = () => {
        if (!animState.isCollapsed) {
            // Closing sequence: Flatten → Clip → Slide out
            setAnimState(prev => ({ ...prev, shouldFlatten: true }));

            setTimeout(() => {
                setAnimState(prev => ({
                    ...prev,
                    shouldClip: true,
                    direction: 'closing'
                }));
            }, ANIMATION_TIMING.FLATTEN_DURATION);

            const totalCloseDuration =
                ANIMATION_TIMING.FLATTEN_DURATION +
                ANIMATION_TIMING.SLIDE_DURATION +
                (ANIMATION_TIMING.STAGGER_DELAY * 3);

            setTimeout(() => {
                setAnimState({
                    isCollapsed: true,
                    direction: null,
                    shouldClip: false,
                    shouldFlatten: false,
                    shouldAddShadow: false,
                });
            }, totalCloseDuration);
        } else {
            // Opening sequence: Slide in → Unclip → Add shadow
            setAnimState({
                isCollapsed: false,
                direction: 'opening',
                shouldClip: true,
                shouldFlatten: false,
                shouldAddShadow: false,
            });

            const totalSlideDuration =
                ANIMATION_TIMING.SLIDE_DURATION +
                (ANIMATION_TIMING.STAGGER_DELAY * 3);

            setTimeout(() => {
                setAnimState(prev => ({
                    ...prev,
                    shouldClip: false,
                    shouldAddShadow: true
                }));
            }, totalSlideDuration);

            setTimeout(() => {
                setAnimState(prev => ({
                    ...prev,
                    direction: null,
                    shouldAddShadow: false
                }));
            }, totalSlideDuration + ANIMATION_TIMING.SHADOW_DURATION);
        }
    };

    return (
        <nav className="navbar">
            <div className={`links-container ${animState.shouldClip ? 'animating' : ''}`}>
                <ul className="links">
                    {!animState.isCollapsed && navLinks.map((link, index) => {
                        const sectionId = getSectionId(link.href);
                        const isActive = activeSection === sectionId;

                        const linkClasses = [
                            'link',
                            isActive && 'active',
                            animState.shouldFlatten && 'flatten',
                            animState.direction === 'opening' && 'slide-in',
                            animState.direction === 'closing' && 'slide-out',
                            animState.shouldAddShadow && 'add-shadow',
                        ].filter(Boolean).join(' ');

                        return (
                            <li
                                key={link.name}
                                className={linkClasses}
                                style={{
                                    '--stagger-index': index,
                                } as React.CSSProperties}
                            >
                                <a
                                    href={link.href}
                                    onClick={() => handleLinkClick(sectionId)}
                                    className="navbar-button-base"
                                >
                                    {/* <span className='link-icon'>{link.icon}</span> */}
                                    <span className='link-label'>{link.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button
                onClick={toggleMenu}
                className="menu-button navbar-button-base"
                aria-label={animState.isCollapsed ? "Open menu" : "Close menu"}
            >
                <Menu />
            </button>
        </nav>
    );
}
