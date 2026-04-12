'use client';
import { useState } from 'react';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';
import styles from './Contact.module.css';

const INFO_ITEMS = [
  { icon: <FiMail />, label: 'Email', value: 'dharmikthakur@email.com', href: 'mailto:dharmikthakur@email.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'India 🇮🇳', href: null },
];

const SOCIALS = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/dharmikthakur' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/dharmikthakur' },
  { icon: <FiTwitter />, label: 'Twitter', href: 'https://twitter.com/dharmikthakur' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📬 Get In Touch</div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have a project in mind? Let&apos;s build something great together</p>
        </div>

        <div className={styles.grid}>
          {/* Left: Info */}
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Let&apos;s have a chat ✨</h3>
            <p className={styles.infoText}>
              I&apos;m currently open to full-time roles, freelance projects, and collaborations.
              Whether you have a question or just want to say hi — my inbox is always open!
            </p>

            <div className={styles.infoItems}>
              {INFO_ITEMS.map(item => (
                <div key={item.label} className={styles.infoItem}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} className={styles.infoValue}>{item.value}</a>
                      : <div className={styles.infoValue}>{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.socialSection}>
              <div className={styles.socialLabel}>Find me on</div>
              <div className={styles.socials}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form id="contact-form" className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project or just say hi! 👋"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              id="submit-btn"
              type="submit"
              className={`btn-primary ${styles.submitBtn}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <><span className={styles.spinner} /> Sending...</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </button>

            {status === 'success' && (
              <div className={styles.successMsg}>
                ✅ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className={styles.errorMsg}>
                ❌ Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
