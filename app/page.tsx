import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { FallingPattern } from "@/components/ui/falling-pattern";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <FallingPattern
          color="#0066ff"
          duration={120}
          blurIntensity="0.4rem"
          density={1.5}
          className="opacity-50"
        />
      </div>

      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
