/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const ProductContext = createContext({
  products: [],
  addToCart: (item) => {}
});

export const ProductProvider = ProductContext.Provider;

const useProduct = () => useContext(ProductContext);

export default useProduct;
