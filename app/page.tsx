import Header from './components/layout/Header/Header';
import { Hero, Tools, Work, Testimonials } from './sections';

export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <Hero />
        <Tools />
        <Work/>
        <Testimonials />
      </main>
    </>
  );
}
