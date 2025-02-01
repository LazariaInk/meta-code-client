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
          În semn de recunoștință, toți sponsorii vor fi adăugați în <strong>tabela noastră de susținători</strong>, pentru
          a le mulțumi public pentru contribuțiile lor. Fii parte din comunitatea noastră de sprijin!
        </p>
        <p>
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="2R5NB6PAWHUT4" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>

        </p>

      </div>
    </div>
  );
}

export default DonationPopup;
