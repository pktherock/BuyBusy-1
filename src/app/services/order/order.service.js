import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config";

class OrderService {
  getOrders = async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "orders")
    );
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  };
}

const orderService = new OrderService();

export default orderService;
