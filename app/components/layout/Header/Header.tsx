import './Header.styles.css';
import Navbar from "../Navbar/Navbar";

export default function Header() {
    return (
        <header>
            <div className='container'>
                <div className='headerItem'><Navbar /></div>
                {/* <div className="linkedIn"></div> */}
            </div>
        </header>

    )
}