import Navbar from "./components/layout/Navbar/Navbar";
import NavLogo from "./components/layout/Navbar/NavLogo";
import Hero from "./components/sections/Hero/Hero";
import SectionTitle from "./components/layout/SectionTitle/SectionTitle";

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
        <SectionTitle text="Selected Works" gridSpaces={6}/>
        {/* ADD WORK SECTION HERE*/}
      </main>
    </>
  );
}
