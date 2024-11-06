import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../Components/Layout';

const styles = {
  container: {minHeight: '100vh',display: 'flex',alignItems: 'center',justifyContent: 'center',padding: '1rem',backgroundColor: '#000000'},
  card: {width: '100%',maxWidth: '36rem',backgroundColor: '#FFFFFF',  borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',},
  cardHeader: { padding: '1.5rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center',},
  cardTitle: {color: '#CCFF00',  fontWeight: 'bold',fontSize: '1.5rem',marginBottom: '0.5rem',},
  cardText: { color: '#6b7280', fontSize: '0.875rem',},
  cardBody: { padding: '1.5rem', maxHeight: '400px', overflowY: 'auto',},
  section: { marginBottom: '1.5rem',},
  sectionTitle: {color: '#CCFF00', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', },
  paragraph: {color: '#000000',  fontSize: '1rem', lineHeight: '1.5',},
  link: {color: '#CCFF00', textDecoration: 'none',},
  cardFooter: { padding: '1rem', borderTop: '1px solid rgba(204, 255, 0, 0.1)', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', },
};

export default function PrivacyPolicy() {
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
              <h2 style={styles.cardTitle}>Privacy Policy</h2>
              <p style={styles.cardText}>Effective Date: October 12, 2024</p>
            </div>
            <div style={styles.cardBody}>
              {[
                { title: '1. Introduction', content: 'We value your privacy and are committed to protecting your personal information. This policy explains...' },
                { title: '2. Information Collection', content: 'We collect information you provide to us directly, such as when you create an account...' },
                { title: '3. Use of Information', content: 'We use your information to provide, maintain, and improve our services...' },
                { title: '4. Sharing of Information', content: 'We may share information with third parties only in specific situations, such as...' },
                { title: '5. Data Security', content: 'We take reasonable measures to protect your personal data from unauthorized access...' },
                { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal information...' },
                { title: '7. Changes to This Policy', content: 'We may update this privacy policy from time to time to reflect changes in our practices...' },
                { title: '8. Contact Us', content: 'If you have questions or concerns, please contact us at privacy@matchmaster.com.' },
              ].map((section, index) => (
                <section key={index} style={styles.section}>
                  <h3 style={styles.sectionTitle}>{section.title}</h3>
                  <p style={styles.paragraph}>{section.content}</p>
                </section>
              ))}
            </div>
            <div style={styles.cardFooter}>
              <p>Thank you for trusting Match Master with your data!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
