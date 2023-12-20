import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Container } from "../../../components";
import useProduct from "../contexts/ProductContext";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

function Product() {
  const { product } = useProduct();
  const navigate = useNavigate();

  return (
    <Container>
      <ArrowUturnLeftIcon
        onClick={() => navigate("/home")}
        className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {product.map((product) => (
          <ProductItem key={product.id} productInfo={product} />
        ))}
      </div>
    </Container>
  );
}

export default Product;
