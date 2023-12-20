import PropTypes from "prop-types";
import { Container } from "../../../components";
import useCart from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function TotalPage({ total }) {
  const { checkOutAllCartItem } = useCart();

  const navigate = useNavigate();

  const checkOut = async () => {
    await checkOutAllCartItem();
    navigate("/orders");
  };

  return (
    <Container>
      <div className="bg-gray-200 shadow-2xl rounded-lg bottom-1 p-5 font-bold text-3xl">
        Total : &#8377;{Number(total).toFixed(2)}
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-violet-500 px-2 py-2 text-sm font-bold text-white shadow-sm hover:bg-violet-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={checkOut}
        >
          Proceed to Buy
        </button>
      </div>
    </Container>
  );
}

TotalPage.propTypes = {
  total: PropTypes.number.isRequired,
};
export default TotalPage;
