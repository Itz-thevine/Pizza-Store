import style from '../../styles/Order.module.css'
import Image from 'next/image'
import axios from 'axios';

function Order({order}) {
    console.log(order)

    const status = order.status;

    const setStatus = (index) =>{
        if(index - status < 1) return style.done
        if(index - status === 1) return style.inProgress
        if(index - status > 1) return style.unDone
    }

  return (
    <div className={style.container}>
        <div className={style.left}>
            <table className={style.table}>
                <tr className={style.trTitle}>
                    <th className={style.item}>Order Id</th>
                    <th className={style.item}>Customer</th>
                    <th className={style.item}>Address</th>
                    <th className={style.item}>Total</th>
                </tr>
                <tr className={style.row}>
                    <td className={style.item1}>
                    <span className={style.id}>{order._id}</span>
                    </td >
                    <td className={style.item1}>
                    <span className={style.name}>
                    {order.customer}
                    </span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.address}>{order.address}</span>
                    </td>
                    <td className={style.item1}>
                    <span className={style.total}>${order.total}</span>
                    </td>
                </tr>
            </table>
            <div className={style.row}>
                   <div className={style.wrapper}>
                        <div className={setStatus(0)}>
                            <div className={style.status}>
                                <Image src='/imgs/paid.png' width={50} height={50} objectFit='contain'/><span>Payment</span>
                                <div className={style.img}><Image src='/imgs/checked.png' width={20} height={20}/></div>
                            </div >
                        </div>
                        <div className={setStatus(1)}>
                            <div className={style.status}>
                                <Image src='/imgs/bake.png' width={50} height={50}/><span>Preparing</span>
                                <div className={style.img}><Image src='/imgs/checked.png' width={20} height={20}/></div>
                            </div >
                        </div>
                        <div className={setStatus(2)}>
                            <div className={style.status}>
                                <Image src='/imgs/bike.png' width={50} height={50}/><span>On the way</span>
                                <div className={style.img}><Image src='/imgs/checked.png' width={20} height={20}/></div>
                            </div >
                        </div>
                        <div className={setStatus(3)}>
                            <div className={style.status}>
                                <Image src='/imgs/delivered.png' width={50} height={50}/><span>Delivered</span>
                                <div className={style.img}><Image src='/imgs/checked.png' width={20} height={20}/></div>
                            </div >
                        </div>
                   </div>
                   
                </div>
        </div>
        <div className={style.right}>
            <div className={style.cart}>
                <div className={style.cartTitle}>
                    <h1>CART TOTAL</h1>
                </div>

                <div className={style.subTitle}>
                    <p className={style.sub}>Subtotal: <span className={style.subTotal}>${order.total}</span></p>
                    <p className={style.sub}>Discount: <span className={style.discount}>$0.00</span></p>
                    <p className={style.sub}>Total: <span className={style.cartTotal}>${order.total}</span></p>
                </div>
                
                <button disabled className={style.cartBtn}>PAID!</button>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = async ({params})=> {
    const res = await axios.get(`http://localhost:3005/api/order/${params.id}`);
    return{
        props: {order: res.data},
    }
}

export default Order