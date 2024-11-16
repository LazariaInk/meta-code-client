import styles from '../styles/PublicApp.module.css'

function SocialLinks() {
  return (
    <div className={styles.social_links_container}>
      <a
        href='https://discord.com/invite/Bvf4wXfkMV?fbclid=PAZXh0bgNhZW0CMTEAAaYH0_aUofV8BoIDfvH-mjuTqg5mfTiO7RvC7hPdKmORzfMBnXkp4U5-MnM_aem_sOQf7hTHC9p25CPGWPMbvw'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.social_link}
      >
        <img
          src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg'
          alt='Discord'
          className={styles.social_icon}
        />
      </a>
      <a
        href='https://www.tiktok.com/@fabricadecoduri'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.social_link}
      >
        <img
          src='../../../images/TikTok_Icon_Black_Circle.png'
          alt='TikTok'
          className={styles.social_icon}
        />
      </a>
      <a
        href='https://www.youtube.com/@FabricadeCoduri'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.social_link}
      >
        <img
          src='../../../images/yt_logo_mono_dark.png'
          alt='YouTube'
          className={styles.social_icon}
        />
      </a>
    </div>
  )
}

export default SocialLinks
