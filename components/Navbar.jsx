import React from 'react'
import style from '../styles/Navbar.module.css'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'


const Navbar = React.forwardRef(() => {

    const quantity = useSelector(state=>state.cart.quantity)

    return (
        <div className={style.container}>
            <div className={style.cont1}>
                <div className={style.circle}>
                    <AiIcons.AiOutlinePhone className={style.phone}/>
                </div>
                <div className={style.textControl}>
                    <p className={style.pL}>ORDER NOW!</p>
                    <p className={style.pB}>+234 90 3333 5459</p>
                </div>
            </div>     
            <div className={style.cont2}>
                <ul className={style.ul}>
                    <Link href='/' passHref>
                        <li className={style.ulItems}>Home</li>
                    </Link>
                    <li className={style.ulItems}>Products</li>
                    <li className={style.ulItems}>Menu</li>
                    <Image src='/imgs/logo.png' height='40' width='120'  style={{cursor: 'pointer'}}/>
                    <li className={style.ulItems}>Event</li>
                    <li className={style.ulItems}>Blog</li>
                    <li className={style.ulItems}>Contact</li>
                </ul>
            </div>     
            <Link href='/cart' passHref>
                <div className={style.cont3}>
                    <div className={style.cart}>
                        <BsIcons.BsCart2 />
                    </div>
                    <div className={style.circleSm}>
                        <p style={{color:'#d1411e', margin: '0px 0 0 0 0px'}}>{quantity}</p>
                    </div>
                </div>     
            </Link>
        </div>
  )
})

export default Navbar