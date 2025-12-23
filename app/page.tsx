import Navbar from "./components/layout/Navbar/Navbar";
import NavLogo from "./components/layout/Navbar/NavLogo";
import { Hero, Tools, Work } from './sections';

export default function Home() {
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
      <main>
        <Hero />
        <Tools />
        <Work/>
        {/* ADD WORK SECTION HERE*/}
      </main>
    </>
  );
}
