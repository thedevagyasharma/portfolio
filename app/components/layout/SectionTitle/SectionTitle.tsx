import './SectionTitle.styles.css';

type SectionTitleProps = {
    text: string;
    gridSpaces?: number;
}

export default function SectionTitle ({text, gridSpaces = 4} : SectionTitleProps) {
    return(
        <>
            <div className='container'>
                <div className="sectionTitle" style={{ width: `calc(var(--grid-size) * ${gridSpaces})` }}>
                    {text}
                </div>
            </div>
        </>
    )
}