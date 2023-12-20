import PropTypes from "prop-types";
import { OrderProvider } from "./OrderContext";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useAuth } from "../../../contexts";
import { alertService, orderService } from "../../../services";

function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useAuth()?.user?.uid;

  useEffect(() => {
    setLoading(true);
    async function fetchOrderDetails(userId) {
      try {
        const orders = await orderService.getOrders(userId);
        console.log("Orders", orders);
        setOrders(orders);
      } catch (error) {
        console.log("Error while Fetching order details.", error);
        alertService.error(error.code);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails(userId);
  }, [userId]);

  return (
    <OrderProvider value={{ orders }}>
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
    </OrderProvider>
  );
}

OrderContextProvider.propTypes = {
  children: PropTypes.any,
};

export default OrderContextProvider;
