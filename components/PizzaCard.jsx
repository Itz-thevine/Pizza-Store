import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'


function PizzaCard() {
  return (
    <div className={styles.container}>
      <Image src='/imgs/pizza.png' alt='pizza' height={300} width={300}/>
      <h1 className={styles.title}>FIORI DI ZUCCA</h1>
      <span className={styles.price}>$19.90</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  )
}

export default PizzaCard