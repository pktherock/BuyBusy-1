import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";

import { db } from "../../config";

class CartService {
  getCartCollection = async (userId) => {
    return collection(db, "users", userId, "cart");
  };

  addItem = async (item, userId) => {
    const data = {
      productInfo: item,
      quantity: 1,
    };
    const docRef = await addDoc(collection(db, "users", userId, "cart"), data);
    data.id = docRef.id;
    return data;
  };

  increaseItem = async (docId, userId) => {
    return await updateDoc(doc(db, "users", userId, "cart", docId), {
      quantity: increment(1),
    });
  };

  decrementItem = async (docId, userId) => {
    return await updateDoc(doc(db, "users", userId, "cart", docId), {
      quantity: increment(-1),
    });
  };

  deleteItem = async (docId, userId) => {
    return await deleteDoc(doc(db, "users", userId, "cart", docId));
  };

  checkOutCartItems = async (userId, cart) => {
    const { total, cartItems } = cart;
    const orderData = {
      orderTotal: total,
      orderItems: cartItems.map((cartItem) => ({
        productInfo: cartItem.productInfo,
        quantity: cartItem.quantity,
      })),
      orderedAt: new Date().toISOString(),
    };
    console.log("Order Data", orderData);
    await addDoc(collection(db, "users", userId, "orders"), orderData);

    // delete all cart item from firestore
    await this.deleteAllCartItems(cartItems, userId);
  };

  deleteAllCartItems = async (cartItems, userId) => {
    cartItems.forEach(async ({ id }) => {
      await deleteDoc(doc(db, "users", userId, "cart", id));
    });
    return true;
  };
}

const cartService = new CartService();

export default cartService;
