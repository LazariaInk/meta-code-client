import styles from '../styles/PublicApp.module.css'

function DonationPopup ({ onClose }) {

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.donationPopup} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &#10006;
        </button>
        <h2>Susține Educația Digitală!</h2>
        <p>
          Fii parte din schimbare! Contribuția ta ajută la dezvoltarea platformei noastre educaționale, oferind acces
          gratuit la resurse de programare și sprijinind comunitatea pasionată de tehnologie.
        </p>
        <p>
          Fiecare donație ne aduce mai aproape de misiunea noastră: de a oferi educație de calitate tuturor,
          indiferent de nivelul de cunoștințe sau locație.
        </p>
        <p>
          Donează acum și ajută la construirea viitorului tehnologic! Cont Revolut:
          <strong> RO21 BREL 0005 5453 8388 0100</strong>
        </p>
        <p>
          De asemenea, poți împărtăși această inițiativă cu prietenii tăi pentru a amplifica impactul pozitiv al
          comunității noastre.
        </p>
        <p>
          Îți mulțumim pentru susținere și pentru că ești alături de noi în această călătorie! 🌟
        </p>
      </div>
    </div>
  )
}

export default DonationPopup
