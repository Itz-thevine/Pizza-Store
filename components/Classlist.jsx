import style from '../styles/Classlist.module.css'
import PizzaCard from './PizzaCard'


function Classlist({pizzaList}) {
  return (
    <div className={style.container}>
        <h1 className={style.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={style.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
        </p>

        <div className={style.wrapper}>
          {
            pizzaList.map((pizza)=>(
              <PizzaCard key={pizza._id} pizza={pizza}/>
            ))
          }
        </div>
    </div>
  )
}

export default Classlist