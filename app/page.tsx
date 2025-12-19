import Navbar from "./components/layout/Navbar/Navbar";
import NavLogo from "./components/layout/Navbar/NavLogo";
import Hero from "./components/sections/Hero/Hero";

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
        {/* ADD WORK SECTION HERE*/}
      </main>
    </>
  );
}
