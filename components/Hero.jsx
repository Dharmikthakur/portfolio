'use client';
import { useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './Hero.module.css';

const ROLES = ['Full Stack Developer', 'React Enthusiast', 'UI/UX Lover', 'Open Source Contributor'];

export default function Hero() {
  const roleRef = useRef(null);
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;
    let timeout;

    const type = () => {
      const current = ROLES[roleIndex];
      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(type, deleting ? 60 : 100);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      {/* Animated grid */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.pulse} />
          Available for opportunities
        </div>

        <h1 className={styles.name}>
          Hi, I&apos;m <span className="gradient-text">Dharmik Thakur</span> 👋
        </h1>

        <h2 className={styles.role}>
          <span ref={roleRef} className={styles.typewriter} />
          <span className={styles.cursor}>|</span>
        </h2>

        <p className={styles.tagline}>
          Building elegant, high-performance web experiences with modern technologies.
          Passionate about clean code, great UX, and solving real problems.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View My Work
          </a>
          <a href="#contact" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get In Touch
          </a>
        </div>

        <div className={styles.socials}>
          <a href="https://github.com/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://twitter.com/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
            <FiTwitter />
          </a>
          <a href="mailto:dharmik@email.com" className={styles.socialLink} aria-label="Email">
            <HiOutlineMail />
          </a>
        </div>
      </div>

      <button className={styles.scrollBtn} onClick={scrollDown} aria-label="Scroll down">
        <FiArrowDown />
      </button>
    </section>
  );
}
