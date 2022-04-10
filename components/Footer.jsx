import styles from '../styles/Footer.module.css'
import Image from 'next/image'

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/imgs/bg.png" objectFit="cover" layout="fill" alt="bg image" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE DEV_THEVINE PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            159 Aba Road
            <br /> Port Harcourt, Rivers
            <br />+234 84 233743
          </p>
          <p className={styles.text}>
             8,Andrew Bassey Street
            <br /> Calabar South
            <br />  +2347066159048
          </p>
          <p className={styles.text}>
          Hazcon Yard Esuk Utan, Calabar Municipal
            <br /> Cross River
            <br /> (+234) 1-7938247
          </p>
          <p className={styles.text}>
            48, Mushin Road.
            <br />   Isolo, Oshodi Isolo
            <br />  +2348033344151
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer