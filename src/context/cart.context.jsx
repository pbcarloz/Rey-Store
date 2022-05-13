import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // si encuentra que cartItems ya cuenta con el producto a agregar
    // si el item tiene el mismo id que el producto a agregar
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    //  si lo encuentra incrementa la cantidad
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? 
            // si lo encuentra, incrementa la cantidad del mismo producto 
            {...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem 
        );
    }
    // si no encuentra, retorna un nuevo array con los items
    return [...cartItems, { ...productToAdd, quantity: 1} ];

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
}, [cartItems]) 

const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
}

const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    
};