'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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

// Helper function to check if route is active
const isRouteActive = (pathname: string, href: string): boolean => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
};

export default function Navbar() {
    const pathname = usePathname();
    const [animState, setAnimState] = useState<AnimationState>({
        isCollapsed: false,
        direction: null,
        shouldClip: false,
        shouldFlatten: false,
        shouldAddShadow: false,
    });

    const navLinks = [
        { name: 'Home', href: "/", external: false },
        // { name: 'Work', href: "#work", external: false }, // Hidden until work page is ready
        { name: 'About', href: "/about", external: false },
        { name: 'Resume', href: "https://drive.google.com/file/d/1vWStQwBMnDTmQ1fTLuEt2Nxsjxbb3Xft/view", external: true },
    ];

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
                        const isActive = !link.external && isRouteActive(pathname, link.href);

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
