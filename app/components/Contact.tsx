import { SectionHeading } from "./About";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeading number="04" title="Get In Touch" />
      <div className="mt-10 max-w-lg">
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I&apos;m currently open to new opportunities. Whether you have a
          question, a project idea, or just want to say hello, my inbox is
          always open!
        </p>
        <a
          href="mailto:ameet3000@gmail.com"
          className="mt-8 inline-block px-7 py-3.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Say Hello
        </a>
        <div className="mt-12 flex gap-6">
          <a
            href="https://github.com/amehta3000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ameetmehta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ameet3000@gmail.com"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors underline underline-offset-4"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
