# Biosynex Atlas

**Biosynex Atlas is a free, educational visual atlas for understanding biomedical equipment.**

It helps readers see what a device is, why it is used, how it works, what its major parts do, and what safety issues surround it — using still illustrations, animations, interactive 3D models, plain-language explanations, a glossary, and carefully cited study resources.

Biosynex Atlas is an atlas and reference companion. It is **not a course, not a certification programme, and not a substitute for professional training**.

---

## Who it is for

Biosynex Atlas is designed for:

- biomedical engineering and biomedical technology students;
- nursing, medicine, radiography, and other health-science learners;
- early-career biomedical technologists who need orientation before supervised exposure;
- teachers who want visual material for lectures or pre-lab reading;
- curious readers who want intimidating hospital equipment explained in everyday language.

No account or login is required.

---

## What you can do on the site

### 1. Explore equipment by category

Devices are organised into five equipment families:

- Diagnostic Imaging
- Life Support & Critical Care
- Patient Monitoring & Biosignals
- Therapeutic & Surgical
- Laboratory & Sterilization

The library is growing. A category may be shown before every planned device in that category has a full profile.

### 2. Open a full device profile

Each completed device page brings together:

- a short summary and category/risk profile;
- a still illustrated poster shown first;
- an optional interactive 3D model that loads only when **View 3D model** is selected;
- animated diagrams or motion graphics where available;
- **Working Principles** — the science/engineering ideas behind the device;
- **Clinical Uses** — why the device is used in care;
- step-by-step pathways showing how a signal, scan, breath, or process moves through the system;
- **Key Components** — the major hardware parts and what each part does;
- safety and preparation information where relevant;
- device-specific glossary terms;
- **References & Further Reading**; and
- an **Educational Use & Sources** notice.

Long sections are collapsible, so readers can open only the parts they need.

### 3. Use the image-first 3D viewer

The 3D experience is deliberately gentle on data and devices:

- the viewport starts with a still poster/illustration;
- desktop users can hover or use keyboard focus to reveal **View 3D model**;
- touch and mobile users always have a visible button below the viewport;
- the heavier interactive model loads only after a click;
- the loaded model can be closed again or opened full screen; and
- image and model credits are shown with the viewer.

### 4. Learn the language with the Glossary

Many biomedical topics become difficult mainly because of terminology. Biosynex Atlas therefore includes:

- a glossary section on each completed device page; and
- a collective **Glossary** page that gathers definitions from all device profiles.

Glossary entries can be searched and filtered by device or equipment category. Each definition stays tagged to the device it came from, making the collection useful now for reading and useful later as a structured question-and-answer bank.

### 5. Continue with Resources & Materials

The **Resources** page contains external study links only. It can be searched and filtered by:

- equipment category; and
- media type, such as Article, Video, Book, Journal, or Other.

Sources cited on device pages — including article references, illustration sources, animations, and 3D-model pages — are also represented in the categorized resource list where a public source link is available.

### 6. Send feedback

Visitors may optionally rate the site from one to five stars and answer a prompt about what should be improved. The prompt can be dismissed, and the same feedback form can be opened from the footer.

At present, sending feedback opens the visitor's own email app with the message prepared. The site itself does not operate a feedback database.

---

## Current device library

Completed full profiles currently include:

| Device | Category | Highlights |
|---|---|---|
| Magnetic Resonance Imaging (MRI) Scanner | Diagnostic Imaging | Cutaway poster, NIST animation above the viewer, interactive 3D model, animated working-principle SVG, six-step scan pathway, magnet types, safety/screening, 16 key components, glossary, and cited references. |
| Mechanical Ventilator | Life Support & Critical Care | Illustrated poster, interactive 3D model, animated air-path SVG, gas-flow pathway, nine key components, glossary, and cited references. |

More device profiles are being added across the five categories. A device should be treated as fully covered only when it has its own completed profile page.

---

## How to use a device page

1. Start with the still poster to understand the outside/cutaway view.
2. Open the 3D model only if you want to rotate and inspect the device.
3. Read **Overview** for the big picture.
4. Follow the step-by-step pathway to see how the process moves through the machine.
5. Open **Key Components** when you want to connect names to functions.
6. Use the **Glossary** whenever a term becomes difficult.
7. Follow **References & Further Reading** or the Resources page for deeper study.

---

## Sources, credits, and citation approach

Biosynex Atlas is built around source transparency:

- device explanations are prepared from cited educational, clinical, technical, and standards-body or institutional sources;
- references are listed on the relevant device page;
- illustrations, animations, diagrams, and 3D models are credited where they appear;
- cited public sources are added to the Resources collection under the appropriate equipment category; and
- external websites and media remain the property of their respective owners.

Linking to a source does not mean that the source endorses Biosynex Atlas. Readers who want to reuse any third-party image, model, text, or linked material should check that source's own terms.

If a source appears to be missing or incorrectly credited, it should be reported through the site's feedback/contact options so it can be reviewed.

---

## Important limitations — please read

Biosynex Atlas is **for educational purposes only**.

It does **not**:

- provide medical advice for any individual person;
- diagnose or treat any condition;
- certify, license, examine, grade, or formally qualify any reader;
- prove clinical or technical competence;
- teach anyone to operate medical equipment on a patient;
- provide servicing, repair, calibration, installation, or troubleshooting instructions;
- replace a manufacturer's manual or instructions for use;
- replace hospital policy, local law, professional standards, classroom instruction, or qualified supervision; or
- provide emergency guidance.

Other limitations to understand:

- Diagrams and 3D models are **representative and simplified**. Real devices differ by manufacturer, model, software version, accessories, and local configuration.
- Values and examples may be typical rather than universal.
- A device profile explains concepts; it is not a complete engineering design file or clinical protocol.
- The library is still growing, so absence of a device does not mean the device is unimportant.
- External links, videos, and 3D embeds depend on third-party services and an internet connection; they can change or become unavailable.
- Safety discussions are awareness information only. Real equipment must be handled only by trained, authorised people following applicable instructions and supervision.

For patient care or equipment work, always follow the manufacturer's current instructions, institutional protocols, applicable standards, and qualified professional judgement.

---

## Privacy at a glance

- There are no Biosynex Atlas user accounts.
- The site does not ask visitors to enter patient information.
- Feedback is optional. A visitor may include an email address only if they want a reply.
- At present, feedback is sent through the visitor's own email app rather than stored by a Biosynex Atlas server.
- The browser remembers only whether the automatic feedback prompt was recently dismissed or submitted, so it does not reappear immediately. That check is capped at two days.
- External resources and embedded model providers operate under their own privacy policies.

---

## How the site is built — light technical overview

You do not need to be a software specialist to understand the basic shape:

- It is a modern static website built with **React**, **TypeScript**, **Vite/TanStack**, and **Tailwind CSS**.
- Pages are generated ahead of time for fast loading and search visibility.
- There is currently **no Biosynex Atlas backend, user database, or login system**.
- Device profiles, resources, and glossary entries are kept as structured content, mainly in `src/data/equipment.ts`.
- Self-hosted illustrations, animations, and SVG diagrams live in `src/assets/`.
- Interactive 3D models are loaded on request rather than automatically, to reduce unnecessary data and device load.

### Main folders

```text
src/
  assets/      Self-hosted posters, GIFs, and SVG diagrams
  components/  Page layout, 3D viewer, and feedback prompt
  data/        Device profiles, resources, categories, and glossary data
  routes/      Home, equipment, glossary, and resources pages
public/        Small public files served with the website
.github/       Automated build and publishing workflow
```

---

## Running the project locally

Use Node.js 22 (22.12 or newer) and [Bun](https://bun.sh) 1.4.4, the package manager pinned for this project. All build dependencies come from the public npm registry; no private registry login is required.

After downloading a copy of this repository:

```sh
bun install --frozen-lockfile
bun run dev
```

Useful checks:

```sh
bun run test
bun run build
bun run lint
```

The GitHub Pages production build is created and verified with:

```sh
bun run build:pages
```

The publishable folder is `dist/client`, **not the repository root**. This command verifies the generated pages, local assets and project-prefixed links, then adds `404.html` and `.nojekyll`.

---

## Deployment

**This is a Vite/React static site. It does not use Jekyll, Ruby, or a Pages theme.** If the public site displays this README, GitHub has published the repository source instead of the compiled app.

### One-time GitHub Pages setup

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**. Do not select “Deploy from a branch”.
3. Under **Settings → Actions → General → Actions permissions**, enable Actions. **Do not leave “Allow only actions created by this account” selected**: this blocks the build before any job starts. Use the selected-actions option and allow these versions (including the nested artifact uploader):

   ```text
   actions/checkout@v4
   actions/setup-node@v4
   oven-sh/setup-bun@v2
   actions/upload-pages-artifact@v3
   actions/upload-artifact@v4
   actions/configure-pages@v5
   actions/deploy-pages@v4
   ```

4. Merge the fixes into `main`. The **Deploy to GitHub Pages** workflow tests the app, typechecks, builds all routes, verifies the output, and uploads **only `dist/client`**. Pull requests run the checks without deploying.
5. Wait for both the build and deploy jobs to finish. If the `github-pages` environment requests approval, approve it in Actions. The workflow can also be rerun with **Actions → Deploy to GitHub Pages → Run workflow → main**.

The public URL is <https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/>. Home, both device profiles, glossary and resources are generated as real static HTML, so direct links and refreshes work without an application server or database. The router, favicon, CSS, scripts and illustrations all use the repository URL prefix.

### Apply this repair from Codespaces

Run this in the Codespaces terminal while signed into GitHub CLI as an owner/admin who can change Pages settings and merge PR #1:

```sh
curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/arena/c976998c-biosynex-atlas-viewer-clone/clone-fix-pages.sh | bash
```

The script adds these exact Actions versions to the repository allowlist while preserving existing selections (or leaves an existing all-actions policy unchanged), configures Pages for GitHub Actions, merges PR #1, explicitly starts the Vite deployment on `main`, and waits for the result. If your Codespaces login cannot edit repository settings, it explains the manual setting and stops. It does not reset, switch branches, or overwrite files in your Codespace. You can inspect `clone-fix-pages.sh` before running it. It is safe to rerun after PR #1 has already merged. Required review/branch protection rules still apply; the script does not bypass them.

### If publishing fails

- **README is still showing:** confirm Pages Source is **GitHub Actions**, then run the repository’s **Deploy to GitHub Pages** workflow on `main`. A successful generated “pages build and deployment / Build with Jekyll” run is not the correct build for this app.
- **Permission/403 errors:** use your repository-owner GitHub CLI login (`gh auth status`), or change the Pages Source manually. No token belongs in source code.
- **Build/install errors:** use the pinned Bun version and committed `bun.lock`; the workflow no longer relies on the private Lovable registry or a server/cloud deployment preset.
- **“Actions are not allowed ... must be from a repository owned by ...”:** fix the Actions permissions allowlist above. This is a repository setting, not a JavaScript or Jekyll installation problem. Organisation-level restrictions require an organisation admin.
- **Deployment is waiting:** check for required approval on the `github-pages` environment and any repository/organisation Actions policy.
- **Old page after a successful Vite deployment:** hard-refresh or open a private browser window. Check the latest deployment’s commit and job results in Actions before assuming it is live.

Third-party 3D models and external study links still require internet access and remain subject to their providers’ availability.

---

## Future direction

The atlas will continue to grow across its five equipment categories. The device-tagged glossary and categorized cited sources are being kept structured so that future improvements — such as richer part-by-part interaction or a cited question-and-answer helper — can be built on verified site content rather than guesswork.

Those future ideas should not be mistaken for current features.

---

## Copyright and reuse note

Unless a source states otherwise, third-party articles, illustrations, animations, models, trademarks, and linked materials remain the property of their respective owners.

This README does not grant permission to reuse third-party material. Always follow the licence or terms attached to the original source.
