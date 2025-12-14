import './ProjectCard.styles.css';

interface ProjectCardProps {
    imgUrl: string;
    alt: string;
    title: string;
    description: string;
}

export default function ProjectCard({imgUrl, alt, title, description}: ProjectCardProps) {
    return (
        <div className='col-md-6'>
            <div className="card">
                <img src={imgUrl} alt={alt} />
                <div className="cardContent">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}