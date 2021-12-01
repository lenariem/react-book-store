import React, { useEffect} from 'react';
import './Popup.css';

export default function Popup(props) {
    const {title = '', closePopup = Function.prototype} = props;
    
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
