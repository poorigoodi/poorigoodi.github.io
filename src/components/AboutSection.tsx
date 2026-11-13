import React, { useState } from 'react';
import { AudioWaveform, Eye, Languages, Network, Stethoscope } from 'lucide-react';
import { ARCH_MODULES, ArchModuleInfo } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState<ArchModuleInfo['key']>('rag');
  const activeData = ARCH_MODULES[activeKey];

  const pillars = [
    {
      Icon: Network,
      title: 'Production RAG & LLMs',
      desc: 'Vector search, knowledge graphs, and grounded generation with evaluation.',
    },
    {
      Icon: Eye,
      title: 'Computer Vision & Deep Learning',
      desc: 'Pose estimation, visual analytics, image processing, and edge inference.',
    },
    {
      Icon: AudioWaveform,
      title: 'Speech AI & Persian NLP',
      desc: 'STT/TTS/S2S voice intelligence and ParsBERT transformer fine-tuning.',
    },
    {
      Icon: Stethoscope,
      title: 'Medical AI & Modern Tooling',
      desc: 'Clinical research assistants, FastAPI microservices, Docker & Kubernetes.',
    },
  ];

  return (
    <section id="about" className="scroll-mt-24">
      <div className="reveal space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
          <span>01</span>
          <span>/</span>
          <span>About Me</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
          Engineering Practical Intelligence from Research to Production.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 liquid-glass rounded-3xl p-7 sm:p-10 flex flex-col justify-between space-y-6 reveal">
          <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I am <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Pooria Goodarzi</strong>, an AI Engineer, Machine Learning Specialist, and active researcher dedicated to designing, evaluating, and deploying production-oriented artificial intelligence systems that bridge academic rigor with real-world reliability.
            </p>
            <p>
              My engineering focus spans end-to-end <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Retrieval-Augmented Generation (RAG)</strong> pipelines, multi-document knowledge graphs, and systematic <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>LLM evaluation &amp; benchmarking</strong>. Beyond visual and generative text architectures, I build complete <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Speech AI pipelines</strong> covering Text-to-Speech (TTS), Speech-to-Text (STT), and low-latency Speech-to-Speech (S2S) conversational systems.
            </p>
            <p>
              Driven by curiosity in deep learning algorithms, <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Persian Natural Language Processing</strong>, Medical AI clinical systems, and modern cloud &amp; mobile software tooling, I build end-to-end solutions engineered for scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            {pillars.map(({ Icon, title, desc }) => (
              <div key={title} className="liquid-pill p-4 rounded-2xl flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-soft)' }}>
                  <Icon className="w-4 h-4 text-coral" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">{title}</h3>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 liquid-glass rounded-3xl p-7 sm:p-8 flex flex-col justify-between reveal relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-coral block">
                System Architecture
              </span>
              <h3 className="font-display font-bold text-xl mt-0.5">Intelligent Pipeline Matrix</h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg font-mono text-[11px] liquid-pill text-coral">
              v2.5 Core
            </span>
          </div>

          <div className="my-6 flex items-center justify-center">
            <svg viewBox="0 0 460 320" className="w-full h-auto max-h-[300px]" fill="none" aria-label="AI System Architecture Visual">
              <pattern id="arch-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.1" />
              </pattern>
              <rect width="460" height="320" rx="16" fill="url(#arch-grid)" />

              <path d="M 136 62 C 164 62, 160 144, 184 144" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.75" strokeDasharray="4 4" />
              <path d="M 136 160 L 180 160" stroke="#FF6B5B" strokeOpacity="0.75" strokeWidth="2" />
              <path d="M 136 258 C 164 258, 160 176, 184 176" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.75" strokeDasharray="4 4" />
              <path d="M 276 146 C 300 146, 296 95, 324 95" stroke="#FF6B5B" strokeOpacity="0.75" strokeWidth="2" />
              <path d="M 276 174 C 300 174, 296 225, 324 225" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.75" />

              <circle cx="136" cy="62" r="3" fill="currentColor" fillOpacity="0.45" />
              <circle cx="136" cy="160" r="3.5" fill="#FF6B5B" />
              <circle cx="136" cy="258" r="3" fill="currentColor" fillOpacity="0.45" />
              <circle cx="324" cy="95" r="3.5" fill="#FF6B5B" />
              <circle cx="324" cy="225" r="3.5" fill="#FF6B5B" />

              <circle r="3.5" fill="#FF6B5B">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 136 62 C 164 62, 160 144, 184 144" />
              </circle>
              <circle r="4" fill="#FF6B5B">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 136 160 L 180 160" />
              </circle>
              <circle r="3.5" fill="#FF6B5B">
                <animateMotion dur="3.4s" repeatCount="indefinite" path="M 136 258 C 164 258, 160 176, 184 176" />
              </circle>
              <circle r="4" fill="#FF6B5B">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 276 146 C 300 146, 296 95, 324 95" />
              </circle>
              <circle r="3.5" fill="#FF6B5B">
                <animateMotion dur="2.9s" repeatCount="indefinite" path="M 276 174 C 300 174, 296 225, 324 225" />
              </circle>

              <g transform="translate(12, 36)" className="cursor-pointer" onClick={() => setActiveKey('rag')}>
                <rect width="124" height="52" rx="12" fill="currentColor" fillOpacity="0.06" stroke={activeKey === 'rag' ? '#FF6B5B' : 'currentColor'} strokeOpacity={activeKey === 'rag' ? '0.85' : '0.24'} strokeWidth="1.3" />
                <text x="62" y="23" textAnchor="middle" fill="currentColor" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700">RAG &amp; VECTORS</text>
                <text x="62" y="39" textAnchor="middle" fill="#FF6B5B" fontFamily="JetBrains Mono" fontSize="8.5">Embeddings / KG</text>
              </g>

              <g transform="translate(12, 134)" className="cursor-pointer" onClick={() => setActiveKey('cv')}>
                <rect width="124" height="52" rx="12" fill="currentColor" fillOpacity="0.06" stroke="#FF6B5B" strokeOpacity={activeKey === 'cv' ? '0.95' : '0.6'} strokeWidth="1.4" />
                <text x="62" y="23" textAnchor="middle" fill="currentColor" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700">VISION &amp; VOICE</text>
                <text x="62" y="39" textAnchor="middle" fill="#FF6B5B" fontFamily="JetBrains Mono" fontSize="8.5">CV • STT • TTS</text>
              </g>

              <g transform="translate(12, 232)" className="cursor-pointer" onClick={() => setActiveKey('nlp')}>
                <rect width="124" height="52" rx="12" fill="currentColor" fillOpacity="0.06" stroke={activeKey === 'nlp' ? '#FF6B5B' : 'currentColor'} strokeOpacity={activeKey === 'nlp' ? '0.85' : '0.24'} strokeWidth="1.3" />
                <text x="62" y="23" textAnchor="middle" fill="currentColor" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700">NLP &amp; PARSBERT</text>
                <text x="62" y="39" textAnchor="middle" fill="#FF6B5B" fontFamily="JetBrains Mono" fontSize="8.5">Fine-Tuning</text>
              </g>

              <g transform="translate(230, 160)">
                <circle r="48" fill="#FF6B5B" fillOpacity="0.1" stroke="#FF6B5B" strokeWidth="1.5" strokeDasharray="5 4">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
                </circle>
                <circle r="36" fill="#FF6B5B" />
                <text x="0" y="-3" textAnchor="middle" fill="#F4EDE0" fontFamily="Space Grotesk" fontSize="11" fontWeight="700">NEURAL CORE</text>
                <text x="0" y="11" textAnchor="middle" fill="#F4EDE0" fontFamily="JetBrains Mono" fontSize="8">PyTorch / FastAPI</text>
              </g>

              <g transform="translate(324, 69)" className="cursor-pointer" onClick={() => setActiveKey('medical')}>
                <rect width="124" height="52" rx="12" fill="currentColor" fillOpacity="0.06" stroke="#FF6B5B" strokeOpacity={activeKey === 'medical' ? '0.95' : '0.55'} strokeWidth="1.4" />
                <text x="62" y="23" textAnchor="middle" fill="currentColor" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700">MEDICAL &amp; EDGE</text>
                <text x="62" y="39" textAnchor="middle" fill="#FF6B5B" fontFamily="JetBrains Mono" fontSize="8.5">Clinical / Sports AI</text>
              </g>

              <g transform="translate(324, 199)" className="cursor-pointer" onClick={() => setActiveKey('speech')}>
                <rect width="124" height="52" rx="12" fill="currentColor" fillOpacity="0.06" stroke={activeKey === 'speech' ? '#FF6B5B' : 'currentColor'} strokeOpacity={activeKey === 'speech' ? '0.85' : '0.28'} strokeWidth="1.3" />
                <text x="62" y="23" textAnchor="middle" fill="currentColor" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700">PRODUCTION K8S</text>
                <text x="62" y="39" textAnchor="middle" fill="#FF6B5B" fontFamily="JetBrains Mono" fontSize="8.5">Docker / Cloud APIs</text>
              </g>
            </svg>
          </div>

          <div className="space-y-3 pt-4 border-t font-mono text-xs" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-coral font-semibold">
                Interactive Pipeline Inspector
              </span>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                Click module to inspect
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(ARCH_MODULES) as ArchModuleInfo['key'][]).map((k) => {
                const mod = ARCH_MODULES[k];
                const isSelected = k === activeKey;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setActiveKey(k)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
                      isSelected ? 'bg-coral text-cream font-semibold' : 'liquid-pill hover:border-coral'
                    }`}
                  >
                    {mod.buttonLabel}
                  </button>
                );
              })}
            </div>

            <div className="liquid-pill p-3.5 rounded-2xl text-xs space-y-1.5 transition-all">
              <div className="font-display font-bold text-coral flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 shrink-0" />
                <span>{activeData.title}</span>
              </div>
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {activeData.desc}
              </p>
              <div className="text-[10px] pt-1 opacity-75">{activeData.io}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
