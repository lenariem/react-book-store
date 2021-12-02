import { createContext, useReducer } from "react";
import { reducer } from "../reducer/reducer";

export const ShopContext = createContext();

const initState = {
  goods: [],
  loading: true,
  order: [],
  isCartShown: false,
  popupTitle: "",
};

export const ContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initState);

  value.setGoods = (data) => {
    dispatch({ type: "SET_GOODS", payload: data });
  };

  value.closePopup = () => {
    dispatch({ type: "CLOSE_POPUP" });
  };

  value.toggleCartDisplay = () => {
    dispatch({ type: "TOGGLE_CART_DISPLAY" });
  };

  value.addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };
 
  value.deleteFromCart = (itemId) => {
    dispatch({ type: "DELETE_FROM_CART", payload: { id: itemId } });
  };

  //increment and decrement quantity in cart
  value.incQuantity = (itemId) => {
    dispatch({ type: "INC_QUANTITY", payload: { id: itemId } });
  };
  value.decQuantity = (itemId) => {
    dispatch({ type: "DEC_QUANTITY", payload: { id: itemId } });
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
