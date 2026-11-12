# 🌟 Pooria Goodarzi — AI Engineer & ML Specialist Portfolio

> **Modern, responsive, dark/light mode personal portfolio website engineered with React 18, TypeScript, Tailwind CSS, and an immersive Three.js 3D Neural Network background.**

Inspired by high-end programming and artificial intelligence aesthetics with an **Apple-style Liquid Glass** design system, adhering to the **60-30-10 color rule** (Primary Deep Navy `#14213D`, Secondary Warm Cream `#F4EDE0`, Accent Coral `#FF6B5B`).

---

## 🚀 Key Features & Architectural Sections

1. **Hero Section (`HeroSection.tsx`)**
   - **Headline & Dynamic Role Typewriter:** Cycles through *AI Engineer & Machine Learning Specialist*, *RAG & LLM Systems Architect*, *Computer Vision & Deep Learning Engineer*, and *Speech AI & Persian NLP Specialist*.
   - **Dual Action CTAs:** "View Projects", "Contact Me / Resume", plus direct GitHub and LinkedIn quick badges.
   - **Interactive Developer Terminal:** Live command prompt (`whoami`, `current_focus`, `languages_supported`, `status`) supporting interactive shell commands (`rag`, `vision`, `speech`, `parsbert`, `skills`, `resume`, `contact`, `clear`).
   - **3D Neural Core Telemetry:** Instant interactive impulse trigger ("Pulse Nodes") affecting the live Three.js scene.

2. **About Me & Architecture Matrix (`AboutSection.tsx`)**
   - Professional narrative covering academic background, active research status, and core engineering philosophy.
   - **4 Core Pillars:** Production RAG & LLMs, Computer Vision & Deep Learning, Speech AI & Persian NLP, and Medical AI & Modern Tooling.
   - **Interactive Animated SVG Pipeline Matrix:** Real-time clickable architecture modules (RAG + KG, Vision AI, Speech AI, ParsBERT, Medical AI) with dynamic input/output telemetry.

3. **Technical Arsenal & Skills (`SkillsSection.tsx`)**
   - Categorized modern cards featuring hover zoom animations (`scale: 1.045`, glowing coral border):
     - **Generative AI & LLM:** RAG, LLM Integration, Prompt Engineering, Embeddings, Vector Search, Knowledge Graphs, LLM Evaluation.
     - **ML, Vision & Deep Learning:** Machine Learning, Computer Vision, Deep Learning, NLP, Transformers, ParsBERT, Model Fine-tuning.
     - **Speech AI:** TTS (Text-to-Speech), STT (Speech-to-Text), Speech-to-Speech (S2S), Voice AI.
     - **Languages & Frameworks:** Python, PyTorch, TensorFlow, FastAPI, Jetpack Compose, API Development, Git.
     - **Tools & Infrastructure:** Docker, Kubernetes, Cloud Services, Linux, Git & GitHub, SQL, Hugging Face.
   - **Interactive Cross-Filtering:** Clicking any skill tag automatically scrolls to and filters matching featured projects!

4. **Career Timeline & AI Competitions (`ExperienceSection.tsx`)**
   - **Spin (Spinc) Experience Timeline:** Grounded responsibilities covering RAG Chatbots, LLM APIs, Domain Assistants, Speech AI R&D, and Production AI Deployment.
   - **AI Competitions & Hackathons:** Highlights for Applied Vision in Sports & Health, University & International AI Hackathons, and Low-Resource Persian NLP/Speech Benchmarks.
   - **Inline Edit Mode:** Toggleable inline customization with dashed coral feedback.

5. **Projects & GitHub Repositories (`ProjectsSection.tsx`)**
   - 8 comprehensive project cards with interactive 3D mouse parallax tilt (`perspective: 900px`).
   - Category filtering: *All*, *RAG & KG*, *Computer Vision*, *Speech & Persian AI*, *LLM Evaluation*, *Medical AI*, *Hackathons*.
   - Direct repository link integration, custom SVG technical illustration banners, and instant "Edit URL" modal.
   - **Live GitHub API Auto-Sync:** One-click automated check to fetch latest repository URLs for `@poorigoodi`.

6. **Contact Section (`ContactSection.tsx`)**
   - Clean, minimal contact form (Name, Email, Message) with instant mailto dispatcher and validation.
   - One-click copy email button with feedback toast.
   - Professional social developer profile cards (GitHub, LinkedIn, Resume, Configure Email).

7. **System Modals & Accessibility (`Modals.tsx`, `NavbarAndDock.tsx`)**
   - **Command Palette (`⌘K` / `Ctrl+K`):** Keyboard-accessible quick navigation, theme toggling, and repository access.
   - **Executive Resume Modal:** Printable clean CV view with single-click browser PDF printing.
   - **Floating Bottom Dock:** Liquid glass icon dock with active section scroll-spy indicator.
   - **Bidirectional Scroll Reveal:** Custom intersection observer triggering smooth entry and exit whether scrolling down or scrolling up.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) (Dark & Light themes, Custom Glassmorphism)
- **3D Graphics:** [Three.js](https://threejs.org/) (Interactive neural particle network, icosahedron core, orbital torus)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/) with optimized code-splitting (Three.js and React chunks)

---

## 📁 Project Structure

```
e:\My-web\
├── public\
│   └── favicon.svg               # Coral/Navy PG monogram favicon
├── src\
│   ├── components\
│   │   ├── AboutSection.tsx      # Academic narrative + Animated SVG pipeline matrix
│   │   ├── ContactSection.tsx    # Contact form + Social links + Copy email
│   │   ├── CustomCursor.tsx      # Desktop smooth tracking cursor & card spotlight
│   │   ├── ExperienceSection.tsx # Career timeline (Spin) + AI hackathon highlights
│   │   ├── HeroSection.tsx       # Main heading + Dynamic typewriter + Interactive terminal
│   │   ├── Modals.tsx            # Command Palette (⌘K) + Resume (CV) + Edit URL modal
│   │   ├── NavbarAndDock.tsx     # Top controls + Bottom floating liquid glass dock
│   │   ├── NeuralCanvas.tsx      # Three.js 3D neural network background canvas
│   │   ├── ProjectIllustration.tsx # Abstract technical SVG banners for projects
│   │   ├── ProjectsSection.tsx   # Project cards + 3D tilt + GitHub API sync
│   │   └── SkillsSection.tsx     # 5 categorized skill cards with zoom hover
│   ├── data\
│   │   └── portfolioData.ts      # Structured data for projects, hackathons, roles, architecture
│   ├── App.tsx                   # Master app shell, state management & keyboard events
│   ├── index.css                 # 60/30/10 CSS variables, liquid glass & animation rules
│   ├── main.tsx                  # React DOM root entry point
│   └── vite-env.d.ts             # Vite TypeScript type declarations
├── index.html                    # SEO tags, Open Graph, Google Fonts & root div
├── package.json                  # Scripts & dependencies
├── tailwind.config.js            # Tailwind custom colors & typography
├── tsconfig.json                 # TypeScript strict compiler configuration
└── vite.config.ts                # Vite build config with manual chunk separation
```

---

## 💻 Getting Started

### 1. Installation
All packages are already installed in `node_modules`. If you clone to another machine:
```bash
npm install
```

### 2. Development Server
Run Vite's fast local development server:
```bash
npm run dev
```

### 3. Production Build
Compile and bundle production-ready static assets:
```bash
npm run build
```
The output will be generated inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub (`github.com/poorigoodi/portfolio`).
2. Go to [vercel.com](https://vercel.com) and click **Import Project**.
3. Select your repository, leave defaults (Framework: Vite, Build: `npm run build`, Output: `dist`), and click **Deploy**.

### Deploy to Netlify
1. Drag and drop the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop), or connect your GitHub repository with Build Command `npm run build` and Publish Directory `dist`.

### Deploy to GitHub Pages
1. In `vite.config.ts`, add `base: '/<REPO_NAME>/'`.
2. Run `npm run build` and deploy the `dist/` folder using `gh-pages` or GitHub Actions.

---

## ⚙️ Customization Guide

- **Change Projects or Repositories:** Edit `src/data/portfolioData.ts` -> `INITIAL_PROJECTS`.
- **Change Your Email Address:** Edit `src/App.tsx` (default is set to `poorigoodarzi@gmail.com`) or use the in-app "Update Email" button.
- **Change Experience / Career Details:** Edit `src/data/portfolioData.ts` -> `SPIN_RESPONSIBILITIES`.
- **Change Hackathon Entries:** Edit `src/data/portfolioData.ts` -> `HACKATHON_HIGHLIGHTS`.

---

© 2026 Pooria Goodarzi. Crafted with Passion, Artificial Intelligence & Modern Web Technologies.
