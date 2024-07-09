import React from 'react';
import { CartProvider } from './CartContext';
import CartPage from './CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Import the CSS file

const App = () => {
    return (
        <CartProvider>
            <CartPage />
        </CartProvider>
    );
};

export default App;
