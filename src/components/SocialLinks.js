import styles from './public/PublicApp.module.css'

function SocialLinks() {
  return (
    <div className={styles.social_links_container}>
      <a
        href='https://discord.com'
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
        href='https://www.tiktok.com'
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
        href='https://www.youtube.com'
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
