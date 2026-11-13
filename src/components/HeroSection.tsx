import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, FileText, Sparkles, Terminal, Zap } from 'lucide-react';
import { ROLES } from '../data/portfolioData';

interface HeroSectionProps {
  onPulseNodes: () => void;
  onOpenResume: () => void;
}

interface TerminalEntry {
  id: number;
  cmd: string;
  response: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPulseNodes, onOpenResume }) => {
  const [roleText, setRoleText] = useState(ROLES[0]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLog, setTerminalLog] = useState<TerminalEntry[]>([]);

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = ROLES[0].length;
    let deleting = false;
    let timerId: number;

    const step = () => {
      const current = ROLES[roleIdx];
      charIdx = deleting ? charIdx - 1 : charIdx + 1;
      setRoleText(current.substring(0, charIdx));

      let delay = deleting ? 35 : 70;
      if (!deleting && charIdx >= current.length) {
        delay = 2200;
        deleting = true;
      } else if (deleting && charIdx <= 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
        delay = 350;
      }
      timerId = window.setTimeout(step, delay);
    };

    timerId = window.setTimeout(step, 2200);
    return () => window.clearTimeout(timerId);
  }, []);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.toLowerCase().replace('./', '').trim();
    if (!cmd) return;
    if (cmd === 'clear') {
      setTerminalLog([]);
      return;
    }

    let response =
      '→ Available commands: rag | vision | speech | parsbert | skills | resume | contact | clear';
    if (cmd.includes('rag')) {
      response =
        '→ Production RAG: Hybrid Vector + Lexical retrieval, Knowledge Graphs & LLM faithfulness evaluation.';
    } else if (cmd.includes('vision') || cmd.includes('cv')) {
      response =
        '→ Computer Vision: Real-time PyTorch/TensorFlow pose kinematics, image processing & Sports/Health AI.';
    } else if (cmd.includes('speech') || cmd.includes('voice')) {
      response =
        '→ Speech AI: End-to-end STT, natural TTS synthesis, and low-latency Speech-to-Speech pipelines.';
    } else if (cmd.includes('parsbert') || cmd.includes('nlp')) {
      response =
        '→ Persian NLP: Transformer fine-tuning with ParsBERT for sentiment, NER, and classification.';
    } else if (cmd.includes('skill') || cmd.includes('stack')) {
      response =
        '→ Stack: Python, PyTorch, TensorFlow, FastAPI, Jetpack Compose, Docker, Kubernetes, Linux.';
    } else if (cmd.includes('resume')) {
      response = '→ Opening Executive Resume / CV preview...';
      onOpenResume();
    } else if (cmd.includes('contact') || cmd.includes('email')) {
      response = '→ Navigating to Contact Section... Email: poorigoodarzi@gmail.com';
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    setTerminalLog((prev) => [...prev.slice(-4), { id: Date.now() + Math.random(), cmd: rawCmd, response }]);
    onPulseNodes();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput.trim());
    setTerminalInput('');
  };

  return (
    <section id="home" className="min-h-[84vh] flex flex-col justify-center relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 reveal reveal-left visible">
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-full liquid-pill max-w-full">
            <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              AI Systems &amp; Research
            </span>
            <span className="opacity-30">|</span>
            <span className="inline-flex items-center">
              <span className="font-mono text-[11px] sm:text-xs font-semibold text-coral">{roleText}</span>
              <span className="typing-cursor" />
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-bold text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.06]">
              Pooria <span className="text-coral">Goodarzi</span>
            </h1>
            <p className="font-display font-semibold text-lg sm:text-2xl md:text-3xl tracking-tight opacity-95">
              AI Engineer &amp; Machine Learning Specialist
            </p>
          </div>

          <p className="text-sm sm:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Building <strong style={{ color: 'var(--text-primary)' }}>intelligent systems</strong> for the future — specializing in Machine Learning, Artificial Intelligence, Computer Vision, Production RAG &amp; LLMs, Speech AI, and modern software development.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {['Machine Learning & Deep Learning', 'Production RAG & LLMs', 'Computer Vision', 'Speech AI & ParsBERT'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono liquid-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
            <a
              href="#projects"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-coral text-cream font-display font-semibold text-sm tracking-wide flex items-center gap-2.5 shadow-[0_12px_30px_-6px_rgba(255,107,91,0.55)] hover:scale-[1.04] active:scale-[0.99] transition-all"
            >
              <span>View Projects</span>
              <Code2 className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl liquid-glass liquid-glass-interactive font-display font-semibold text-sm tracking-wide flex items-center gap-2.5 hover:scale-[1.04] transition-all"
            >
              <span>Contact Me / Resume</span>
              <ArrowUpRight className="w-4 h-4 text-coral" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="w-12 h-12 rounded-2xl liquid-glass liquid-glass-interactive flex items-center justify-center group hover:scale-110 transition-all"
              aria-label="Preview Resume"
              title="Preview / Print Resume (CV)"
            >
              <FileText className="w-5 h-5 group-hover:text-coral transition-colors" />
            </button>

            <a
              href="https://github.com/poorigoodi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl liquid-glass liquid-glass-interactive flex items-center justify-center group hover:scale-110 transition-all"
              aria-label="GitHub Profile"
              title="GitHub (@poorigoodi)"
            >
              <svg className="w-5 h-5 fill-current group-hover:text-coral transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/pooria-goodarzi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl liquid-glass liquid-glass-interactive flex items-center justify-center group hover:scale-110 transition-all"
              aria-label="LinkedIn Profile"
              title="LinkedIn (Pooria Goodarzi)"
            >
              <svg className="w-5 h-5 fill-current group-hover:text-coral transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 reveal reveal-right visible">
          <div className="liquid-glass rounded-3xl p-5 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-coral" />
                <span className="w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: 'var(--text-primary)' }} />
                <span className="w-3 h-3 rounded-full opacity-20" style={{ backgroundColor: 'var(--text-primary)' }} />
              </div>
              <div className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Terminal className="w-3.5 h-3.5 text-coral" />
                <span>pooria@ai-research-lab:~</span>
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm space-y-4 leading-relaxed">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-coral font-bold">$</span>
                  <span className="font-semibold">whoami</span>
                </div>
                <div className="pl-4 mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Pooria Goodarzi — AI Engineer &amp; ML Specialist
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-coral font-bold">$</span>
                  <span className="font-semibold">current_focus</span>
                </div>
                <div className="pl-4 mt-1 text-coral font-medium">
                  RAG | LLMs | Computer Vision | Speech AI
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-coral font-bold">$</span>
                  <span className="font-semibold">languages_supported</span>
                </div>
                <div className="pl-4 mt-1 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-secondary)' }}>
                  <span>English</span>
                  <span className="opacity-40">•</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-coral font-bold">$</span>
                  <span className="font-semibold">status</span>
                </div>
                <div className="pl-4 mt-1 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span>Building intelligent systems...</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                {terminalLog.length === 0 ? (
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    Type a command below or click a quick chip:
                  </div>
                ) : (
                  terminalLog.map((entry) => (
                    <div key={entry.id} className="text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-coral font-bold">$</span>
                        <span>{entry.cmd}</span>
                      </div>
                      <div className="pl-3 text-coral/90">{entry.response}</div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
                <span className="text-coral font-bold">$</span>
                <input
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  type="text"
                  placeholder="try: rag, vision, speech, skills, resume, clear..."
                  autoComplete="off"
                  className="w-full bg-transparent border-none focus:outline-none text-xs font-mono placeholder:opacity-40"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button type="submit" className="px-2.5 py-1 rounded-lg liquid-pill text-[10px] text-coral hover:border-coral transition-all shrink-0">
                  Run
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: './rag_pipeline', cmd: 'rag' },
                  { label: './computer_vision', cmd: 'vision' },
                  { label: './speech_ai', cmd: 'speech' },
                  { label: './parsbert', cmd: 'parsbert' },
                  { label: 'clear', cmd: 'clear' },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => executeCommand(chip.cmd)}
                    className="px-2 py-0.5 rounded-md liquid-pill text-[10px] hover:border-coral hover:text-coral transition-all"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                <span>3D Neural Mesh: Active</span>
              </div>
              <button
                type="button"
                onClick={onPulseNodes}
                className="px-3 py-1.5 rounded-xl liquid-pill hover:border-coral text-coral transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3" />
                <span>Pulse Nodes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
