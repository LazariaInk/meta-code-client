import styles from '../styles/PublicApp.module.css';

function DonationPopup({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.donationPopup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &#10006;
        </button>
        <h2>Susține Educația Digitală!</h2>
        <p>
          Fii parte din schimbare! Contribuția ta ajută la dezvoltarea platformei noastre educaționale, oferind acces
          gratuit la resurse de programare și sprijinind comunitatea pasionată de tehnologie.
        </p>
        <p>
          Fiecare contribuție ne aduce mai aproape de misiunea noastră: de a oferi educație de calitate tuturor,
          indiferent de nivelul de cunoștințe sau locație.
        </p>
        <p>
          Susține viitorul educației digitale acum! Cont Revolut:
          <strong> RO21 BREL 0005 5453 8388 0100</strong>
        </p>
        <p>
          În semn de recunoștință, toți sponsorii vor fi adăugați în <strong>tabela noastră de susținători</strong>, pentru
          a le mulțumi public pentru contribuțiile lor. Fii parte din comunitatea noastră de sprijin!
        </p>

      </div>
    </div>
  );
}

export default DonationPopup;
