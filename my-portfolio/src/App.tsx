import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Code, Layers, Cloud, Database, Shield,
  Home, User, Briefcase, FolderOpen, Mail, Menu, X,
  Linkedin, Download, ExternalLink, Github
} from 'lucide-react';
import type { Variants } from 'framer-motion';
import FrancisOlaImage from './assets/Francis-Ola.jpg';
import FrancisOlaResume from './assets/Francis_Oladosu_Resume_T.pdf';

// --- Reusable Interfaces ---
interface Skill {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  technologies: string[];
}

interface Experience {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  technologies?: string[];
}

interface Project {
  title: string;
  description: string;
  detailDescription: string;
  highlights?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status?: string;
}

// --- Header Component ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const handleScroll = () => {
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-20 bg-neutral-950/80 backdrop-blur-md border-r border-neutral-800 z-50 hidden lg:flex flex-col items-center justify-center">
        <div className="space-y-6">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <div key={item.name} className="relative group">
                <motion.button
                  onClick={() => scrollToSection(item.href)}
                  className={`p-3 rounded-lg transition-all duration-300 relative ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={22} />
                </motion.button>
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-neutral-800 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap shadow-lg border border-neutral-700">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
      <header className="fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 z-50 lg:hidden p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold text-white">F.O.</span>
          <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
            {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </motion.button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-800 z-40 lg:hidden"
          >
            <div className="container mx-auto flex flex-col items-start p-4 space-y-2">
              {navigation.map((item) => (
                <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-neutral-300 hover:text-white transition-colors duration-200 py-2 w-full text-left flex items-center gap-4">
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Hero Component ---
const Hero: React.FC = () => {
    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center lg:ml-20 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-neutral-900/[0.2] z-0"></div>
            <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                            Francis Oladosu
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-neutral-300 mb-8">
                            Senior Software Engineer
                        </h2>
                        <p className="text-lg text-neutral-400 mb-12 max-w-xl mx-auto lg:mx-0">
                            Building payment systems, distributed data platforms, and AI-powered products — in Rust, Java, C#, and TypeScript.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.button onClick={scrollToContact} className="bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-neutral-200 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Let's Talk
                            </motion.button>
                            <motion.a href={FrancisOlaResume} download className="border border-neutral-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Download size={18} /> Resume
                            </motion.a>
                        </div>
                        <div className="flex justify-center lg:justify-start space-x-6 mt-12">
                            <a href="https://github.com/HorlaRepo" target="_blank" rel="noopener noreferrer" aria-label="Francis Oladosu on GitHub" className="text-neutral-400 hover:text-white transition-colors"><Github size={24} /></a>
                            <a href="https://linkedin.com/in/francis-oladosu" target="_blank" rel="noopener noreferrer" aria-label="Francis Oladosu on LinkedIn" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                            <a href="mailto:meetfran6@gmail.com" aria-label="Email Francis Oladosu" className="text-neutral-400 hover:text-white transition-colors"><Mail size={24} /></a>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hidden lg:flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-80 h-80 md:w-96 md:h-96">
                            <div className="absolute inset-0 rounded-full border-2 border-neutral-800 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border-2 border-neutral-900"></div>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl">
                                 <img src={FrancisOlaImage} alt="Francis Oladosu" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// --- About Component ---
const About: React.FC = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    return (
        <section id="about" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">About Me</h2>
                    <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    <motion.div className="lg:col-span-3 space-y-6 text-lg text-neutral-300 leading-relaxed" initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                        <p>I'm a Senior Software Engineer with over 8 years of experience building systems that move money, make decisions, and hold up in production. My work spans cross-border payments reaching 150+ countries, a multi-tenant HR SaaS whose payroll has processed over ₦800 million, the credit and lending core of an investment platform, and AI-powered commerce products.</p>
                        <p>Most recently I designed and built TechAtlas solo — a Rust technology-intelligence platform with an Axum API, scheduler, and worker pool coordinated through PostgreSQL and Redis Streams, with immutable history and explainable detections. Alongside it: Ordira, a commerce AI SaaS for WhatsApp ordering, and NexHrm, a microservices HR platform spanning Java, C#/.NET, and Laravel services.</p>
                        <p>The thread running through all of it is a preference for systems where correctness, auditability, and operational visibility are requirements rather than nice-to-haves — because in payments, lending, and intelligence work, being approximately right is the same as being wrong.</p>
                    </motion.div>
                     <motion.div className="lg:col-span-2 grid grid-cols-2 gap-8 text-center" initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">8+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">₦800M+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Payroll Processed</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">150+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Countries Supported</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">8,000+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Employees Served</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- Skills Component ---
const Skills: React.FC = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const skills: Skill[] = [
        { icon: Brain, title: 'AI & LLM Development', description: 'Building production AI systems with LLMs, structured outputs, retrieval pipelines, and workflow automation.', technologies: ['Claude AI', 'Anthropic SDK', 'pgvector', 'RAG', 'BullMQ'] },
        { icon: Code, title: 'Programming Languages', description: 'Strong across backend, frontend, and integration-heavy product work.', technologies: ['Java', 'C#', 'Rust', 'TypeScript', 'Python', 'PHP'] },
        { icon: Layers, title: 'Frontend & Product Engineering', description: 'Building fast, polished product experiences for SaaS, marketplace, and commerce applications.', technologies: ['React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
        { icon: Cloud, title: 'Backend, Cloud & Delivery', description: 'Designing production systems and shipping them with modern cloud, CI/CD, and observability tooling.', technologies: ['Spring Boot', '.NET', 'NestJS', 'Axum', 'AWS', 'GCP', 'Docker', 'GitHub Actions', 'OpenTelemetry', 'Prometheus'] },
        { icon: Database, title: 'Data & Distributed Systems', description: 'Designing reliable data layers and durable message-driven pipelines for transactional systems and product workflows.', technologies: ['PostgreSQL', 'Redis Streams', 'Meilisearch', 'Supabase', 'MongoDB', 'Firebase'] },
        { icon: Shield, title: 'Payments, Auth & Security', description: 'Shipping secure product flows involving payments, identity, billing, and access control.', technologies: ['Stripe', 'Paystack', 'OIDC', 'JWT', 'OAuth2', 'RBAC', 'Webhooks', 'KYC'] },
    ];
    const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

    return (
        <section id="skills" ref={ref} className="py-24 lg:ml-20 bg-black text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Technical Skills</h2>
                    <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                </motion.div>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                    {skills.map((skill) => (
                        <motion.div key={skill.title} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300" variants={cardVariants}>
                            <div className="flex items-center gap-4 mb-4">
                                <skill.icon size={28} className="text-white" />
                                <h3 className="text-xl font-bold">{skill.title}</h3>
                            </div>
                            <p className="text-neutral-400 mb-6">{skill.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {skill.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// --- Experience Component ---
const Experience: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const experiences: Experience[] = [
    { period: '2023 – Present', title: 'Senior Software Engineer', company: 'NexHrm', location: 'Lagos, Nigeria', description: ['Designed and led microservices-based architecture for a scalable SaaS HR platform spanning Java/Spring Boot, C#/.NET, and Laravel services.', 'Payroll has processed over ₦800 million across 80 organizations and 8,000+ employees in two years.', 'Implemented inter-service communication via REST APIs, with centralized logging and API gateway across business-critical modules.', 'Achieved 40% reduction in response time and 25% infrastructure cost savings.'], technologies: ['Java', 'Spring Boot', 'C#', '.NET', 'Laravel', 'Docker', 'Kubernetes', 'AWS', 'Microservices'], },
    { period: '05/2022 – 08/2023', title: 'Smart Contract Developer', company: 'Cryptika', location: 'Remote', description: ['Developed and optimized smart contracts for scalable blockchain applications, ensuring high security.', 'Collaborated with cross-functional teams to deliver robust DeFi protocols and token standards.'], technologies: ['Solidity', 'Smart Contracts', 'DeFi', 'EVM', 'Blockchain'], },
    { period: '2019 – 2023', title: 'Freelance Software Engineer', company: 'Remote', location: 'Lagos, Nigeria', description: ['Delivered enterprise-grade solutions for clients in fintech, healthcare, and logistics.', 'Engineered scalable microservices-based systems using Java, Spring Boot, C#/.NET, and PostgreSQL.'], technologies: ['Java', 'Spring Boot', 'C#', '.NET', 'PostgreSQL', 'AWS', 'GCP'], },
  ];

  return (
    <section id="experience" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Work Experience</h2>
          <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
        </motion.div>
        <div className="relative max-w-3xl mx-auto max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-neutral-800" />
          {experiences.map((exp, index) => (
            <motion.div key={index} className="relative pl-12 pb-12" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.2 }}>
              <div className="absolute left-4 top-1 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 border-4 border-neutral-950" />
              <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <p className="text-sm text-neutral-400 mb-1">{exp.period}</p>
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-md text-neutral-300 mb-3">{exp.company} &bull; {exp.location}</p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400">
                  {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full">{tech}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Projects Component ---
const Projects: React.FC = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const projects: Project[] = [
        { title: 'TechAtlas - Internet Technology-Intelligence Platform', description: 'Solo-built Rust platform that collects public web signals and turns them into explainable, immutable technology intelligence.', detailDescription: 'TechAtlas collects public technical signals from administrator-managed domains, derives explainable technology detections, and preserves an immutable history of everything it observed. I designed and built it solo: a Rust backend split into four deployable applications — an Axum API, a scheduler, a worker pool, and a CLI — coordinated through PostgreSQL as the system of record and Redis Streams for at-least-once job delivery. It is deliberately an intelligence index rather than an on-demand scanner, and the engineering is shaped by that constraint: correctness and auditability over raw coverage.', highlights: ['Durable crawl pipeline: the scheduler atomically records each attempt plus an outbox entry before publishing, and workers acknowledge only after writing a bounded outcome — so a crashed worker\'s job is expired and retried through the same policy instead of being lost or duplicated.', 'Explainable detections: every result carries its confidence, method, rule version, and redacted evidence, and replaying a rule creates new derived records rather than rewriting history.', 'Safety as a hard requirement: robots compliance, per-domain politeness, redirect and response-size limits, and SSRF/private-address blocking both before and after DNS resolution.', 'React 19 dashboard serving public research — search, comparison, and adoption analytics — alongside an OIDC-protected admin surface with permission-scoped mutations and an append-only audit log.', 'Single-host deployment behind a Cloudflare Tunnel with a loopback-only Caddy origin, instrumented end to end with OpenTelemetry, Prometheus, Grafana, and Tempo.'], technologies: ['Rust', 'Axum', 'Tokio', 'PostgreSQL', 'Redis Streams', 'Meilisearch', 'React 19', 'OpenTelemetry', 'Docker'], featured: true, liveUrl: 'https://techatlas.dpdns.org', githubUrl: 'https://github.com/HorlaRepo/TechAtlas' },
        { title: 'Onward Education - Course Marketplace Platform', description: 'Course marketplace for professional training, staff development, and global education programs.', detailDescription: 'Built a course marketplace experience for professional training, corporate staff development, and global education support. The platform combines structured course discovery, conversion-focused marketing pages, enrollment flows, and authenticated learner access to purchased programs. This work reflects the kind of premium marketplace execution where product clarity, trust, and fast user journeys matter from first visit through paid access.', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Auth Gating', 'Vercel'], featured: true, liveUrl: 'https://onwardeducations.com/' },
        { title: 'NexHrm - B2B HR SaaS Platform', description: 'Multi-tenant HR SaaS for payroll, recruitment, performance, and workforce operations.', detailDescription: 'Architected a comprehensive B2B HR SaaS platform with a microservices architecture spanning Java/Spring Boot and C#/.NET services, paired with a React frontend for core administrative workflows. The product supports employee information management, payroll, performance management, recruitment, onboarding, and time tracking for multiple organizations. Built for scale, operational clarity, and role-based access across a growing set of business-critical modules.', technologies: ['Java', 'Spring Boot', 'C#', '.NET', 'React', 'PostgreSQL', 'AWS', 'Microservices'], featured: true, liveUrl: 'https://app.nexhrm.com' },
        { title: 'Grapevine Pay - Cross-Border Payments & Multi-Currency Wallets', description: 'Fintech platform for sending, receiving, and holding money across 150+ countries into African banks and wallets.', detailDescription: 'Grapevine Pay lets individuals and businesses send, receive, and hold money in multiple currencies, moving funds from any country into African banks and wallets on top of licensed global partners. I built the full product surface across a C#/.NET backend and a React frontend. The work centred on the parts of payments that cannot be approximated: transaction integrity across currencies, webhook-driven status transitions, idempotent transfer handling, and giving both customers and operators an accurate real-time view of balances and transaction history.', highlights: ['Multi-currency wallets holding USD, EUR, GBP, and NGN in a single balance, with an integrated converter so users know what a transfer actually costs before they send it.', 'Cross-border transfers reaching 150+ countries, plus instant payouts from a Grapevine Pay balance to local bank accounts and payment channels.', 'Global merchant gateway for accepting international payments, alongside shareable payment links and invoices that let freelancers get paid from anywhere.', 'Utility hub for airtime, data, cable, and electricity payments, and a QR scanner for quick payments at local vendors and online retailers.', 'KYC onboarding and encrypted fund management, with every transaction logged immediately so the customer view and the operational view never diverge.'], technologies: ['C#', '.NET', 'React', 'TypeScript', 'PostgreSQL', 'Multi-Currency Wallets', 'Webhooks', 'KYC'], featured: true, liveUrl: 'https://grapevinepay.com/' },
        { title: 'WaveSend - Diaspora Remittance & Multi-Currency Wallet', description: 'Remittance platform letting Africans abroad send money home, funded in USD and withdrawn in local currency via bank transfer, M-Pesa, or mobile money.', detailDescription: 'WaveSend is built for the diaspora remittance corridor: Africans abroad sending money to family back home. Senders fund transfers in USD through Stripe, the value lands in the recipient\'s WaveSend wallet, and the recipient withdraws in their own local currency — straight to a bank account, or out through M-Pesa and mobile money where those rails are how people actually get paid. Holding value in a wallet between send and withdrawal is what makes the rest work: recipients decide when and how to cash out instead of being locked into whatever rail the sender happened to choose. Because remittances are the money people can least afford to lose, the platform treats identity, fraud, and monitoring as core product rather than compliance overhead.', highlights: ['Stripe-funded USD collection settling into recipient wallets, with local-currency withdrawal across direct bank transfer, M-Pesa, and mobile money payout rails.', 'Tiered KYC where limits scale as verification deepens — small transfers stay frictionless while higher ceilings require stronger identity proof.', 'Fraud detection and prevention with continuous account monitoring, surfacing anomalous transfer patterns before funds leave the platform.', 'AI-assisted transfers: a conversational assistant that interprets natural-language intent, so sending money is a sentence rather than a multi-step form.', 'Beneficiary low-balance notifications that prompt senders when a recipient\'s wallet runs low — opt-out by design, because a financial nudge you cannot switch off stops being a feature.'], technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Stripe', 'PostgreSQL', 'AI/NLP', 'Tiered KYC', 'Fraud Detection', 'M-Pesa', 'Mobile Money'], featured: true, liveUrl: 'https://wavesend-app.netlify.app' },
        { title: 'Ordira - Commerce AI SaaS for WhatsApp Ordering', description: 'AI-powered commerce assistant that turns WhatsApp conversations into paid food orders.', detailDescription: 'Ordira eliminates the manual overhead of food vendors managing orders on WhatsApp. Vendors register their menu, pricing, and policies once, then an AI assistant powered by Claude handles customer conversations: answering questions, building carts, validating orders against live catalog data, generating payment links, and notifying vendors on confirmed payment. The backend remains the source of truth for pricing, availability, and payment status.', technologies: ['NestJS', 'TypeScript', 'Claude AI', 'PostgreSQL', 'BullMQ', 'Paystack', 'WhatsApp Cloud API', 'GCP'], featured: true, liveUrl: 'https://www.tryordira.com' },
        { title: 'Zitra Investments - Investment & Lending Platform', description: 'Financial services platform combining wealth-building investment products with accessible credit and loan origination.', detailDescription: 'Zitra provides accessible financial solutions: loans that bridge the funding gap for individuals and businesses, and investment products that help clients grow wealth toward defined financial goals. I built the backend in Java alongside the Next.js frontend, owning the credit and lending core. Lending decisions have to be defensible as much as functional, so the system was built around deterministic eligibility outcomes, auditable state transitions on every application, and careful handling of the personal and financial data those decisions rest on.', highlights: ['Credit eligibility engine that scores applicants against configurable criteria, producing deterministic, reproducible decisions rather than opaque ones.', 'End-to-end loan application flow spanning submission, document capture, review stages, decisioning, and disbursement status — with each transition recorded as an auditable event.', 'Java backend paired with a Next.js frontend, keeping the server authoritative over eligibility and application state.'], technologies: ['Java', 'Spring Boot', 'Next.js', 'TypeScript', 'PostgreSQL', 'Credit Scoring', 'Loan Origination'], featured: true, liveUrl: 'https://zitrainvestments.com/' },
        { title: 'Enterprise Payment Gateway', description: 'A secure, scalable, and multi-currency payment gateway for enterprise transactions.', detailDescription: 'Designed a distributed system using Spring Boot 3 and Java 17, following Clean Architecture and Domain-Driven Design. Implemented JWT-based authentication, HMAC-SHA256 request signing, and achieved 100% test pass rate.', technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'PCI DSS'], featured: false },
        { title: 'Real-time Parcel Delivery App', description: 'Android application for real-time parcel tracking and delivery management.', detailDescription: 'Built with Kotlin and MVVM architecture, featuring offline-first functionality, real-time GPS tracking, and Firebase integration for notifications and analytics.', technologies: ['Kotlin', 'Android', 'MVVM', 'Firebase', 'Google Maps API'], featured: false },
    ];
    
    return (
        <section id="projects" ref={ref} className="py-24 lg:ml-20 bg-black text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Featured Projects</h2>
                     <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                </motion.div>
                <div className="space-y-12">
                    {projects.filter(p => p.featured).map((project, index) => (
                        <motion.div key={project.title} className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden" initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.2 }}>
                           <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-3 flex-wrap">
                                    {project.title}
                                    {project.status && (
                                        <span className="text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700 px-2 py-1 rounded-full">
                                            {project.status}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-neutral-400 mb-4">{project.detailDescription}</p>
                                {project.highlights && (
                                    <ul className="list-disc pl-5 space-y-2 text-neutral-400 mb-6">
                                        {project.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                                    </ul>
                                )}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View the ${project.title} project live`} className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><ExternalLink size={20} /><span>View Project</span></a>}
                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View the source code for ${project.title} on GitHub`} className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><Github size={20} /><span>View Code</span></a>}
                                    {!project.liveUrl && project.status && (
                                        <span className="text-neutral-500 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block"></span>
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                           </div>
                        </motion.div>
                    ))}
                </div>
                <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
                    <h3 className="text-3xl font-bold mb-8">Other Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {projects.filter(p => !p.featured).map((project) => (
                            <div key={project.title} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 text-left">
                                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                                <p className="text-neutral-400 mb-4 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                     {project.technologies.slice(0, 4).map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full">{tech}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


// --- Contact Component ---
const Contact: React.FC = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n—\nFrom: ${name}\nReply to: ${email}`);
        window.location.href = `mailto:meetfran6@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Get In Touch</h2>
                     <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                    <p className="max-w-2xl mx-auto text-neutral-400 mt-6">Have a project in mind or just want to connect? Feel free to send me a message.</p>
                </motion.div>
                <motion.div className="max-w-xl mx-auto bg-neutral-900 p-8 rounded-lg border border-neutral-800" initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" aria-label="Your Name" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" aria-label="Your Email" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
                        </div>
                        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" aria-label="Your Message" rows={5} required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"></textarea>
                        <motion.button type="submit" className="w-full bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-neutral-200 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Send Message
                        </motion.button>
                    </form>
                    <p className="text-sm text-neutral-500 mt-6 text-center">This opens your email client with the message ready to send. Prefer to reach out directly?</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-4">
                        <a href="mailto:meetfran6@gmail.com" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 text-sm"><Mail size={18} /><span>meetfran6@gmail.com</span></a>
                        <a href="https://linkedin.com/in/francis-oladosu" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 text-sm"><Linkedin size={18} /><span>LinkedIn</span></a>
                        <a href="https://github.com/HorlaRepo" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 text-sm"><Github size={18} /><span>GitHub</span></a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer: React.FC = () => (
    <footer className="lg:ml-20 bg-black text-neutral-500 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Francis Oladosu. All Rights Reserved.</p>
    </footer>
);


// --- Main App Component ---
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="loading-spinner"></div>
        <h2 className="text-2xl font-bold mt-4">Francis Oladosu</h2>
        <p className="text-neutral-400">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <Header />
      <main className="lg:pl-20">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
