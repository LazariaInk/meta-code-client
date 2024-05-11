import styles from './PublicApp.module.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DonationPopup from './DonationPopup'

function PublicNavigation () {
  const navigate = useNavigate()
  const [isDonationPopupOpen, setDonationPopupOpen] = useState(false)

  const openDonationPopup = () => {
    setDonationPopupOpen(true)
  }

  const closeDonationPopup = () => {
    setDonationPopupOpen(false)
  }

  return (
    <div>
      <div className={styles.main_nav}>
        <div className={styles.logo}>
          <Link to='/' className={styles.logo__text}>
          <img
          src='../../../images/Logo_color.png'
          alt='FdC'
          className={styles.logo}
        />
          </Link>
        </div>
        <ul className={styles.nav_links}>
          <li>
            <Link to='/'>Acasa</Link>
          </li>
          <li>
            <Link to='/problems'>probleme</Link>
          </li>
          <li>
            <a href='#' onClick={openDonationPopup}>
              doneaza
            </a>
          </li>
        </ul>
      </div>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
    </div>
  )
}

export default PublicNavigation