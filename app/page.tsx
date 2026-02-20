import Header from './components/layout/Header/Header';
import { Hero, Work, Testimonials } from './sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Testimonials />
      </main>
    </>
  );
}
