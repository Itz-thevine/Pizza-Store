import React, { useState } from 'react'
import styles from '../../styles/admin.module.css'
import Image from 'next/image'
import axios from 'axios'

function Index({order, product, host}) {
    const [pizzaList, setPizzaList] = useState(product);
    const [orderList, setOrderList] = useState(order);
    const status = ['Preparing', 'on the way', 'delivered']
    
    
    const handleDelete = async (id)=>{
        try {
            await axios.delete(`http://${host}/api/products/`+id)
            setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatus = async (id) => {
        const item = orderList.filter(order=> order._id === id)[0]
        const currentStatus= item.status;

        try{
            const res = await axios.put(`http://${host}/api/order/`+id,  {status: currentStatus+1})

            setOrderList([
                res.data,
                ...orderList.filter(order => order._id !== id),
            ])

        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Image</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                {
                    pizzaList.map(prod => (
                        <tbody key={prod._id}>
                            <tr className={styles.trTitle}>
                                <td className={styles.item}>
                                    <div className={styles.imgContainer}>
                                        <Image
                                        src={prod.img}
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                        className={styles.im}
                                        />
                                    </div>
                                </td>
                                <td>{prod._id.slice(0,5)}...</td>
                                <td>{prod.title}</td>
                                <td>${prod.prices[0]}</td>
                                <td>
                                    <button className={styles.button}>Edit</button>
                                    <button className={styles.button} onClick={()=> handleDelete(prod._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            {
                orderList.map(order =>(
                    <table key={order._id} className={styles.table}>
                        <tbody>
                            <tr className={styles.trTitle}>
                                <th>Id</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className={styles.trTitle}>
                                <td className={styles.item}>
                                    {order._id.slice(0,5)}...
                                </td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>{order.method == 0 ? (<span>Cash</span>): (<span>Paid</span>)}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button className={styles.button} onClick={()=> handleStatus(order._id)}>Next Stage</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))
            }
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) =>{
    const {req} = ctx

    const mycookie = req?.cookies || '';

    if(mycookie.token !== process.env.TOKEN){
        return{
            redirect: {
                destination: './admin/login',
                permanent: false,
            }    
        }
    }

    let host
    if(req){
        host = req.headers.host
    }

    const productRes = await axios.get(`http://${host}/api/products`);
    const orderRes = await axios.get(`http://${host}/api/order`);

    return{
        props: {
            order: orderRes.data,
            product: productRes.data,
            host,
        }
    }
}

export default Index


