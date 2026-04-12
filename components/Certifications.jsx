'use client';
import { useState, useEffect } from 'react';
import { FiExternalLink, FiAward } from 'react-icons/fi';
import styles from './Certifications.module.css';

export default function Certifications() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch('/api/certifications').then(r => r.json()).then(setCerts);
  }, []);

  return (
    <section id="certifications">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🏆 Achievements</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Credentials and professional achievements I&apos;ve earned</p>
        </div>

        <div className={styles.grid}>
          {certs.map((cert) => (
            <article key={cert.id} className={`glass-card ${styles.card}`}>
              <div className={styles.accentBar} style={{ background: cert.color }} />
              <div className={styles.cardContent}>
                <div className={styles.top}>
                  <div className={styles.iconWrap} style={{ background: `${cert.color}15`, borderColor: `${cert.color}30` }}>
                    <FiAward size={24} style={{ color: cert.color }} />
                  </div>
                  <div>
                    <div className={styles.issuer}>{cert.issuer}</div>
                    <div className={styles.date}>{cert.date}</div>
                  </div>
                </div>

                <h3 className={styles.title}>{cert.title}</h3>
                <p className={styles.desc}>{cert.description}</p>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.credLink}
                  style={{ color: cert.color, borderColor: `${cert.color}40` }}
                >
                  <FiExternalLink size={14} />
                  View Credential
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
