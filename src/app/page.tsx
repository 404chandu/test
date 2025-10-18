import MainLayout from '@/components/landing/main-layout';
import Hero from '@/components/landing/hero';
import Gallery from '@/components/landing/gallery';
import GameHighlights from '@/components/landing/game-highlights';
import TestYourSkills from '@/components/landing/test-your-skills';
import AboutUs from '@/components/landing/about-us';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <MainLayout>
      <main>
        <Hero />
        <Gallery />
        <GameHighlights />
        <TestYourSkills />
        <AboutUs />
        <Footer />
      </main>
    </MainLayout>
  );
}
