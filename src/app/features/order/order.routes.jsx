import Order from "./components/Order";
import OrderContextProvider from "./context/OrderContextProvider";

const OrderRoutes = [
  {
    path: "",
    element: (
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    ),
  },
];

export default OrderRoutes;
