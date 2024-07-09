import React, { createContext, useReducer } from 'react';

const initialState = {
    items: [
        { id: 1, name: "Laptop", price: 249.00, quantity: 0, image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/laptops-2048px-8826.jpg?auto=webp&quality=75&crop=1.91:1&width=1200" },
        { id: 2, name: "SmartPhones", price: 199.00, quantity: 0, image: "https://images.samsung.com/is/image/samsung/assets/in/explore/brand/5-best-android-mobile-phones-2022-in-india/banner-mobile-720x761-080422.jpg?$720_N_JPG$" },

    ]
};


export const CartContext = createContext(initialState);


const cartReducer = (state, action) => {
    switch(action.type) {
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                )
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload.id && item.quantity > 0
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
                )
            };
        case 'SET_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload.id 
                    ? { ...item, quantity: action.payload.quantity } 
                    : item
                )
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
