import style from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state=> state.cart);

    console.log(cart)

  return (
    <div className={style.container}>
        <div className={style.left}>
            <table className={style.table}>
                <tbody>

                
                    <tr className={style.trTitle}>
                        <th className={style.item}>Product</th>
                        <th className={style.item}>Name</th>
                        <th className={style.item}>Extras</th>
                        <th className={style.item}>Price</th>
                        <th className={style.item}>Quantity</th>
                        <th className={style.item}>Total</th>
                    </tr>
                    {
                        cart.products.map(product => (
                            
                            <tr className={style.row} key={product._id}>
                                <td className={style.item1}>
                                <div className={style.imgContainer}>
                                    <Image
                                    src={product.img}
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                    className={style.im}
                                    />
                                </div>
                                </td>
                                <td className={style.item1}>
                                <span className={style.name}>{product.title}</span>
                                </td >
                                <td className={style.item1}>
                                {product.extra.map((e, i) =>(
                                    <span key={i} className={style.extras}>{e.text}, </span>
                                ))}  
                                </td>
                                <td className={style.item1}>
                                <span className={style.price}>${product.price}</span>
                                </td>
                                <td className={style.item1}>
                                <span className={style.quantity}>{product.quantity}</span>
                                </td>
                                <td className={style.item1}>
                                <span className={style.total}>{product.price * product.quantity}</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
          
            </table>
        </div>
        <div className={style.right}>
            <div className={style.cart}>
                <div className={style.cartTitle}>
                    <h1>CART TOTAL</h1>
                </div>

                <div className={style.subTitle}>
                    <p className={style.sub}>Subtotal: <span className={style.subTotal}>{cart.total}</span></p>
                    <p className={style.sub}>Discount: <span className={style.discount}>$0.00</span></p>
                    <p className={style.sub}>Total: <span className={style.cartTotal}>{cart.total}</span></p>
                </div>
                
                <button className={style.cartBtn}>CHECK OUT NOW!</button>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Cart