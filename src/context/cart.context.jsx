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

const removeCartItem = (cartItems, cartItemToRemove) => {
     // buscar el item a borrar
     const existingCartItem = cartItems.find(
         (cartItem) => cartItem.id === cartItemToRemove.id);
    // revistar si la cantidad es igual a 1, entonces borramos el item
     if(existingCartItem.quantity === 1) return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

     return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id ? 
        // si lo encuentra, incrementa la cantidad del mismo producto 
        {...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem 
    );
}   

const clearCartItem = (cartItems, productToclear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToclear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({children}) => {
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [cartCount, setCartCount] = useState(0);
const [cartTotal, setCartTotal] = useState(0);

// funcion para la suma de los productos agregados al carrito.
useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
}, [cartItems]) 

useEffect(() => {
    const newTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newTotal);
}, [cartItems]) 

const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
}

const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
}

const clearItemToCart = (productToclear) => {
    setCartItems(clearCartItem(cartItems, productToclear))
}
const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemToCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    
};