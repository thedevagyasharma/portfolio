import './Projects.styles.css';
import ProjectCard from './ProjectCard';

export default function Projects() {
    return (
        <section className='projects'>
            <div className="container">
                {/* <h2>Projects</h2> */}
                <div className="columns">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </section>
    )
}