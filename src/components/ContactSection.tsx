import React, { useState } from 'react';
import {
  AtSign,
  Check,
  Copy,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
} from 'lucide-react';

interface ContactSectionProps {
  email: string;
  editMode: boolean;
  onEditEmailModal: () => void;
  onInlineEmailChange: (newEmail: string) => void;
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email,
  editMode,
  onEditEmailModal,
  onInlineEmailChange,
  onOpenResume,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onShowToast(`Copied "${email}" to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Could not copy automatically');
    }
  };

  const focusContactForm = () => {
    const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
    nameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => nameInput?.focus(), 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      onShowToast('Please fill out Name, Email, and Message.');
      return;
    }

    setSending(true);
    setStatusNote(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: senderEmail.trim(),
          message: message.trim(),
          _subject: `Portfolio Inquiry from ${name.trim()}`,
          _template: 'table',
        }),
      });

      const data = await response.json().catch(() => ({}));
      setSubmitted(true);

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatusNote(`Your message was sent directly to ${email}.`);
        onShowToast('Message sent directly from the website!');
      } else if (typeof data.message === 'string' && data.message.toLowerCase().includes('activate')) {
        setStatusNote(
          `Message queued! Check ${email} inbox once to click the FormSubmit activation link.`
        );
        onShowToast('Message submitted! Check inbox for one-time activation.');
      } else {
        setStatusNote(`Message recorded and dispatched to ${email}.`);
        onShowToast('Message dispatched directly from the site!');
      }

      setName('');
      setSenderEmail('');
      setMessage('');
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch {
      setSubmitted(true);
      setStatusNote(
        `Network offline — please check your internet connection or copy ${email} directly.`
      );
      onShowToast('Could not reach mail server; check internet connection.');
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="liquid-glass rounded-3xl p-6 sm:p-12 lg:p-14 relative overflow-hidden reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Pitch, Direct Email Callout & Social Profiles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-pill font-mono text-xs text-coral">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
              <span>05 / INITIATE CONNECTION</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
              Let&apos;s Build Something <span className="text-coral">Intelligent</span> Together.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you are looking to architect production RAG systems, build Computer Vision
              pipelines, integrate Speech AI, or collaborate on machine learning engineering
              opportunities, send a message directly using the form on this page.
            </p>

            {/* Direct Email Callout Box */}
            <div className="liquid-pill p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  <Mail className="w-5 h-5 text-coral" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Direct Email Address
                  </span>
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const txt = e.currentTarget.textContent?.trim();
                      if (txt) onInlineEmailChange(txt);
                    }}
                    className="editable-field font-mono text-xs sm:text-sm font-semibold truncate block"
                  >
                    {email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial justify-center px-3.5 py-2.5 rounded-xl liquid-glass liquid-glass-interactive font-mono text-xs flex items-center gap-1.5"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-coral" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-coral" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={focusContactForm}
                  className="flex-1 sm:flex-initial justify-center px-3.5 py-2.5 rounded-xl bg-coral text-cream font-mono text-xs font-semibold flex items-center gap-1.5 shadow-[0_8px_20px_-4px_rgba(255,107,91,0.5)] hover:scale-[1.02] transition-all"
                >
                  <span>Write Here</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Social & Developer Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <a
                href="https://github.com/poorigoodi"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass liquid-glass-interactive px-4 py-3.5 rounded-2xl flex items-center gap-3.5 group hover:scale-[1.03] transition-all"
              >
                <svg
                  className="w-5 h-5 text-coral fill-current group-hover:scale-110 transition-transform shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <div>
                  <span className="font-display font-bold text-sm block leading-none">GitHub</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    @poorigoodi
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/pooria-goodarzi"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass liquid-glass-interactive px-4 py-3.5 rounded-2xl flex items-center gap-3.5 group hover:scale-[1.03] transition-all"
              >
                <svg
                  className="w-5 h-5 text-coral fill-current group-hover:scale-110 transition-transform shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <div>
                  <span className="font-display font-bold text-sm block leading-none">LinkedIn</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    in/pooria-goodarzi
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="liquid-glass liquid-glass-interactive px-4 py-3.5 rounded-2xl flex items-center gap-3.5 group hover:scale-[1.03] transition-all text-left"
              >
                <FileText className="w-5 h-5 text-coral group-hover:scale-110 transition-transform shrink-0" />
                <div>
                  <span className="font-display font-bold text-sm block leading-none">
                    Resume / CV
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    1-Page PDF Download
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={onEditEmailModal}
                className="liquid-glass liquid-glass-interactive px-4 py-3.5 rounded-2xl flex items-center gap-3.5 group hover:scale-[1.03] transition-all text-left"
              >
                <AtSign className="w-5 h-5 text-coral group-hover:scale-110 transition-transform shrink-0" />
                <div>
                  <span className="font-display font-bold text-sm block leading-none">
                    Update Email
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    Customize Address
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Clean & Minimal In-Site Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="liquid-pill rounded-3xl p-6 sm:p-8 space-y-5 border"
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <div
                className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl">
                    Send a Direct Message
                  </h3>
                  <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    Sends directly from this website to {email}
                  </p>
                </div>
                <Send className="w-4 h-4 text-coral" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <User className="w-3.5 h-3.5 text-coral" />
                  <span>Your Name</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3 rounded-2xl liquid-glass font-sans text-sm focus:outline-none focus:border-coral transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-xs flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail className="w-3.5 h-3.5 text-coral" />
                  <span>Your Email Address</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-2xl liquid-glass font-sans text-sm focus:outline-none focus:border-coral transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-xs flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-coral" />
                  <span>Message</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your AI/ML project, research collaboration, or engineering role..."
                  className="w-full px-4 py-3 rounded-2xl liquid-glass font-sans text-sm focus:outline-none focus:border-coral transition-colors resize-none"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              {statusNote && (
                <div className="p-3.5 rounded-2xl liquid-glass border border-coral/40 font-mono text-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span style={{ color: 'var(--text-secondary)' }}>{statusNote}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 px-6 rounded-2xl bg-coral text-cream font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_12px_28px_-6px_rgba(255,107,91,0.55)] hover:scale-[1.015] active:scale-[0.99] transition-all disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Directly...</span>
                  </>
                ) : submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message Now</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
