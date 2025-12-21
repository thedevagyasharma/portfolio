import './Work.styles.css';
import SectionTitle from "../../../components/layout/SectionTitle/SectionTitle";

export default function Work() {
    return (
        <>
            <section>
                <div className="container">
                    <SectionTitle text="Selected Works" gridSpaces={8} />
                    <div className="work-grid">
                        <a href="/projects/aspire" className="project-tile" style={{ color: '#135bd7' }}>
                            <div className="project-tile-content">
                                <div className="project-number">01</div>
                                <div className="project-title">Aspire Platform</div>
                                <div className="project-description">A comprehensive platform for managing aspirations and goals with intuitive design.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire/cover.webp" alt="Aspire Platform" />
                                </div>
                            </div>
                        </a>
                        <a href="/projects/project-two" className="project-tile" style={{ color: '#e84855' }}>
                            <div className="project-tile-content">
                                <div className="project-number">02</div>
                                <div className="project-title">Project Two</div>
                                <div className="project-description">Innovative solution combining cutting-edge technology with thoughtful design.</div>
                                <div className="project-image">
                                    <img src="/assets/projects/aspire/cover.webp" alt="Project Two" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}