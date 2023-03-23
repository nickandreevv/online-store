import s from './card.module.scss'
import { useState } from 'react'
import ContentLoader from 'react-content-loader'
import { MainContext } from '../../context'
import { useContext } from 'react'

const Card = ({
  item,
  onPlus,
  onFavourite,
  favourited = false,
  added = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(MainContext)
  const [isFavourite, setIsFavourite] = useState(favourited)

  const handleClick = () => {
    onPlus(item)
  }
  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite)
    onFavourite(item)
  }

  return (
    <div className={s.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={s.like}>
            <img
              onClick={handleFavouriteClick}
              src={`${
                isFavourite ? '/images/secondLike.svg' : '/images/like.svg'
              }`}
              alt="like"
            />
          </div>
          <img
            width={133}
            height={112}
            src={item.imageUrl}
            alt="firstSneaker"
          />
          <h5>{item.name}</h5>
          <div className={s.cardBottom}>
            <div className={s.cardTop}>
              <span>Цена: </span>
              <b>{item.price} руб.</b>
            </div>

            <img
              className={s.plus}
              onClick={handleClick}
              src={
                isItemAdded(item.id) ? '/images/agree.svg' : '/images/plus.svg'
              }
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Card
