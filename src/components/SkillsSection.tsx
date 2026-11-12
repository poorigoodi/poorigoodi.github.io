import React from 'react';
import {
  Boxes,
  BrainCircuit,
  Code2,
  Container,
  Cpu,
  Database,
  GitBranch,
  Mic,
  Server,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';

interface SkillsSectionProps {
  onSelectSkillFilter: (filter: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkillFilter }) => {
  const categories = [
    {
      code: '01 / GEN AI & LLM',
      title: 'Generative AI & LLM',
      desc: 'Designing grounded retrieval architectures, semantic indexing pipelines, knowledge graphs, and systematic evaluation frameworks.',
      Icon: Sparkles,
      chips: [
        { label: 'RAG', filter: 'RAG' },
        { label: 'LLM Integration', filter: 'RAG' },
        { label: 'Prompt Engineering', filter: 'RAG' },
        { label: 'Embeddings', filter: 'RAG' },
        { label: 'Vector Search', filter: 'RAG' },
        { label: 'Knowledge Graphs', filter: 'RAG' },
        { label: 'LLM Evaluation', filter: 'RAG' },
      ],
      delay: 'delay-100',
    },
    {
      code: '02 / CORE DOMAINS',
      title: 'ML, Vision & Deep Learning',
      desc: 'Core AI algorithms, Computer Vision & image processing, deep neural networks, and Persian NLP transformer adaptation.',
      Icon: BrainCircuit,
      chips: [
        { label: 'Machine Learning', filter: 'all' },
        { label: 'Computer Vision', filter: 'Computer Vision' },
        { label: 'Deep Learning', filter: 'Computer Vision' },
        { label: 'NLP', filter: 'Speech AI' },
        { label: 'Transformers', filter: 'Speech AI' },
        { label: 'ParsBERT', filter: 'Speech AI' },
        { label: 'Model Fine-tuning', filter: 'Speech AI' },
      ],
      delay: 'delay-200',
    },
    {
      code: '03 / VOICE AI',
      title: 'Speech AI',
      desc: 'End-to-end acoustic and linguistic voice intelligence for low-latency conversational agents and Persian speech.',
      Icon: Mic,
      chips: [
        { label: 'TTS (Text-to-Speech)', filter: 'Speech AI' },
        { label: 'STT (Speech-to-Text)', filter: 'Speech AI' },
        { label: 'Speech-to-Speech', filter: 'Speech AI' },
        { label: 'Voice AI', filter: 'Speech AI' },
      ],
      delay: 'delay-300',
    },
    {
      code: '04 / LANGUAGES & FRAMEWORKS',
      title: 'Languages, Frameworks & API',
      desc: 'Deep learning frameworks, high-throughput asynchronous API development, and modern cross-platform UI engineering.',
      Icon: Code2,
      chips: [
        { label: 'Python', filter: 'all' },
        { label: 'PyTorch', filter: 'Computer Vision' },
        { label: 'TensorFlow', filter: 'all' },
        { label: 'FastAPI', filter: 'RAG' },
        { label: 'Jetpack Compose', filter: 'Computer Vision' },
        { label: 'API Development', filter: 'all' },
        { label: 'Git', filter: 'all' },
      ],
      delay: 'delay-100',
    },
  ];

  const infraTools = [
    { label: 'Docker', Icon: Container, filter: 'RAG' },
    { label: 'Kubernetes', Icon: Boxes, filter: 'all' },
    { label: 'Cloud Services', Icon: Server, filter: 'all' },
    { label: 'Linux', Icon: TerminalSquare, filter: 'all' },
    { label: 'Git & GitHub', Icon: GitBranch, filter: 'all' },
    { label: 'SQL', Icon: Database, filter: 'all' },
    { label: 'Hugging Face', Icon: Cpu, filter: 'Speech AI' },
  ];

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 sm:gap-6 reveal">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
            <span>02</span>
            <span>/</span>
            <span>Technical Arsenal</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight">
            Skills, Core Domains &amp; Tech Stack
          </h2>
        </div>
        <p className="font-mono text-xs max-w-sm" style={{ color: 'var(--text-secondary)' }}>
          Hover over any domain card to zoom &amp; inspect, or click a technology tag to filter matching projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {categories.map(({ code, title, desc, Icon, chips, delay }) => (
          <div
            key={code}
            className={`liquid-glass skill-card-zoom rounded-3xl p-6 sm:p-7 flex flex-col justify-between reveal ${delay}`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-coral/30"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  <Icon className="w-6 h-6 text-coral" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {code}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => onSelectSkillFilter(chip.filter)}
                  className="skill-chip liquid-pill px-3.5 py-2 rounded-xl font-mono text-xs hover:border-coral hover:text-coral"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Category 5: Tools, Cloud & Infrastructure */}
        <div className="liquid-glass skill-card-zoom rounded-3xl p-6 sm:p-7 flex flex-col justify-between reveal delay-200 md:col-span-2 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border border-coral/30 shrink-0"
                style={{ background: 'var(--accent-soft)' }}
              >
                <Boxes className="w-6 h-6 text-coral" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                  05 / TOOLS &amp; INFRASTRUCTURE
                </span>
                <h3 className="font-display font-bold text-xl">Cloud, MLOps &amp; Infrastructure</h3>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1.5 rounded-xl liquid-pill self-start sm:self-center">
              Production Deployment Ready
            </span>
          </div>

          <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Containerized deployment environments, Kubernetes cluster orchestration, Linux server workflows, cloud infrastructure, and model hub integration for reproducible ML pipelines.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            {infraTools.map(({ label, Icon, filter }) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectSkillFilter(filter)}
                className="skill-chip liquid-pill px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 hover:border-coral hover:text-coral"
              >
                <Icon className="w-3.5 h-3.5 text-coral" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
