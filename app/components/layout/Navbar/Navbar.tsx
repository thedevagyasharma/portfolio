import { HomeIcon } from 'lucide-react';
import './Navbar.styles.css';

export default function Navbar() {

    const navLinks = [
        { name: 'Home', href: "#home" },
        { name: 'Work', href: "#work" },
        { name: 'About', href: "#about" },
        { name: 'Resume', href: "#resume" },
    ];


    return (
        <>
            <nav className="navbar"
            >
                <ul className="links">
                    {navLinks.map((link) => (
                        <li key={link.name} className="link">
                            <a
                                href={link.href}
                            >
                                {link.name === "Home" ? <HomeIcon size={16}/> : link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}