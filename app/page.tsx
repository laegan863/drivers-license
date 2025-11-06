import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
        <Reviews />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
