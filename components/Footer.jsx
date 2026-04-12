'use client';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px' }}>Dharmik Thakur</span>
          <p className={styles.brandText}>Building the web, one line at a time.</p>
        </div>

        <nav className={styles.nav}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className={styles.navLink} onClick={e => scrollTo(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.socials}>
          <a href="https://github.com/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FiGithub /></a>
          <a href="https://linkedin.com/in/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FiLinkedin /></a>
          <a href="https://twitter.com/dharmikthakur" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FiTwitter /></a>
        </div>
      </div>

      <div className={`container ${styles.copy}`}>
        <span>© {year} Dharmik Thakur. Made with <FiHeart className={styles.heart} /> in India</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
