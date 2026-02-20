'use client';
import './GoFit.styles.css';
import Header from '@/app/components/layout/Header/Header';
import { Breadcrumbs } from '@/app/components/common';
import { ProjectContent, ProjectSection, ProjectHero, projectStyles } from '@/app/components/layout/Project';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function GoFit() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs currentPage="GoFit" />
                <ProjectContent ref={contentBoxRef}>

                    {/* ── Hero ──────────────────────────────────────── */}
                    <ProjectHero
                        title="GoFit"
                        description="Connecting fitness enthusiasts with nearby events and community, making it easier to stay active and accountable."
                        role={<>UX Designer<br />Visual Designer</>}
                        tags={["User Research", "Competitive Analysis", "Persona Development", "Storyboarding", "User Flows", "Wireframing", "Usability Testing", "Visual Design", "Prototyping"]}
                        tagsLabel="Skills"
                        footnote="Academic project — team of 4 designers."
                    />

                    {/* ── Brief ─────────────────────────────────────── */}
                    <ProjectSection id="brief">
                        <h2>The Brief.</h2>
                        <p>Pick a UN Sustainable Development Goal. Explore real problems people face around it. Design a solution — from research all the way through to a high-fidelity prototype.</p>
                        <p>Our team chose <strong>SDG #3 — Good Health &amp; Well-Being</strong>, and focused on physical fitness — an area where the gap between intention and action is well documented, and one we all had personal stakes in.</p>
                    </ProjectSection>

                    {/* ── Research ──────────────────────────────────── */}
                    <ProjectSection id="research">
                        <h2>Research.</h2>

                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-stat-number">13</p>
                                <p className="gofit-stat-label">Interview participants</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-stat-number">3</p>
                                <p className="gofit-stat-label">Competitors audited</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-stat-number">6</p>
                                <p className="gofit-stat-label">Usability testers</p>
                            </div>
                        </div>

                        <h3>What already exists?</h3>
                        <p>We audited existing tools to understand the space and find where they fell short.</p>

                        <table className="gofit-competitor-table">
                            <thead>
                                <tr>
                                    <th>App</th>
                                    <th>Type</th>
                                    <th>What it does well</th>
                                    <th>What's missing</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="gofit-competitor-type">Partial Competitor</span>
                                        <span className="gofit-competitor-name">TeamSnap</span>
                                    </td>
                                    <td>Sports team management</td>
                                    <td>Robust scheduling, private media sharing, instant team comms</td>
                                    <td>Locked to existing teams — no discovery of new people or events</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="gofit-competitor-type">Indirect Competitor</span>
                                        <span className="gofit-competitor-name">Squaddy</span>
                                    </td>
                                    <td>Group fitness coordination</td>
                                    <td>Community building, progress tracking, shared interests</td>
                                    <td>Weak social layer — browsing local activity or meeting strangers is an afterthought</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="gofit-competitor-type">Analogous Competitor</span>
                                        <span className="gofit-competitor-name">Citizen</span>
                                    </td>
                                    <td>Local event/safety feed</td>
                                    <td>Real-time local updates, community engagement</td>
                                    <td>1.5mi radius cap, no fitness context, no coordination features</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>The tools that existed either served <em>existing</em> groups or enabled <em>passive</em> discovery — nothing bridged both with active coordination.</p>

                        <h3>What do people actually want?</h3>
                        <p>We ran semi-structured interviews with 13 people across a range of fitness activities — from gym regulars to weekend hikers. Four themes surfaced consistently.</p>

                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4}`}>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-insight-label">Most people said</p>
                                <p className="gofit-insight-finding">Group activities keep them consistent</p>
                                <p className="gofit-insight-detail">Working out with others is what actually builds a habit. Solo workouts are easy to skip.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-insight-label">Many people said</p>
                                <p className="gofit-insight-finding">They plan fitness ahead of time</p>
                                <p className="gofit-insight-detail">Spontaneous plans rarely work. People want to schedule activities around the rest of their week.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-insight-label">Many people said</p>
                                <p className="gofit-insight-finding">They want to meet people, work out together</p>
                                <p className="gofit-insight-detail">Fitness is a vehicle for community. New connections were a primary motivator — health outcomes came second.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <p className="gofit-insight-label">Most people said</p>
                                <p className="gofit-insight-finding">Tracking progress keeps them motivated</p>
                                <p className="gofit-insight-detail">Visibility into what they've done — stats, streaks, history — reinforces the behaviour loop.</p>
                            </div>
                        </div>
                    </ProjectSection>

                    {/* ── Defining the Problem ──────────────────────── */}
                    <ProjectSection id="problem">
                        <h2>Defining the Problem.</h2>

                        <h3>Who are we designing for?</h3>
                        <p>Two distinct user types emerged from the research. Both want to be active with others — they just lack the tools to make it happen reliably.</p>

                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup2} gofit-persona-grid`}>
                            {/* Persona 1 — Jonathan */}
                            <div className={`${projectStyles.projectCard} gofit-persona-card`}>
                                <div className="gofit-persona-header">
                                    <p className="gofit-persona-name">Jonathan, 23</p>
                                    <p className="gofit-persona-meta">Software Developer · USA</p>
                                    <p className="gofit-persona-quote">"I want to play volleyball but I never know if anyone will actually show up."</p>
                                </div>
                                <div className="gofit-persona-body">
                                    <div className="gofit-persona-section">
                                        <p className="gofit-persona-col-label">Goals</p>
                                        <ul>
                                            <li>Stay physically active and maintain fitness</li>
                                            <li>Join team sports and group activities</li>
                                            <li>Make friends with similar interests</li>
                                        </ul>
                                    </div>
                                    <div className="gofit-persona-section">
                                        <p className="gofit-persona-col-label">Frustrations</p>
                                        <ul>
                                            <li>Shows up to fields to find no one there</li>
                                            <li>No reliable way to find people with common interests</li>
                                            <li>Individual sports feel isolating</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Persona 2 — Amanda */}
                            <div className={`${projectStyles.projectCard} gofit-persona-card`}>
                                <div className="gofit-persona-header">
                                    <p className="gofit-persona-name">Amanda, 24</p>
                                    <p className="gofit-persona-meta">Business Analyst · USA</p>
                                    <p className="gofit-persona-quote">"I love planning group activities — I just wish there was one place to handle all of it."</p>
                                </div>
                                <div className="gofit-persona-body">
                                    <div className="gofit-persona-section">
                                        <p className="gofit-persona-col-label">Goals</p>
                                        <ul>
                                            <li>Organise group fitness activities for her friends</li>
                                            <li>Coordinate logistics — gear lists, meeting points, timing</li>
                                            <li>Make sure everyone shows up prepared and on time</li>
                                        </ul>
                                    </div>
                                    <div className="gofit-persona-section">
                                        <p className="gofit-persona-col-label">Frustrations</p>
                                        <ul>
                                            <li>Coordinating over group chats is chaotic and easy to miss</li>
                                            <li>No way to share a gear list or checklist alongside the event</li>
                                            <li>People show up unprepared because details got buried</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3>How might we...</h3>
                        <p className={projectStyles.projectStatement}>Design a support system for fitness enthusiasts that <strong>provides resources</strong>, keeps them <strong>informed and motivated</strong>, and helps them <strong>discover</strong> nearby fitness events?</p>
                    </ProjectSection>

                    {/* ── Design ────────────────────────────────────── */}
                    <ProjectSection id="design">
                        <h2>Design.</h2>

                        <h3>Mapping real scenarios</h3>
                        <p>Before sketching screens, we built storyboards around Jonathan and Amanda's journeys — to validate that our features solved real moments, not hypothetical ones.</p>
                        <h4>Jonathan's story</h4>
                        <p>He finds a local volleyball event, RSVPs, shows up, and meets people with shared interests. The app handles discovery and coordination.</p>
                        <img src="/assets/projects/gofit/story-jonathan.png" alt="GoFit storyboard — Jonathan's journey" className={projectStyles.projectImage} />
                        <h4>Amanda's story</h4>
                        <p>She creates a group soccer game, adds a checklist of what to bring, people show up prepared, they play together, and she feels the satisfaction of a plan that actually worked.</p>
                        <img src="/assets/projects/gofit/story-amanda.png" alt="GoFit storyboard — Amanda's journey" className={projectStyles.projectImage} />

                        <h3>Locking in the feature set</h3>
                        <p>We built a user flow to map the exact sequence of steps users take — which locked in four core areas: <strong>Activity Discovery</strong>, <strong>Social Feed</strong>, <strong>Friend Groups</strong>, and <strong>Personal Tracking</strong>. Anything outside these four didn't make the cut.</p>
                        <img
                            src="/assets/projects/gofit/SI%20582%20User%20Flow%20Diagram.jpg"
                            alt="GoFit user flow diagram"
                            className={projectStyles.projectImage}
                        />

                        <h3>Testing structure before polish</h3>
                        <p>We built lo-fi wireframes first — deliberately rough, so testers focused on whether flows made sense rather than how things looked. This let us catch structural problems early.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4x1}`}>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/LowFid/Landing.png" alt="Onboarding wireframe" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/LowFid/Home.png" alt="Home screen wireframe" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/LowFid/List%20View.png" alt="Events list wireframe" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/LowFid/Profile.png" alt="Profile wireframe" />
                            </div>
                        </div>
                    </ProjectSection>

                    {/* ── Testing & Iteration ───────────────────────── */}
                    <ProjectSection id="testing">
                        <h2>Testing &amp; Iteration.</h2>
                        <p>We ran moderated usability tests with 6 participants on the wireframes. Four issues came up repeatedly enough to act on.</p>

                        <div className="gofit-finding-row">
                            <div className="gofit-finding-number">01</div>
                            <div className="gofit-finding-before">
                                <p className="gofit-finding-label">Issue</p>
                                <p className="gofit-finding-title">Unclear grouping of UI elements</p>
                            </div>
                            <div className="gofit-finding-after">
                                <p className="gofit-finding-label">What changed</p>
                                <p className="gofit-finding-title">Regrouped related actions into cards with clearer visual hierarchy</p>
                            </div>
                        </div>

                        <div className="gofit-finding-row">
                            <div className="gofit-finding-number">02</div>
                            <div className="gofit-finding-before">
                                <p className="gofit-finding-label">Issue</p>
                                <p className="gofit-finding-title">Key actions were hidden or hard to find</p>
                            </div>
                            <div className="gofit-finding-after">
                                <p className="gofit-finding-label">What changed</p>
                                <p className="gofit-finding-title">Primary CTAs moved to a persistent bottom bar</p>
                            </div>
                        </div>

                        <div className="gofit-finding-row">
                            <div className="gofit-finding-number">03</div>
                            <div className="gofit-finding-before">
                                <p className="gofit-finding-label">Issue</p>
                                <p className="gofit-finding-title">Navigation felt complex and nested</p>
                            </div>
                            <div className="gofit-finding-after">
                                <p className="gofit-finding-label">What changed</p>
                                <p className="gofit-finding-title">Simplified from 5 tabs to 4; redundant nested menus removed</p>
                            </div>
                        </div>

                        <div className="gofit-finding-row">
                            <div className="gofit-finding-number">04</div>
                            <div className="gofit-finding-before">
                                <p className="gofit-finding-label">Issue</p>
                                <p className="gofit-finding-title">Distracting and redundant UI elements</p>
                            </div>
                            <div className="gofit-finding-after">
                                <p className="gofit-finding-label">What changed</p>
                                <p className="gofit-finding-title">Decorative elements stripped; spacing tightened throughout</p>
                            </div>
                        </div>
                    </ProjectSection>

                    {/* ── Final Design ──────────────────────────────── */}
                    <ProjectSection id="final-design">
                        <h2>Final Design.</h2>

                        <h3>Visual language</h3>
                        <p>The visual system needed to feel energetic and approachable — an active primary blue with a warm accent, Poppins for readability across all screen sizes, and a tight icon set mapped to the four core feature areas.</p>
                        <img
                            src="/assets/projects/gofit/gofit%20style%20guide%402x.png"
                            alt="GoFit style guide — colors, typography, iconography"
                            className={projectStyles.projectImage}
                        />

                        <h3>Screens</h3>
                        <p>With the usability issues resolved, we built high-fidelity screens in Figma covering onboarding, event discovery, group coordination, and personal stats.</p>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup4x1}`}>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/Landing.png" alt="Landing screen" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/Home%20-%20Old%20User.png" alt="Home screen" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/Map%20View%20-%201.png" alt="Map view" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/List%20View.png" alt="List view" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/Group%20Chat.png" alt="Group chat" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/Social%20-%20Comment%20Posted.png" alt="Social feed" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/User%20Profile.png" alt="User profile" />
                            </div>
                            <div className={projectStyles.projectCard}>
                                <img src="/assets/projects/gofit/HighFid/CA%20Mock%203.png" alt="Activity screen" />
                            </div>
                        </div>

                        <h3>Prototype</h3>
                        <p>Click through the full interactive prototype below.</p>
                        <iframe
                            className="gofit-prototype-embed"
                            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F2li3LoIjYvflqMbblV4284%2FSI-582-%257C-Go-Fit%3Ftype%3Ddesign%26node-id%3D682-22040%26t%3DpOfcqnxteleA9jce-1%26scaling%3Dscale-down%26page-id%3D175%253A5149%26starting-point-node-id%3D682%253A22023%26mode%3Ddesign"
                            allowFullScreen
                            title="GoFit Figma Prototype"
                        />
                    </ProjectSection>

                    {/* ── Reflection ────────────────────────────────── */}
                    <ProjectSection id="reflection">
                        <h2>Reflection.</h2>
                        <div className={`${projectStyles.projectCardGroup} ${projectStyles.projectCardGroup3}`}>
                            <div className={projectStyles.projectCard}>
                                <h3>Assumptions get expensive fast</h3>
                                <p>We assumed tracking was the primary need — interviews showed connection was. That shift reshaped the entire feature priority.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Lo-fi is faster than it feels</h3>
                                <p>Rough wireframes caught four structural issues before any visual design was done. Testing early saved significant rework time.</p>
                            </div>
                            <div className={projectStyles.projectCard}>
                                <h3>Fewer personas, sharper focus</h3>
                                <p>Four personas diluted decisions. Two with clearly opposing needs made every design trade-off easier to reason about.</p>
                            </div>
                        </div>
                    </ProjectSection>

                </ProjectContent>
            </main>
        </>
    );
}
