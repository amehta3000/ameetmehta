import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Ameet Mehta</p>
      </footer>
    </>
  );
}
