import { useState, useEffect, useRef } from 'react'
import * as Icons from 'lucide-react'
import profileImg from './assets/profile.jpg'
import './App.css'

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
      { name: 'Cursor', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cursor.svg', style: { filter: 'invert(37%) sepia(93%) saturate(3474%) hue-rotate(193deg) brightness(94%) contrast(101%)' } },
      { name: 'Claude', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg', style: { filter: 'invert(61%) sepia(48%) saturate(541%) hue-rotate(325deg) brightness(91%) contrast(90%)' } },
      { name: 'Midjourney', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/midjourney.svg', style: { filter: 'invert(1)' } },
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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const [introActive, setIntroActive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Aivox Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi, I'm Aivox, Sangsaptak's AI assistant. Ask me anything about his skills, education, projects, or creative background!", sender: "ai" }
  ]);
  const chatEndRef = useRef(null);

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

      {/* Navigation Bar */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <nav className="navbar">
          {/* Left Brand Area */}
          <div className="navbar-logo-container">
            <div className="navbar-logo-badge">SD</div>
            <span className="navbar-brand-name">{PORTFOLIO_DATA.logoName}</span>
            <span className="navbar-status-dot" title="Available for opportunities"></span>
          </div>

          {/* Center Navigation Links Pill */}
          <div className="navbar-links-pill-container">
            <ul className="nav-links-pill">
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
              <li><a href="#work" className={activeSection === 'work' ? 'active' : ''}>Work</a></li>
              <li><a href="#internship" className={activeSection === 'internship' ? 'active' : ''}>Internship</a></li>
              <li><a href="#publications" className={activeSection === 'publications' ? 'active' : ''}>Publications</a></li>
              <li><a href="#certificates" className={activeSection === 'certificates' ? 'active' : ''}>Certificates</a></li>
              <li><a href="#avocation" className={activeSection === 'avocation' ? 'active' : ''}>Avocation</a></li>
              <li><a href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
              <li><a href={PORTFOLIO_DATA.resumeUrl} className="cv-nav-link" download>CV</a></li>
              <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            </ul>
          </div>

          {/* Right Aivox Action Button */}
          <button 
            className={`navbar-aivox-btn ${chatOpen ? 'active' : ''}`} 
            onClick={() => setChatOpen(!chatOpen)}
            title="Chat with AI Assistant"
          >
            <span className="aivox-purple-orb"></span>
            <span className="aivox-text">Aivox</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-tag">
            <DynamicIcon name="Sparkles" size={16} />
            <span>{PORTFOLIO_DATA.tag}</span>
          </div>
          <h1>
            Hi, I'm <span className="accent-text">{PORTFOLIO_DATA.name}</span>
          </h1>
          <h2>{PORTFOLIO_DATA.role}</h2>
          <p>{PORTFOLIO_DATA.bio}</p>
          <div className="hero-buttons">
            <a 
              href={PORTFOLIO_DATA.resumeUrl} 
              className="btn btn-primary"
              download
            >
              <DynamicIcon name="Download" size={18} />
              Download CV
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A little more about who I am and what I do</p>

          {/* Main Intro with Image */}
          <div className="about-main-layout">
            <div className="about-image-side">
              <div className="about-image-frame">
                <img src={profileImg} alt={PORTFOLIO_DATA.name} className="about-profile-img" />
              </div>
            </div>
            <div className="about-content-side">
              <div className="about-tag">— WHO AM I —</div>
              <h3 className="about-title-large">About <span className="accent-text">Me</span></h3>
              <div className="about-paragraphs">
                <p>
                  I am a detail-oriented <strong>Computer Science & Engineering</strong> student at <strong>Brainware University</strong>, specialising in <strong>Artificial Intelligence and Machine Learning</strong>. Based in <strong>Kolkata</strong>, I am passionate about bridging the gap between robust software architecture and intelligent system design.
                </p>
                <p>
                  With a strong foundation in Python, Java, C/C++, and scalable backend databases, I focus on building stable applications. My technical toolkit is complemented by a creative background in <strong>singing and also drawing</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Detail Boxes Grid */}
          <div className="about-details-grid">
            {/* Objective */}
            <div className="about-box">
              <h3>
                <DynamicIcon name="Target" size={20} />
                {PORTFOLIO_DATA.about.objective.title}
              </h3>
              <p>{PORTFOLIO_DATA.about.objective.text}</p>
            </div>

            {/* Education */}
            <div className="about-box">
              <h3>
                <DynamicIcon name="GraduationCap" size={20} />
                Education
              </h3>
              <p className="edu-degree">{PORTFOLIO_DATA.about.education.degree}</p>
              <div className="edu-meta">{PORTFOLIO_DATA.about.education.institution}</div>
              <p>{PORTFOLIO_DATA.about.education.details}</p>
            </div>

            {/* Focus Areas */}
            <div className="about-box">
              <h3>
                <DynamicIcon name="Briefcase" size={20} />
                Focus Areas
              </h3>
              <div className="focus-tags">
                {PORTFOLIO_DATA.about.focusAreas.map((area, idx) => (
                  <span key={idx} className="focus-tag">{area}</span>
                ))}
              </div>
            </div>
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
                      <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />
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
                      <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />
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
                      <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />
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
                      <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />
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
                      <img src={tech.logoUrl} alt={tech.name} className="tech-logo-img" style={tech.style} />
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

      {/* Work (Projects) Section */}
      <section id="work">
        <div className="container">
          <h2 className="section-title">My Work</h2>
          <p className="section-subtitle">A collection of academic and personal developer projects</p>

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
