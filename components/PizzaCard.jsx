import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const PizzaCard = React.forwardRef(({pizza}, ref) => {
  console.log(pizza.img)
  return (
    <div className={styles.container}>
      <Link href={`product/${pizza._id}`} ref={ref}>
        <img src={pizza.img} alt='pizza' height={300} width={300} layout="responsive" priority='low' />
      </Link>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>{pizza.prices[0]}</span>
        <p className={styles.desc}>
        {pizza.desc}
        </p>
    </div>
  )
})

export default PizzaCard