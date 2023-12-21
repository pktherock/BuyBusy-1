import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { CartProvider } from "./CartContext";
import { useAuth } from "../../../contexts";
import { alertService, cartService } from "../../../services";
import { onSnapshot } from "firebase/firestore";

function CartContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ total: 0, cartItems: [] });

  const uid = useAuth()?.user?.uid;

  const addItemToCart = async (item) => {
    setLoading(true);
    // check in context that item is already added, if not then proceed to add
    const itemIndx = cart.cartItems.findIndex(
      (cartItem) => cartItem.productInfo.id === item.id
    );

    // if item is already there increase quantity by 1 and call update function
    if (itemIndx >= 0) {
      const { id } = cart.cartItems[itemIndx];
      await increaseCartItem(id);
      setLoading(false);
      return alertService.success("Successfully added to the cart!");
    }

    try {
      const cartItem = await cartService.addItem(item, uid);
      console.log("Cart Item", cartItem);
      alertService.success("Successfully added to the cart!");
      // add cartItem into context (but firebase gives us realtime update so not required here)
    } catch (error) {
      console.log("Error while adding item to the cart", error);
      alertService.error(error.log);
    } finally {
      setLoading(false);
    }
  };

  const increaseCartItem = async (id) => {
    setLoading(true);
    try {
      await cartService.increaseItem(id, uid);
      alertService.success("Item Increased successfully!");
    } catch (error) {
      console.log("Error while increment of cart item", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const decreaseCartItem = async (id) => {
    setLoading(true);
    try {
      await cartService.decrementItem(id, uid);
      if (cart.cartItems.find((cartItem) => cartItem.quantity <= 1)) {
        await removeItemFromCart(id);
      }
      alertService.success("Item Decreased successfully!");
    } catch (error) {
      console.log("Error while decrement of cart item", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (id) => {
    setLoading(true);
    try {
      await cartService.deleteItem(id, uid);
      alertService.success("Item Deleted successfully!");
    } catch (error) {
      console.log("Error while deletion of cart item", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const checkOutAllCartItem = async () => {
    setLoading(true);
    try {
      await cartService.checkOutCartItems(uid, cart);
      alertService.success("Order successfully placed!");
      
    } catch (error) {
      console.log("Error while checkout", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    let unsubscribe;
    async function fetchAllCartItems(userId) {
      if (userId) {
        try {
          const cartRef = await cartService.getCartCollection(userId);
          unsubscribe = onSnapshot(cartRef, (snapShot) => {
            let total = 0;
            const cartItems = snapShot.docs.map((doc) => {
              total += doc.data().productInfo.price * doc.data().quantity;
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            console.log("Cart Items", cartItems);
            setCart({ cartItems, total });
          });
        } catch (error) {
          console.log("Error while fetching cart items", error);
          alertService.error(error.code);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchAllCartItems(uid);

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [uid]);

  return (
    <CartProvider
      value={{
        cart,
        addItemToCart,
        increaseCartItem,
        decreaseCartItem,
        removeItemFromCart,
        checkOutAllCartItem,
      }}
    >
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
      <div>{children}</div>
    </CartProvider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.any,
};

export default CartContextProvider;
