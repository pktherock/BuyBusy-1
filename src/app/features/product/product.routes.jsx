import Product from "./components/Product";
import ProductContextProvider from "./contexts/ProductContextProvider";

const ProductRoutes = [
  {
    path: "",
    element: (
      <ProductContextProvider>
        <Product />
      </ProductContextProvider>
    ),
  },
];

export default ProductRoutes;
