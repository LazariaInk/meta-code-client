import styles from '../styles/PublicApp.module.css'

function DonationPopup ({ onClose }) {

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.donationPopup} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &#10006;
        </button>
        <h2>Titlu donat</h2>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
        <p>Lorem Lorem LoremLorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem</p>
      </div>
    </div>
  )
}

export default DonationPopup
