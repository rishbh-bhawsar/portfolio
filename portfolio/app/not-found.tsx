import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-32 text-center"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(90,169,255,0.18),transparent_50%)]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur">
          <Compass className="h-3 w-3" />
          HTTP 404 — Route not found
        </div>

        <h1 className="mt-6 select-none bg-gradient-to-b from-white to-[var(--color-text-dim)] bg-clip-text font-mono text-[6rem] font-semibold leading-none tracking-tight text-transparent sm:text-[9rem]">
          404
        </h1>

        <p className="mt-2 max-w-md text-pretty text-base text-[var(--color-text-muted)] sm:text-lg">
          That URL didn&apos;t resolve. The page you&apos;re looking for either moved, never existed, or got refactored out.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="md">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </ButtonLink>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40"
          >
            See my work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
