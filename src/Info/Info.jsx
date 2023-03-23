import { useContext } from 'react'
import { MainContext } from '../context'
import s from './info.module.scss'

const Info = ({ image, title, description, text }) => {
  const { setOpened } = useContext(MainContext)
  return (
    <div className={s.empty_card}>
      <img className={s.empty_card_image} src={image} alt="box" />
      <h2>{title}</h2>
      <p className={s.empty_card_p}>{description}</p>
      <button onClick={() => setOpened(false)} className={s.green_button}>
        <img className={s.empty_card_img} src="/images/right.svg" alt="right" />
        {text}
      </button>
    </div>
  )
}

export default Info
