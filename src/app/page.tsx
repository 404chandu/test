import MainLayout from '@/components/landing/main-layout';
import Hero from '@/components/landing/hero';
import Gallery from '@/components/landing/gallery';
import LearningAdventure from '@/components/landing/learning-adventure';
import AboutUs from '@/components/landing/about-us';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <MainLayout>
      <main>
        <Hero />
        <Gallery />
        <LearningAdventure />
        <AboutUs />
        <Footer />
      </main>
    </MainLayout>
  );
}
