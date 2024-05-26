import styles from './Navigation.module.css'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DonationPopup from './DonationPopup'

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

  return (
    <div ref={navRef}>
      <div className={styles.main_nav}>
        <div>
          <Link to='/'>
            <img
              src='../../../images/Logo_color.png'
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
    </div>
  );
}

export default PublicNavigation