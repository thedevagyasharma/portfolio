import './NavLogo.styles.css';

export default function NavLogo() {
    return (
        <>
            <a href="/" className="nav-logo navbar-button-base">
                <span className="logo-full">
                    <span className='toHighlight'>Dev</span>&nbsp;Sharma
                </span>
                <span className="logo-short">
                    <span className='toHighlight'>D</span>S
                </span>
            </a>
        </>
    )
}