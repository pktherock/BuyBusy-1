import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

import { ProductProvider } from "./ProductContext";
import { alertService } from "../../../services";
import { productService } from "../../../services";
import { useCart } from "../../cart";

function ProductContextProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addItemToCart } = useCart();

  const addToCart = async (item) => {
    addItemToCart(item);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchProduct() {
      try {
        const products = await productService.getAllProduct();
        setProduct(products);
        console.log("All Products", products);
      } catch (error) {
        console.log("Error while fetching Product!", error);
        alertService.error(error.code);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  return (
    <ProductProvider value={{ product, addToCart }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-20">
          <RingLoader
            loading={loading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            color="teal"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {children}
    </ProductProvider>
  );
}

ProductContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ProductContextProvider;
