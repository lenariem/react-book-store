import React, { useContext } from "react";
import { ShopContext } from "../../context/context";
import "./CartItem.css";

export default function CartItem({ id, title, price, image, quantity }) {
  const { deleteFromCart, incQuantity, decQuantity } = useContext(ShopContext);

  return (
    <li className="collection-item avatar">
      <img src={image} alt={title} className="circle" />
      <span className="title">{title}</span>
      <p>
        {price}{" "}
        <i
          className="material-icons cartQuantity"
          onClick={() => decQuantity(id)}
        >
          remove
        </i>{" "}
        x{quantity}{" "}
        <i
          className="material-icons cartQuantity"
          onClick={() => incQuantity(id)}
        >
          add
        </i>{" "}
        = {(+price.slice(1) * +quantity).toFixed(2)}$
      </p>
      <span
        className="secondary-content"
        title="delete from your cart"
        onClick={() => deleteFromCart(id)}
      >
        <i className="material-icons item-delete-icon">delete</i>
      </span>
    </li>
  );
}
