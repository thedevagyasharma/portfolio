import './SectionTitle.styles.css';

type SectionTitleProps = {
    text: string;
    gridSpaces?: number;
    mobileGridSpaces?: number;
}

export default function SectionTitle({ text, gridSpaces, mobileGridSpaces }: SectionTitleProps) {
    const style = {
        '--desktop-spaces': gridSpaces,
        '--mobile-spaces': mobileGridSpaces,
    } as React.CSSProperties;
    return (
        <div className="sectionTitle" style={style}>
            <h2>{text}</h2>
        </div>
    );
}