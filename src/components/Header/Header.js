import s from './header.module.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MainContext } from '../../context'
const Header = ({ clickCart }) => {
  const { cartGoods } = useContext(MainContext)
  const setPrice = cartGoods.reduce((acc, item) => acc + item.price, 0)

  return (
    <header>
      <Link to="/">
        <div className={s.headerLeft}>
          <img width={40} height={40} src="/images/logo.png" alt="logo" />
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className={s.headerRight}>
          <li onClick={clickCart}>
            <img width={18} height={18} src="/images/cart.svg" alt="cart" />
            <span>{`${setPrice} руб.`}</span>
          </li>
          <li className={s.favourite}>
            <Link to="/favourites">
              <img
                height={18}
                width={18}
                src="/images/favourite.svg"
                alt="favourite"
              />
            </Link>
          </li>
          <li>
            <img height={18} width={18} src="/images/user.svg" alt="user" />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
