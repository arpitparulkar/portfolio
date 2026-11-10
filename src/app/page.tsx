"use client";

import projects from "../../projects.js";
import { site } from "@/data/site";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

type Project = (typeof projects)[number];

const navItems = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Work", href: "#work" },
  { number: "04", label: "Process", href: "#process" },
  { number: "05", label: "Contact", href: "#contact" },
];

const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "FastAPI",
  "Flutter",
  "TensorFlow",
  "LangGraph",
  "Generative AI",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Git & GitHub",
  "Google Cloud",
];

const focusAreas = [
  "AI Engineering",
  "Generative AI",
  "Multi-Agent Systems",
  "Full-Stack Development",
  "API Development",
  "UI/UX",
  "Problem Solving",
  "Automation",
];

const processStages = [
  {
    title: "UI wireframes",
    description: "Start with the people and the problem. Map the key moments into a clear, calm interface before choosing the tools.",
    tag: "LISTEN · SKETCH · TEST",
    symbol: "⌗",
  },
  {
    title: "Architecture",
    description: "Give the idea a dependable shape: define the system boundaries, data flow, and the simplest path to a useful first version.",
    tag: "PLAN · CONNECT · SIMPLIFY",
    symbol: "◇",
  },
  {
    title: "Backend",
    description: "Build reliable services and APIs that make the experience work, with clear responsibilities and room to grow.",
    tag: "MODEL · BUILD · VERIFY",
    symbol: "⌘",
  },
  {
    title: "AI integration",
    description: "Bring in models and multi-agent workflows where they add real value, keeping people in control and outcomes understandable.",
    tag: "REASON · ORCHESTRATE · REFINE",
    symbol: "✳",
  },
  {
    title: "Final product",
    description: "Connect every layer, test the full journey, and polish the details until the experience feels coherent and ready to use.",
    tag: "SHIP · LEARN · IMPROVE",
    symbol: "↗",
  },
];

const contactItems = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}`, icon: "email", external: false },
  { label: "LOCATION", value: site.location, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`, icon: "location", external: true },
  { label: "LINKEDIN", value: "linkedin.com/in/arpit-parulkar-2832a525a", href: site.socialLinks.linkedin, icon: "linkedin", external: true },
  { label: "GITHUB", value: "github.com/arpitparulkar", href: site.socialLinks.github, icon: "github", external: true },
  { label: "RESUME", value: "View resume (PDF)", href: site.socialLinks.resume, icon: "resume", external: true },
] as const;

const heroSocialLinks = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/arpit-parulkar-2832a525a", icon: "linkedin", external: true },
  { label: "GITHUB", href: "https://github.com/arpitparulkar", icon: "github", external: true },
  { label: "EMAIL", href: "mailto:mailto@gmail.com", icon: "email", external: false },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function HeroSocialIcon({ icon }: { icon: (typeof heroSocialLinks)[number]["icon"] }) {
  if (icon === "github") return <GitHubIcon />;

  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="hero-social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9.2H7v11.4H3.4V9.2Zm5.8 0h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.4v6.3h-3.6V15c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.2V9.2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="hero-social-icon" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ContactIcon({ icon }: { icon: (typeof contactItems)[number]["icon"] }) {
  const commonProps = {
    "aria-hidden": true as const,
    className: "contact-item-icon",
    viewBox: "0 0 24 24",
    fill: "none",
  };

  if (icon === "email") {
    return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></svg>;
  }
  if (icon === "location") {
    return <svg {...commonProps}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
  }
  if (icon === "linkedin") {
    return <svg {...commonProps} fill="currentColor"><path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9.2H7v11.4H3.4V9.2Zm5.8 0h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.4v6.3h-3.6V15c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.2V9.2Z" /></svg>;
  }
  if (icon === "github") return <GitHubIcon />;

  return <svg {...commonProps}><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3.5Z" /><path d="M14 3.5v4h4M9 13h6M9 16.5h6" /></svg>;
}

function handleSocialButtonTilt(event: ReactMouseEvent<HTMLAnchorElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.setProperty("--social-tilt-x", `${-y * 8}deg`);
  event.currentTarget.style.setProperty("--social-tilt-y", `${x * 8}deg`);
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="github-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.53 2.01 2.96 1.41.1-.72.39-1.21.7-1.49-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.6 5.22-5.08 5.5.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>A</span>
      <span>P</span>
    </span>
  );
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`project-art art-${project.visual}`} aria-hidden="true">
      <span className="art-index">{project.number} / 04</span>
      <span className="art-label">{project.visualLabel}</span>
      <div className="art-scene">
        {project.visual === "safety" && (
          <>
            <div className="safety-orbit orbit-one" />
            <div className="safety-orbit orbit-two" />
            <div className="safety-core"><span>SAFE</span></div>
            <div className="safety-ping ping-one" />
            <div className="safety-ping ping-two" />
          </>
        )}
        {project.visual === "agent" && (
          <div className="agent-network">
            <span className="agent-node node-main">AI</span>
            <span className="agent-node node-a">01</span>
            <span className="agent-node node-b">02</span>
            <span className="agent-node node-c">03</span>
            <i className="agent-link link-a" />
            <i className="agent-link link-b" />
            <i className="agent-link link-c" />
          </div>
        )}
        {project.visual === "resume" && (
          <div className="resume-card">
            <div className="resume-top"><span>AP.</span><span>CREATIVE PROFILE</span></div>
            <div className="resume-rule" />
            <div className="resume-title">YOUR NEXT<br /><em>CHAPTER.</em></div>
            <div className="resume-lines"><i /><i /><i /></div>
            <span className="resume-stamp">MAKE<br />IT YOURS</span>
          </div>
        )}
        {project.visual === "carbon" && (
          <div className="carbon-orbit">
            <span className="carbon-leaf">↗</span>
            <span className="carbon-caption">A LIGHTER<br />WAY FORWARD</span>
            <i className="carbon-ring ring-a" />
            <i className="carbon-ring ring-b" />
          </div>
        )}
      </div>
      <span className="art-corner">AP / PROJECTS</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTitleIntroRef = useRef<HTMLDivElement>(null);
  const heroPortraitRef = useRef<HTMLImageElement>(null);
  const heroPortraitFrameRef = useRef<HTMLDivElement>(null);
  const heroPortraitIntroRef = useRef<HTMLDivElement>(null);
  const heroAsideRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [reelPlaying, setReelPlaying] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [year, setYear] = useState("2026");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, hovered: false, label: "" });

  useEffect(() => {
    const hero = heroRef.current;
    const title = heroTitleRef.current;
    const titleIntro = heroTitleIntroRef.current;
    const portrait = heroPortraitRef.current;
    const portraitFrame = heroPortraitFrameRef.current;
    const portraitIntro = heroPortraitIntroRef.current;
    const heroAside = heroAsideRef.current;
    if (!hero || !title || !titleIntro || !portrait || !portraitFrame || !portraitIntro || !heroAside || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const tablet = window.matchMedia("(max-width: 900px)").matches;
    const context = gsap.context(() => {
      gsap.fromTo(
        portraitIntro,
        { scale: 0.8, opacity: 0, y: 28 },
        { scale: 1, opacity: 1, y: 0, duration: 1.25, delay: 0.2, ease: "power3.out" },
      );
      gsap.fromTo(
        titleIntro,
        { scale: 0.8, opacity: 0, transformOrigin: "left top" },
        { scale: 1, opacity: 1, duration: 1.25, delay: 0.2, ease: "power3.out" },
      );
      gsap.to(portrait, {
        scale: 1.35,
        yPercent: mobile ? -4 : -9,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(portraitFrame, {
        xPercent: mobile ? 0 : -3,
        yPercent: -4,
        rotate: 1,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.fromTo(title, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "left top",
      }, {
        scale: mobile ? 1.04 : tablet ? 1.08 : 1.06,
        xPercent: tablet ? 0 : -2,
        yPercent: mobile ? -1 : tablet ? -2 : -4,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (mobile) {
        gsap.to(heroAside, {
          y: 28,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, hero);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      setIntroDone(true);
      return;
    }

    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(value + Math.ceil(Math.random() * 18), 100);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setIntroDone(true), 260);
      }
    }, 75);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function moveCursor(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const target = event.target;
      const interactive = target instanceof Element ? target.closest("a, button") : null;
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        hovered: Boolean(interactive),
        label: interactive?.closest(".project-art-link") ? "VIEW" : "",
      });
    }

    function hideCursor() {
      setCursor((current) => ({ ...current, visible: false }));
    }

    window.addEventListener("pointermove", moveCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  function navigate(href: string) {
    setMenuOpen(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    document.querySelector(href)?.scrollIntoView({ behavior });
  }

  return (
    <main>
      {!introDone && (
        <div className="intro-screen" aria-label="Loading portfolio" role="status">
          <div className="intro-top"><Mark /><span>INDEPENDENT PORTFOLIO</span></div>
          <div className="intro-center">
            <p>DESIGNING THE NEXT</p>
            <span className="intro-name">AP<span>.</span></span>
          </div>
          <div className="intro-bottom">
            <span>AI ENGINEER · WEB DEVELOPER</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
          <div className="intro-progress"><i style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      <header className="site-header">
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span><i /><i />
        </button>
        <a className="brand" href="#home" aria-label="Arpit Parulkar — home" onClick={(event) => { event.preventDefault(); navigate("#home"); }}>
          <Mark />
          <span className="brand-name">ARPIT PARULKAR<span>AI ENGINEER · WEB DEVELOPER</span></span>
        </a>
        <div className="header-right">
          {site.socialLinks.resume && (
            <a className="header-resume" href={site.socialLinks.resume} target="_blank" rel="noreferrer">
              RESUME <Arrow diagonal />
            </a>
          )}
          <a className="header-availability" href="#contact" onClick={(event) => { event.preventDefault(); navigate("#contact"); }}>
            LET&apos;S WORK <Arrow diagonal />
          </a>
        </div>
      </header>

      <div id="site-menu" className={`menu-overlay ${menuOpen ? "menu-visible" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-inner">
          <div className="menu-meta"><span>FIND YOUR WAY</span><span>AP / DIGITAL PORTFOLIO</span></div>
          <nav aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.number}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(event) => { event.preventDefault(); navigate(item.href); }}
                className={activeSection === item.href.slice(1) ? "menu-active" : ""}
              >
                <span>{item.number}</span><strong>{item.label}</strong><Arrow diagonal />
              </a>
            ))}
          </nav>
          <div className="menu-bottom">
            <span>BASED IN MUMBAI, INDIA</span>
            <span>THOUGHTFUL BY DESIGN. BUILT FOR WHAT&apos;S NEXT.</span>
            {site.socialLinks.resume && (
              <a className="menu-resume" href={site.socialLinks.resume} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
                VIEW RESUME <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
      </div>

      <section
        id="home"
        className="hero section-shell"
        ref={heroRef}
        onMouseMove={(event) => {
          if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
          const frame = heroPortraitFrameRef.current;
          if (!frame) return;
          const bounds = frame.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
          frame.style.setProperty("--pointer-x", `${x}px`);
          frame.style.setProperty("--pointer-y", `${y}px`);
        }}
        onMouseLeave={() => {
          heroPortraitFrameRef.current?.style.setProperty("--pointer-x", "0px");
          heroPortraitFrameRef.current?.style.setProperty("--pointer-y", "0px");
        }}
      >
        <div className="hero-topline"><span>INDEPENDENT DEVELOPER & CREATIVE TECHNOLOGIST</span><span>MUMBAI, INDIA</span></div>
        <div className="hero-title-wrap">
          <p className="hero-eyebrow"><span className="eyebrow-line" /> A LITTLE LOGIC. A LOT OF POSSIBILITY.</p>
          <div className="hero-title-intro" ref={heroTitleIntroRef}>
            <h1 ref={heroTitleRef}><span>ARPIT</span><br /><span className="hero-second">PARULKAR<span className="hero-period">.</span></span></h1>
          </div>
          <div className="hero-portrait-frame" ref={heroPortraitFrameRef}>
            <div className="hero-portrait-mouse">
              <div className="hero-portrait-intro" ref={heroPortraitIntroRef}>
                <Image
                  ref={heroPortraitRef}
                  src="/images/arpit-portrait-v2.png"
                  alt="Arpit Parulkar wearing sunglasses, a dark hoodie and a white shirt"
                  width={768}
                  height={768}
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1100px) 54vw, 680px"
                  className="hero-portrait-image"
                />
              </div>
            </div>
            <span className="portrait-index">ARPIT PARULKAR / PORTRAIT 01</span>
          </div>
          <div className="hero-aside" ref={heroAsideRef}>
            <span className="aside-index">[ 01 — 05 ]</span>
            <p>AI ENGINEER / WEB DEVELOPER<br />THIRD-YEAR COMPUTER ENGINEERING STUDENT AT VIVA INSTITUTE OF TECHNOLOGY.</p>
            <a href="#work" className="text-link" onClick={(event) => { event.preventDefault(); navigate("#work"); }}>EXPLORE SELECTED WORK <Arrow /></a>
            {site.socialLinks.resume && <a className="text-link hero-resume-link" href={site.socialLinks.resume} target="_blank" rel="noreferrer">VIEW RESUME <Arrow diagonal /></a>}
          </div>
        </div>
        <div className="hero-connect-row">
          <p className="hero-tagline">Building intelligent systems and beautiful digital experiences.</p>
          <nav className="hero-social-links" aria-label="Connect with Arpit">
            {heroSocialLinks.map((link) => (
              <a
                className="hero-social-link"
                href={link.href}
                key={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onMouseMove={handleSocialButtonTilt}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--social-tilt-x", "0deg");
                  event.currentTarget.style.setProperty("--social-tilt-y", "0deg");
                }}
              >
                <HeroSocialIcon icon={link.icon} />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="hero-visual" aria-label="Abstract orbital visualization representing connected ideas" role="img">
          <div className="visual-grain" />
          <div className="visual-grid" />
          <div className="hero-orbit orbit-outer"><i /><i /></div>
          <div className="hero-orbit orbit-middle"><i /><i /></div>
          <div className="hero-orbit orbit-inner"><i /></div>
          <div className="hero-sun"><span>IDEAS<br />IN MOTION</span></div>
          <div className="hero-visual-caption"><span>HUMAN INTENT</span><span>×</span><span>INTELLIGENT SYSTEMS</span></div>
          <span className="visual-coordinate coord-left">01 / FIG. A</span>
          <span className="visual-coordinate coord-right">A STUDY IN CONNECTION</span>
        </div>
        <div className="hero-footer"><span>SCROLL TO EXPLORE <span className="scroll-cue">↓</span></span><span>CURIOUS MINDS MAKE BETTER THINGS.</span><span>MUMBAI · INDIA</span></div>
      </section>

      <section className="manifesto section-shell" aria-label="Introduction">
        <div className="section-label"><span>01 / A POINT OF VIEW</span><span>THOUGHTFUL TECHNOLOGY, HUMAN OUTCOMES</span></div>
        <p className="manifesto-copy">I turn ideas into <span>intelligent experiences.</span></p>
        <div className="manifesto-foot"><span>BUILD WITH INTENTION.</span><span>MAKE IT MATTER.</span></div>
      </section>

      <section id="about" className="about section-shell">
        <div className="section-label"><span>02 / THE PERSON BEHIND THE PIXELS</span><span>ABOUT ARPIT</span></div>
        <div className="about-grid">
          <motion.div
            className="about-art"
            aria-label="Portrait of Arpit Parulkar"
            role="img"
            initial={reducedMotion ? false : { opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="about-portrait-shape" />
            <Image
              src="/images/arpit-portrait-v2.png"
              alt=""
              width={768}
              height={768}
              sizes="(max-width: 640px) 90vw, (max-width: 900px) 80vw, 440px"
              className="about-portrait-image"
            />
            <div className="portrait-stamp">CURIOUS<br />BY NATURE</div>
            <span className="portrait-note">A HUMAN IN THE LOOP, ALWAYS.</span>
            <span className="portrait-caption">MUMBAI, INDIA · 19°04&apos; N</span>
          </motion.div>
          <div className="about-copy">
            <span className="about-kicker">ENGINEER BY TRAINING. BUILDER BY INSTINCT.</span>
            <h2>Making sense<br />of the <em>complex.</em></h2>
            <p className="about-lead">I&apos;m Arpit Parulkar, a third-year Computer Engineering student based in Mumbai. I&apos;m an AI Engineer and Web Developer passionate about building intelligent systems, Generative AI applications, multi-agent workflows and modern web experiences.</p>
            <p className="about-body">I love blending creativity with technology to solve real-world problems. I&apos;m currently studying at Viva Institute of Technology and exploring how thoughtful engineering can make digital experiences more useful, intuitive and impactful.</p>
            <div className="about-facts"><span><i>01</i> ALWAYS LEARNING</span><span><i>02</i> PURPOSE OVER HYPE</span><span><i>03</i> MUMBAI, INDIA</span></div>
          </div>
        </div>
      </section>

      <section className="reel section-shell" aria-label="Showreel">
        <div className={`reel-frame ${reelPlaying ? "reel-playing" : "reel-paused"}`}>
          <div className="reel-background"><span className="reel-halo" /><span className="reel-cross cross-a" /><span className="reel-cross cross-b" /></div>
          <span className="reel-kicker">SELECTED IDEAS · VISUAL STUDY</span>
          <div className="reel-center">
            <span className="reel-title-mask" aria-label="Showreel">SHOWREEL</span>
            <button type="button" className="reel-button" aria-pressed={reelPlaying} onClick={() => setReelPlaying((playing) => !playing)}>
              <span>{reelPlaying ? "PAUSE VISUAL" : "PLAY VISUAL"}</span><span className="reel-button-icon">{reelPlaying ? "Ⅱ" : "▶"}</span>
            </button>
          </div>
          <div className="reel-foot"><span>AI · WEB · MOBILE</span><span>THE WORK IS THE STORY.</span><span>AP / 01</span></div>
        </div>
        <p className="reel-note">Building intelligent systems and beautiful digital experiences.</p>
      </section>

      <section id="work" className="work section-shell">
        <div className="section-label"><span>03 / SELECTED WORK</span><span>FOUR QUESTIONS, FOUR STARTING POINTS</span></div>
        <div className="work-heading">
          <h2>Curiosity,<br /><em>put to work.</em></h2>
          <p>A few explorations in building with purpose — across AI, the web, mobile, and the world around us.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <a className="project-art-link" href={`#case-${project.id}`} aria-label={`Read about ${project.title}`}>
                <ProjectArtwork project={project} />
                <span className="project-open"><Arrow diagonal /></span>
              </a>
              <div className="project-info">
                <div className="project-meta"><span>{project.number} / {project.role}</span><span>{project.year}</span></div>
                <h3><a href={`#case-${project.id}`}>{project.title}</a></h3>
                <p>{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="project-links">
                  <a className="project-detail-link" href={`#case-${project.id}`}>OPEN PROJECT <Arrow /></a>
                  <a className="project-detail-link project-source-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`}>
                    <GitHubIcon /> VIEW SOURCE <Arrow diagonal />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="work-bottom"><span>MORE IDEAS ARE ALWAYS TAKING SHAPE.</span><a href="#contact" onClick={(event) => { event.preventDefault(); navigate("#contact"); }}>HAVE ONE IN MIND? <Arrow /></a></div>
      </section>

      <section id="process" className="process section-shell">
        <div className="section-label"><span>04 / HOW IT COMES TOGETHER</span><span>FROM QUESTION TO SOMETHING REAL</span></div>
        <div className="process-heading"><h2>Good work has<br /><em>a good reason.</em></h2><p>A little structure. A lot of curiosity. Always room to make it better.</p></div>
        <div className="process-slider">
          <div className="process-tabs" role="tablist" aria-label="Project development stages">
            {processStages.map((stage, index) => (
              <button
                type="button"
                role="tab"
                id={`process-tab-${index}`}
                aria-selected={activeStage === index}
                aria-controls="process-panel"
                key={stage.title}
                onClick={() => setActiveStage(index)}
              >
                <span>0{index + 1}</span>{stage.title}
              </button>
            ))}
          </div>
          <article className="process-panel" id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeStage}`}>
            <div className="process-panel-copy">
              <span className="process-number">0{activeStage + 1} / 05</span>
              <h3>{processStages[activeStage].title}</h3>
              <p>{processStages[activeStage].description}</p>
              <span className="process-tag">{processStages[activeStage].tag}</span>
            </div>
            <div className={`process-visual process-visual-${activeStage}`} aria-hidden="true">
              <span className="process-visual-core">{processStages[activeStage].symbol}</span>
              <i /><i /><i /><i />
              <span className="process-visual-caption">IDEA → IMPACT</span>
            </div>
          </article>
        </div>
        <div className="case-studies">
          <div className="case-heading"><span>THE WORK, A LITTLE CLOSER</span><span>PROJECT NOTES / 01—04</span></div>
          {projects.map((project) => (
            <article className="case-row" id={`case-${project.id}`} key={project.id}>
              <span className="case-number">{project.number}</span>
              <div className="case-main"><span>{project.role} · {project.year}</span><h3>{project.title}</h3><p>{project.outcome}</p><div className="case-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
              <span className="case-recognition">{project.recognition ?? ""}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-band" aria-label="Areas of focus">
        <div className="skills-top"><span>THE TOOLKIT KEEPS GROWING</span><span>CURIOUS ABOUT WHAT&apos;S NEXT</span></div>
        <div className="skills-track" aria-hidden="true">
          {[0, 1].map((copy) => <div className="skills-group" key={copy}>{skills.map((skill) => <span key={`${copy}-${skill}`}>{skill}<i>✳</i></span>)}</div>)}
        </div>
        <div className="focus-list" aria-label="Areas of expertise">
          {focusAreas.map((area) => <span key={area}>{area}</span>)}
        </div>
        <div className="skills-bottom"><span>IDEAS FIRST. TOOLS SECOND.</span><span>LEARNING IS PART OF THE JOB.</span></div>
      </section>

      <section id="contact" className="contact section-shell">
        <div className="section-label"><span>05 / YOUR TURN</span><span>GOOD THINGS START WITH A CONVERSATION</span></div>
        <div className="contact-main">
          <p className="contact-overline"><i /> OPEN TO MEANINGFUL COLLABORATIONS</p>
          <h2>
            <span className="contact-heading-line">Let&apos;s build</span>
            <span className="contact-heading-line">Something</span>
            <span className="contact-heading-line contact-heading-em"><em>Intelligent.</em></span>
          </h2>
          <p className="contact-copy">A thoughtful project, a curious problem, or just a hello — I&apos;d like to hear what you&apos;re thinking.</p>
          <a className="contact-cta" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`} target="_blank" rel="noreferrer"><span>LET&apos;S START A CONVERSATION</span><span><Arrow diagonal /></span></a>
        </div>
        <div className="contact-bottom">
          <div className="contact-availability"><span className="availability-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
          <div className="contact-items">
            {contactItems.map((item) => (
              <a
                className="contact-item"
                href={item.href}
                key={item.label}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                <ContactIcon icon={item.icon} />
                <span className="contact-item-copy">
                  <span className="contact-small-label">{item.label}</span>
                  <span className="contact-item-value">{item.value}</span>
                </span>
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#home" aria-label="Back to top" onClick={(event) => { event.preventDefault(); navigate("#home"); }}><Mark /><span>BACK TO THE BEGINNING <i>↑</i></span></a>
        {site.socialLinks.resume && <a className="footer-resume" href={site.socialLinks.resume} target="_blank" rel="noreferrer">VIEW RESUME <Arrow diagonal /></a>}
        <span>© {year} ARPIT PARULKAR. BUILT WITH CURIOSITY, CREATIVITY AND CODE.</span>
        <span>DESIGNED TO KEEP MOVING <i className="footer-spark">✳</i></span>
      </footer>
      <div
        className={`custom-cursor ${cursor.visible ? "cursor-visible" : ""} ${cursor.hovered ? "cursor-hover" : ""} ${cursor.label ? "cursor-project" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        {cursor.label}
      </div>
    </main>
  );
}
