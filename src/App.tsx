import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { INITIAL_PROJECTS, ProjectItem } from './data/portfolioData';
import { NeuralCanvas } from './components/NeuralCanvas';
import { CustomCursor } from './components/CustomCursor';
import { NavbarAndDock } from './components/NavbarAndDock';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { CommandPaletteModal, EditModal, ResumeModal } from './components/Modals';

type ModalState =
  | { mode: 'none' }
  | { mode: 'repo'; projectId: string }
  | { mode: 'email' };

const App: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [projectFilter, setProjectFilter] = useState('all');
  const [email, setEmail] = useState('poorigoodarzi@gmail.com');
  const [modal, setModal] = useState<ModalState>({ mode: 'none' });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Toast notifications
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);
  const showToast = useCallback((msg: string) => setToast(msg), []);

  // Theme (Dark Navy <-> Warm Cream)
  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightMode);
  }, [isLightMode]);

  const toggleTheme = useCallback(() => {
    setIsLightMode((prev) => {
      const next = !prev;
      showToast(next ? 'Switched to Warm Cream Light Theme' : 'Switched to Deep Navy Dark Theme');
      return next;
    });
  }, [showToast]);

  // Edit mode body class
  useEffect(() => {
    document.body.classList.toggle('edit-mode-active', editMode);
  }, [editMode]);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => {
      const next = !prev;
      showToast(
        next
          ? 'Edit Mode Active: Click any dashed Coral placeholder to edit inline.'
          : 'Edit Mode Saved.'
      );
      return next;
    });
  }, [showToast]);

  const pulseNodes = useCallback(() => setPulseCount((c) => c + 1), []);

  // Loader overlay
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(t);
  }, []);

  // Bidirectional scroll reveal observer (re-run when project list changes)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.remove('scrolled-past-top', 'scrolled-past-bottom');
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
            if (entry.boundingClientRect.top < 0) {
              el.classList.add('scrolled-past-top');
              el.classList.remove('scrolled-past-bottom');
            } else {
              el.classList.add('scrolled-past-bottom');
              el.classList.remove('scrolled-past-top');
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: '-20px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projectFilter, projects]);

  // Keyboard shortcuts: Ctrl/⌘+K and Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
        setResumeOpen(false);
        setModal({ mode: 'none' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSkillFilter = useCallback(
    (filter: string) => {
      setProjectFilter(filter);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      if (filter !== 'all') showToast(`Filtered projects matching: ${filter}`);
    },
    [showToast]
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied "${email}" to clipboard`);
    } catch {
      showToast('Could not copy automatically');
    }
  }, [email, showToast]);

  // Optional live GitHub public API sync for @poorigoodi
  const syncGitHubRepos = useCallback(async () => {
    try {
      const res = await fetch('https://api.github.com/users/poorigoodi/repos?sort=updated&per_page=12');
      if (!res.ok) throw new Error('GitHub API unavailable');
      const repos: Array<{ html_url?: string }> = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        setProjects((prev) =>
          prev.map((p, idx) =>
            !p.customEdited && repos[idx]?.html_url ? { ...p, repoUrl: repos[idx].html_url as string } : p
          )
        );
        showToast(`Synced ${Math.min(repos.length, projects.length)} repository URLs from @poorigoodi`);
      } else {
        showToast('No public repos returned; keeping editable project URLs.');
      }
    } catch {
      showToast('Using editable repository URLs (Click "Edit URL" on any card).');
    }
  }, [projects.length, showToast]);

  const activeRepoProject =
    modal.mode === 'repo' ? projects.find((p) => p.id === modal.projectId) : undefined;

  return (
    <>
      {/* Initial Loading Overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'var(--bg-60)' }}
      >
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-2xl border border-coral/30 animate-ping" />
          <div className="w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center border border-coral/50">
            <span className="font-display font-bold text-2xl tracking-tighter text-coral">PG</span>
          </div>
        </div>
        <div
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Initializing Neural Environment
        </div>
      </div>

      <CustomCursor />
      <NeuralCanvas isLightMode={isLightMode} pulseCount={pulseCount} />

      <NavbarAndDock
        isLightMode={isLightMode}
        onToggleTheme={toggleTheme}
        editMode={editMode}
        onToggleEditMode={toggleEditMode}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-36 space-y-24 sm:space-y-36 overflow-x-hidden">
        <HeroSection onPulseNodes={pulseNodes} onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <SkillsSection onSelectSkillFilter={handleSkillFilter} />
        <ExperienceSection editMode={editMode} onToggleEditMode={toggleEditMode} />
        <ProjectsSection
          projects={projects}
          activeFilter={projectFilter}
          onChangeFilter={setProjectFilter}
          onEditProjectUrl={(id) => setModal({ mode: 'repo', projectId: id })}
          onSyncGitHub={syncGitHubRepos}
        />
        <ContactSection
          email={email}
          editMode={editMode}
          onEditEmailModal={() => setModal({ mode: 'email' })}
          onInlineEmailChange={setEmail}
          onOpenResume={() => setResumeOpen(true)}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 border-t pb-28 pt-12 px-4 sm:px-8"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-coral flex items-center justify-center text-cream font-display font-bold text-sm">
              PG
            </div>
            <div>
              <div className="font-display font-bold text-sm">Pooria Goodarzi</div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                AI Engineer &amp; Machine Learning Specialist
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            <a href="https://github.com/poorigoodi" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/pooria-goodarzi" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
              LinkedIn
            </a>
            <a href="#contact" className="hover:text-coral transition-colors">
              Email
            </a>
          </div>
          <div className="font-mono text-xs text-center sm:text-right" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Pooria Goodarzi. Crafted with React, Tailwind &amp; Three.js.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EditModal
        open={modal.mode !== 'none'}
        title={modal.mode === 'email' ? 'Configure Contact Email' : 'Edit Repository URL'}
        description={
          modal.mode === 'email'
            ? "Set Pooria Goodarzi's direct contact email address:"
            : `Set the direct GitHub repository URL for "${activeRepoProject?.title ?? ''}":`
        }
        initialValue={modal.mode === 'email' ? email : activeRepoProject?.repoUrl ?? ''}
        placeholder={modal.mode === 'email' ? 'name@example.com' : 'https://github.com/poorigoodi/...'}
        onClose={() => setModal({ mode: 'none' })}
        onSave={(value) => {
          if (modal.mode === 'email') {
            setEmail(value);
            showToast('Contact email updated');
          } else if (modal.mode === 'repo') {
            const id = modal.projectId;
            setProjects((prev) =>
              prev.map((p) => (p.id === id ? { ...p, repoUrl: value, customEdited: true } : p))
            );
            showToast('Repository URL updated');
          }
        }}
      />

      <CommandPaletteModal
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onPulseNodes={pulseNodes}
        onCopyEmail={copyEmail}
        onOpenResume={() => setResumeOpen(true)}
      />

      <ResumeModal open={resumeOpen} email={email} onClose={() => setResumeOpen(false)} />

      {/* Toast */}
      <div
        className={`fixed top-20 right-5 z-[96] liquid-glass px-4 py-3 rounded-2xl border border-coral/50 flex items-center gap-2.5 font-mono text-xs pointer-events-none transition-all duration-300 max-w-[90vw] ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2.5'
        }`}
      >
        <CheckCircle className="w-4 h-4 text-coral shrink-0" />
        <span>{toast ?? ''}</span>
      </div>
    </>
  );
};

export default App;
