'use client';
import { useState, useEffect } from 'react';
import styles from './Skills.module.css';

const ICONS = {
  SiReact: '⚛️', SiNextdotjs: '▲', SiTypescript: 'TS', SiJavascript: 'JS',
  SiHtml5: '🌐', SiCss3: '🎨', SiNodedotjs: '🟢', SiExpress: 'Ex',
  SiPython: '🐍', SiMongodb: '🍃', SiPostgresql: '🐘', SiPostman: '📮',
  SiGithub: '🐙', SiDocker: '🐳', SiVercel: '▲', SiVisualstudiocode: '💻',
  SiFigma: '🎭', SiFirebase: '🔥',
};

const CATEGORY_MAP = {
  frontend: { label: 'Frontend', color: '#8b5cf6' },
  backend: { label: 'Backend', color: '#06b6d4' },
  tools: { label: 'Tools & DevOps', color: '#f59e0b' },
};

export default function Skills() {
  const [skills, setSkills] = useState(null);
  const [active, setActive] = useState('frontend');

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(setSkills);
  }, []);

  if (!skills) return (
    <section id="skills"><div className="container"><div className={styles.loading}>Loading skills...</div></div></section>
  );

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🛠️ Tech Stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">The tools and technologies I work with every day</p>
        </div>

        <div className={styles.tabs}>
          {Object.entries(CATEGORY_MAP).map(([key, { label, color }]) => (
            <button
              key={key}
              className={`${styles.tab} ${active === key ? styles.activeTab : ''}`}
              onClick={() => setActive(key)}
              style={active === key ? { borderColor: color, color } : {}}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {(skills[active] || []).map((skill, i) => (
            <div key={skill.name} className={`glass-card ${styles.skillCard}`}>
              <div className={styles.cardTop}>
                <div className={styles.icon}>{ICONS[skill.icon] || '⚡'}</div>
                <div>
                  <div className={styles.skillName}>{skill.name}</div>
                  <div className={styles.skillLevel}>{skill.level}%</div>
                </div>
              </div>
              <div className={styles.barBg}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${skill.level}%`,
                    background: CATEGORY_MAP[active].color,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
