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
              <h3 className={styles.footerTitle}>Despre Noi</h3>
              <p className={styles.footerText}>
                Suntem dedicați să te ajutăm să înveți programarea într-un mod interactiv și captivant.
                Explorează limbaje precum JavaScript, Python, Java și altele, toate într-o singură platformă.
              </p>
            </div>

            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Susține Platforma</h3>
              <p className={styles.footerText}>
                Ne ajutăm comunitatea să crească! Donează pentru a susține educația digitală și a sprijini dezvoltarea
                continuă a platformei noastre. Fiecare contribuție contează.
              </p>
              <button className='btn btn-success' onClick={openDonationPopup}>
                Donează acum!
              </button>
            </div>

            <div className={`col-md-4 ${styles.footerContact}`}>
              <h3 className={styles.footerTitle}>Contactează-ne</h3>
              <p className={styles.footerText}>
                Ai întrebări sau sugestii? Suntem aici pentru tine! Scrie-ne la{' '}
                <a href="fabricadecoduri@gmail.com">fabricadecoduri@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <hr />

        <div className='row'>
          <div className={`col-md-12 ${styles.footerOwnerInfo}`}>
            <p className={styles.footerText}>
              &copy; {new Date().getFullYear()} Fabrica de Coduri. Toate drepturile rezervate. Creat cu pasiune
              pentru educație și tehnologie.
            </p>
          </div>
        </div>
      </footer>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
    </div>
  );
}

export default PublicFooter;
