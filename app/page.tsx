import Navbar from "./components/layout/Navbar/Navbar";
import NavLogo from "./components/layout/Navbar/NavLogo";
import Hero from "./components/sections/Hero/Hero";
import Work from './components/sections/Work/Work'

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
        <Work/>
        {/* ADD WORK SECTION HERE*/}
      </main>
    </>
  );
}
