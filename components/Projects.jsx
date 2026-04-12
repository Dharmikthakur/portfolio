'use client';
import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import styles from './Projects.module.css';

const CATEGORIES = ['All', 'Web', 'API'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects);
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💼 Portfolio</div>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Things I&apos;ve built, shipped, and learned from</p>
        </div>

        <div className={styles.filters}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map(project => (
            <article key={project.id} className={`glass-card ${styles.card}`}>
              <div className={styles.imgWrap}>
                <img src={project.image} alt={project.title} className={styles.img} loading="lazy" />
                {project.featured && <span className={styles.featuredBadge}>⭐ Featured</span>}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.techStack.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <FiGithub /> Code
                  </a>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.liveLInk}`}>
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
