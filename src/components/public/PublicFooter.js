import './../../App.css'
import React, { useState, useEffect } from 'react'
import DonationPopup from './DonationPopup'
import styles from './PublicApp.module.css'

function PublicFooter () {
  const [isDonationPopupOpen, setDonationPopupOpen] = useState(false)
  const [infoHome, setInfoHomeInfo] = useState('')

  const openDonationPopup = () => {
    setDonationPopupOpen(true)
  }

  const closeDonationPopup = () => {
    setDonationPopupOpen(false)
  }


  useEffect(() => {
    fetch('http://localhost:8080/fabrica-de-coduri-info/1', { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setInfoHomeInfo(result)
        },
        error => {
          console.log('Error fetching infoHomeInfo:', error)
        }
      )
  }, [])

  return (
    <div className={styles.footerContainer}>
      <footer className='footer'>
        <div className={styles.footer_container}>
          <div className='row'>
            <div className='col-md-4'>
              <h3 className = {styles.h3_footer}>Despre FdC</h3>
              <p className={styles.footerparagraph}>{infoHome.aboutFooter}</p>
            </div>
            <div className='col-md-4'>
              <h3 className={styles.h3_footer}>Donează</h3>
              <p className={styles.footerparagraph}>{infoHome.donateFooterContent}</p>
              <button className='btn btn-success' style={{ marginLeft: '80px' , paddingLeft: '10px' }} onClick={openDonationPopup}>
                Donează acum!
              </button>
            </div>
            <div className='col-md-4'>
              <h3 className={styles.h3_footer}>Contact</h3>
              <p className={styles.footerparagraph}>{infoHome.contactFooterContent}</p>
            </div>
          </div>
        </div>
        <hr className= {styles.hr_style} />
        <div className='row justify-content-center'>
          <div className='col-md-12 text-center'>
            <p>{infoHome.ownerInfo}</p>
          </div>
        </div>
      </footer>
      {isDonationPopupOpen && <DonationPopup onClose={closeDonationPopup} />}
    </div>
  )
}

export default PublicFooter