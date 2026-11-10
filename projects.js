/**
 * Portfolio projects — keep descriptions, tags and outcomes easy to edit here.
 * `id` is also the internal case-study anchor used by each project card.
 */
const projects = [
  {
    id: "women-safety-sos",
    number: "01",
    title: "Women Safety SOS",
    category: "Civic technology · Mobile",
    role: "Flutter Developer / Project Developer",
    year: "2025",
    description:
      "A safety-first application designed to help users reach trusted contacts quickly during emergencies.",
    outcome:
      "A safety-first application designed to help users reach trusted contacts quickly during emergencies.",
    highlights: [
      "Emergency SOS alerts with live location sharing.",
      "Smart danger-zone prediction using crowd reports.",
      "Trusted contacts and emergency assistance.",
    ],
    stack: ["Flutter", "Dart", "Supabase", "Google Maps API", "Geolocator", "Provider"],
    github: "https://github.com/arpitparulkar/sos_system.git",
    recognition: "Viva TechSpark · First prize",
    visual: "safety",
    visualLabel: "01 / A signal for safety",
  },
  {
    id: "support-resolution-agent",
    number: "02",
    title: "Support Resolution Agent",
    category: "Applied AI · Multi-agent systems",
    role: "AI Engineer / Full-Stack Developer",
    year: "2026",
    description:
      "An intelligent multi-agent support system that analyzes customer queries, routes tickets and automates support resolution.",
    outcome:
      "An intelligent multi-agent support system that analyzes customer queries, routes tickets and automates support resolution.",
    highlights: [
      "Multi-agent support architecture.",
      "Intelligent ticket analysis and routing.",
      "Automated support workflows with a modern interface.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Groq", "Multi-agent AI"],
    github: "https://github.com/arpitparulkar/support-resolution-agent-.git",
    visual: "agent",
    visualLabel: "02 / Orchestrated intelligence",
  },
  {
    id: "ai-resume-portfolio-builder",
    number: "03",
    title: "AI Resume & Portfolio Builder",
    category: "Generative AI · Web",
    role: "AI / Web Developer",
    year: "2026",
    description:
      "An AI-powered tool that helps users create professional resumes and portfolios with ease.",
    outcome:
      "An AI-powered tool that helps users create professional resumes and portfolios with ease.",
    highlights: [
      "AI-assisted resume creation.",
      "Modern portfolio generation.",
      "Responsive, user-friendly interface.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "AI integration"],
    github: "https://github.com/arpitparulkar/resume.git",
    visual: "resume",
    visualLabel: "03 / Make your next move",
  },
  {
    id: "resolveai",
    number: "04",
    title: "ResolveAI — Intelligent Multi-Agent Customer Support System",
    category: "Applied AI · Customer support",
    role: "AI Engineer / Backend Developer",
    year: "2026",
    description:
      "An AI-powered customer support platform using specialized agents, RAG and LLMs to understand queries, retrieve relevant information, automate authorized actions and escalate complex issues to human support.",
    outcome:
      "An AI-powered customer support platform using specialized agents, RAG and LLMs to understand queries, retrieve relevant information, automate authorized actions and escalate complex issues to human support.",
    highlights: [
      "LangGraph-powered multi-agent orchestration.",
      "RAG-based contextual knowledge retrieval.",
      "Intelligent query resolution and human escalation.",
    ],
    stack: ["LangGraph", "Groq LLM", "FastAPI", "RAG", "Python"],
    github: "https://github.com/arpitparulkar/mandoX.git",
    visual: "agent",
    visualLabel: "04 / ResolveAI",
  },
];

export default projects;
