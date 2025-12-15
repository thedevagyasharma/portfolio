import Navbar from "./components/layout/Navbar/Navbar";
import GridElement from "./components/grid/GridElement";
import Hero from "./components/sections/Hero/Hero";
import Projects from "./components/sections/Projects/Projects";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <Projects />
      </main>
    </>
  );
}
