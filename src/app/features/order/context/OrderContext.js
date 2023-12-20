import { createContext, useContext } from "react";

export const OrderContext = createContext({
  orders: [],
});

export const OrderProvider = OrderContext.Provider;

const useOrder = () => useContext(OrderContext);

export default useOrder;
