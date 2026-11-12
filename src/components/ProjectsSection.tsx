import React, { useState } from 'react';
import { ArrowUpRight, Loader2, PenLine, RefreshCw } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectIllustration } from './ProjectIllustration';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  activeFilter: string;
  onChangeFilter: (filter: string) => void;
  onEditProjectUrl: (projectId: string) => void;
  onSyncGitHub: () => Promise<void>;
}

const FILTER_TABS = [
  { key: 'all', label: 'All (4)' },
  { key: 'RAG', label: 'RAG & KG' },
  { key: 'Computer Vision', label: 'Computer Vision' },
  { key: 'Speech AI', label: 'Speech & Persian AI' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  activeFilter,
  onChangeFilter,
  onEditProjectUrl,
  onSyncGitHub,
}) => {
  const [syncing, setSyncing] = useState(false);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(
          (p) =>
            p.category === activeFilter ||
            p.techStack.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  const handleSyncClick = async () => {
    setSyncing(true);
    try {
      await onSyncGitHub();
    } finally {
      setSyncing(false);
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 reveal">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
            <span>04</span>
            <span>/</span>
            <span>Projects &amp; Competitions</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
            Featured AI, Vision &amp; ML Repositories
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Production RAG systems, Computer Vision applications in sports/health, Speech AI, and
            hackathon pipelines under <code className="font-mono text-coral">github.com/poorigoodi/</code>.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter Projects">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChangeFilter(tab.key)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-coral text-cream font-semibold'
                    : 'liquid-pill hover:border-coral'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live GitHub Sync Bar */}
      <div className="liquid-glass rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono reveal">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-coral" />
          <span style={{ color: 'var(--text-secondary)' }}>
            Repository Base:{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              https://github.com/poorigoodi/[REPO_SLUG]
            </strong>
          </span>
        </div>
        <button
          type="button"
          onClick={handleSyncClick}
          disabled={syncing}
          className="px-3.5 py-1.5 rounded-xl liquid-pill hover:border-coral text-coral flex items-center gap-1.5 transition-all disabled:opacity-60"
        >
          {syncing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Checking GitHub API...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Auto-Fetch Public Repos from GitHub API</span>
            </>
          )}
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredProjects.map((project, idx) => {
          const delayClass = idx % 3 === 1 ? 'delay-100' : idx % 3 === 2 ? 'delay-200' : '';
          return (
            <article
              key={project.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`project-card reveal visible ${delayClass} liquid-glass liquid-glass-interactive rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group`}
            >
              <div>
                <div
                  className="h-36 rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center p-4 border"
                  style={{ background: 'var(--surface-30)', borderColor: 'var(--glass-border)' }}
                >
                  <ProjectIllustration type={project.svgType} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg liquid-pill font-mono text-[10px] uppercase tracking-wider text-coral font-semibold">
                    {project.badge || project.category}
                  </div>
                  <button
                    type="button"
                    onClick={() => onEditProjectUrl(project.id)}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-lg liquid-pill font-mono text-[10px] flex items-center gap-1 opacity-80 hover:opacity-100 hover:border-coral transition-all"
                    title="Edit this repository's direct GitHub URL"
                  >
                    <PenLine className="w-3 h-3 text-coral" />
                    <span>Edit URL</span>
                  </button>
                </div>

                <div className="mb-3">
                  <h3 className="font-display font-bold text-lg sm:text-xl group-hover:text-coral transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg font-mono text-[11px] liquid-pill"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className="pt-4 border-t flex items-center justify-between gap-2"
                  style={{ borderColor: 'var(--glass-border)' }}
                >
                  <span
                    className="font-mono text-[11px] truncate max-w-[140px] sm:max-w-[165px]"
                    style={{ color: 'var(--text-muted)' }}
                    title={project.repoUrl}
                  >
                    {project.repoUrl.replace('https://github.com/', '')}
                  </span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-coral text-cream font-mono text-xs font-semibold flex items-center gap-1.5 shadow-[0_6px_16px_-4px_rgba(255,107,91,0.5)] hover:scale-[1.04] transition-all shrink-0"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* View All Projects on GitHub CTA */}
      <div className="mt-14 flex justify-center reveal">
        <a
          href="https://github.com/poorigoodi"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass liquid-glass-interactive px-6 sm:px-8 py-4 rounded-2xl font-display font-semibold text-xs sm:text-sm flex items-center gap-3 group text-center"
        >
          <svg
            className="w-5 h-5 text-coral fill-current shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>View All Projects on GitHub (@poorigoodi)</span>
          <ArrowUpRight className="w-4 h-4 text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </a>
      </div>
    </section>
  );
};
