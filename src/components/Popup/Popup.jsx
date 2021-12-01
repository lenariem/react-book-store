import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../../context/context';
import './Popup.css';

export default function Popup() {
    const {popupTitle: title = '', closePopup = Function.prototype} = useContext(ShopContext);
    
    useEffect(() => {
        const timerId = setTimeout(closePopup, 3000);
        return () => {
            clearTimeout(timerId);
        }
    }, [closePopup]);

    return (
        <div id="toast-container">
            <div className="toast">{title} added to cart</div>
        </div>
    )
}
