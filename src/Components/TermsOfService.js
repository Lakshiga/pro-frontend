import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../Components/Layout';

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',backgroundColor: '#000000', // Black background
  },
  card: {width: '100%',maxWidth: '36rem',
    backgroundColor: '#FFFFFF',  borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {padding: '1.5rem',borderBottom: '1px solid #e5e7eb',textAlign: 'center',
  },
  cardTitle: { color: '#CCFF00',  fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem',
  },
  cardText: { color: '#6b7280',  fontSize: '0.875rem',
  },
  cardBody: { padding: '1.5rem', maxHeight: '400px', overflowY: 'auto',
  },
  section: {marginBottom: '1.5rem',
  },
  sectionTitle: {color: '#CCFF00', fontWeight: 'bold',fontSize: '1.25rem',marginBottom: '0.5rem',
  },
  paragraph: { color: '#000000', fontSize: '1rem',lineHeight: '1.5',
  },
  link: { color: '#CCFF00',  textDecoration: 'none',
  },
  cardFooter: { padding: '1rem',borderTop: '1px solid rgba(204, 255, 0, 0.1)',textAlign: 'center',color: '#6b7280',  fontSize: '0.875rem',
  },
};

export default function TermsOfService() {
  return (
    <Layout>
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Terms of Service</h2>
              <p style={styles.cardText}>Last Updated: October 12, 2024</p>
            </div>
            <div style={styles.cardBody}>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>1. Acceptance of Terms</h3>
                <p style={styles.paragraph}>By accessing our platform, you agree to be bound by these Terms of Service...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>2. User Accounts</h3>
                <p style={styles.paragraph}>To access certain features, you must create an account...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>3. Payments and Fees</h3>
                <p style={styles.paragraph}>We provide both free and premium subscription options...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>4. User Responsibilities</h3>
                <p style={styles.paragraph}>Users agree to comply with all relevant laws...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>5. Verification of Organizers and Umpires</h3>
                <p style={styles.paragraph}>Organizers and umpires undergo verification to ensure the platform's integrity...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>6. Limitation of Liability</h3>
                <p style={styles.paragraph}>Our platform is provided "as-is" without warranties...</p>
              </section>
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>7. Contact Us</h3>
                <p style={styles.paragraph}>
                  For questions or concerns, please contact us at{' '}
                  <a href="mailto:support@matchmaster.com" style={styles.link}>
                    support@matchmaster.com
                  </a>
                  .
                </p>
              </section>
            </div>
            <div style={styles.cardFooter}>
              <p>Thank you for using Match Master!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
