import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            <span className="text-primary">●</span> Biosynex <span className="text-muted-foreground">Atlas</span>
          </Link>
          <nav className="flex gap-6 text-sm font-mono">
            <Link to="/equipment" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Equipment</Link>
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
    </div>
  );
}
