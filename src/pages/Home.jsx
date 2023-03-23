import Card from '../components/Card/Card'

const Home = ({
  goods,
  searchValue,
  setSearchValue,
  onAddToFavourite,
  onAddToCart,
  deleteSeachValue,
  onChangeValue,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = goods.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    ) // Исключает все массивы, в которых нет нужных нам слов. Для поля поиска.Важно добавлять toLowerCase, чтобы искало в разных регистрах
    return isLoading
      ? [...Array(8)]
      : filteredItems.map((card) => (
          <Card
            item={card}
            key={card.id}
            onPlus={onAddToCart}
            onFavourite={onAddToFavourite}
            loading={isLoading}
          />
        ))
  }

  return (
    <div className="content">
      <div className="content-wrapper">
        <h1 className="title_content">
          {searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}
        </h1>
        <div className="search-block">
          <img src="/images/icon.svg" alt="icon" className="search-button" />
          {searchValue && (
            <img
              onClick={deleteSeachValue}
              className="remove_button"
              src="/images/krest.svg"
              alt="remove"
            />
          )}
          <input
            onChange={onChangeValue}
            value={searchValue}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  )
}

export default Home
