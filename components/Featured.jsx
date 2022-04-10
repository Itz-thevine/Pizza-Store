import React from 'react'
import styles from '../styles/Featured.module.css'
import * as MdIcons from 'react-icons/md'
import Image from 'next/image'
import { useState } from 'react'

function Featured() {
    const images = [
        '/imgs/image-1.png',
        '/imgs/image-2.png',
        '/imgs/image-3.png'
    ]

    const [counter, setCounter] = useState(0)

    const handleClick = (direction) =>{
        if (direction ==='l') {
            setCounter(counter !== 0 ? counter-1 : 2)
        }
        if (direction ==='r') {
            setCounter(counter !== 2 ? counter+1 : 0)
        }
    }

    console.log(counter)

  return (
    <div className={styles.container} style={{marginTop: '100px'}}>
        <div className={styles.nav} style={{left:'0'}} onClick={()=>handleClick("l")}>
            <MdIcons.MdNavigateBefore/>   
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-92* counter}vw)`}}>
                {
                    images.map((image, i)=>(
                        <div className={styles.imgContainer} key={i}>
                            <Image src={image} className={styles.hp} alt='featured image' layout='fill' objectFit='contain'/>
                        </div>
                    ))
                }
        </div>
        <div className={styles.nav} style={{right:'0'}} onClick={()=>handleClick("r")}>
            <MdIcons.MdNavigateNext />   
        </div>
        <div></div>
    </div>
  )
}

export default Featured