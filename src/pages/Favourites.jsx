import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import { MainContext } from '../context'

const Favourites = () => {
  const { favourite, onAddToFavourite } = useContext(MainContext)
  return (
    <div className="content">
      <div className="content-wrapper">
        <h1 className="title_content">Закладки</h1>
      </div>
      <div className="sneakers">
        {!favourite.length ? (
          <div className="empty_block">
            <h2>Товаров нет в списке</h2>
            <Link to="/">
              <h3>Вернуться назад</h3>
            </Link>
          </div>
        ) : (
          favourite.map((card) => (
            <Card
              item={card}
              key={card.id}
              favourited={true}
              onFavourite={onAddToFavourite}
            />
          ))
        )}
      </div>
    </div> // favourited - когда картинка попадает в список закладок, чтобы кнопка была розовой
  )
}

export default Favourites
