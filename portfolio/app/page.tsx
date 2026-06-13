import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-col">
        <Hero />
        <div className="divider mx-auto w-full max-w-6xl" />
        <About />
        <div className="divider mx-auto w-full max-w-6xl" />
        <Experience />
        <div className="divider mx-auto w-full max-w-6xl" />
        <Projects />
        <div className="divider mx-auto w-full max-w-6xl" />
        <Skills />
        <div className="divider mx-auto w-full max-w-6xl" />
        <Resume />
        <div className="divider mx-auto w-full max-w-6xl" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
