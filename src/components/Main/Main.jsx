import React, { useEffect, useContext } from "react";
import { API_URL } from "../../config";
import { ShopContext } from "../../context/context";
import Preloader from "../Preloader/Preloader";
import GoodsList from "../GoodsList/GoodsList";
import Cart from "../Cart/Cart";
import CartList from "../CartList/CartList";
import Popup from "../Popup/Popup";
import Search from "../Search/Search";

export default function Main() {
  const { goods, setGoods, loading, isCartShown, popupTitle} = useContext(ShopContext);

  //fetch data from API
  const getData = (urlToFetch, term = "new") => {
    const url = `${urlToFetch}${term.trim()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGoods(data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get goods on componentDidMount
  useEffect(() => {
    getData(API_URL, "new");
    // eslint-disable-next-line
  }, []);

  return (
    <main className="container content">
      <Search getData={getData} goodsLength={goods.length} />
      <Cart />
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <GoodsList />
        </div>
      )}

      {isCartShown && <CartList />}

      {popupTitle && <Popup />}
    </main>
  );
}
