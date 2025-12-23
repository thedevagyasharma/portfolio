'use client';

import Navbar from "../components/layout/Navbar/Navbar";
import NavLogo from "../components/layout/Navbar/NavLogo";
import { ProfileIntro, ByTheNumbers, CoreValues, MySetup } from './sections';
import './About.styles.css';

export default function About() {
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
                <ProfileIntro />
                <ByTheNumbers />
                <CoreValues />
                <MySetup />
            </main>
        </>
    );
}
