import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../Components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A2342, #2EC4B6)',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '36rem',
          }}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e5e5',
              textAlign: 'center',
            }}>
              <h2 style={{
                color: '#0A2342',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
              }}>Privacy Policy</h2>
              <p style={{
                color: '#6c757d',
                fontSize: '0.875rem',
              }}>Effective Date: October 12, 2024</p>
            </div>
            <div style={{
              padding: '1.5rem',
              maxHeight: '60vh',
              overflowY: 'auto',
            }}>
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
                <section key={index} style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    color: '#0A2342',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}>{section.title}</h3>
                  <p style={{
                    color: '#333',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}>{section.content}</p>
                </section>
              ))}
            </div>
            <div style={{
              padding: '1rem',
              borderTop: '1px solid #e5e5e5',
              textAlign: 'center',
              backgroundColor: '#f8f9fa',
            }}>
              <p style={{
                color: '#6c757d',
                fontSize: '0.875rem',
                margin: 0,
              }}>Thank you for trusting Match Master with your data!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}