export interface ProjectItem {
  id: string;
  title: string;
  category:
    | 'RAG'
    | 'Computer Vision'
    | 'Speech AI'
    | 'Evaluation'
    | 'Medical AI'
    | 'ML & NLP'
    | 'Hackathons';
  repoUrl: string;
  demoUrl?: string;
  badge?: string;
  description: string;
  techStack: string[];
  svgType: 'rag' | 'kg' | 'eval' | 'speech' | 'medical' | 'nlp' | 'cv' | 'hackathon';
  customEdited?: boolean;
}

export interface ArchModuleInfo {
  key: 'rag' | 'speech' | 'cv' | 'nlp' | 'medical';
  buttonLabel: string;
  title: string;
  desc: string;
  io: string;
}

export interface HackathonHighlight {
  id: string;
  title: string;
  arena: string;
  tag: string;
  description: string;
  technologies: string[];
}

export const ROLES: string[] = [
  'AI Engineer & Machine Learning Specialist',
  'RAG & LLM Systems Architect',
  'Computer Vision & Deep Learning Engineer',
  'Speech AI & Persian NLP Specialist',
];

export const ARCH_MODULES: Record<ArchModuleInfo['key'], ArchModuleInfo> = {
  rag: {
    key: 'rag',
    buttonLabel: 'RAG + KG',
    title: 'Hybrid RAG & Multi-Doc Knowledge Graph',
    desc: 'Combines dense vector embeddings with structured graph relationships, reranking, and automated LLM faithfulness evaluation.',
    io: 'IN: Unstructured Docs → OUT: Grounded & Verified Citations',
  },
  speech: {
    key: 'speech',
    buttonLabel: 'Speech AI',
    title: 'End-to-End Speech Intelligence (STT / TTS / S2S)',
    desc: 'Low-latency acoustic transcription, neural voice synthesis, and conversational Speech-to-Speech streaming in English & Persian.',
    io: 'IN: Raw Audio Waveform → OUT: Real-Time Synthesized Voice',
  },
  cv: {
    key: 'cv',
    buttonLabel: 'Vision AI',
    title: 'Computer Vision & Biomechanical Image Processing',
    desc: 'Real-time pose estimation, object tracking, and neural visual analytics built with PyTorch, TensorFlow, and edge-ready pipelines.',
    io: 'IN: Video / Camera Frames → OUT: Pose Keypoints & Telemetry',
  },
  nlp: {
    key: 'nlp',
    buttonLabel: 'ParsBERT',
    title: 'Persian NLP & ParsBERT Fine-Tuning',
    desc: 'Domain-adapted transformer encoders engineered for high-accuracy Persian tokenization, NER, sentiment, and semantic classification.',
    io: 'IN: Persian Text Corpus → OUT: Contextual Embeddings & Labels',
  },
  medical: {
    key: 'medical',
    buttonLabel: 'Medical AI',
    title: 'Medical AI Clinical & Research Assistant',
    desc: 'High-precision domain assistant utilizing verified medical literature retrieval, structured synthesis, and strict safety guardrails.',
    io: 'IN: Clinical Queries → OUT: Evidence-Backed Synthesis',
  },
};

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prod-rag-eval',
    title: 'Production-Ready RAG with Evaluation',
    category: 'RAG',
    repoUrl: 'https://github.com/poorigoodi/production-rag-evaluation',
    badge: 'Production Core',
    description:
      'End-to-end Retrieval-Augmented Generation architecture engineered for production environments with hybrid semantic + lexical search, reranking, and automated faithfulness & context-precision evaluation.',
    techStack: ['Python', 'FastAPI', 'RAG', 'Vector Search', 'Embeddings', 'LLM Evaluation', 'Docker'],
    svgType: 'rag',
  },
  {
    id: 'multi-doc-kg-rag',
    title: 'Multi-Document RAG with Knowledge Graph',
    category: 'RAG',
    repoUrl: 'https://github.com/poorigoodi/multi-document-kg-rag',
    description:
      'Graph-enhanced multi-document retrieval system combining structured Knowledge Graph entity relationships with dense vector embeddings for complex cross-document reasoning.',
    techStack: ['Python', 'Knowledge Graph', 'RAG', 'LLM Integration', 'Vector Search', 'REST APIs'],
    svgType: 'kg',
  },
  {
    id: 'sports-health-vision',
    title: 'Sports & Health Biomechanics Vision AI',
    category: 'Computer Vision',
    repoUrl: 'https://github.com/poorigoodi/sports-health-pose-vision',
    badge: 'CV + Mobile Edge',
    description:
      'Real-time human pose estimation, exercise repetition kinematics, and injury-prevention posture feedback powered by deep vision models with a modern Jetpack Compose companion interface.',
    techStack: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning', 'Jetpack Compose', 'FastAPI'],
    svgType: 'cv',
  },
  {
    id: 'persian-speech-ai',
    title: 'Persian Speech Intelligence (STT / TTS / S2S)',
    category: 'Speech AI',
    repoUrl: 'https://github.com/poorigoodi/persian-speech-intelligence',
    description:
      'Unified Persian Speech AI pipeline integrating high-accuracy Speech-to-Text (STT), natural Text-to-Speech (TTS), and low-latency Speech-to-Speech conversational capabilities.',
    techStack: ['Python', 'TTS', 'STT', 'Speech-to-Speech', 'ParsBERT', 'Voice AI', 'FastAPI'],
    svgType: 'speech',
  },
];

export const HACKATHON_HIGHLIGHTS: HackathonHighlight[] = [
  {
    id: 'cv-sports-challenge',
    title: 'Sports & Healthcare Computer Vision Challenge',
    arena: 'Applied Vision & Biomechanics Track',
    tag: 'Computer Vision',
    description:
      'Engineered real-time pose keypoint tracking and movement quality scoring pipelines for athletic form analysis and physical rehabilitation monitoring.',
    technologies: ['PyTorch', 'Computer Vision', 'Image Processing', 'Jetpack Compose'],
  },
  {
    id: 'uni-intl-ai-hackathons',
    title: 'University & International AI Hackathons',
    arena: 'Generative AI, RAG & Rapid Prototyping',
    tag: 'Hackathon Finalist / Builder',
    description:
      'Architected end-to-end multimodal and Retrieval-Augmented Generation systems under strict 24–48h competition constraints, delivering production-grade APIs and live interactive demos.',
    technologies: ['Python', 'RAG', 'LLMs', 'FastAPI', 'Docker', 'Kubernetes'],
  },
  {
    id: 'persian-nlp-speech-bench',
    title: 'Low-Resource & Persian NLP / Speech Benchmarks',
    arena: 'Open-Source ML & Academic Research',
    tag: 'NLP & Speech AI',
    description:
      'Fine-tuned transformer encoders (ParsBERT) and acoustic-linguistic pipelines to push accuracy and latency boundaries on Persian text and voice tasks.',
    technologies: ['Transformers', 'ParsBERT', 'Hugging Face', 'STT / TTS', 'Linux'],
  },
];

export const SPIN_RESPONSIBILITIES = [
  {
    title: 'RAG-Based Chatbot Systems',
    desc: 'Development of Retrieval-Augmented Generation (RAG) chatbot systems for grounded, context-aware conversational responses.',
  },
  {
    title: 'LLM API Integration',
    desc: 'Integration of Large Language Model (LLM) APIs into scalable backend services and asynchronous application workflows.',
  },
  {
    title: 'AI-Powered Intelligent Assistants',
    desc: 'Design and engineering of intelligent AI-powered assistants tailored for practical user and domain-specific workflows.',
  },
  {
    title: 'Speech AI R&D',
    desc: 'Speech AI research and development encompassing voice processing, synthesis, and conversational audio pipelines.',
  },
  {
    title: 'Production AI Deployment',
    desc: 'Deployment and integration of AI solutions in production environments with focus on reliability, API performance, containerization, and maintainability.',
    fullWidth: true,
  },
];
