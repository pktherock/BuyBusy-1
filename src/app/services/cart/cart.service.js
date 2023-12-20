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
}

const cartService = new CartService();

export default cartService;
