/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const CartContext = createContext({
  cart: {
    total: 299,
    cartItems: [
      {
        productInfo: {
          id: "abc",
          productName: "Hello world",
          price: 299,
          category: "MENS_CLOTHING",
          productImg: "abc.com",
        },
        id: "abc",
        quantity: 1,
      },
    ],
  },
  addItemToCart: (item) => {},
  increaseCartItem: (id) => {},
  decreaseCartItem: (id) => {},
  removeItemFromCart: (id) => {},
  checkOutAllCartItem: () => {}
});

export const CartProvider = CartContext.Provider;

const useCart = () => useContext(CartContext);

export default useCart;
