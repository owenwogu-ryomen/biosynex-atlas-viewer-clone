import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { categories, devices, glossaryEntries } from "@/data/equipment";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary — Biosynex Atlas" },
      { name: "description", content: "Plain-language biomedical equipment definitions collected from every Biosynex Atlas device page." },
      { property: "og:title", content: "Glossary — Biosynex Atlas" },
      { property: "og:description", content: "Plain-language biomedical equipment definitions collected from every Biosynex Atlas device page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Glossary,
});

function Glossary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [deviceSlug, setDeviceSlug] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...glossaryEntries]
      .sort((a, b) => a.term.localeCompare(b.term) || a.deviceName.localeCompare(b.deviceName))
      .filter((entry) => {
        if (category !== "All" && entry.category !== category) return false;
        if (deviceSlug !== "All" && entry.deviceSlug !== deviceSlug) return false;
        if (!q) return true;
        return [entry.term, entry.definition, entry.aliases, entry.deviceName, entry.category]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
  }, [query, category, deviceSlug]);

  const letters = Array.from(
    new Set(filtered.map((entry) => (entry.term.match(/[A-Za-z0-9]/)?.[0] ?? "#").toUpperCase())),
  ).sort();
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`;

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-5xl">Glossary</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Plain-language definitions collected from every device page. Each term stays tagged to its device and
          equipment category, so this collective glossary can later seed a question-and-answer bank. It is for
          education only, not clinical or operating guidance.
        </p>

        <div className="mt-10 rounded-xl border border-border bg-card p-5 space-y-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a term or meaning (e.g. PEEP, k-space, magnet)…"
            className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            aria-label="Search glossary"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Equipment category</p>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={chip(category === c)}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Device</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setDeviceSlug("All")} className={chip(deviceSlug === "All")}>All</button>
              {devices.filter((d) => d.glossary && d.glossary.length > 0).map((d) => (
                <button key={d.slug} type="button" onClick={() => setDeviceSlug(d.slug)} className={chip(deviceSlug === d.slug)}>{d.name}</button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} term{filtered.length === 1 ? "" : "s"}</p>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-xl border border-border bg-card p-6 text-muted-foreground">No glossary terms match your search. Try another word, device or category.</p>
        )}

        {letters.map((letter) => (
          <section key={letter} className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">{letter}</h2>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {filtered
                .filter((entry) => (entry.term.match(/[A-Za-z0-9]/)?.[0] ?? "#").toUpperCase() === letter)
                .map((entry) => (
                  <div key={`${entry.deviceSlug}-${entry.term}`} className="grid gap-2 py-4 sm:grid-cols-[240px_1fr]">
                    <dt className="font-medium">
                      {entry.term}
                      {entry.aliases && <span className="block text-xs font-normal text-muted-foreground">Also: {entry.aliases}</span>}
                    </dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">
                      {entry.definition}
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{entry.category}</span>
                        <Link
                          to="/equipment/$slug"
                          params={{ slug: entry.deviceSlug }}
                          className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground hover:text-primary"
                        >
                          {entry.deviceName}
                        </Link>
                      </span>
                    </dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
