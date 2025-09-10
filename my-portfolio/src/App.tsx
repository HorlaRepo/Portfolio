/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Code, Layers, Cloud, Database, Shield,
  Home, User, Briefcase, FolderOpen, Mail, Menu, X,
  Github, Linkedin, Download, ExternalLink,
  Send, MapPin, Phone
} from 'lucide-react';
import type { Variants } from 'framer-motion';
import FrancisOlaImage from './assets/Francis-Ola.jpg';
import FrancisOlaResume from './assets/Francis-Oladosu-Resume-20250910.pdf';

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
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
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
                            Crafting scalable, high-performance systems with a passion for AI-assisted development and modern cloud architectures.
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
                            <a href="https://github.com/HorlaRepo" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Github size={24} /></a>
                            <a href="https://linkedin.com/in/francis-oladosu" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                            <a href="mailto:meetfran6@gmail.com" className="text-neutral-400 hover:text-white transition-colors"><Mail size={24} /></a>
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
                        <p>As a Senior Software Engineer with over 7 years of experience, I specialize in building robust, scalable systems and leveraging AI to accelerate development cycles. My expertise lies in designing microservices architectures, particularly with Java/Spring Boot and modern cloud-native technologies.</p>
                        <p>I thrive in collaborative environments, leading teams to deliver high-quality software solutions. Currently, as an Engineering Co-Founder at NexHrm, I'm architecting a cutting-edge SaaS platform from the ground up, focusing on performance, security, and scalability.</p>
                        <p>I'm driven by a passion for solving complex problems and a commitment to continuous learning and improvement in the ever-evolving tech landscape.</p>
                    </motion.div>
                     <motion.div className="lg:col-span-2 grid grid-cols-2 gap-8 text-center" initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">7+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">20+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Technologies</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">100+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Projects Delivered</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">5+</div>
                            <div className="text-sm text-neutral-400 uppercase tracking-wider">Cloud Platforms</div>
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
        { icon: Brain, title: 'AI-Assisted Development', description: 'Leveraging AI tools to enhance coding productivity and build scalable systems.', technologies: ['Claude AI', 'GitHub Copilot', 'GPT-4'] },
        { icon: Code, title: 'Programming Languages', description: 'Proficient in multiple languages for diverse development needs.', technologies: ['Java', 'TypeScript', 'Python', 'Dart'] },
        { icon: Layers, title: 'Frameworks & Libraries', description: 'Expert-level knowledge in modern frameworks for full-stack development.', technologies: ['Spring Boot', 'React', 'Angular', 'NextJS'] },
        { icon: Cloud, title: 'Cloud & DevOps', description: 'Experienced in cloud platforms and modern DevOps practices.', technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes'] },
        { icon: Database, title: 'Databases', description: 'Proficient in both SQL and NoSQL databases for optimal data management.', technologies: ['PostgreSQL', 'MongoDB', 'Firebase'] },
        { icon: Shield, title: 'Security & Best Practices', description: 'Implementing robust security measures and following industry best practices.', technologies: ['OWASP', 'OAuth2', 'JWT', 'CORS'] },
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
    { period: '2023 – Present', title: 'Engineering Co-Founder', company: 'NexHrm', location: 'Lagos, Nigeria', description: ['Designed and led microservices-based architecture for a scalable SaaS HR platform using Spring Boot and Laravel.', 'Implemented inter-service communication via REST APIs, with centralized logging and API gateway.', 'Achieved 40% reduction in response time and 25% infrastructure cost savings.'], technologies: ['Spring Boot', 'Laravel', 'Docker', 'Kubernetes', 'AWS', 'Microservices'], },
    { period: '05/2022 – 08/2023', title: 'Smart Contract Developer', company: 'Cryptika', location: 'Remote', description: ['Developed and optimized smart contracts for scalable blockchain applications, ensuring high security.', 'Collaborated with cross-functional teams to deliver robust DeFi protocols and token standards.'], technologies: ['Solidity', 'Smart Contracts', 'DeFi', 'EVM', 'Blockchain'], },
    { period: '2019 – 2023', title: 'Freelance Software Engineer', company: 'Remote', location: 'Lagos, Nigeria', description: ['Delivered enterprise-grade solutions for clients in fintech, healthcare, and logistics.', 'Engineered scalable microservices-based systems using Java, Spring Boot, and PostgreSQL.', 'Utilized AI-assisted coding tools including Claude AI to accelerate development cycles.'], technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'GCP', 'Claude AI'], },
  ];

  return (
    <section id="experience" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Work Experience</h2>
          <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
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
        { title: 'AI-Driven SAAS B2B Recruitment Platform', description: 'A comprehensive, multi-tenant B2B recruitment system for NexHrm.', detailDescription: 'Leveraged a suite of AI tools to accelerate the development lifecycle. Utilized advanced models like GPT-4 for initial architectural planning, employed Claude 3 Sonnet for hands-on implementation, and used Claude 3 Opus to create comprehensive technical documentation.', technologies: ['Claude AI', 'Java', 'Spring Boot', 'Microservices', 'PostgreSQL'], featured: true, githubUrl: 'https://github.com' },
        { title: 'Enterprise Payment Gateway Platform', description: 'A secure, scalable, and multi-currency payment gateway for enterprise transactions.', detailDescription: 'Designed a distributed system using Spring Boot 3 and Java 17, following Clean Architecture and Domain-Driven Design. Implemented JWT-based authentication, HMAC-SHA256 request signing, and achieved 100% test pass rate.', technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'PCI DSS'], featured: true, githubUrl: 'https://github.com' },
        { title: 'NexHrm - Microservices HR Platform', description: 'A scalable HR software with a microservices architecture on AWS.', detailDescription: 'Decoupled architecture with Spring Boot for Payroll and Laravel for other HR modules. Deployed on AWS Elastic Beanstalk, RDS, and CloudFront with a React frontend.', technologies: ['AWS', 'Spring Boot', 'Laravel', 'React', 'Docker'], featured: false },
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
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-neutral-400 mb-4">{project.detailDescription}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
                                </div>
                                <div className="flex items-center gap-4">
                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><Github size={20} /><span>Code</span></a>}
                                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><ExternalLink size={20} /><span>Live</span></a>}
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
    return (
        <section id="contact" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Get In Touch</h2>
                     <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                    <p className="max-w-2xl mx-auto text-neutral-400 mt-6">Have a project in mind or just want to connect? Feel free to send me a message.</p>
                </motion.div>
                <motion.div className="max-w-xl mx-auto bg-neutral-900 p-8 rounded-lg border border-neutral-800" initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                    <form action="https://formspree.io/f/your_form_id" method="POST">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" placeholder="Your Name" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
                            <input type="email" name="email" placeholder="Your Email" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
                        </div>
                        <textarea name="message" placeholder="Your Message" rows={5} required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"></textarea>
                        <motion.button type="submit" className="w-full bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-neutral-200 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Send Message
                        </motion.button>
                    </form>
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

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import {
//   Brain, Code, Layers, Cloud, Database, Shield,
//   Home, User, Briefcase, FolderOpen, Mail, Menu, X,
//   Github, Linkedin, Download, ExternalLink
// } from 'lucide-react';
// import type { Variants } from 'framer-motion';
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import FrancisOlaImage from './assets/Francis-Ola.jpg';
// import FrancisOlaResume from './assets/Francis-Oladosu-Resume-20250910.pdf';

// // --- Reusable Interfaces ---
// interface Skill {
//   icon: React.ComponentType<{ size?: number; className?: string }>;
//   title: string;
//   description: string;
//   technologies: string[];
// }

// interface Experience {
//   period: string;
//   title: string;
//   company: string;
//   location: string;
//   description: string[];
//   technologies?: string[];
// }

// interface Project {
//   title: string;
//   description: string;
//   detailDescription: string;
//   technologies: string[];
//   liveUrl?: string;
//   githubUrl?: string;
//   featured: boolean;
// }


// // --- New: Magnetic Icon Component for Hover Effect ---
// const MagneticIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const [position, setPosition] = useState({ x: 0, y: 0 });

//     const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (ref.current) {
//             const { clientX, clientY } = e;
//             const { height, width, left, top } = ref.current.getBoundingClientRect();
//             const middleX = clientX - (left + width / 2);
//             const middleY = clientY - (top + height / 2);
//             setPosition({ x: middleX, y: middleY });
//         }
//     };

//     const reset = () => {
//         setPosition({ x: 0, y: 0 });
//     };

//     const { x, y } = position;
//     return (
//         <motion.div
//             ref={ref}
//             onMouseMove={handleMouse}
//             onMouseLeave={reset}
//             animate={{ x, y }}
//             transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
//             className="relative"
//         >
//             {children}
//         </motion.div>
//     );
// };


// // --- Header Component ---
// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');

//   const navigation = [
//     { name: 'Home', href: '#home', icon: Home },
//     { name: 'About', href: '#about', icon: User },
//     { name: 'Skills', href: '#skills', icon: Code },
//     { name: 'Experience', href: '#experience', icon: Briefcase },
//     { name: 'Projects', href: '#projects', icon: FolderOpen },
//     { name: 'Contact', href: '#contact', icon: Mail },
//   ];

//   useEffect(() => {
//     const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
//     const handleScroll = () => {
//       const current = sections.find(section => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
//         }
//         return false;
//       });
//       if (current) {
//         setActiveSection(current);
//       }
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (href: string) => {
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className="fixed left-0 top-0 h-full w-20 bg-neutral-950/80 backdrop-blur-md border-r border-neutral-800 z-50 hidden lg:flex flex-col items-center justify-center">
//         <div className="space-y-6">
//           {navigation.map((item) => {
//             const isActive = activeSection === item.href.substring(1);
//             return (
//               <div key={item.name} className="relative group">
//                 <motion.button
//                   onClick={() => scrollToSection(item.href)}
//                   className={`p-3 rounded-lg transition-all duration-300 relative ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <item.icon size={22} />
//                 </motion.button>
//                 <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                   <div className="bg-neutral-800 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap shadow-lg border border-neutral-700">
//                     {item.name}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </nav>
//       <header className="fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 z-50 lg:hidden p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <span className="text-xl font-bold text-white">F.O.</span>
//           <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
//             {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
//           </motion.button>
//         </div>
//       </header>
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-800 z-40 lg:hidden"
//           >
//             <div className="container mx-auto flex flex-col items-start p-4 space-y-2">
//               {navigation.map((item) => (
//                 <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-neutral-300 hover:text-white transition-colors duration-200 py-2 w-full text-left flex items-center gap-4">
//                   <item.icon size={20} />
//                   <span>{item.name}</span>
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // --- Hero Component (Updated with Particles and 3D Model) ---
// const Hero: React.FC = () => {
//     const scrollToContact = () => {
//         document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
//     };

//     const particlesInit = useCallback(async (engine: any) => {
//         await loadFull(engine);
//     }, []);

//     const particlesOptions = {
//         background: { color: { value: "#000000" } },
//         fpsLimit: 60,
//         interactivity: {
//             events: {
//                 onHover: { enable: true, mode: "repulse" },
//                 resize: true,
//             },
//             modes: {
//                 repulse: { distance: 100, duration: 0.4 },
//             },
//         },
//         particles: {
//             color: { value: "#ffffff" },
//             links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
//             collisions: { enable: true },
//             move: {
//                 direction: "none" as const,
//                 enable: true,
//                 outModes: { default: "bounce" as const },
//                 random: false,
//                 speed: 0.5,
//                 straight: false,
//             },
//             number: { density: { enable: true, width: 800, height: 800 }, value: 80 },
//             opacity: { value: 0.2 },
//             shape: { type: "circle" },
//             size: { value: { min: 1, max: 3 } },
//         },
//         detectRetina: true,
//     };


//     return (
//         <section id="home" className="min-h-screen flex items-center justify-center lg:ml-20 bg-black text-white relative overflow-hidden">
//           <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
//           <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center lg:text-left"
//               >
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
//             Francis Oladosu
//           </h1>
//           <h2 className="text-2xl md:text-3xl font-medium text-neutral-300 mb-8">
//             Senior Software Engineer
//           </h2>
//           <p className="text-lg text-neutral-400 mb-12 max-w-xl mx-auto lg:mx-0">
//             Crafting scalable, high-performance systems with a passion for AI-assisted development and modern cloud architectures.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//             <motion.button onClick={scrollToContact} className="bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-neutral-200 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               Let's Talk
//             </motion.button>
//             <motion.a href="/resume.pdf" download className="border border-neutral-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Download size={18} /> Resume
//             </motion.a>
//           </div>
//           <div className="flex justify-center lg:justify-start space-x-6 mt-12">
//             <MagneticIcon><a href="https://github.com/HorlaRepo" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors block p-2"><Github size={24} /></a></MagneticIcon>
//             <MagneticIcon><a href="https://linkedin.com/in/francis-oladosu" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors block p-2"><Linkedin size={24} /></a></MagneticIcon>
//             <MagneticIcon><a href="mailto:meetfran6@gmail.com" className="text-neutral-400 hover:text-white transition-colors block p-2"><Mail size={24} /></a></MagneticIcon>
//           </div>
//               </motion.div>
//               <motion.div
//           className="hidden lg:flex justify-center items-center h-96"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//               >
//           <div className="relative w-80 h-80 md:w-96 md:h-96">
//             <div className="absolute inset-0 rounded-full border-2 border-neutral-800 animate-pulse"></div>
//             <div className="absolute inset-2 rounded-full border-2 border-neutral-900"></div>
//             <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl">
//               <img src={FrancisOlaImage} alt="Francis Oladosu" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
//             </div>
//           </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//     );
// };


// // --- About Component ---
// const About: React.FC = () => {
//     const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
//     return (
//         <section id="about" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
//             <div className="container mx-auto px-4 lg:px-8">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//                     <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">About Me</h2>
//                     <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
//                 </motion.div>
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
//                     <motion.div className="lg:col-span-3 space-y-6 text-lg text-neutral-300 leading-relaxed" initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
//                         <p>As a Senior Software Engineer with over 7 years of experience, I specialize in building robust, scalable systems and leveraging AI to accelerate development cycles. My expertise lies in designing microservices architectures, particularly with Java/Spring Boot and modern cloud-native technologies.</p>
//                         <p>I thrive in collaborative environments, leading teams to deliver high-quality software solutions. Currently, as an Engineering Co-Founder at NexHrm, I'm architecting a cutting-edge SaaS platform from the ground up, focusing on performance, security, and scalability.</p>
//                         <p>I'm driven by a passion for solving complex problems and a commitment to continuous learning and improvement in the ever-evolving tech landscape.</p>
//                     </motion.div>
//                      <motion.div className="lg:col-span-2 grid grid-cols-2 gap-8 text-center" initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
//                         <div>
//                             <div className="text-5xl font-bold text-white mb-2">7+</div>
//                             <div className="text-sm text-neutral-400 uppercase tracking-wider">Years Experience</div>
//                         </div>
//                         <div>
//                             <div className="text-5xl font-bold text-white mb-2">20+</div>
//                             <div className="text-sm text-neutral-400 uppercase tracking-wider">Technologies</div>
//                         </div>
//                         <div>
//                             <div className="text-5xl font-bold text-white mb-2">100+</div>
//                             <div className="text-sm text-neutral-400 uppercase tracking-wider">Projects Delivered</div>
//                         </div>
//                         <div>
//                             <div className="text-5xl font-bold text-white mb-2">5+</div>
//                             <div className="text-sm text-neutral-400 uppercase tracking-wider">Cloud Platforms</div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// // --- Skills Component ---
// const Skills: React.FC = () => {
//     const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
//     const skills: Skill[] = [
//         { icon: Brain, title: 'AI-Assisted Development', description: 'Leveraging AI tools to enhance coding productivity and build scalable systems.', technologies: ['Claude AI', 'GitHub Copilot', 'GPT-4'] },
//         { icon: Code, title: 'Programming Languages', description: 'Proficient in multiple languages for diverse development needs.', technologies: ['Java', 'TypeScript', 'Python', 'Dart'] },
//         { icon: Layers, title: 'Frameworks & Libraries', description: 'Expert-level knowledge in modern frameworks for full-stack development.', technologies: ['Spring Boot', 'React', 'Angular', 'NextJS'] },
//         { icon: Cloud, title: 'Cloud & DevOps', description: 'Experienced in cloud platforms and modern DevOps practices.', technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes'] },
//         { icon: Database, title: 'Databases', description: 'Proficient in both SQL and NoSQL databases for optimal data management.', technologies: ['PostgreSQL', 'MongoDB', 'Firebase'] },
//         { icon: Shield, title: 'Security & Best Practices', description: 'Implementing robust security measures and following industry best practices.', technologies: ['OWASP', 'OAuth2', 'JWT', 'CORS'] },
//     ];
//     const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
//     const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

//     return (
//         <section id="skills" ref={ref} className="py-24 lg:ml-20 bg-black text-white">
//             <div className="container mx-auto px-4 lg:px-8">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//                     <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Technical Skills</h2>
//                     <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
//                 </motion.div>
//                 <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
//                     {skills.map((skill) => (
//                         <motion.div key={skill.title} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300" variants={cardVariants}>
//                             <div className="flex items-center gap-4 mb-4">
//                                 <skill.icon size={28} className="text-white" />
//                                 <h3 className="text-xl font-bold">{skill.title}</h3>
//                             </div>
//                             <p className="text-neutral-400 mb-6">{skill.description}</p>
//                             <div className="flex flex-wrap gap-2">
//                                 {skill.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// // --- Experience Component ---
// const Experience: React.FC = () => {
//   const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
//   const experiences: Experience[] = [
//     { period: '2023 – Present', title: 'Engineering Co-Founder', company: 'NexHrm', location: 'Lagos, Nigeria', description: ['Designed and led microservices-based architecture for a scalable SaaS HR platform using Spring Boot and Laravel.', 'Implemented inter-service communication via REST APIs, with centralized logging and API gateway.', 'Achieved 40% reduction in response time and 25% infrastructure cost savings.'], technologies: ['Spring Boot', 'Laravel', 'Docker', 'Kubernetes', 'AWS', 'Microservices'], },
//     { period: '05/2022 – 08/2023', title: 'Smart Contract Developer', company: 'Cryptika', location: 'Remote', description: ['Developed and optimized smart contracts for scalable blockchain applications, ensuring high security.', 'Collaborated with cross-functional teams to deliver robust DeFi protocols and token standards.'], technologies: ['Solidity', 'Smart Contracts', 'DeFi', 'EVM', 'Blockchain'], },
//     { period: '2019 – 2023', title: 'Freelance Software Engineer', company: 'Remote', location: 'Lagos, Nigeria', description: ['Delivered enterprise-grade solutions for clients in fintech, healthcare, and logistics.', 'Engineered scalable microservices-based systems using Java, Spring Boot, and PostgreSQL.', 'Utilized AI-assisted coding tools including Claude AI to accelerate development cycles.'], technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'GCP', 'Claude AI'], },
//   ];

//   return (
//     <section id="experience" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
//       <div className="container mx-auto px-4 lg:px-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Work Experience</h2>
//           <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
//         </motion.div>
//         <div className="relative max-w-3xl mx-auto">
//           <div className="absolute left-4 top-0 h-full w-0.5 bg-neutral-800" />
//           {experiences.map((exp, index) => (
//             <motion.div key={index} className="relative pl-12 pb-12" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.2 }}>
//               <div className="absolute left-4 top-1 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 border-4 border-neutral-950" />
//               <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
//                 <p className="text-sm text-neutral-400 mb-1">{exp.period}</p>
//                 <h3 className="text-xl font-bold text-white">{exp.title}</h3>
//                 <p className="text-md text-neutral-300 mb-3">{exp.company} &bull; {exp.location}</p>
//                 <ul className="list-disc list-inside space-y-2 text-neutral-400">
//                   {exp.description.map((item, i) => <li key={i}>{item}</li>)}
//                 </ul>
//                 {exp.technologies && (
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {exp.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full">{tech}</span>)}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Projects Component ---
// const Projects: React.FC = () => {
//     const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
//     const projects: Project[] = [
//         { title: 'AI-Driven SAAS B2B Recruitment Platform', description: 'A comprehensive, multi-tenant B2B recruitment system for NexHrm.', detailDescription: 'Leveraged a suite of AI tools to accelerate the development lifecycle. Utilized advanced models like GPT-4 for initial architectural planning, employed Claude 3 Sonnet for hands-on implementation, and used Claude 3 Opus to create comprehensive technical documentation.', technologies: ['Claude AI', 'Java', 'Spring Boot', 'Microservices', 'PostgreSQL'], featured: true, githubUrl: 'https://github.com' },
//         { title: 'Enterprise Payment Gateway Platform', description: 'A secure, scalable, and multi-currency payment gateway for enterprise transactions.', detailDescription: 'Designed a distributed system using Spring Boot 3 and Java 17, following Clean Architecture and Domain-Driven Design. Implemented JWT-based authentication, HMAC-SHA256 request signing, and achieved 100% test pass rate.', technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'PCI DSS'], featured: true, githubUrl: 'https://github.com' },
//         { title: 'NexHrm - Microservices HR Platform', description: 'A scalable HR software with a microservices architecture on AWS.', detailDescription: 'Decoupled architecture with Spring Boot for Payroll and Laravel for other HR modules. Deployed on AWS Elastic Beanstalk, RDS, and CloudFront with a React frontend.', technologies: ['AWS', 'Spring Boot', 'Laravel', 'React', 'Docker'], featured: false },
//         { title: 'Real-time Parcel Delivery App', description: 'Android application for real-time parcel tracking and delivery management.', detailDescription: 'Built with Kotlin and MVVM architecture, featuring offline-first functionality, real-time GPS tracking, and Firebase integration for notifications and analytics.', technologies: ['Kotlin', 'Android', 'MVVM', 'Firebase', 'Google Maps API'], featured: false },
//     ];
    
//     return (
//         <section id="projects" ref={ref} className="py-24 lg:ml-20 bg-black text-white">
//             <div className="container mx-auto px-4 lg:px-8">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//                     <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Featured Projects</h2>
//                      <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
//                 </motion.div>
//                 <div className="space-y-12">
//                     {projects.filter(p => p.featured).map((project, index) => (
//                         <motion.div key={project.title} className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden" initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.2 }}>
//                            <div className="p-8">
//                                 <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
//                                 <p className="text-neutral-400 mb-4">{project.detailDescription}</p>
//                                 <div className="flex flex-wrap gap-2 mb-6">
//                                     {project.technologies.map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><Github size={20} /><span>Code</span></a>}
//                                     {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 transition-colors flex items-center gap-2"><ExternalLink size={20} /><span>Live</span></a>}
//                                 </div>
//                            </div>
//                         </motion.div>
//                     ))}
//                 </div>
//                 <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
//                     <h3 className="text-3xl font-bold mb-8">Other Projects</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                          {projects.filter(p => !p.featured).map((project) => (
//                             <div key={project.title} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 text-left">
//                                 <h4 className="text-xl font-bold mb-2">{project.title}</h4>
//                                 <p className="text-neutral-400 mb-4 text-sm">{project.description}</p>
//                                 <div className="flex flex-wrap gap-2">
//                                      {project.technologies.slice(0, 4).map(tech => <span key={tech} className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full">{tech}</span>)}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };


// // --- Contact Component ---
// const Contact: React.FC = () => {
//     const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
//     return (
//         <section id="contact" ref={ref} className="py-24 lg:ml-20 bg-neutral-950 text-white">
//             <div className="container mx-auto px-4 lg:px-8">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//                     <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Get In Touch</h2>
//                      <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-full"></div>
//                     <p className="max-w-2xl mx-auto text-neutral-400 mt-6">Have a project in mind or just want to connect? Feel free to send me a message.</p>
//                 </motion.div>
//                 <motion.div className="max-w-xl mx-auto bg-neutral-900 p-8 rounded-lg border border-neutral-800" initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
//                     <form action="https://formspree.io/f/your_form_id" method="POST">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                             <input type="text" name="name" placeholder="Your Name" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
//                             <input type="email" name="email" placeholder="Your Email" required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"/>
//                         </div>
//                         <textarea name="message" placeholder="Your Message" rows={5} required className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"></textarea>
//                         <motion.button type="submit" className="w-full bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-neutral-200 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                             Send Message
//                         </motion.button>
//                     </form>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// // --- Footer Component ---
// const Footer: React.FC = () => (
//     <footer className="lg:ml-20 bg-black text-neutral-500 py-8 px-4 text-center">
//         <p>&copy; {new Date().getFullYear()} Francis Oladosu. All Rights Reserved.</p>
//     </footer>
// );


// // --- Main App Component ---
// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
//         <div className="loading-spinner"></div>
//         <h2 className="text-2xl font-bold mt-4">Francis Oladosu</h2>
//         <p className="text-neutral-400">Loading Portfolio...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white">
//       <Header />
//       <main className="lg:pl-20">
//         <Hero />
//         <About />
//         <Skills />
//         <Experience />
//         <Projects />
//         <Contact />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;

