import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Home,
  Layers,
  Printer,
  Search,
  Send,
  Sun,
  User,
  X,
  Zap,
} from 'lucide-react';
import { downloadSinglePageResumePDF, printSinglePageResume } from '../utils/resumePdf';

interface EditModalProps {
  open: boolean;
  title: string;
  description: string;
  initialValue: string;
  placeholder: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  open,
  title,
  description,
  initialValue,
  placeholder,
  onClose,
  onSave,
}) => {
  const [val, setVal] = useState(initialValue);

  useEffect(() => {
    setVal(initialValue);
  }, [initialValue, open]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: 'rgba(20, 33, 61, 0.75)', backdropFilter: 'blur(12px)' }}
    >
      <div className="liquid-glass rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-coral/40">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl liquid-pill flex items-center justify-center hover:text-coral"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs font-mono leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          autoFocus
          className="w-full px-4 py-3 rounded-xl liquid-pill font-mono text-xs focus:outline-none focus:border-coral"
          style={{ color: 'var(--text-primary)' }}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl liquid-pill font-mono text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (val.trim()) onSave(val.trim());
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-coral text-cream font-mono text-xs font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onPulseNodes: () => void;
  onCopyEmail: () => void;
  onOpenResume: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onToggleTheme,
  onPulseNodes,
  onCopyEmail,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  if (!open) return null;

  const items = [
    { label: 'Go to Home & Hero', category: 'Navigation', Icon: Home, action: () => { location.hash = '#home'; } },
    { label: 'Go to About & Architecture', category: 'Navigation', Icon: User, action: () => { location.hash = '#about'; } },
    { label: 'Go to Technical Arsenal (Skills)', category: 'Navigation', Icon: Cpu, action: () => { location.hash = '#skills'; } },
    { label: 'Go to Experience & Hackathons', category: 'Navigation', Icon: Briefcase, action: () => { location.hash = '#experience'; } },
    { label: 'Go to Projects & Repositories', category: 'Navigation', Icon: Layers, action: () => { location.hash = '#projects'; } },
    { label: 'Go to Contact Form', category: 'Navigation', Icon: Send, action: () => { location.hash = '#contact'; } },
    { label: 'Open Executive Resume / CV', category: 'Resume', Icon: FileText, action: onOpenResume },
    { label: 'Switch Light / Dark Mode Theme', category: 'Appearance', Icon: Sun, action: onToggleTheme },
    { label: 'Pulse 3D Neural Network Core', category: '3D Scene', Icon: Zap, action: onPulseNodes },
    { label: 'Copy Contact Email Address', category: 'Action', Icon: Copy, action: onCopyEmail },
    { label: 'Open GitHub Profile (@poorigoodi)', category: 'External', Icon: ExternalLink, action: () => window.open('https://github.com/poorigoodi', '_blank') },
    { label: 'Open LinkedIn Profile', category: 'External', Icon: ExternalLink, action: () => window.open('https://www.linkedin.com/in/pooria-goodarzi', '_blank') },
  ];

  const q = query.toLowerCase().trim();
  const filtered = items.filter(
    (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[95] flex items-start justify-center pt-20 sm:pt-28 p-4"
      style={{ background: 'rgba(20, 33, 61, 0.72)', backdropFilter: 'blur(14px)' }}
    >
      <div className="liquid-glass rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-coral/40 shadow-2xl space-y-4">
        <div
          className="flex items-center gap-3 pb-3 border-b"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <Search className="w-4 h-4 text-coral shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, skills, resume, or actions..."
            autoFocus
            className="w-full bg-transparent border-none focus:outline-none font-mono text-xs sm:text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded-lg liquid-pill font-mono text-[10px]"
            style={{ color: 'var(--text-muted)' }}
          >
            ESC
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
          {filtered.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onClose();
                item.action();
              }}
              className="w-full p-3 rounded-2xl liquid-pill hover:border-coral flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.Icon className="w-4 h-4 text-coral" />
                <span className="group-hover:text-coral transition-colors">{item.label}</span>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md liquid-glass"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.category}
              </span>
            </button>
          ))}
        </div>

        <div
          className="pt-2 border-t flex items-center justify-between text-[10px] font-mono"
          style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }}
        >
          <span>Pooria Goodarzi — AI Navigation System</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

interface ResumeModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ open, email, onClose }) => {
  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(20, 33, 61, 0.78)', backdropFilter: 'blur(14px)' }}
    >
      <div className="liquid-glass rounded-3xl max-w-2xl w-full p-6 sm:p-9 border border-coral/40 space-y-6 my-8 max-h-[88vh] overflow-y-auto">
        <div
          className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-coral">
              Executive Curriculum Vitae
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mt-1">Pooria Goodarzi</h3>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              AI Engineer &amp; Machine Learning Specialist • {email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => downloadSinglePageResumePDF(email)}
              className="px-4 py-2 rounded-xl bg-coral text-cream font-mono text-xs font-semibold flex items-center gap-1.5 shadow-[0_8px_20px_-4px_rgba(255,107,91,0.5)] hover:scale-[1.03] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 1-Page PDF</span>
            </button>
            <button
              type="button"
              onClick={() => printSinglePageResume(email)}
              className="px-3.5 py-2 rounded-xl liquid-pill hover:border-coral font-mono text-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-coral" />
              <span>Print 1-Page</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl liquid-pill flex items-center justify-center hover:text-coral"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-coral font-semibold mb-1.5">
              Summary
            </h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              AI Engineer &amp; Machine Learning Specialist focused on production Retrieval-Augmented
              Generation (RAG), LLMs, Computer Vision &amp; image processing, Speech AI (STT/TTS/S2S),
              Persian NLP (ParsBERT), and cloud-ready API microservices.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-coral font-semibold mb-1.5">
              Experience
            </h4>
            <div className="liquid-pill p-4 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between font-display font-bold">
                <span>AI Engineer — Spin (Spinc)</span>
                <span className="font-mono text-xs text-coral">Production AI</span>
              </div>
              <ul className="list-disc pl-5 text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>Architected RAG-based chatbot systems and LLM API backend integrations.</li>
                <li>Developed intelligent domain assistants and Speech AI voice pipelines.</li>
                <li>Deployed scalable AI microservices in production environments.</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-coral font-semibold mb-1.5">
              Technical Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="liquid-pill p-3 rounded-xl">
                <strong className="text-coral block mb-1">Languages &amp; Frameworks</strong>
                Python, PyTorch, TensorFlow, FastAPI, Jetpack Compose, SQL, Git
              </div>
              <div className="liquid-pill p-3 rounded-xl">
                <strong className="text-coral block mb-1">Infrastructure &amp; Cloud</strong>
                Docker, Kubernetes, Cloud Services, Linux, Hugging Face
              </div>
              <div className="liquid-pill p-3 rounded-xl sm:col-span-2">
                <strong className="text-coral block mb-1">Core AI Domains</strong>
                Machine Learning, Computer Vision, Deep Learning, Production RAG &amp; Knowledge Graphs, Speech AI (TTS/STT/S2S), Persian NLP (ParsBERT)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
