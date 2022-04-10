import style from '../styles/Cart.module.css'
import Image from 'next/image'

function Cart() {
  return (
    <div className={style.container}>
        <div className={style.left}>
            <table className={style.table}>
                <tr className={style.trTitle}>
                    <th className={style.item}>Product</th>
                    <th className={style.item}>Name</th>
                    <th className={style.item}>Extras</th>
                    <th className={style.item}>Price</th>
                    <th className={style.item}>Quantity</th>
                    <th className={style.item}>Total</th>
                </tr>
                <tr className={style.row}>
                    <td className={style.item1}>
                    <div className={style.imgContainer}>
                        <Image
                        src="/imgs/pizza.png"
                        layout="fill"
                        objectFit="cover"
                        alt=""
                        className={style.im}
                        />
                    </div>
                    </td>
                    <td className={style.item1}>
                    <span className={style.name}>CORALZO</span>
                    </td >
                    <td className={style.item1}>
                    <span className={style.extras}>
                        Double ingredient, spicy sauce
                    </span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.price}>$19.90</span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.quantity}>2</span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.total}>$39.80</span>
                    </td>
                </tr>
                <tr className={style.row}>
                    <td className={style.item1}>
                    <div className={style.imgContainer}>
                        <Image
                        src="/imgs/pizza.png"
                        layout="fill"
                        objectFit="cover"
                        alt=""
                        />
                    </div>
                    </td>
                    <td className={style.item1}>
                    <span className={style.name}>CORALZO</span>
                    </td >
                    <td className={style.item1}>
                    <span className={style.extras}>
                        Double ingredient, spicy sauce
                    </span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.price}>$19.90</span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.quantity}>2</span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.total}>$39.80</span>
                    </td>
                </tr>
            </table>
        </div>
        <div className={style.right}>
            <div className={style.cart}>
                <div className={style.cartTitle}>
                    <h1>CART TOTAL</h1>
                </div>

                <div className={style.subTitle}>
                    <p className={style.sub}>Subtotal: <span className={style.subTotal}>$79.00</span></p>
                    <p className={style.sub}>Discount: <span className={style.discount}>$0.00</span></p>
                    <p className={style.sub}>Total: <span className={style.cartTotal}>$79.00</span></p>
                </div>
                
                <button className={style.cartBtn}>CHECK OUT NOW!</button>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Cart