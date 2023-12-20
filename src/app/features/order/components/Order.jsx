import useOrder from "../context/OrderContext";
import OrderItem from "./OrderItem";
import { Container } from "../../../components";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function Order() {
  const { orders } = useOrder();
  const navigate = useNavigate();

  return (
    <Container>
      <ArrowUturnLeftIcon
        onClick={() => navigate("/products")}
        className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
      />
      <h1 className="my-2 text-center text-3xl font-bold">Your Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} orderInfo={order} />
      ))}
    </Container>
  );
}

export default Order;
