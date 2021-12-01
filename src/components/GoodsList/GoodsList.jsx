import React, {useContext} from "react";
import { ShopContext } from "../../context/context";
import "./GoodsList.css";
import GoodItem from "../GoogItem/GoodItem";

export default function GoodsList() {
  const {goods = [] } = useContext(ShopContext);
  
  if (!goods.length) {
    return <h3 className="noResult">No goods in shop now</h3>;
  }

  return (
    <div className="goods">
      {goods.map((item) => (
        <GoodItem
          key={item.isbn13}
          {...item}
        />
      ))}
    </div>
  );
}
