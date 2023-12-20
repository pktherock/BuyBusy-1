import { collection, getDocs } from "firebase/firestore";

import { db } from "../../config";

class ProductService {
  getAllProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  };
}

const productService = new ProductService();

export default productService;
