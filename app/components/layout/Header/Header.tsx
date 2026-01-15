import './Header.styles.css';
import Navbar from '../Navbar/Navbar';
import NavLogo from '../Navbar/NavLogo';


export default function () {

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
        </>
    );
}