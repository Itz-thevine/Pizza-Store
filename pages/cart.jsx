import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice'
import OrderDetail from '../components/OrderDetail';




function Cart({host}) {
    const cart = useSelector(state=> state.cart);
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};

    

    const createOrder = async (data)=>{
        try{
            // console.log(data)
            const res = await axios.post(`http://${host}/api/order`, data); 
            res.status === 201 && router.push(`/order/${res.data._id}`);
            dispatch(reset())

            console.log('res', res)     
        }catch(err){
            console.log('err', err)
        }
    }


    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({ 
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },  
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // console.log(details)
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name, 
                                address: shipping.address.address_line_1, 
                                total: cart.total, 
                                method: 1,
                            }) 
                        });
                    }}
                />
            </>
        );
    }


  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <tbody className={styles.tbdy}>
                    <tr className={styles.trTitle}>
                        <th className={styles.item}>Product</th>
                        <th className={styles.item}>Name</th>
                        <th className={styles.item}>Extras</th>
                        <th className={styles.item}>Price</th>
                        <th className={styles.item}>Quantity</th>
                        <th className={styles.item}>Total</th>
                    </tr>
                </tbody>

                <tbody className={styles.tbdy}>
                    {
                        cart.products.map(product => (
                            
                            <tr className={styles.row} key={product._id}>
                                <td className={styles.item1}>
                                <div className={styles.imgContainer}>
                                    <Image
                                    src={product.img}
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                    className={styles.im}
                                    />
                                </div>
                                </td>
                                <td className={styles.item1}>
                                <span className={styles.name}>{product.title}</span>
                                </td >
                                <td className={styles.item1}>
                                {product.extra.map((e, i) =>(
                                    <span key={i} className={styles.extras}>{e.text}, </span>
                                ))}  
                                </td>
                                <td className={styles.item1}>
                                <span className={styles.price}>${product.price}</span>
                                </td>
                                <td className={styles.item1}>
                                <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td className={styles.item1}>
                                <span className={styles.total}>{product.price * product.quantity}</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
          
            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.cart}>
                <div className={styles.cartTitle}>
                    <h1>CART TOTAL</h1>
                </div>

                <div className={styles.subTitle}>
                    <p className={styles.sub}>Subtotal: <span className={styles.subTotal}>{cart.total}</span></p>
                    <p className={styles.sub}>Discount: <span className={styles.discount}>$0.00</span></p>
                    <p className={styles.sub}>Total: <span className={styles.cartTotal}>{cart.total}</span></p>
                </div>
                
                
                {
                    open ? (
                        <div className={styles.paymentMethod}>
                            <button className={styles.cashDelivery} onClick={()=> setCash(true)}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider
                            options={{
                                "client-id": "AeHD7YIXd3Kkwz6sAnNpagQ-Qc0nMGtNJ3nlZEDR8KKAOevVB_8ml0nT3Exv87M0U1Nyyp3uyOFHhCKC",
                                components: "buttons",
                                currency: "USD",
                                'disable-funding': 'credit, card, p24'
                            }}
                            > 
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                        </div>

                    ): (
                        <button onClick={()=> setOpen(true)} className={styles.cartBtn}>CHECK OUT NOW!</button>
                    )
                }
            </div>
        </div>{
            cash && (
                <OrderDetail total={cart.total} createOrder={createOrder} />
            )

        }
    </div>
  )
}

export default Cart

export const getServerSideProps = async ({req}) =>{
    let host
    if (req) {
        host = req.headers.host
    }

    return{
        props: {
            host,
        },
    }
}