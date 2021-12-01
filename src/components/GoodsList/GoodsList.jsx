import React from "react";
import "./GoodsList.css";
import GoodItem from "../GoogItem/GoodItem";

export default function GoodsList(props) {
  const {
    goods = [],
    addToCart = Function.prototype,
  } = props;
  
  if (!goods.length) {
    return <h3 className="noResult">No goods in shop now</h3>;
  }

  return (
    <div className="goods">
      {goods.map((item) => (
        <GoodItem
          key={item.isbn13}
          {...item}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
