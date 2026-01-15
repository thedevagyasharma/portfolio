import Header from './components/layout/Header/Header';
import { Hero, Tools, Work } from './sections';

export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <Hero />
        <Tools />
        <Work/>
        {/* ADD WORK SECTION HERE*/}
      </main>
    </>
  );
}
