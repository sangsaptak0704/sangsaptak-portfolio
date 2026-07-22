import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import profileImg from './assets/profile.jpg'
import sdLogoImg from './assets/sd-logo.png'
import { RobotCanvas } from './components/ui/robot-hero'
import AnimatedShaderBackground from './components/ui/animated-shader-background'
import HologramAvatarCanvas from './components/ui/hologram-avatar'
import './App.css'

const HERO_ROLES = [
  "AI & ML Student",
  "Software Developer",
  "Backend Enthusiast",
  "Problem Solver",
  "Continuous Learner"
];

// Centralized portfolio data config for easy customization
const PORTFOLIO_DATA = {
  name: 'Sangsaptak Das',
  logoName: 'sangsaptak.dev',
  role: 'B.Tech CSE (AI & ML) Student | Aspiring Software Developer',
  tag: '👋 Welcome to my portfolio',
  bio: 'I build clean, functional, and intelligent software solutions. Passionate about Artificial Intelligence, Machine Learning, and full-stack development, I love turning ideas into real, working products.',
  resumeUrl: '#',
  about: {
    paragraphs: [
      "I am a detail-oriented Computer Science & Engineering student at Brainware University, specialising in Artificial Intelligence and Machine Learning. Based in Kolkata, I am passionate about bridging the gap between robust software architecture and intelligent system design.",
      "With a strong foundation in Python, Java, C/C++, and scalable backend databases, I focus on building stable applications. My technical toolkit is complemented by a creative background in singing and also drawing."
    ],
    objective: {
      title: 'Career Objective',
      text: 'To secure a challenging role as a software developer where I can apply my technical skills, contribute to meaningful projects, and grow as a professional in a collaborative, innovation-driven environment.'
    },
    education: {
      degree: 'B.Tech in Computer Science (AI & ML)',
      institution: 'Undergraduate Program',
      details: 'Currently pursuing my undergraduate degree, focusing on core CS fundamentals along with specialized coursework in Artificial Intelligence and Machine Learning.'
    },
    focusAreas: [
      'Software Development',
      'Machine Learning',
      'Web Technologies',
      'Backend Systems'
    ]
  },
  techStack: {
    languages: [
      { name: 'Python', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'JavaScript', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Java', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'C', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'C++', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'HTML5', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'Kotlin', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' }
    ],
    frameworks: [
      { name: 'React', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', style: { filter: 'invert(1)' } },
      { name: 'Node.js', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'FastAPI', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Flutter', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: 'Tailwind CSS', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' }
    ],
    databases: [
      { name: 'MongoDB', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Supabase', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' }
    ],
    devops: [
      { name: 'AWS', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', style: { filter: 'invert(1)' } },
      { name: 'Google Cloud', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Git', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', style: { filter: 'invert(1)' } },
      { name: 'Figma', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'Blender', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
      { name: 'Vercel', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', style: { filter: 'invert(1)' } },
      { name: 'Netlify', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg' }
    ],
    aiTools: [
      { name: 'Copilot', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/githubcopilot.svg', style: { filter: 'invert(1)' } },
      { name: 'ChatGPT', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', style: { filter: 'invert(53%) sepia(87%) saturate(415%) hue-rotate(117deg) brightness(91%) contrast(89%)' } },
      { name: 'Cursor', logoUrl: 'cursor-inline' },
      { name: 'Claude', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg', style: { filter: 'invert(61%) sepia(48%) saturate(541%) hue-rotate(325deg) brightness(91%) contrast(90%)' } },
      { name: 'Midjourney', logoUrl: 'midjourney-inline' },
      { name: 'Gemini', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlegemini.svg', style: { filter: 'invert(79%) sepia(16%) saturate(1682%) hue-rotate(196deg) brightness(101%) contrast(97%)' } },
      { name: 'Ollama', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg', style: { filter: 'invert(1)' } },
      { name: 'Hugging Face', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg', style: { filter: 'invert(80%) sepia(74%) saturate(767%) hue-rotate(338deg) brightness(103%) contrast(100%)' } }
    ],
    mlPills: [
      { name: 'PANDAS', className: 'pill-purple' },
      { name: 'NUMPY', className: 'pill-teal' },
      { name: 'MATPLOTLIB', className: 'pill-blue' },
      { name: 'SCIKIT-LEARN', className: 'pill-orange' },
      { name: 'PLOTLY', className: 'pill-gray' }
    ]
  },
  projects: [
    {
      title: 'AI-Powered Chatbot',
      description: 'An intelligent chatbot built using machine learning techniques to understand and respond to user queries in natural language.',
      tags: ['Python', 'Machine Learning', 'FastAPI'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Full-Stack Task Manager',
      description: 'A responsive task management web app with user authentication, real-time updates, and a clean, intuitive interface.',
      tags: ['React', 'Node.js', 'MongoDB'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Student Result Management System',
      description: 'A database-driven system to manage and analyze student academic records with a secure and structured backend.',
      tags: ['Java', 'MySQL', 'HTML/CSS'],
      github: '#',
      demo: '#'
    }
  ],
  internships: [
    {
      role: 'Looking for Internships',
      company: 'Brainware University CSE Specialization',
      period: 'Present',
      description: 'Actively searching for Software Engineering, Full-Stack Web Development, or Machine Learning intern positions to apply CSE (AI & ML) fundamentals.'
    },
    {
      role: 'Self-Directed Projects Developer',
      company: 'Independent Coding & Research',
      period: '2024 - Present',
      description: 'Building and shipping fully-functional web tools, AI-powered systems, and database management backends.'
    }
  ],
  publications: [
    {
      title: 'Comparative Analysis of ML Classification Algorithms',
      journal: 'Academic CSE Research (Seminar Project)',
      year: '2025',
      description: 'Evaluated SVM, Decision Trees, and Neural Network classification models on accuracy and resource usage profiles.',
      link: '#'
    }
  ],
  certificates: [
    { name: 'Machine Learning Foundations', issuer: 'DeepLearning.AI', date: '2025' },
    { name: 'React Developer Professional Certificate', issuer: 'Meta', date: '2024' },
    { name: 'Python for Data Science & ML', issuer: 'Coursera / IBM', date: '2024' }
  ],
  avocation: [
    { title: 'Abstract Sketch', type: 'Drawing Art', icon: 'Paintbrush' },
    { title: 'Kolkata Sunset', type: 'Photography', icon: 'Camera' },
    { title: 'Acoustic Performance', type: 'Vocal Performance', icon: 'Music' }
  ],
  services: [
    {
      title: 'Full-Stack Web Apps',
      description: 'Designing highly responsive React interfaces integrated with robust Node.js, Express, or FastAPI endpoints.',
      iconName: 'Laptop'
    },
    {
      title: 'Intelligent AI Solutions',
      description: 'Training, fine-tuning, and deploying Machine Learning and NLP classification models inside production backends.',
      iconName: 'Cpu'
    },
    {
      title: 'Database Architecture',
      description: 'Creating structured relational MySQL databases and scalable non-relational MongoDB storage structures.',
      iconName: 'Database'
    }
  ],
  contact: {
    email: 'sangsaptak.das@example.com',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/sangsaptak-das',
    github: 'github.com/sangsaptak-das'
  }
}

// Helper component to render Lucide icons dynamically from config strings
const DynamicIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

// Helper component to render tech stack logos, supporting inline SVGs for unreliable assets
const TechLogo = ({ tech }) => {
  if (tech.logoUrl === 'cursor-inline') {
    return (
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#0078d4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="tech-logo-img">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" fill="#0078d4" />
      </svg>
    );
  }
  
  if (tech.logoUrl === 'midjourney-inline') {
    return (
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tech-logo-img">
        <path d="M12 2v16" />
        <path d="M12 2c0 0 7 4 7 10s-7 6-7 6" />
        <path d="M12 2c0 0-7 4-7 10s7 6-7 6" />
        <path d="M3 20c0 0 3 2 9 2s9-2 9-2" />
      </svg>
    );
  }

  return <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />;
}

// Helper to map programming language to custom badge color
const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    TypeScript: '#3178c6',
    C: '#555555',
    'C++': '#f34b7d',
    Shell: '#89e051',
    Vue: '#41b883',
    Jupyter: '#DA5B0B'
  };
  return colors[lang] || '#a855f7';
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const [introActive, setIntroActive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Live GitHub Repositories State
  const [gitHubRepos, setGitHubRepos] = useState([]);
  const [gitHubUser, setGitHubUser] = useState(null);
  const [reposLoading, setReposLoading] = useState(true);

  // About Section Hologram Glass Card Mouse 3D Tilt State
  const [aboutTilt, setAboutTilt] = useState({ x: 0, y: 0 });
  const handleAboutCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    setAboutTilt({ x: rotateX, y: rotateY });
  };
  const handleAboutCardMouseLeave = () => {
    setAboutTilt({ x: 0, y: 0 });
  };

  // Aivox Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi, I'm Aivox, Sangsaptak's AI assistant. Ask me anything about his skills, education, projects, or creative background!", sender: "ai" }
  ]);
  const chatEndRef = useRef(null);

  // Live fetch repositories from GitHub REST API
  useEffect(() => {
    let mounted = true;
    const fetchGitHubData = async () => {
      try {
        setReposLoading(true);
        const [reposRes, userRes] = await Promise.all([
          fetch('https://api.github.com/users/sangsaptak0704/repos?sort=updated&per_page=12'),
          fetch('https://api.github.com/users/sangsaptak0704')
        ]);

        if (reposRes.ok && userRes.ok) {
          const reposData = await reposRes.json();
          const userData = await userRes.json();
          
          if (mounted) {
            // Sort by latest pushed_at date
            const sorted = reposData.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
            setGitHubRepos(sorted);
            setGitHubUser(userData);
            setReposLoading(false);
          }
        } else {
          throw new Error('GitHub API response non-ok');
        }
      } catch (err) {
        console.warn('GitHub live fetch fallback to local projects:', err);
        if (mounted) {
          setReposLoading(false);
        }
      }
    };

    fetchGitHubData();
    return () => { mounted = false; };
  }, []);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 2800);
    return () => clearInterval(roleTimer);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatOpen]);

  // Handle intro splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const endTimer = setTimeout(() => {
        setIntroActive(false);
      }, 800); // Wait for fade-out CSS transition
      return () => clearTimeout(endTimer);
    }, 2200); // Display intro for 2.2s

    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll during intro splash screen
  useEffect(() => {
    if (introActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [introActive]);

  // Monitor scroll for styling navbar and highlighting active links
  useEffect(() => {
    const handleScroll = () => {
      // Navbar bg transformation
      setIsScrolled(window.scrollY > 50);

      // Section tracker
      const sections = ['home', 'about', 'work', 'internship', 'publications', 'certificates', 'avocation', 'services', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is within upper half of the viewport
          if (rect.top <= window.innerHeight * 0.3) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility to handle clipboard copy & alert toast
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ message: `${label} copied to clipboard!`, id: Date.now() });
      setTimeout(() => setToast(null), 3000);
    });
  }

  // Interactive AI Assistant responses
  const askAI = (query) => {
    if (chatMessages[chatMessages.length - 1].sender === 'user' && chatMessages[chatMessages.length - 1].text === query) {
      return; // prevent duplicate clicks
    }
    const userMsg = { text: query, sender: 'user' };
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = "";
      const q = query.toLowerCase();

      if (q.includes("skill")) {
        reply = "Sangsaptak's technical toolkit includes Python, Java, C, HTML/CSS, JavaScript, React, Node.js, FastAPI, MongoDB, MySQL, Git, and GitHub!";
      } else if (q.includes("project") || q.includes("work")) {
        reply = "Some of his featured projects are: 1) AI-Powered Chatbot (FastAPI), 2) Full-Stack Task Manager (MERN stack), and 3) Student Result Management System (Java/MySQL).";
      } else if (q.includes("stud") || q.includes("education") || q.includes("where")) {
        reply = "He is pursuing a B.Tech in Computer Science and Engineering (specializing in AI & ML) at Brainware University, based in Kolkata.";
      } else if (q.includes("hobby") || q.includes("sing") || q.includes("draw")) {
        reply = "Sangsaptak is a creative developer! Along with programming, he is passionate about singing and drawing.";
      } else {
        reply = "I can tell you all about Sangsaptak's credentials! Feel free to click any of the suggestion buttons.";
      }

      setChatMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
    }, 600);
  }

  return (
    <>
      {/* Intro Splash Screen */}
      {introActive && (
        <div className={`intro-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="intro-content-wrapper">
            <p className="intro-line-1">WELCOME TO</p>
            <h1 className="intro-line-2">SANGSAPTAK'S PORTFOLIO</h1>
          </div>
        </div>
      )}

      {/* Navigation Bar - Apple x Vercel Inspired Luxury Floating Glass */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`luxury-header ${isScrolled ? 'scrolled' : ''}`}
      >
        <nav className="luxury-navbar">
          {/* Left Brand Area */}
          <div className="navbar-logo-container">
            <img src={sdLogoImg} alt="SD Logo" className="navbar-logo-img" />
            <span className="navbar-brand-name">{PORTFOLIO_DATA.logoName}</span>
            <span className="navbar-status-dot" title="Available for opportunities"></span>
          </div>

          {/* Center Navigation Links Floating Glass Pill */}
          <div className="luxury-nav-pill-container">
            <ul className="luxury-nav-links">
              <li>
                <a href="#home" className={`luxury-nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                  Home
                  {activeSection === 'home' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#about" className={`luxury-nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                  About
                  {activeSection === 'about' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#skills" className={`luxury-nav-link ${activeSection === 'skills' ? 'active' : ''}`}>
                  Skills
                  {activeSection === 'skills' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#work" className={`luxury-nav-link ${activeSection === 'work' ? 'active' : ''}`}>
                  Projects
                  {activeSection === 'work' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#internship" className={`luxury-nav-link ${activeSection === 'internship' ? 'active' : ''}`}>
                  Experience
                  {activeSection === 'internship' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#publications" className={`luxury-nav-link ${activeSection === 'publications' || activeSection === 'certificates' ? 'active' : ''}`}>
                  Achievements
                  {(activeSection === 'publications' || activeSection === 'certificates') && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href="#contact" className={`luxury-nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                  Contact
                  {activeSection === 'contact' && <span className="active-accent-dot" />}
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_DATA.resumeUrl} className="luxury-nav-link resume-nav-link" download>
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Right Action Button - Ask AI */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`navbar-ask-ai-btn ${chatOpen ? 'active' : ''}`} 
            onClick={() => setChatOpen(!chatOpen)}
            title="Chat with AI Assistant"
          >
            <span className="ask-ai-purple-orb"></span>
            <span className="ask-ai-text">Ask AI</span>
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section - Upgraded Two-Column Layout */}
      <section className="hero" id="home">
        {/* Animated WebGL Shader Background */}
        <AnimatedShaderBackground className="hero-shader-bg" />
        <div className="hero-shader-overlay" />
        
        {/* Cinematic Light Streaks & Star Dust */}
        <div className="hero-light-streak-1" />
        <div className="hero-light-streak-2" />
        <div className="hero-star-particles" />

        <div className="hero-container hero-two-column">
          {/* Left Column: Text & Buttons */}
          <div className="hero-left-content">
            <div className="hero-text-radial-glow" />
            
            {/* Top Compact Glass Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-tag"
            >
              <span>🚀 Building Intelligent Software</span>
            </motion.div>

            {/* Section Label */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-tech-label"
            >
              &lt; AI &amp; SOFTWARE DEVELOPER /&gt;
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hero-heading"
            >
              <span className="hero-greeting">Hi, I'm</span>
              <span className="hero-name-gradient">{PORTFOLIO_DATA.name}</span>
            </motion.h1>

            {/* Rotating Professional Role */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="hero-role-container"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="hero-role-rotating-text"
                >
                  {HERO_ROLES[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hero-description"
            >
              I build modern, scalable software powered by Artificial Intelligence and clean engineering principles. Currently pursuing Computer Science with a specialization in AI &amp; Machine Learning while continuously learning and building impactful real-world projects.
            </motion.p>

            {/* Status Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="hero-stat-cards"
            >
              <motion.span whileHover={{ y: -2 }} className="hero-stat-pill">9.6 CGPA</motion.span>
              <motion.span whileHover={{ y: -2 }} className="hero-stat-pill">2028 Graduate</motion.span>
              <motion.span whileHover={{ y: -2 }} className="hero-stat-pill">Python • Java • C</motion.span>
              <motion.span whileHover={{ y: -2 }} className="hero-stat-pill">AI &amp; ML</motion.span>
              <motion.span whileHover={{ y: -2 }} className="hero-stat-pill highlight-pill">Open to Internships</motion.span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="hero-buttons"
            >
              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                href={PORTFOLIO_DATA.resumeUrl} 
                className="btn btn-primary hero-btn-cv"
                download
              >
                <DynamicIcon name="Download" size={18} />
                Download CV
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                href="#contact" 
                className="btn btn-outline hero-btn-contact"
              >
                <span className="contact-btn-glow-border" />
                Contact Me
              </motion.a>
            </motion.div>

            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="hero-bottom-info"
            >
              <span className="info-item">📍 Kolkata, India</span>
              <span className="info-item-dot">•</span>
              <span className="info-item status-available">🟢 Available for Internship</span>
            </motion.div>
          </div>

          {/* Right Column: Floating 3D Robot with AI Energy Platform Underneath */}
          <div className="hero-right-robot">
            {/* Soft cyan & purple glow BEHIND the robot (NOT enclosing) */}
            <div className="hero-robot-soft-backglow" />

            {/* Main 3D Robot */}
            <RobotCanvas className="hero-robot-canvas" />

            {/* Futuristic AI Energy Platform UNDERNEATH the robot */}
            <div className="ai-energy-platform">
              <div className="platform-hex-base" />
              <div className="platform-energy-core" />
              <div className="platform-light-strip-1" />
              <div className="platform-light-strip-2" />
              
              {/* Thin vertical holographic projection lines rising upward */}
              <div className="holo-projection-lines">
                <span className="holo-line holo-line-1" />
                <span className="holo-line holo-line-2" />
                <span className="holo-line holo-line-3" />
                <span className="holo-line holo-line-4" />
                <span className="holo-line holo-line-5" />
              </div>
              
              {/* Floating energy particles around the base */}
              <div className="platform-particles">
                <span className="p-particle p1" />
                <span className="p-particle p2" />
                <span className="p-particle p3" />
                <span className="p-particle p4" />
                <span className="p-particle p5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Upgraded Futuristic Hologram Glassmorphism */}
      <section id="about" className="about-futuristic-section">
        {/* Soft Gradients & Blurred Glowing Orbs Background */}
        <div className="about-orb about-orb-cyan" />
        <div className="about-orb about-orb-blue" />
        <div className="about-orb about-orb-purple" />
        <div className="about-cyber-grid" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-header-wrapper"
          >
            <div className="about-futuristic-badge">
              <span className="live-status-dot"></span>
              <span>BIOGRAPHY & CREDENTIALS</span>
            </div>
            <h2 className="section-title">About <span className="accent-text">Me</span></h2>
            <p className="section-subtitle">A little more about who I am, my academic path, and technical focus</p>
          </motion.div>

          {/* 3D Tilt Floating Hologram Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hologram-glass-card"
            onMouseMove={handleAboutCardMouseMove}
            onMouseLeave={handleAboutCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${aboutTilt.x}deg) rotateY(${aboutTilt.y}deg)`,
              transition: aboutTilt.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
            }}
          >
            <div className="hologram-card-glow-border" />
            
            <div className="about-main-layout">
              {/* Left Side: 3D Hologram Avatar Canvas */}
              <div className="about-image-side">
                <div className="hologram-avatar-container">
                  <div className="hologram-avatar-glow-ring" />
                  <HologramAvatarCanvas className="about-hologram-canvas" />
                  <div className="hologram-status-pill">
                    <span className="hologram-pulse-dot" />
                    <span>3D HOLOGRAM AVATAR</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Luxury Typography & Text Presentation */}
              <div className="about-content-side">
                <div className="luxury-text-badge">
                  <span className="badge-sparkle">✦</span>
                  <span>WHO I AM & WHAT I BUILD</span>
                  <span className="badge-glow-dot"></span>
                </div>
                <h3 className="about-title-luxury">
                  Architecting Intelligent <span className="text-shimmer-accent">Software & AI</span> Systems
                </h3>

                <div className="luxury-glass-text-panel">
                  <div className="luxury-left-accent-line"></div>
                  <div className="text-area-ambient-glow"></div>
                  
                  <div className="luxury-text-wrapper">
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="luxury-paragraph"
                    >
                      I am a detail-oriented <span className="shimmer-keyword">Computer Science & Engineering</span> student at <span className="shimmer-keyword">Brainware University</span>, specialising in <span className="shimmer-keyword">Artificial Intelligence & Machine Learning</span>.
                    </motion.p>

                    <div className="luxury-text-divider">
                      <span className="divider-line"></span>
                      <span className="divider-diamond">◈</span>
                      <span className="divider-line"></span>
                    </div>

                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      viewport={{ once: true }}
                      className="luxury-paragraph"
                    >
                      Based in <span className="shimmer-keyword">Kolkata</span>, I am passionate about bridging the gap between robust software architecture and intelligent system design.
                    </motion.p>

                    <div className="luxury-text-divider">
                      <span className="divider-line"></span>
                      <span className="divider-diamond">◈</span>
                      <span className="divider-line"></span>
                    </div>

                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="luxury-paragraph"
                    >
                      With a strong foundation in <span className="shimmer-keyword">Python, Java, C/C++</span>, and scalable backend databases, I focus on building stable applications. My technical toolkit is complemented by a creative background in <span className="shimmer-keyword">singing & drawing</span>.
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detail Boxes Grid with Staggered Entrance */}
          <div className="about-details-grid">
            {/* Objective */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="about-box hologram-box"
            >
              <h3>
                <DynamicIcon name="Target" size={20} />
                {PORTFOLIO_DATA.about.objective.title}
              </h3>
              <p>{PORTFOLIO_DATA.about.objective.text}</p>
            </motion.div>

            {/* Education */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="about-box hologram-box"
            >
              <h3>
                <DynamicIcon name="GraduationCap" size={20} />
                Education
              </h3>
              <p className="edu-degree">{PORTFOLIO_DATA.about.education.degree}</p>
              <div className="edu-meta">{PORTFOLIO_DATA.about.education.institution}</div>
              <p>{PORTFOLIO_DATA.about.education.details}</p>
            </motion.div>

            {/* Focus Areas */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="about-box hologram-box"
            >
              <h3>
                <DynamicIcon name="Briefcase" size={20} />
                Focus Areas
              </h3>
              <div className="focus-tags">
                {PORTFOLIO_DATA.about.focusAreas.map((area, idx) => (
                  <span key={idx} className="focus-tag">{area}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="skills" className="tech-stack-section">
        <div className="container">
          <div className="tech-stack-header">
            <div className="hero-tag">
              <DynamicIcon name="Sparkles" size={16} />
              <span>✦ WHAT I WORK WITH ✦</span>
            </div>
            <h2 className="section-title">Technology <span className="accent-text">Stack</span></h2>
            <p className="section-subtitle">
              A curated list of languages, frameworks, and tools I use to build scalable, high-performance digital solutions.
            </p>
          </div>

          {/* Languages Category */}
          <div className="tech-category">
            <h3 className="category-title">
              <span className="category-title-bar"></span>
              <DynamicIcon name="MessageSquare" size={22} className="category-icon" />
              <span>LANGUAGES</span>
            </h3>
            <div className="tech-grid">
              {PORTFOLIO_DATA.techStack.languages.map((tech, idx) => (
                <div key={idx} className="tech-card" title={tech.name}>
                  <div className="tech-card-inner">
                    <div className="tech-card-front">
                      <TechLogo tech={tech} />
                    </div>
                    <div className="tech-card-back">
                      <span>{tech.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries Category */}
          <div className="tech-category">
            <h3 className="category-title">
              <span className="category-title-bar"></span>
              <DynamicIcon name="Hammer" size={22} className="category-icon" />
              <span>FRAMEWORKS & LIBRARIES</span>
            </h3>
            <div className="tech-grid">
              {PORTFOLIO_DATA.techStack.frameworks.map((tech, idx) => (
                <div key={idx} className="tech-card" title={tech.name}>
                  <div className="tech-card-inner">
                    <div className="tech-card-front">
                      <TechLogo tech={tech} />
                    </div>
                    <div className="tech-card-back">
                      <span>{tech.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Science / ML Pills */}
            <div className="ml-pills-container">
              {PORTFOLIO_DATA.techStack.mlPills.map((pill, idx) => (
                <span key={idx} className={`ml-pill ${pill.className}`}>
                  <span className="ml-pill-indicator">||</span>
                  {pill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Databases Category */}
          <div className="tech-category">
            <h3 className="category-title">
              <span className="category-title-bar green-bar"></span>
              <DynamicIcon name="Database" size={22} className="category-icon" />
              <span>DATABASES</span>
            </h3>
            <div className="tech-grid">
              {PORTFOLIO_DATA.techStack.databases.map((tech, idx) => (
                <div key={idx} className="tech-card" title={tech.name}>
                  <div className="tech-card-inner">
                    <div className="tech-card-front">
                      <TechLogo tech={tech} />
                    </div>
                    <div className="tech-card-back">
                      <span>{tech.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud & DevOps Category */}
          <div className="tech-category">
            <h3 className="category-title">
              <span className="category-title-bar red-bar"></span>
              <DynamicIcon name="Rocket" size={22} className="category-icon" />
              <span>CLOUD & DEVOPS</span>
            </h3>
            <div className="tech-grid">
              {PORTFOLIO_DATA.techStack.devops.map((tech, idx) => (
                <div key={idx} className="tech-card" title={tech.name}>
                  <div className="tech-card-inner">
                    <div className="tech-card-front">
                      <TechLogo tech={tech} />
                    </div>
                    <div className="tech-card-back">
                      <span>{tech.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools Use Category */}
          <div className="tech-category">
            <h3 className="category-title">
              <span className="category-title-bar blue-bar"></span>
              <DynamicIcon name="Sparkles" size={22} className="category-icon" />
              <span>AI TOOLS USE</span>
            </h3>
            <div className="tech-grid">
              {PORTFOLIO_DATA.techStack.aiTools.map((tech, idx) => (
                <div key={idx} className="tech-card" title={tech.name}>
                  <div className="tech-card-inner">
                    <div className="tech-card-front">
                      <TechLogo tech={tech} />
                    </div>
                    <div className="tech-card-back">
                      <span>{tech.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work (Projects) Section - Upgraded with Live GitHub API Integration */}
      <section id="work">
        <div className="container">
          <div className="work-header-badge">
            <span className="live-status-dot"></span>
            <span>LIVE GITHUB SYNC</span>
          </div>
          <h2 className="section-title">Featured <span className="accent-text">Projects & Repos</span></h2>
          <p className="section-subtitle">Real-time open-source repositories and software tools fetched live from my GitHub profile</p>

          {gitHubUser && (
            <div className="github-stats-bar">
              <div className="github-stat-item">
                <DynamicIcon name="FolderGit2" size={18} />
                <span><strong>{gitHubUser.public_repos}</strong> Public Repositories</span>
              </div>
              <div className="github-stat-item">
                <DynamicIcon name="Users" size={18} />
                <span><strong>{gitHubUser.followers}</strong> Followers</span>
              </div>
              <div className="github-stat-item">
                <DynamicIcon name="Github" size={18} />
                <a href={gitHubUser.html_url} target="_blank" rel="noopener noreferrer">@{gitHubUser.login}</a>
              </div>
            </div>
          )}

          {reposLoading ? (
            <div className="projects-grid">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="project-card skeleton-card">
                  <div className="skeleton-line skeleton-title"></div>
                  <div className="skeleton-line skeleton-text"></div>
                  <div className="skeleton-line skeleton-text short"></div>
                  <div className="skeleton-line skeleton-pill"></div>
                </div>
              ))}
            </div>
          ) : gitHubRepos.length > 0 ? (
            <div className="projects-grid">
              {gitHubRepos.map((repo) => (
                <div key={repo.id} className="project-card repo-card">
                  <div className="repo-card-header">
                    <DynamicIcon name="Folder" size={20} className="repo-icon" />
                    <h3>{repo.name}</h3>
                  </div>
                  <p className="repo-description">
                    {repo.description || "Open-source developer repository created by Sangsaptak Das."}
                  </p>
                  
                  <div className="repo-meta-row">
                    {repo.language && (
                      <span className="repo-lang-pill">
                        <span 
                          className="lang-dot" 
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="repo-stat-badge" title="Stars">
                        <DynamicIcon name="Star" size={14} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="repo-stat-badge" title="Forks">
                        <DynamicIcon name="GitFork" size={14} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>

                  <div className="project-buttons">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-small"
                    >
                      <DynamicIcon name="Github" size={16} />
                      View Code
                    </a>
                    {repo.homepage ? (
                      <a 
                        href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-small"
                      >
                        <DynamicIcon name="ExternalLink" size={16} />
                        Live Demo
                      </a>
                    ) : (
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-small"
                      >
                        <DynamicIcon name="FolderGit2" size={16} />
                        Repo Details
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="projects-grid">
              {PORTFOLIO_DATA.projects.map((project, idx) => (
                <div key={idx} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    <a 
                      href={project.github} 
                      className="btn btn-outline btn-small"
                    >
                      <DynamicIcon name="Github" size={16} />
                      GitHub
                    </a>
                    <a 
                      href={project.demo} 
                      className="btn btn-primary btn-small"
                    >
                      <DynamicIcon name="ExternalLink" size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all-github-container">
            <a 
              href="https://github.com/sangsaptak0704" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline view-all-btn"
            >
              <DynamicIcon name="Github" size={18} />
              View All Repositories on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship">
        <div className="container">
          <h2 className="section-title">Internships</h2>
          <p className="section-subtitle">Practical workspace and organizational experiences</p>

          <div className="about-details-grid">
            {PORTFOLIO_DATA.internships.map((intern, idx) => (
              <div key={idx} className="about-box">
                <span className="focus-tag" style={{ float: 'right' }}>{intern.period}</span>
                <h3>
                  <DynamicIcon name="Briefcase" size={20} />
                  {intern.role}
                </h3>
                <p className="edu-degree" style={{ color: 'var(--accent-glow)' }}>{intern.company}</p>
                <p style={{ marginTop: '10px' }}>{intern.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications">
        <div className="container">
          <h2 className="section-title">Publications</h2>
          <p className="section-subtitle">Academic research papers, case studies, and seminars</p>

          <div className="projects-grid">
            {PORTFOLIO_DATA.publications.map((pub, idx) => (
              <div key={idx} className="project-card">
                <span className="focus-tag" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>{pub.year}</span>
                <h3>{pub.title}</h3>
                <p className="edu-meta" style={{ marginBottom: '8px' }}>{pub.journal}</p>
                <p>{pub.description}</p>
                <div className="project-buttons" style={{ marginTop: 'auto' }}>
                  <a href={pub.link} className="btn btn-primary btn-small">
                    <DynamicIcon name="ExternalLink" size={16} />
                    Read Publication
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates">
        <div className="container">
          <h2 className="section-title">Certificates</h2>
          <p className="section-subtitle">Credentials and professional course certifications</p>

          <div className="about-details-grid">
            {PORTFOLIO_DATA.certificates.map((cert, idx) => (
              <div key={idx} className="about-box">
                <span className="focus-tag" style={{ float: 'right' }}>{cert.date}</span>
                <h3>
                  <DynamicIcon name="Award" size={20} />
                  {cert.name}
                </h3>
                <p className="edu-degree" style={{ color: 'var(--accent-glow)', marginTop: '8px' }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avocations Section */}
      <section id="avocation">
        <div className="container">
          <h2 className="section-title">Avocation</h2>
          <p className="section-subtitle">Showcase of creative drawing sketches, performance vocal covers, and photography frames</p>

          <div className="projects-grid">
            {PORTFOLIO_DATA.avocation.map((item, idx) => (
              <div key={idx} className="project-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <div style={{ background: 'var(--accent-soft)', padding: '24px', borderRadius: '50%', marginBottom: '16px', display: 'inline-flex' }}>
                  <DynamicIcon name={item.icon} size={36} className="accent-text" />
                </div>
                <h3>{item.title}</h3>
                <span className="focus-tag">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">Areas where I can contribute and collaborate on projects</p>

          <div className="projects-grid">
            {PORTFOLIO_DATA.services.map((srv, idx) => (
              <div key={idx} className="project-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <DynamicIcon name={srv.iconName} size={28} className="accent-text" />
                  <h3 style={{ margin: 0 }}>{srv.title}</h3>
                </div>
                <p>{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Let's connect and build something great together</p>

          <div className="contact-grid">
            {/* Email Card */}
            <div 
              className="contact-card"
              onClick={() => handleCopy(PORTFOLIO_DATA.contact.email, 'Email')}
            >
              <div className="contact-icon">
                <DynamicIcon name="Mail" size={32} />
              </div>
              <h4>Email</h4>
              <p>{PORTFOLIO_DATA.contact.email}</p>
              <span className="contact-hint">Click to copy</span>
            </div>

            {/* Phone Card */}
            <div 
              className="contact-card"
              onClick={() => handleCopy(PORTFOLIO_DATA.contact.phone, 'Phone number')}
            >
              <div className="contact-icon">
                <DynamicIcon name="Phone" size={32} />
              </div>
              <h4>Phone</h4>
              <p>{PORTFOLIO_DATA.contact.phone}</p>
              <span className="contact-hint">Click to copy</span>
            </div>

            {/* LinkedIn Card */}
            <a 
              href={`https://${PORTFOLIO_DATA.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <DynamicIcon name="Linkedin" size={32} />
              </div>
              <h4>LinkedIn</h4>
              <p>{PORTFOLIO_DATA.contact.linkedin}</p>
              <span className="contact-hint">Visit profile</span>
            </a>

            {/* GitHub Card */}
            <a 
              href={`https://${PORTFOLIO_DATA.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <DynamicIcon name="Github" size={32} />
              </div>
              <h4>GitHub</h4>
              <p>{PORTFOLIO_DATA.contact.github}</p>
              <span className="contact-hint">Visit profile</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} <span>{PORTFOLIO_DATA.name}</span>. All rights reserved.</p>
      </footer>

      {/* Copy notification toast */}
      {toast && (
        <div className="toast" key={toast.id}>
          <DynamicIcon name="Check" size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Aivox AI chat window */}
      {chatOpen && (
        <div className="aivox-chat-window">
          <div className="chat-header">
            <div className="chat-header-title">
              <span className="aivox-purple-orb small"></span>
              <span>Aivox AI Assistant</span>
            </div>
            <button className="chat-close-btn" onClick={() => setChatOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-chips-container">
            <p className="chat-chips-label">Ask me about:</p>
            <div className="chat-chips">
              <button onClick={() => askAI("Tell me about his technical skills")}>Technical Skills</button>
              <button onClick={() => askAI("Show me his featured developer projects")}>Developer Projects</button>
              <button onClick={() => askAI("Where does he study right now?")}>Education</button>
              <button onClick={() => askAI("What are his creative hobbies?")}>Creative Hobbies</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
