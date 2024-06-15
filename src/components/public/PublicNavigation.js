import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DonationPopup from './DonationPopup';
import styles from './Navigation.module.css';

function PublicNavigation () {
  const [isDonationPopupOpen, setDonationPopupOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);

  const openDonationPopup = () => {
    setDonationPopupOpen(true);
  };

  const closeDonationPopup = () => {
    setDonationPopupOpen(false);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      closeNav();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div ref={navRef}>
      <div className={styles.main_nav}>
        <div>
          <Link to='/'>
            <img
              src={process.env.PUBLIC_URL + '/images/Logo_color.png'}
              alt='FdC'
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.hamburger} onClick={toggleNav}>
          <div />
          <div />
          <div />
        </div>
        <ul className={`${styles.nav_links} ${isNavOpen ? styles.nav_active : ''}`}>
          <li>
            <Link to='/' onClick={closeNav}>Acasa</Link>
          </li>
          <li>
            <Link to='/problems' onClick={closeNav}>Probleme</Link>
          </li>
          <li>
            <a href='#' onClick={() => { openDonationPopup(); closeNav(); }}>
              Doneaza
            </a>
          </li>
        </ul>
      </div>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="YOUR_ADSENSE_CLIENT_ID"
           data-ad-slot="YOUR_AD_SLOT_ID"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

export default PublicNavigation;
