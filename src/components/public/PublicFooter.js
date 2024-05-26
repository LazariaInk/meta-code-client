import './../../App.css';
import React, { useState, useEffect } from 'react';
import DonationPopup from './DonationPopup';
import styles from './Footer.module.css';
import { API_BASE_URL } from '../config/endpoints';

function PublicFooter() {
  const [isDonationPopupOpen, setDonationPopupOpen] = useState(false);
  const [infoHome, setInfoHomeInfo] = useState('');

  const openDonationPopup = () => {
    setDonationPopupOpen(true);
  };

  const closeDonationPopup = () => {
    setDonationPopupOpen(false);
  };

  useEffect(() => {
    fetch(API_BASE_URL + 'fabrica-de-coduri-info/1', { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setInfoHomeInfo(result);
        },
        error => {
          console.log('Error fetching infoHomeInfo:', error);
        }
      );
  }, []);

  return (
    <div className={styles.footerContainer}>
      <footer className='footer'>
        <div className={styles.footer_container}>
          <div className='row'>
            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Despre FdC</h3>
              <p className={styles.footerText}>{infoHome.aboutFooter}</p>
            </div>
            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Donează</h3>
              <p className={styles.footerText}>{infoHome.donateFooterContent}</p>
              <button className='btn btn-success' onClick={openDonationPopup}>
                Donează acum!
              </button>
            </div>
            <div className='col-md-4'>
              <h3 className={styles.footerTitle}>Contact</h3>
              <p className={styles.footerText}>{infoHome.contactFooterContent}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='row justify-content-center'>
          <div className='col-md-12 text-center'>
            <p className={styles.footerText}>{infoHome.ownerInfo}</p>
          </div>
        </div>
      </footer>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
    </div>
  );
}

export default PublicFooter;
