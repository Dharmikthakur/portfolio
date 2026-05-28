import Link from 'next/link';
import { Metadata } from 'next';
import { FiArrowLeft, FiAward, FiDownload, FiExternalLink } from 'react-icons/fi';
import certificationsData from '@/data/certifications.json';
import styles from './page.module.css';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  const cert = certificationsData.find((c) => c.id === id);

  return {
    title: cert ? `${cert.title} | Certifications` : 'Certification Not Found',
    description: cert ? cert.description : 'Certification details and credential view',
  };
}

export default function CertificationPage({ params }: Props) {
  const id = parseInt(params.id);
  const cert = certificationsData.find((c) => c.id === id);

  if (!cert) {
    return (
      <div className={styles.errorWrapper}>
        <FiAward size={64} style={{ color: 'var(--accent-primary)', opacity: 0.5 }} />
        <h1 className={styles.errorTitle}>Certification Not Found</h1>
        <p>The credential you are looking for does not exist or has been removed.</p>
        <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
          <FiArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Construct the URL path to the PDF inside public/ folder
  const pdfUrl = `/${encodeURIComponent(cert.pdf)}`;

  return (
    <div className={styles.wrapper}>
      {/* Dynamic Background Orb matching the certificate's brand color */}
      <div 
        className={styles.bgOrb} 
        style={{ 
          background: `radial-gradient(circle, ${cert.color}15 0%, transparent 70%)` 
        }} 
      />

      <main className={styles.container}>
        {/* Left Panel: Certification Details */}
        <section className={styles.sidebar}>
          <Link href="/#certifications" className={styles.backBtn}>
            <FiArrowLeft size={16} /> Back to Portfolio
          </Link>

          <article className={`glass-card ${styles.badgeCard}`}>
            <div className={styles.accentBar} style={{ background: cert.color }} />
            
            <div 
              className={styles.iconWrap} 
              style={{ 
                background: `${cert.color}15`, 
                borderColor: `${cert.color}30` 
              }}
            >
              <FiAward size={32} style={{ color: cert.color }} />
            </div>

            <div className={styles.meta}>
              <span className={styles.issuer}>{cert.issuer}</span>
              <span className={styles.date}>Issued {cert.date}</span>
            </div>

            <h1 className={styles.title}>{cert.title}</h1>
            <p className={styles.desc}>{cert.description}</p>

            <div className={styles.actions}>
              <a 
                href={cert.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.btn} ${styles.btnPrimary}`}
                style={{ background: cert.color }}
              >
                <FiExternalLink size={16} /> Verify Credential
              </a>
              <a 
                href={pdfUrl} 
                download={cert.pdf} 
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                <FiDownload size={16} /> Download Certificate (PDF)
              </a>
            </div>
          </article>
        </section>

        {/* Right Panel: Interactive PDF View */}
        <section className={`glass-card ${styles.previewContainer}`}>
          <div className={styles.previewHeader}>
            <span className={styles.previewTitle}>Credential Preview</span>
            <span>{cert.pdf}</span>
          </div>
          <div className={styles.iframeWrapper}>
            <iframe 
              src={pdfUrl} 
              className={styles.iframe} 
              title={`${cert.title} PDF Preview`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
