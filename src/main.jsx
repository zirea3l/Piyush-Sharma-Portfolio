import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, BrainCircuit, Database, Smartphone, Globe2, Sparkles, Terminal,
  ExternalLink, FileText, MapPin, Check, Copy, Cpu, Layers3, ChevronDown,
  Send, Zap, Award, Workflow
} from "lucide-react";
import "./style.css";

const PROFILE = {
  name: "Piyush Sharma",
  email: "piyushrs007@gmail.com",
  phone: "+91-8351-8531-54",
  location: "Palampur, Himachal Pradesh, India",
  github: "https://github.com/zirea3l",
  linkedin: "https://www.linkedin.com/in/piyush-sharma-zirea3l/",
  resume: "/Piyush-Sharma-Resume.pdf"
};

const projects = [
  {
    number: "01", name: "Hidden Spots", type: "FULL-STACK · GEOLOCATION",
    description: "A community-powered discovery platform for finding meaningful places beyond the usual tourist trail.",
    details: "Built around location-aware discovery, user-generated place stories and practical recommendations. The product direction includes geospatial search, ratings, image galleries and community contributions.",
    stack: ["React", "React Native", "Node.js", "Express", "MongoDB", "GeoJSON"],
    icon: MapPin, color: "lime", github: "https://github.com/zirea3l",
    demo: "", visual: "map"
  },
  {
    number: "02", name: "Local LLM Lab", type: "APPLIED AI · NLP",
    description: "An exploration of running open-weight language models locally with the Hugging Face ecosystem.",
    details: "A practical AI engineering track focused on Qwen, Transformers and local inference workflows. Extendable into document Q&A, retrieval-augmented generation and evaluation.",
    stack: ["Python", "Qwen", "Hugging Face", "Transformers"],
    icon: BrainCircuit, color: "purple", github: "https://github.com/zirea3l",
    demo: "", visual: "llm"
  },
  {
    number: "03", name: "Dynamic Difficulty Adjustment", type: "MACHINE LEARNING · RESEARCH",
    description: "Adaptive game difficulty driven by player behaviour and machine-learning-based decision systems.",
    details: "Research exploring player-state signals, difficulty control and engagement-aware adaptation. The related conference paper was accepted at OCIT 2026 (IEEE Conference), as listed in the supplied resume.",
    stack: ["Python", "Machine Learning", "Random Forest", "DQN", "Game Analytics"],
    icon: Workflow, color: "blue", github: "https://github.com/zirea3l",
    demo: "", visual: "chart"
  },
  {
    number: "04", name: "Ingredient Scanner", type: "COMPUTER VISION · PYTHON",
    description: "An AI-powered ingredient scanner designed to detect and parse information from food labels.",
    details: "A computer-vision project using OpenCV and Python, combining image processing with text-oriented extraction workflows.",
    stack: ["Python", "OpenCV", "Computer Vision"],
    icon: ScanIcon, color: "orange", github: "https://github.com/zirea3l",
    demo: "", visual: "scan"
  },
  {
    number: "05", name: "Pokémon Web App", type: "FRONTEND · API INTEGRATION",
    description: "A responsive web experience built around external API data and clear, intuitive presentation.",
    details: "Focused on API integration, efficient data handling and responsive interface development.",
    stack: ["React", "JavaScript", "REST API", "CSS"],
    icon: Globe2, color: "pink", github: "https://github.com/zirea3l",
    demo: "", visual: "pokemon"
  }
];

function ScanIcon(props) { return <Cpu {...props} />; }

const skills = [
  { title: "Frontend", icon: Code2, items: ["React", "React Native", "JavaScript", "HTML & CSS"] },
  { title: "Backend", icon: Terminal, items: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Data", icon: Database, items: ["MongoDB", "SQL", "GeoJSON", "Data modelling"] },
  { title: "AI & ML", icon: BrainCircuit, items: ["Python", "OpenCV", "Hugging Face", "Machine Learning"] },
  { title: "Core CS", icon: Layers3, items: ["DSA", "OOP", "DBMS", "Operating Systems"] },
  { title: "Tools", icon: Workflow, items: ["Git & GitHub", "Linux", "VS Code"] }
];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: .65, delay, ease: [.2,.7,.2,1] }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, note }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{note && <p>{note}</p>}</div>;
}

function Visual({ type }) {
  if (type === "map") return <div className="visual map-visual"><div className="map-grid"/><div className="map-route"/><span className="map-pin pin-a"/><span className="map-pin pin-b"/><span className="map-pin pin-c"/><div className="map-label"><MapPin size={13}/> hidden place found</div><div className="map-coord">32.11° N&nbsp; 76.53° E</div></div>;
  if (type === "llm") return <div className="visual llm-visual"><div className="orb"><BrainCircuit size={40}/></div><div className="terminal-card"><div className="terminal-top"><i/><i/><i/><span>local-inference.py</span></div><p><b>model</b> = <em>"Qwen"</em></p><p><b>runtime</b> = <em>"local"</em></p><p className="terminal-output">› ready for prompt<span className="cursor">_</span></p></div></div>;
  if (type === "chart") return <div className="visual chart-visual"><div className="chart-top"><span>PLAYER STATE</span><span className="live-dot">● LIVE</span></div><div className="chart-bars">{[32,48,40,66,52,76,61,88,69,96,77,85].map((v,i)=><i key={i} style={{height:`${v}%`,animationDelay:`${i*55}ms`}}/>)}</div><div className="chart-foot"><span>ENGAGEMENT SIGNAL</span><b>ADAPTIVE CONTROL ↗</b></div></div>;
  if (type === "scan") return <div className="visual scan-visual"><div className="scan-frame"><div className="scan-corner tl"/><div className="scan-corner tr"/><div className="scan-corner bl"/><div className="scan-corner br"/><div className="scan-line"/><div className="label-lines"><i/><i/><i/><i/></div></div><span className="scan-tag">IMAGE ANALYSIS · 98.2%</span></div>;
  return <div className="visual pokemon-visual"><div className="pokeball"><i/></div><div className="pokemon-copy"><span>API CONNECTED</span><b>DATA → UI</b><small>Responsive · Dynamic · Fast</small></div></div>;
}

function ProjectCard({ project, index, onOpen }) {
  const Icon = project.icon;
  return <Reveal delay={index * .07} className={`project-card ${project.color}`}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View ${project.name} details`}>
      <div className="project-art"><Visual type={project.visual}/><span className="art-index">{project.number}</span><span className="art-arrow"><ArrowUpRight size={19}/></span></div>
      <div className="project-info"><div className="project-type"><Icon size={14}/>{project.type}</div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.stack.slice(0,4).map(t=><span key={t}>{t}</span>)}</div></div>
    </button>
  </Reveal>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [figSymbol, setFigSymbol] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });

  useEffect(() => {
    const symbols = ["</>", "{ }", "_dev", "∞"];
    let symbolIndex = 0;
    let position = 0;
    let deleting = false;
    let timeout;
    const tick = () => {
      const current = symbols[symbolIndex];
      if (!deleting) {
        position += 1;
        setFigSymbol(current.slice(0, position));
        if (position >= current.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1050);
        } else {
          timeout = window.setTimeout(tick, 145);
        }
      } else {
        position -= 1;
        setFigSymbol(current.slice(0, position));
        if (position <= 0) {
          deleting = false;
          symbolIndex = (symbolIndex + 1) % symbols.length;
          timeout = window.setTimeout(tick, 320);
        } else {
          timeout = window.setTimeout(tick, 75);
        }
      }
    };
    timeout = window.setTimeout(tick, 450);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = activeProject || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, menuOpen]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${PROFILE.email}`; }
  };
  const closeMenu = () => setMenuOpen(false);

  return <>
    <motion.div className="scroll-progress" style={{ scaleX }} />
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#home" className="brand" onClick={closeMenu}><span className="brand-mark" aria-hidden="true">&lt;/&gt;</span><span>PIYUSH SHARMA<small>SOFTWARE ENGINEER</small></span></a>
      <nav className={menuOpen ? "nav open" : "nav"}>
        {[["About","#about"],["Work","#work"],["Research","#research"],["Contact","#contact"]].map(([label,href])=><a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-resume" href={PROFILE.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14}/></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-grid"/>
        <div className="hero-content">
          <motion.div className="availability" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.15}}><span className="availability-dot"/> OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES</motion.div>
          <motion.p className="hero-kicker" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}>HELLO, I'M PIYUSH — A DEVELOPER WHO BUILDS WITH CURIOSITY.</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.3}}>I build digital<br/><span>experiences</span><i> that matter.</i></motion.h1>
          <motion.p className="hero-desc" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}}>Full-stack developer exploring the intersection of thoughtful product engineering and applied AI. I turn ideas into useful, well-crafted software.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}>
            <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17}/></a>
            <a className="button button-ghost" href={PROFILE.resume} target="_blank" rel="noreferrer"><FileText size={16}/> View résumé</a>
          </motion.div>
          <motion.div className="hero-meta" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>
            <span><MapPin size={14}/>{PROFILE.location}</span><span className="meta-separator">/</span><span>REACT · NODE · PYTHON · AI</span>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={{opacity:0,scale:.88,rotate:4}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1,delay:.45}}>
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="hero-core"><span className="core-glow"/><div className="core-monogram" aria-label="Code, programming, developer identity and innovation"><span className="typing-code" aria-live="polite">{figSymbol}</span><span className="typing-cursor" aria-hidden="true"/></div><span className="core-caption">BUILD / LEARN / REPEAT</span></div>
          <div className="float-chip chip-code"><Code2 size={15}/> FULL-STACK</div><div className="float-chip chip-ai"><BrainCircuit size={15}/> APPLIED AI</div><div className="float-chip chip-ship"><Zap size={15}/> SHIP IDEAS</div>
          <div className="hero-art-note">FIG. 01 — CURIOSITY IN MOTION</div>
        </motion.div>
        <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
      </section>

      <section className="intro-strip"><div className="section-wrap strip-inner"><span>WHAT I DO</span><p>Build for the web. Experiment with AI. Sweat the details.</p><span className="strip-index">01 / 04</span></div></section>

      <section className="section-wrap section-pad" id="about">
        <SectionHeading eyebrow="A LITTLE ABOUT ME / 01" title={<>Engineering with<br/><span className="muted-title">purpose and curiosity.</span></>} note="I enjoy moving between product thinking, software engineering and experimentation — from shaping an interface to understanding the systems behind it."/>
        <div className="about-grid">
          <Reveal className="about-copy"><p className="large-copy">I'm Piyush, a computer science postgraduate with a foundation in full-stack development and a growing focus on applied AI.</p><p>My work spans web and mobile applications, computer vision and machine-learning research. I like understanding a problem deeply, building a practical solution and refining the experience until the details feel right.</p><p>I'm currently looking to contribute to a product-focused engineering team where I can keep learning, take ownership and build software that makes a difference.</p><a className="text-link" href="#contact">Let's build something <ArrowUpRight size={16}/></a></Reveal>
          <Reveal delay={.12} className="about-side"><div className="stat-card"><span className="stat-number">Build.</span><span>Full-stack applications</span><small>React · Node.js · Express · MongoDB</small></div><div className="stat-card"><span className="stat-number">Explore.</span><span>Applied AI & machine learning</span><small>Local LLMs · Computer Vision · Research</small></div><div className="quote-card"><Sparkles size={18}/><p>“Stay curious. Make useful things. Keep getting better.”</p><span>PERSONAL WORKING PRINCIPLE</span></div></Reveal>
        </div>
      </section>

      <section className="work-section section-pad" id="work"><div className="section-wrap"><SectionHeading eyebrow="SELECTED WORK / 02" title={<>A few things I've<br/><span className="muted-title">made and explored.</span></>} note="A selection of development projects and technical explorations. Open a card to see the thinking and technologies behind it."/><div className="projects-grid">{projects.map((p,i)=><ProjectCard key={p.number} project={p} index={i} onOpen={setActiveProject}/>)}</div><div className="github-callout"><div><span className="eyebrow">MORE EXPERIMENTS & CODE</span><h3>There's more on GitHub.</h3></div><a href={PROFILE.github} target="_blank" rel="noreferrer" className="button button-ghost">Explore repositories <Github size={16}/><ArrowUpRight size={15}/></a></div></div></section>



      <section className="skills-section section-pad"><div className="section-wrap"><SectionHeading eyebrow="MY TOOLKIT / 03" title={<>Tools for turning<br/><span className="muted-title">ideas into reality.</span></>} note="A practical toolkit across interfaces, backend systems, data and intelligent applications."/><div className="skills-grid">{skills.map((s,i)=>{const Icon=s.icon;return <Reveal key={s.title} delay={i*.05} className="skill-card"><div className="skill-title"><Icon size={18}/><h3>{s.title}</h3><span>0{i+1}</span></div><div className="skill-items">{s.items.map(x=><span key={x}>{x}</span>)}</div></Reveal>})}</div></div></section>

      <section className="research-section section-pad" id="research"><div className="section-wrap research-grid"><Reveal className="research-copy"><span className="eyebrow">RESEARCH & RECOGNITION / 04</span><h2>Curiosity that<br/><span className="muted-title">goes beyond code.</span></h2><p className="large-copy">Adaptive Game Difficulty Control through Machine Learning and Player Behaviour Analysis</p><p>Research interest: machine-learning-based dynamic difficulty adjustment using player behaviour analysis, adaptive systems and game analytics.</p><div className="paper-status"><Award size={17}/><span>ACCEPTED · OCIT 2026 · IEEE CONFERENCE</span></div></Reveal><Reveal delay={.15} className="research-art"><div className="research-ring ring-a"/><div className="research-ring ring-b"/><div className="research-center"><BrainCircuit size={42}/><span>ML × PLAYER<br/>BEHAVIOUR</span></div><div className="research-node node-one">SIGNALS</div><div className="research-node node-two">ADAPT</div><div className="research-node node-three">ENGAGE</div><span className="research-fig">RESEARCH NOTE / 001</span></Reveal></div></section>

      <section className="contact-section section-pad" id="contact"><div className="section-wrap contact-wrap"><span className="eyebrow">HAVE A GOOD PROBLEM? / 06</span><h2>Let's make<br/><span>something</span> useful.</h2><p>I'm open to software engineering and applied AI opportunities. If you're building something interesting, I'd love to hear about it.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${PROFILE.email}?subject=Let's%20connect`}>Start a conversation <ArrowUpRight size={17}/></a><button className="button button-ghost" onClick={copyEmail}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Email copied" : "Copy email"}</button></div><div className="contact-bottom"><span><MapPin size={14}/>{PROFILE.location}</span><div className="social-links"><a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail/></a></div></div></div></section>
    </main>

    <footer className="footer"><div className="section-wrap footer-inner"><a href="#home" className="back-top">BACK TO TOP ↑</a></div><div className="footer-copy">© {new Date().getFullYear()} ALL RIGHTS RESERVED.</div></footer>

    <AnimatePresence>{activeProject && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setActiveProject(null)}}><motion.div className="project-modal" initial={{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}} transition={{duration:.25}}><button className="modal-close" onClick={()=>setActiveProject(null)} aria-label="Close project details"><X/></button><span className="eyebrow">PROJECT / {activeProject.number}</span><h2>{activeProject.name}</h2><p className="modal-description">{activeProject.details}</p><span className="modal-label">TECHNOLOGIES</span><div className="tag-row modal-tags">{activeProject.stack.map(t=><span key={t}>{t}</span>)}</div><div className="modal-actions"><a className="button button-primary" href={activeProject.github} target="_blank" rel="noreferrer">GitHub profile <Github size={16}/><ArrowUpRight size={14}/></a><button className="button button-ghost" onClick={()=>setActiveProject(null)}>Close <X size={15}/></button></div><p className="modal-note">Project-specific repository and live-demo URLs can be added in <code>src/main.jsx</code> when ready.</p></motion.div></motion.div>}</AnimatePresence>
  </>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
