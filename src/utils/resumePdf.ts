/**
 * Generates and downloads a genuine 1-page A4 PDF resume directly in the browser
 * (zero external dependencies, guaranteed 1 page) AND provides a 1-page isolated
 * iframe print helper so printing never prints the 15-page main website.
 */

function escapePdfText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

export function downloadSinglePageResumePDF(email: string): void {
  // A4 dimensions in points: 595.28 x 841.89
  const ops: string[] = [];

  // Top Navy Header Banner
  ops.push('0.078 0.129 0.239 rg'); // #14213D
  ops.push('0 742 595.28 100 re f');

  // Coral Accent Line under Header
  ops.push('1 0.42 0.357 rg'); // #FF6B5B
  ops.push('0 738 595.28 4 re f');

  const addText = (
    text: string,
    x: number,
    y: number,
    font: 'F1' | 'F2' | 'F3',
    size: number,
    rgb: [number, number, number] = [0.078, 0.129, 0.239]
  ) => {
    ops.push('BT');
    ops.push(`${rgb[0]} ${rgb[1]} ${rgb[2]} rg`);
    ops.push(`/${font} ${size} Tf`);
    ops.push(`1 0 0 1 ${x} ${y} Tm`);
    ops.push(`(${escapePdfText(text)}) Tj`);
    ops.push('ET');
  };

  const addSectionHeader = (title: string, y: number) => {
    addText(title.toUpperCase(), 42, y, 'F2', 10.5, [1, 0.42, 0.357]);
    ops.push('0.85 0.85 0.88 RG');
    ops.push('0.8 w');
    ops.push(`42 ${y - 5} m 553 ${y - 5} l S`);
  };

  // Header Text (Cream on Navy)
  addText('POORIA GOODARZI', 42, 798, 'F2', 22, [0.957, 0.929, 0.878]);
  addText(
    'AI Engineer & Machine Learning Specialist',
    42,
    776,
    'F2',
    11.5,
    [1, 0.42, 0.357]
  );
  addText(
    `Email: ${email}   |   GitHub: github.com/poorigoodi   |   LinkedIn: linkedin.com/in/pooria-goodarzi`,
    42,
    756,
    'F3',
    8.5,
    [0.9, 0.88, 0.84]
  );

  // 1. Executive Summary
  let y = 710;
  addSectionHeader('01 / Executive Summary', y);
  y -= 20;
  const summaryLines = [
    'AI Engineer and Machine Learning Specialist focused on designing, evaluating, and deploying production-grade',
    'artificial intelligence systems. Experienced in Retrieval-Augmented Generation (RAG), Large Language Models',
    '(LLMs), Computer Vision & Pose Kinematics, Speech AI (STT / TTS / S2S), and Persian NLP (ParsBERT).',
  ];
  for (const line of summaryLines) {
    addText(line, 42, y, 'F1', 9.5);
    y -= 14;
  }

  // 2. Technical Skills & Core Stack
  y -= 10;
  addSectionHeader('02 / Technical Arsenal & Stack', y);
  y -= 20;
  const skills: Array<[string, string]> = [
    ['Generative AI & LLMs:', 'Production RAG, Knowledge Graphs, LLM Integration, Prompt Engineering, Vector Search, LLM Evaluation'],
    ['Core AI & Vision:', 'Machine Learning, Deep Learning, Computer Vision, Image Processing, Pose Estimation, NLP, ParsBERT'],
    ['Speech AI:', 'Text-to-Speech (TTS), Speech-to-Text (STT), Real-Time Speech-to-Speech (S2S), Conversational Voice AI'],
    ['Languages & Frameworks:', 'Python, PyTorch, TensorFlow, FastAPI, REST APIs, Jetpack Compose, SQL, Git'],
    ['Tools & Infrastructure:', 'Docker, Kubernetes, Linux, Cloud Services, Hugging Face, MLOps & Production Deployment'],
  ];
  for (const [label, items] of skills) {
    addText(label, 42, y, 'F2', 9.2);
    addText(items, 162, y, 'F1', 9.0, [0.2, 0.25, 0.35]);
    y -= 15;
  }

  // 3. Professional Experience
  y -= 10;
  addSectionHeader('03 / Professional Experience', y);
  y -= 20;
  addText('AI Engineer  —  Spin (Spinc)', 42, y, 'F2', 10.5);
  addText('Production AI Systems | Hybrid / Remote', 375, y, 'F3', 8.5, [0.4, 0.45, 0.55]);
  y -= 16;
  const expBullets = [
    '- Architected and deployed Retrieval-Augmented Generation (RAG) chatbot systems for grounded, context-aware responses.',
    '- Integrated Large Language Model (LLM) APIs into high-throughput asynchronous FastAPI backend microservices.',
    '- Engineered domain-specific AI-powered intelligent assistants for real-world operational workflows.',
    '- Conducted Speech AI R&D across acoustic transcription (STT), neural synthesis (TTS), and voice pipelines.',
    '- Led production deployment, containerization, and latency/reliability optimization for AI inference services.',
  ];
  for (const b of expBullets) {
    addText(b, 48, y, 'F1', 9.2, [0.18, 0.22, 0.32]);
    y -= 14;
  }

  // 4. Featured AI Projects & Repositories
  y -= 10;
  addSectionHeader('04 / Featured AI & ML Projects (github.com/poorigoodi)', y);
  y -= 20;
  const projects: Array<[string, string]> = [
    [
      'Production-Ready RAG with Evaluation',
      'Hybrid semantic + lexical retrieval, reranking & automated faithfulness evaluation (Python, FastAPI, Docker).',
    ],
    [
      'Multi-Document RAG with Knowledge Graph',
      'Graph-enhanced multi-document retrieval uniting Knowledge Graph entities with dense vector embeddings.',
    ],
    [
      'Sports & Health Biomechanics Vision AI',
      'Real-time human pose estimation, repetition kinematics & posture analytics (PyTorch, Computer Vision, Compose).',
    ],
    [
      'Persian Speech Intelligence (STT / TTS / S2S)',
      'Unified Persian voice pipeline integrating Speech-to-Text, Text-to-Speech, and low-latency Speech-to-Speech.',
    ],
  ];
  for (const [title, desc] of projects) {
    addText(`- ${title}:`, 42, y, 'F2', 9.2);
    y -= 12.5;
    addText(`   ${desc}`, 48, y, 'F1', 8.8, [0.22, 0.27, 0.37]);
    y -= 15;
  }

  // 5. Competitions & Hackathons
  y -= 6;
  addSectionHeader('05 / Competitions & Hackathons', y);
  y -= 18;
  addText(
    '- Sports & Healthcare Computer Vision Challenge  |  University & International AI Hackathons  |  Persian NLP Benchmarks',
    42,
    y,
    'F1',
    9.0,
    [0.18, 0.22, 0.32]
  );

  // Footer note
  addText(
    'Single-Page Executive Curriculum Vitae — Generated from Pooria Goodarzi Portfolio',
    42,
    28,
    'F3',
    7.5,
    [0.5, 0.54, 0.62]
  );

  const contentStream = ops.join('\n');

  // Assemble valid PDF-1.4 objects
  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>\nendobj'
  );
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj');
  objects.push(
    `7 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj`
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Pooria-Goodarzi-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

export function printSinglePageResume(email: string): void {
  const existing = document.getElementById('resume-print-iframe');
  if (existing) existing.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'resume-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Pooria Goodarzi - Resume</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #14213D;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.42;
      max-height: 270mm;
      overflow: hidden;
    }
    .header {
      background: #14213D;
      color: #F4EDE0;
      padding: 16px 20px;
      border-radius: 10px;
      border-bottom: 4px solid #FF6B5B;
      margin-bottom: 12px;
    }
    .header h1 { font-size: 22px; letter-spacing: -0.5px; }
    .header .role { color: #FF6B5B; font-weight: 700; font-size: 12px; margin-top: 2px; }
    .header .meta { font-family: monospace; font-size: 10px; margin-top: 6px; opacity: 0.9; }
    .section { margin-bottom: 11px; page-break-inside: avoid; }
    .section-title {
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FF6B5B;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 6px;
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .box { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; }
    .box strong { color: #14213D; display: block; margin-bottom: 2px; font-size: 10.5px; }
    ul { padding-left: 16px; }
    li { margin-bottom: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>POORIA GOODARZI</h1>
    <div class="role">AI Engineer &amp; Machine Learning Specialist</div>
    <div class="meta">${email} &bull; github.com/poorigoodi &bull; linkedin.com/in/pooria-goodarzi</div>
  </div>

  <div class="section">
    <div class="section-title">01 / Summary</div>
    <p>AI Engineer and Machine Learning Specialist dedicated to designing, evaluating, and deploying production-oriented artificial intelligence systems across Retrieval-Augmented Generation (RAG), LLMs, Computer Vision &amp; Pose Kinematics, Speech AI (STT/TTS/S2S), and Persian NLP (ParsBERT).</p>
  </div>

  <div class="section">
    <div class="section-title">02 / Technical Stack</div>
    <div class="grid-2">
      <div class="box"><strong>Generative AI &amp; LLMs</strong>RAG, Knowledge Graphs, LLM Integration, Prompt Engineering, Vector Search, LLM Evaluation</div>
      <div class="box"><strong>Core AI, Vision &amp; NLP</strong>Machine Learning, Deep Learning, Computer Vision, Image Processing, Transformers, ParsBERT</div>
      <div class="box"><strong>Languages, Frameworks &amp; Voice</strong>Python, PyTorch, TensorFlow, FastAPI, Jetpack Compose, TTS / STT / S2S, SQL, Git</div>
      <div class="box"><strong>Tools &amp; Infrastructure</strong>Docker, Kubernetes, Cloud Services, Linux, Hugging Face, Production APIs</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">03 / Professional Experience</div>
    <div class="box">
      <strong>AI Engineer — Spin (Spinc) | Production AI Systems</strong>
      <ul>
        <li>Developed Retrieval-Augmented Generation (RAG) chatbot systems for grounded conversational responses.</li>
        <li>Integrated Large Language Model (LLM) APIs into scalable asynchronous backend services.</li>
        <li>Designed intelligent AI assistants and conducted Speech AI R&amp;D across voice synthesis and transcription.</li>
        <li>Deployed and maintained production AI microservices with Docker, FastAPI, and strict reliability monitoring.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">04 / Featured Projects &amp; Competitions</div>
    <div class="grid-2">
      <div class="box"><strong>Production-Ready RAG with Evaluation</strong>Hybrid vector + lexical search, reranking, and automated faithfulness benchmarking.</div>
      <div class="box"><strong>Multi-Document RAG + Knowledge Graph</strong>Graph-enhanced multi-document retrieval for cross-document reasoning.</div>
      <div class="box"><strong>Sports &amp; Health Biomechanics Vision AI</strong>Real-time PyTorch pose estimation &amp; kinematics with Jetpack Compose companion UI.</div>
      <div class="box"><strong>Persian Speech AI &amp; ParsBERT NLP</strong>Unified STT/TTS/S2S voice pipeline and fine-tuned Persian transformer models.</div>
    </div>
  </div>
</body>
</html>`;

  const doc = iframe.contentWindow?.document;
  if (!doc) return;
  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  }, 150);
}
