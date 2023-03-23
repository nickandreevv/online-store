import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import { MainContext } from './context'

function App() {
  const [goods, setGoods] = useState([])
  const [cartGoods, setCartGoods] = useState([])
  const [favourite, setFavourite] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [opened, setOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  console.log(cartGoods)

  useEffect(() => {
    axios
      .get('https://63f4babd3f99f5855db60353.mockapi.io/goods')
      .then((res) => setGoods(res.data))
    // получение данных с сервера
    axios
      .get('https://63f4babd3f99f5855db60353.mockapi.io/favourites')
      .then((res) => setFavourite(res.data))
    setIsLoading(false)
  }, [])

  const onAddToCart = (obj) => {
    if (cartGoods.find((resObj) => Number(resObj.id) === Number(obj.id))) {
      setCartGoods((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      )
    } else {
      setCartGoods([...cartGoods, obj])
    }
  }
  //onAddToCard(объяснение)
  // если объект который выбран cardGoods совпадает с тем, на который мы нажили при клике
  //  фильтруем и убираем
  // если нет - добавляем обновленный

  const onAddToFavourite = async (obj) => {
    try {
      if (favourite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://63f4babd3f99f5855db60353.mockapi.io/favourites/${obj.id}`
        )
        setFavourite((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://63f4babd3f99f5855db60353.mockapi.io/favourites',
          obj
        ) // создание async для решения проблемы с id. ДОЖИДАЕМСЯ ответа от сервера и только потом делаем действия.
        // иначе, будет так, что id будут скакать и добавляться и удаляться будет один и тот же элем. но с разным id
        // т.к axios в этом случае будет брать все данные с сервера, нужно вместо res написать data, чтобы вытащились нужные данные
        // делается это с помощью деструктуризации
        setFavourite((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить товар в закладки')
      console.log(error)
    }
  }
  //onAddToFavourite(объяснение)
  // если объект который выбран favourite совпадает с тем, на который мы нажили при клике
  // отпавляем запрос на удаление
  // и меняем state фильтруя по всем item.id
  // если такой объект не нашелся, оправляем запрос на сервер и меняем объект, добавляя к нему обновленные данные
  const deleteCartItem = (id) => {
    setCartGoods((prev) => prev.filter((item) => item.id !== id))
  } // удаление объекта из корзины

  const onChangeValue = (e) => {
    setSearchValue(e.target.value)
  } // обновление события на input

  const deleteSeachValue = () => {
    setSearchValue('') // очищение input при нажитии на кнопку
  }

  const clickCart = () => {
    setOpened(!opened) // открытие корзины при нажатии на кнопку
  }

  const isItemAdded = (id) => {
    return cartGoods.some((obj) => Number(obj.id) === Number(id))
  } // для того, чтобы по id react определял какой элемент добавлен в корзину и какой удален. Чтобы менять цвет кнопк

  return (
    <MainContext.Provider
      value={{
        setCartGoods,
        cartGoods,
        setOpened,
        favourite,
        goods,
        isItemAdded,
        onAddToFavourite,
      }}
    >
      <div className="wrapper">
        {opened && (
          <Drawer
            goods={cartGoods}
            onMinus={deleteCartItem}
            closedCart={() => setOpened(!opened)}
          />
        )}
        <Header clickCart={clickCart} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                goods={goods}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToFavourite={onAddToFavourite}
                onAddToCart={onAddToCart}
                deleteSeachValue={deleteSeachValue}
                onChangeValue={onChangeValue}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
        </Routes>
      </div>
    </MainContext.Provider>
  )
}

export default App
