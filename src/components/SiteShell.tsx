import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FeedbackWidget, openFeedback } from "./FeedbackWidget";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background sticky top-0 z-20">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link to="/" className="whitespace-nowrap font-display text-base tracking-tight sm:text-lg">
            <span className="text-primary">●</span> Biosynex <span className="text-muted-foreground">Atlas</span>
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs sm:gap-6 sm:text-sm">
            <Link to="/equipment" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Equipment</Link>
            <Link to="/glossary" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Glossary</Link>
            <Link to="/resources" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Resources</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border mt-20">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="font-display">For more information, contact us</p>
              <a href="mailto:owenwogu651@gmail.com" className="text-primary font-mono text-sm hover:underline">owenwogu651@gmail.com</a>
              <button type="button" onClick={openFeedback} className="mt-3 block font-mono text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Give feedback
              </button>
            </div>
            <p className="text-muted-foreground text-sm font-mono">© Biosynex Atlas</p>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="font-display text-foreground">Educational use notice:</span> Biosynex Atlas is for
              educational purposes only. It is not medical advice, a clinical guideline, or a substitute for
              manufacturer instructions, institutional protocols, professional training, or qualified clinical
              judgement. All resources used on this site are properly cited and credited to their respective owners
              where they appear and in the references/resources sections. If you believe a source is missing or
              incorrectly credited, please contact us.
            </p>
          </div>
        </div>
      </footer>
      <FeedbackWidget />
    </div>
  );
}
