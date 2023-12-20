import useCart from "../contexts/CartContext";
import { Container } from "../../../components";
import CartItem from "./CartItem";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import TotalPage from "./TotalPage";

function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <Container>
      <ArrowUturnLeftIcon
        onClick={() => navigate("/products")}
        className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
      />

      {cart.cartItems.length === 0 && (
        <>
          <p className="text-3xl font-bold text-center">Your cart is empty!</p>
          <p className="text-center text-xl">
            Explore our wide selection and find something you like
          </p>
        </>
      )}

      {cart.cartItems.length > 0 && <TotalPage total={cart.total} />}
      
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {cart.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItemInfo={cartItem} />
        ))}
      </div>
    </Container>
  );
}

export default Cart;
