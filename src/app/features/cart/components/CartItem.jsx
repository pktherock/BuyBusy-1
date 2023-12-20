import PropTypes from "prop-types";
import { Card } from "../../../components";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import useCart from "../contexts/CartContext";

function CartItem({ cartItemInfo }) {
  const { decreaseCartItem, increaseCartItem, removeItemFromCart } = useCart();

  const {
    id,
    quantity,
    productInfo: { productName, price, productImg },
  } = cartItemInfo;

  return (
    <Card>
      <img
        src={productImg}
        alt={`${productName} img`}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] p-1"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {productName}
        </h1>
        <div className="mt-5 flex justify-between pr-2">
          <div className="flex items-center space-x-2">
            <span className="block text-sm font-semibold">Price : </span>
            <span className="text-xl font-bold">&#8377; {price}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MinusCircleIcon
              onClick={() => decreaseCartItem(id)}
              className="w-8 h-8 text-purple-500 cursor-pointer"
            />
            <span className="font-semibold text-xl">{quantity}</span>
            <PlusCircleIcon
              onClick={() => increaseCartItem(id)}
              className="w-8 h-8 text-purple-500 cursor-pointer"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-blue-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => removeItemFromCart(id)}
        >
          Remove from Cart
        </button>
      </div>
    </Card>
  );
}

CartItem.propTypes = {
  cartItemInfo: PropTypes.object.isRequired,
};

export default CartItem;
