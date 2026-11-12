import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  Briefcase,
  Command,
  Cpu,
  FileText,
  Home,
  Layers,
  Moon,
  Send,
  SlidersHorizontal,
  Sun,
  User,
} from 'lucide-react';

interface NavbarAndDockProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
  editMode: boolean;
  onToggleEditMode: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

const DOCK_LINKS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'skills', label: 'Skills', Icon: Cpu },
  { id: 'experience', label: 'Experience & Hackathons', Icon: Briefcase },
  { id: 'projects', label: 'Projects', Icon: Layers },
  { id: 'contact', label: 'Contact', Icon: Send },
];

export const NavbarAndDock: React.FC<NavbarAndDockProps> = ({
  isLightMode,
  onToggleTheme,
  editMode,
  onToggleEditMode,
  onOpenCommandPalette,
  onOpenResume,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);

      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let currentId = 'home';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 260;
        if (scrollTop >= top) {
          currentId = sec.getAttribute('id') || 'home';
        }
      });
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none"
        style={{ background: 'transparent' }}
      >
        <div
          className="h-full bg-coral transition-all duration-75 shadow-[0_0_12px_#FF6B5B]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Floating Status & Theme Controls */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Monogram & Availability Badge */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href="#home"
              className="liquid-glass liquid-glass-interactive px-3.5 py-2 rounded-2xl flex items-center gap-2.5 group"
              aria-label="Pooria Goodarzi Home"
            >
              <span className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center text-cream font-display font-bold text-sm tracking-tight shadow-[0_0_15px_rgba(255,107,91,0.45)] group-hover:scale-105 transition-transform">
                PG
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-xs tracking-tight leading-none">
                  POORIA GOODARZI
                </span>
                <span
                  className="font-mono text-[10px] leading-none mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  AI / ML SPECIALIST
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl liquid-glass text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-coral pulse-ring" />
              <span style={{ color: 'var(--text-secondary)' }}>
                Available for AI / ML Opportunities
              </span>
            </div>
          </div>

          {/* Right Controls: Resume, Command Palette, Edit Placeholders, Theme Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
            <button
              type="button"
              onClick={onOpenResume}
              className="liquid-glass liquid-glass-interactive px-3 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono transition-all"
              title="Open Executive Resume / CV Summary"
            >
              <FileText className="w-3.5 h-3.5 text-coral" />
              <span className="hidden sm:inline">Resume</span>
            </button>

            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="liquid-glass liquid-glass-interactive px-3 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono transition-all"
              title="Open Quick Command Palette (Ctrl+K / ⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-coral" />
              <span className="hidden md:inline">Command</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded-md liquid-pill text-coral font-semibold">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onToggleEditMode}
              className="liquid-glass liquid-glass-interactive px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono transition-all"
              title="Customize editable placeholders (Dates, Email, Repo URLs)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-coral" />
              <span className="hidden xl:inline">
                {editMode ? 'Done Editing' : 'Customize Placeholders'}
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="liquid-glass liquid-glass-interactive w-10 h-10 rounded-2xl flex items-center justify-center relative overflow-hidden"
              aria-label="Toggle Light and Dark Theme"
              title="Switch Theme (60/30/10 Rule)"
            >
              {isLightMode ? (
                <Sun className="w-4 h-4 text-coral" />
              ) : (
                <Moon className="w-4 h-4 text-coral" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigation Dock */}
      <nav
        aria-label="Primary Bottom Navigation"
        className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 px-2.5 sm:px-3.5 py-2 rounded-3xl liquid-dock flex items-center gap-1 sm:gap-2.5 max-w-[94vw]"
      >
        {DOCK_LINKS.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`dock-item ${activeSection === id ? 'active' : ''}`}
            aria-label={label}
          >
            <span className="dock-tooltip">{label}</span>
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </nav>

      {/* Back to Top Floating Control */}
      <button
        id="back-to-top"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl liquid-glass liquid-glass-interactive flex items-center justify-center transition-all duration-300 ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 text-coral" />
      </button>
    </>
  );
};
