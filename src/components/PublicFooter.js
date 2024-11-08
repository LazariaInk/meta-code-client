import React, { useState, useEffect } from 'react';
import DonationPopup from './DonationPopup';
import styles from '../styles/Footer.module.css';
import { initGA, logPageView } from './config/analytics';

function PublicFooter({ fullWidth }) {
  const [isDonationPopupOpen, setDonationPopupOpen] = useState(false);

  const openDonationPopup = () => {
    setDonationPopupOpen(true);
  };

  const closeDonationPopup = () => {
    setDonationPopupOpen(false);
  };


  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      logPageView();
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <div className={`${styles.footerContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      <footer className='footer'>
        <div className={styles.footer_container}>
          <div className='row'>
            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Despre FdC</h3>
              <p className={styles.footerText}>About footer text</p>
            </div>
            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Donează</h3>
              <p className={styles.footerText}>Donate footer content</p>
              <button className='btn btn-success' onClick={openDonationPopup}>
                Donează acum!
              </button>
            </div>
            <div className={`col-md-4 ${styles.footerContact}`}>
              <h3 className={styles.footerTitle}>Contact</h3>
              <p className={styles.footerText}>content footer text</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className={`col-md-12 ${styles.footerOwnerInfo}`}>
            <p className={styles.footerText}>owner info text</p>
          </div>
        </div>
      </footer>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
    </div>
  );
}

export default PublicFooter;
