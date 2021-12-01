import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import Preloader from "../Preloader/Preloader";
import GoodsList from "../GoodsList/GoodsList";
import Cart from "../Cart/Cart";
import CartList from "../CartList/CartList";
import Popup from "../Popup/Popup";
import Search from "../Search/Search";

export default function Main() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isCartShown, setCartShown] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  //fetch data from API
  const getData = (urlToFetch, term = "new") => {
    const url = `${urlToFetch}${term.trim()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.books && setGoods(data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //shown or hidden cart
  const toggleCartDisplay = () => {
    setCartShown(!isCartShown);
  };

  //add good to cart
  const addToCart = (item) => {
    //to check if item already in cart
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      //first time in cart
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      //good is already in a cart
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    setPopupTitle(item.title);
  };

  //delete from cart
  const deleteFromCart = (id) => {
    const newOrder = order.filter((item) => item.id !== id);
    setOrder(newOrder);
  };

  //increment and decrement quantity in cart
  const incQuantity = (id) => {
    const newOrder = order.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });
    setOrder(newOrder);
  };

  const decQuantity = (id) => {
    const newOrder = order.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return item;
      }
    });
    setOrder(newOrder);
  };

  //popup add to cart
  const closePopup = () => {
    setPopupTitle("");
  };

  //get goods on componentDidMount
  useEffect(() => {
    getData(API_URL, "new");
  }, []);

  return (
    <main className="container content">
      <Search getData={getData} goodsLength={goods.length} />
      <Cart
        order={order}
        quantity={order.length}
        toggleCartDisplay={toggleCartDisplay}
        setCartShown={setCartShown}
      />
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <GoodsList goods={goods} addToCart={addToCart} />
        </div>
      )}

      {isCartShown && (
        <CartList
          order={order}
          toggleCartDisplay={toggleCartDisplay}
          deleteFromCart={deleteFromCart}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}

      {popupTitle && <Popup title={popupTitle} closePopup={closePopup} />}
    </main>
  );
}
