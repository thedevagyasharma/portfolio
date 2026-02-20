'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import './Navbar.styles.css';

// Animation timing constants
const ANIMATION_TIMING = {
    FLATTEN_DURATION: 50,
    SLIDE_DURATION: 300,
    STAGGER_DELAY: 100,
} as const;

// Animation state type
type AnimationState = {
    isCollapsed: boolean;
    direction: 'opening' | 'closing' | null;
    shouldFlatten: boolean;
};

// Helper function to check if route is active
const isRouteActive = (pathname: string, href: string): boolean => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
};

const GRID_SIZE_PX = 64; // must match --grid-size CSS var
const MOBILE_BREAKPOINT = 675;

function getSlideDistance(staggerIndex: number): number {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const tileWidth = isMobile ? 3 : 2;
    const toggleWidth = isMobile ? 2 : 1;
    return ((4 - staggerIndex) * tileWidth + toggleWidth) * GRID_SIZE_PX;
}

export default function Navbar() {
    const pathname = usePathname();
    const [animState, setAnimState] = useState<AnimationState>({
        isCollapsed: false,
        direction: null,
        shouldFlatten: false,
    });
    const [slideDistances, setSlideDistances] = useState<number[]>([]);

    const navLinks = [
        { name: 'Home', href: "/", external: false, hideOnMobile: true },
        { name: 'Work', href: "/work", external: false },
        { name: 'About', href: "/about", external: false },
        { name: 'Resume', href: "https://github.com/thedevagyasharma/resume/blob/main/devagya_sharma_resume.pdf", external: true },
    ];

    const toggleMenu = () => {
        const distances = navLinks.map((_, i) => getSlideDistance(i));
        setSlideDistances(distances);

        if (!animState.isCollapsed) {
            // Closing sequence: Flatten → Clip → Slide out
            setAnimState(prev => ({ ...prev, shouldFlatten: true }));

            setTimeout(() => {
                setAnimState(prev => ({
                    ...prev,
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
                    shouldFlatten: false,
                });
            }, totalCloseDuration);
        } else {
            // Opening sequence: Slide in → Add shadow via CSS transition
            setAnimState({
                isCollapsed: false,
                direction: 'opening',
                shouldFlatten: false,
            });

            const totalSlideDuration =
                ANIMATION_TIMING.SLIDE_DURATION +
                (ANIMATION_TIMING.STAGGER_DELAY * 3);

            setTimeout(() => {
                setAnimState(prev => ({
                    ...prev,
                    direction: null,
                }));
            }, totalSlideDuration);
        }
    };

    return (
        <nav className="navbar">
            <div className="links-container">
                <ul className="links">
                    {!animState.isCollapsed && navLinks.map((link, index) => {
                        const isActive = !link.external && isRouteActive(pathname, link.href);

                        const linkClasses = [
                            'link',
                            isActive && 'active',
                            animState.shouldFlatten && 'flatten',
                            animState.direction === 'opening' && 'slide-in',
                            animState.direction === 'closing' && 'slide-out',
                            link.hideOnMobile && 'hide-on-mobile',
                        ].filter(Boolean).join(' ');

                        return (
                            <li
                                key={link.name}
                                className={linkClasses}
                                style={{
                                    '--stagger-index': index,
                                    '--slide-distance': slideDistances[index] ? `${slideDistances[index]}px` : undefined,
                                } as React.CSSProperties}
                            >
                                <a
                                    href={link.href}
                                    className="navbar-button-base"
                                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                                >
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
