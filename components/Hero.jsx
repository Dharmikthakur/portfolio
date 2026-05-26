'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  FiGithub, FiLinkedin, FiTwitter, FiArrowRight,
  FiCode, FiServer, FiDownload, FiExternalLink
} from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTypescript, SiPython } from 'react-icons/si';
import styles from './Hero.module.css';

// ── Real data from skills.json (top picks across frontend + backend) ──
const TECH_STACK = [
  { icon: <SiReact />,      label: 'React',       color: '#61dafb' },
  { icon: <SiNextdotjs />,  label: 'Next.js',     color: '#fff'    },
  { icon: <SiNodedotjs />,  label: 'Node.js',     color: '#68a063' },
  { icon: <SiMongodb />,    label: 'MongoDB',     color: '#4db33d' },
  { icon: <SiTypescript />, label: 'TypeScript',  color: '#3178c6' },
  { icon: <SiPython />,     label: 'Python',      color: '#ffd43b' },
];

// ── Real roles matching Dharmik's actual skills ──
const ROLES = [
  'Full Stack Developer',
  'React & Next.js Dev',
  'Node.js Engineer',
  'MongoDB Architect',
];

// ── Real stats: 20+ projects + 15 certifications + 2+ yrs ──
const STATS = [
  { value: '20+', label: 'Projects' },
  { value: '15+',  label: 'Certifications' },
  { value: '2+', label: 'Years Exp.' },
];

export default function Hero() {
  const roleRef    = useRef(null);
  const idxRef     = useRef(0);
  const charRef    = useRef(0);
  const delRef     = useRef(false);
  const timerRef   = useRef();

  // Typewriter effect
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    const tick = () => {
      const word = ROLES[idxRef.current];
      if (!delRef.current) {
        el.textContent = word.slice(0, charRef.current + 1);
        charRef.current++;
        if (charRef.current === word.length) {
          delRef.current = true;
          timerRef.current = setTimeout(tick, 2200);
          return;
        }
      } else {
        el.textContent = word.slice(0, charRef.current - 1);
        charRef.current--;
        if (charRef.current === 0) {
          delRef.current = false;
          idxRef.current = (idxRef.current + 1) % ROLES.length;
        }
      }
      timerRef.current = setTimeout(tick, delRef.current ? 38 : 75);
    };

    timerRef.current = setTimeout(tick, 600);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgNoise} aria-hidden="true" />

      {/* Ambient orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* ───────────── LEFT COLUMN ───────────── */}
        <div className={styles.content}>

          {/* Status pill */}
          <div className={styles.statusWrapper}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Open to opportunities</span>
          </div>

          {/* Headline */}
          <h1 className={styles.titleBox}>
            <span className={styles.titleLine}>Hi, I&apos;m Dharmik</span>
            <span className={`${styles.titleLine} ${styles.textOutline}`}>Full Stack</span>
            <span className={`${styles.titleLine} ${styles.textGradient}`}>Developer.</span>
          </h1>

          {/* Typewriter terminal */}
          <div className={styles.terminal}>
            <span className={styles.terminalPrompt}>&gt;_</span>
            <span ref={roleRef} className={styles.typewriter} />
            <span className={styles.cursor} />
          </div>

          {/* Bio */}
          <p className={styles.description}>
            I build end-to-end web applications — from pixel-perfect UIs in{' '}
            <span className={styles.highlight}>React &amp; Next.js</span> to scalable
            APIs with{' '}
            <span className={styles.highlight}>Node.js &amp; MongoDB</span>.
            Currently pursuing B.Tech at GGITS &amp; crafting real-world products.
          </p>

          {/* Tech stack pills — from skills.json */}
          <div className={styles.techRow}>
            {TECH_STACK.map((t) => (
              <span
                key={t.label}
                className={styles.techPill}
                style={{ '--pill-color': t.color }}
              >
                <span className={styles.techIcon} style={{ color: t.color }}>
                  {t.icon}
                </span>
                {t.label}
              </span>
            ))}
          </div>

          {/* Stats — from projects.json & certifications.json */}
          <div className={styles.statsRow}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.actionGroup}>
            <a
              href="#projects"
              className={styles.primaryBtn}
              onClick={e => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <FiArrowRight className={styles.btnIcon} />
            </a>

            <a href="/resume.pdf" download className={styles.secondaryBtn}>
              <FiDownload />
              Download CV
            </a>
          </div>
          

          {/* Social links */}
          <div className={styles.socials}>
            <a href="https://github.com/Dharmikthakur" target="_blank" rel="noopener noreferrer"
               className={styles.socialBtn} aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/dharmik-thakur" target="_blank" rel="noopener noreferrer"
               className={styles.socialBtn} aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com/dharmikthakur" target="_blank" rel="noopener noreferrer"
               className={styles.socialBtn} aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="mailto:dharmikthakur@email.com"
               className={styles.socialBtn} aria-label="Email">
              <HiOutlineMail />
            </a>
          </div>
        </div>

        {/* ───────────── RIGHT COLUMN ───────────── */}
        <div className={styles.visual}>
          <div className={styles.glowBehind} />

          <div className={styles.imageContainer}>
            <div className={styles.imageInner}>
              <Image
                src="/dharmik.jpg"
                alt="Dharmik Thakur — Full Stack Developer"
                width={500}
                height={600}
                className={styles.photo}
                priority
              />
              <div className={styles.photoOverlay} />

              {/* Name tag on photo */}
              <div className={styles.nameTag}>
                <span className={styles.nameTagName}>Dharmik Thakur</span>
                <span className={styles.nameTagRole}>Full Stack Developer</span>
              </div>
            </div>

            {/* Float card 1 — Frontend stack (from skills.json) */}
            <div className={`${styles.floatCard} ${styles.floatCard1}`}>
              <div className={styles.cardIconWrap} style={{ background: 'rgba(97,218,251,0.12)', borderColor: 'rgba(97,218,251,0.25)' }}>
                <FiCode style={{ color: '#61dafb' }} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardVal}>React · Next.js</span>
                <span className={styles.cardLabel}>Frontend · 90%+ Proficiency</span>
              </div>
            </div>

            {/* Float card 2 — Backend stack (from skills.json) */}
            <div className={`${styles.floatCard} ${styles.floatCard2}`}>
              <div className={styles.cardIconWrap} style={{ background: 'rgba(104,160,99,0.12)', borderColor: 'rgba(104,160,99,0.25)' }}>
                <FiServer style={{ color: '#68a063' }} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardVal}>Node · MongoDB</span>
                <span className={styles.cardLabel}>Backend · 82%+ Proficiency</span>
              </div>
            </div>

            {/* Float card 3 — Live project badge */}
            <div className={`${styles.floatCard} ${styles.floatCard3}`}>
              <div className={styles.cardIconWrap} style={{ background: 'rgba(224,32,32,0.12)', borderColor: 'rgba(224,32,32,0.25)' }}>
                <FiExternalLink style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardVal}>Netflix Clone</span>
                <span className={styles.cardLabel}>Live on Vercel ↗</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
