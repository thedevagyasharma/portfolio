'use client';

import Header from '../components/layout/Header/Header';
import { ProfileIntro, ByTheNumbers, CoreValues, MySetup } from './sections';
import './About.styles.css';

export default function About() {
    return (
        <>
            <Header/>
            <main>
                <ProfileIntro />
                <ByTheNumbers />
                <CoreValues />
                <MySetup />
            </main>
        </>
    );
}
