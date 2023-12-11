'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useState } from 'react';

const CartContext = createContext({})

export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const addToCart =(product, size=null, extras=[]) => {
        setCartProducts(prevProducts => {
            const newProducts = [...prevProducts, {...product, size, extras}]
        });
    } 

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts,
            }}>
                {children}
            </CartContext.Provider>

        </SessionProvider>
    )
}