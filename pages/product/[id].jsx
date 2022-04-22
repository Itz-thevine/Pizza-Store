import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';


function Product({pizza}) {

  // console.log(pizza)

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extra, setExtra] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
      setPrice(price + number)
  }
 
  const handleSize = (sizeIndex) =>{
      const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference);
  }

  const handleChange = (e, option) =>{
    const check = e.target.checked;
    if (check) {
      changePrice(option.price);
      setExtra((prev) => [...prev, option])
    }else{
      changePrice(-option.price)
      setExtra(extra.filter((extra) => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    dispatch(addProduct({...pizza, extra, price, quantity}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image src={pizza.img} layout='fill' alt='the pizza image' objectFit='contain' className={styles.im}></Image>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>{price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/imgs/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/imgs/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/imgs/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {
            pizza.extra.map((option)=>(
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e)=> handleChange(e, option)}
                />
                <label htmlFor="double">{option.text}</label>
              </div>
            ))
          }
         
        </div>
        <div className={styles.add}>
            <input type="number" onChange={(e)=>{e.target.value}} defaultValue={1} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
  </div>
  )
}


export const getServerSideProps = async ({params}) => {
  const res  = await axios.get(`http://localhost:3005/api/products/${params.id}`);
  return{
    props: {
      pizza: res.data,  
    },
  };
}

export default Product