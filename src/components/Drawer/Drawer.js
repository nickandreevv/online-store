import { useContext, useState } from 'react'
import { MainContext } from '../../context'
import Info from '../../Info/Info'
import s from './drawer.module.scss'

const Drawer = ({ closedCart, goods, onMinus }) => {
  const { setCartGoods } = useContext(MainContext)
  const [complete, setComplete] = useState(false)
  const onOrderClick = () => {
    setComplete(true)
    setCartGoods([])
  }

  const getNewPrice = goods.reduce((acc, elem) => acc + elem.price, 0)
  const setTax = Math.round(
    goods.reduce((acc, elem) => acc + elem.price, 0) * 0.13
  )
  return (
    <div className={s.overlay}>
      <div className={s.drawer}>
        <h2>
          Корзина
          <img
            onClick={closedCart}
            className={s.cartItem_remove}
            src="/images/krest.svg"
            alt="remove"
          />
        </h2>
        {!goods.length ? (
          <Info
            title={complete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              complete
                ? `Заказ №${Math.round(
                    Math.random(1) * 50
                  )} передан курьерской службе.`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={complete ? 'images/order.svg' : '/images/box.svg'}
            text={complete ? 'Cделать новый заказ' : 'Вернуться назад'}
          />
        ) : (
          <div className={s.wrapper}>
            <div className={s.items}>
              {goods.map((elem) => (
                <div key={elem.id} className={s.cartItem}>
                  <div
                    style={{ backgroundImage: `url(${elem.imageUrl})` }}
                    className={s.cartItem_img}
                  ></div>
                  <div className={s.cartItem_text}>
                    <p>{elem.name}</p>
                    <b>{elem.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onMinus(elem.id)}
                    className={s.cartItem_remove}
                    src="/images/krest.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className={s.footer_block}>
              <ul>
                <li className={s.footer_menu}>
                  <span>Итого:</span>
                  <div></div>
                  <b>{`${getNewPrice} руб.`}</b>
                </li>
                <li className={s.footer_menu}>
                  <span>Налог 13%:</span>
                  <div></div>
                  <b>{`${setTax} руб.`}</b>
                </li>
              </ul>
              <button onClick={onOrderClick} className={s.green_button}>
                Оформить заказ <img src="/images/right.svg" alt="right" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
