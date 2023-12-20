import { Container } from "../../../components";
import useProduct from "../contexts/ProductContext";
import ProductItem from "./ProductItem";

function Product() {
  const { product } = useProduct();

  return (
    <Container>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {product.map((product) => (
          <ProductItem key={product.id} productInfo={product} />
        ))}
      </div>
    </Container>
  );
}

export default Product;
