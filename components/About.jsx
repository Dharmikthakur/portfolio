'use client';
import styles from './About.module.css';
import { FiCode, FiAward, FiCoffee, FiHeart } from 'react-icons/fi';

const stats = [
  { icon: <FiCode />, value: '2+', label: 'Years Experience' },
  { icon: <FiAward />, value: '6+', label: 'Certifications' },
  { icon: <FiCoffee />, value: '500+', label: 'Cups of Coffee' },
  { icon: <FiHeart />, value: '20+', label: 'Projects Built' },
];

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">👤 About Me</div>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">Passionate developer on a mission to turn ideas into reality</p>
        </div>

        <div className={styles.grid}>
          {/* Avatar / Visual */}
          <div className={styles.visual}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>D</span>
              </div>
              <div className={styles.avatarRing} />
              <div className={styles.floatingBadge}>
                <FiCode /> Full Stack Dev
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className={styles.bio}>
            <h3 className={styles.bioTitle}>
              Building the web, one line at a time 🚀
            </h3>
            <p className={styles.bioText}>
              Hey! I&apos;m <strong>Dharmik Thakur</strong>, a passionate Full Stack Developer who loves crafting elegant,
              performant web applications. I specialize in the JavaScript ecosystem — from React and Next.js
              on the frontend, to Node.js and Express on the backend.
            </p>
            <p className={styles.bioText}>
              I thrive at the intersection of great design and solid engineering. When I&apos;m not coding,
              you&apos;ll find me exploring new technologies, contributing to open source, or probably
              brewing another cup of coffee ☕
            </p>

            <div className={styles.education}>
              <h4 className={styles.edTitle}>🎓 Education</h4>
              <div className={styles.edItem}>
                <div className={styles.edDot} />
                <div>
                  <div className={styles.edDegree}>Bachelor of Computer Science</div>
                  <div className={styles.edSchool}>Gyan Ganga Institute of Technology and Sciences — 2024 to 2028</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <a href="#contact" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Let&apos;s Work Together
              </a>
              <a href="/resume.pdf" download className="btn-secondary">
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={`glass-card ${styles.statCard}`}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
