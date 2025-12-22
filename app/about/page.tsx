import Navbar from "../components/layout/Navbar/Navbar";
import NavLogo from "../components/layout/Navbar/NavLogo";
import SectionTitle from "../components/layout/SectionTitle/SectionTitle";
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
                {/* Photo + Bio Section */}
                <section>
                    <div className="container">
                        <div className="about-intro-grid">
                            {/* Photo */}
                            <div className="about-photo">
                                <img src="/assets/profile/photo.jpg" alt="Devagya Sharma" />
                            </div>

                            {/* Bio Text */}
                            <div className="about-bio-box">
                                <h1 className="about-greeting">Hello! I'm <span className="highlight">Dev</span>agya Sharma.</h1>
                                <p className="about-description">
                                    I'm a UX Engineer focused on creating scalable, accessible web and mobile experiences.
                                    I design interfaces and build prototypes that help teams work more efficiently while
                                    keeping accessibility and consistency at the center. I collaborate closely with designers
                                    and developers to ensure products are practical, maintainable, and ready for real users.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats / By The Numbers */}
                <section>
                    <div className="container">
                        <SectionTitle text="By The Numbers" gridSpaces={10} />
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-number">3</div>
                                <div className="stat-label">Years of Experience</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">2</div>
                                <div className="stat-label">Design Systems Built</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">6</div>
                                <div className="stat-label">Industries Served</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">80+</div>
                                <div className="stat-label">Students Taught</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills & Expertise */}
                <section>
                    <div className="container">
                        <SectionTitle text="Skills & Expertise" gridSpaces={12} />
                        <div className="skills-grid">
                            <div className="skill-card">
                                <h3>Design</h3>
                                <ul>
                                    <li>UI/UX Design</li>
                                    <li>Design Systems</li>
                                    <li>Prototyping</li>
                                    <li>Accessibility</li>
                                </ul>
                            </div>
                            <div className="skill-card">
                                <h3>Code</h3>
                                <ul>
                                    <li>React & Next.js</li>
                                    <li>TypeScript</li>
                                    <li>CSS/Tailwind</li>
                                    <li>Component Libraries</li>
                                </ul>
                            </div>
                            <div className="skill-card">
                                <h3>Tools</h3>
                                <ul>
                                    <li>Figma</li>
                                    <li>Git</li>
                                    <li>Storybook</li>
                                    <li>VS Code</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Things I Value */}
                <section>
                    <div className="container">
                        <SectionTitle text="Things I Value" gridSpaces={10} />
                        <div className="values-grid">
                            <div className="value-card">
                                <h3>Accessibility</h3>
                                <p>Building for everyone, not just some.</p>
                            </div>
                            <div className="value-card">
                                <h3>Collaboration</h3>
                                <p>Great products come from great teamwork.</p>
                            </div>
                            <div className="value-card">
                                <h3>Simplicity</h3>
                                <p>Less is more when done right.</p>
                            </div>
                            <div className="value-card">
                                <h3>Consistency</h3>
                                <p>Patterns that scale across products.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Things I Like */}
                <section>
                    <div className="container">
                        <SectionTitle text="Things I Like" gridSpaces={10} />
                        <div className="likes-grid">
                            <div className="like-card">
                                <h3>Music</h3>
                                <p>Placeholder for music interests</p>
                            </div>
                            <div className="like-card">
                                <h3>Soccer</h3>
                                <p>Placeholder for soccer interests</p>
                            </div>
                            <div className="like-card">
                                <h3>Life</h3>
                                <p>Placeholder for life interests</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
