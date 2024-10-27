import React, { useState, useEffect } from 'react'
import styles from '././PublicApp.module.css'
import { API_BASE_URL } from '../config/endpoints';

function DonationPopup ({ onClose }) {
  const [infoHome, setInfoHomeInfo] = useState('')

  useEffect(() => {
    fetch(API_BASE_URL + 'fabrica-de-coduri-info/1', { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setInfoHomeInfo(result)
        },
        error => {
          alert('Error fetching infoHomeInfo:', error)
        }
      )
  }, [])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.donationPopup} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &#10006;
        </button>
        <h2>{infoHome.donateTitle}</h2>
        <p>{infoHome.donateContent}</p>
      </div>
    </div>
  )
}

export default DonationPopup
