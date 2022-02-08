import {
    SET_GOODS,
    CLOSE_POPUP,
    TOGGLE_CART_DISPLAY,
    ADD_TO_CART,
    DELETE_FROM_CART,
    INC_QUANTITY,
    DEC_QUANTITY,
} from "./types";

export function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_GOODS:
            return {
                ...state,
                goods: payload || [],
                loading: false,
            };
        case CLOSE_POPUP:
            return {
                ...state,
                popupTitle: "",
            };
        case TOGGLE_CART_DISPLAY:
            return {
                ...state,
                isCartShown: !state.isCartShown,
            };
        case ADD_TO_CART: {
            //to check if item already in cart
            const itemIndex = state.order.findIndex(
                orderItem => orderItem.id === payload.id
            );
            let newOrder = null;
            if (itemIndex < 0) {
                //first time in cart
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            } else {
                //good is already in a cart
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        };
                    } else {
                        return orderItem;
                    }
                });
            }
            return {
                ...state,
                order: newOrder,
                popupTitle: payload.title,
            };
        }

        case DELETE_FROM_CART:
            return {
                ...state,
                order: state.order.filter(item => item.id !== payload.id),
            };
        case INC_QUANTITY:
            return {
                ...state,
                order: state.order.map(item => {
                    if (item.id === payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    } else {
                        return item;
                    }
                }),
            };
        case DEC_QUANTITY:
            return {
                ...state,
                order: state.order.map(item => {
                    if (item.id === payload.id) {
                        const newQuantity = item.quantity - 1;
                        return {
                            ...item,
                            quantity: newQuantity >= 0 ? newQuantity : 0,
                        };
                    } else {
                        return item;
                    }
                }),
            };

        default:
            return state;
    }
}
