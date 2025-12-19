import './Projects.styles.css';
import ProjectCard from './ProjectCard';

export default function Projects() {
    return (
        <section className='projects'>
            <div className="container">
                {/* <h2>Projects</h2> */}
                <div className="columns">
                    <ProjectCard imgUrl="/assets/general/placeholder.png" alt="Project 1" title="Project 1" description="Description for project 1" />
                    <ProjectCard imgUrl="/assets/general/placeholder.png" alt="Project 2" title="Project 2" description="Description for project 2" />
                    <ProjectCard imgUrl="/assets/general/placeholder.png" alt="Project 3" title="Project 3" description="Description for project 3" />
                </div>
            </div>
        </section>
    )
}