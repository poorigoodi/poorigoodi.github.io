import React from 'react';
import { Calendar, CheckCircle2, PenLine } from 'lucide-react';
import { SPIN_RESPONSIBILITIES } from '../data/portfolioData';

interface ExperienceSectionProps {
  editMode: boolean;
  onToggleEditMode: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  editMode,
  onToggleEditMode,
}) => {
  return (
    <section id="experience" className="scroll-mt-24 space-y-16">
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
              <span>03</span>
              <span>/</span>
              <span>Career &amp; Arena</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
              Professional Experience &amp; Hackathons
            </h2>
          </div>

          <button
            type="button"
            onClick={onToggleEditMode}
            className="self-start md:self-auto liquid-pill px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 hover:border-coral transition-all"
          >
            <PenLine className="w-3.5 h-3.5 text-coral" />
            <span>
              {editMode ? 'Save Inline Edits' : 'Click to Edit Dates / Location Placeholders'}
            </span>
          </button>
        </div>

        {/* Career Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-coral/40 space-y-12">
          <div className="relative reveal">
            <div
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-coral shadow-[0_0_16px_#FF6B5B] ring-4"
              style={{ ['--tw-ring-color' as string]: 'var(--bg-60)' }}
            />

            <div className="liquid-glass rounded-3xl p-7 sm:p-9">
              <div
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl">AI Engineer</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-coral text-cream font-semibold">
                      Spin (Spinc)
                    </span>
                  </div>
                  <p className="text-sm mt-1.5 font-mono" style={{ color: 'var(--text-secondary)' }}>
                    AI Engineer •{' '}
                    <span
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      className="editable-field"
                    >
                      Hybrid / Remote
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start lg:self-center liquid-pill px-4 py-2 rounded-xl font-mono text-xs">
                  <Calendar className="w-3.5 h-3.5 text-coral" />
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    className="editable-field"
                  >
                    AI Engineering Role
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPIN_RESPONSIBILITIES.map((item) => (
                  <div
                    key={item.title}
                    className={`liquid-pill p-4 rounded-2xl flex items-start gap-3.5 ${
                      item.fullWidth ? 'md:col-span-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-semibold text-sm">{item.title}</h4>
                      <p
                        className="text-xs mt-1 leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
                style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }}
              >
                <div>
                  Focus Scope:{' '}
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    className="editable-field"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Production RAG, LLM Microservices &amp; Conversational Voice AI
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['RAG', 'LLMs', 'Speech AI', 'FastAPI', 'Production'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md liquid-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
