import React, { useEffect } from "react";
import "./Cart.css";

export default function Cart(props) {
  const {
    quantity = 0,
    setCartShown,
    toggleCartDisplay = Function.prototype,
  } = props;

  //close cart on esc press
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setCartShown(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setCartShown]);

  return (
    <div
      className="cart white-text deep-purple darken-2"
      onClick={toggleCartDisplay}
      title="show your order"
    >
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
}
