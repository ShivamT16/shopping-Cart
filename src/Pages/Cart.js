import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"

import { decreaseQuantity, increaseQuantity, removeFromCart,deleteNotify } from "../actions";

export const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const totalPrice = cart.reduce( (acc, curr) => (acc += curr.price * curr.quantity), 0 );

  return (
    <div>

      <div className="flex flex-wrap gap-[5rem] text-[2rem] font-bold my-4 items-center justify-around">
        <p> Total Item In The Cart - {cart.length} </p>
        <p>Total price-  ₹ {totalPrice}</p>
        <Link className="no-underline text-blue-500" to="/checkout">
          {cart.length > 0 && <button className="border-2 border-[#514a9d] text-[1rem] m-1 p-2 px-4 rounded-md bg-white hover:bg-lightgray cursor-pointer">Next</button>}
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center p-[1rem] bg-[whitesmoke]">
        {cart.length > 0 ? (
          cart.map((item) => {
            const { id, name, price, image, quantity } = item;
            return (
              <div key={id} className="border border- p-4 rounded-xl">
                <img className="h-[15rem] w-[14rem] border-[1.5px] border-[#24c6dc] rounded-[2rem] p-4" alt="product img" src={image} />
                <ul>{name}</ul>
                <ul>₹{price}</ul>
                <div>
                  <button
                    className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"
                    onClick={() => dispatch(decreaseQuantity(item)) }
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  {quantity}
                  <button
                    className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"
                    type="button"
                    onClick={() => 
                      dispatch(increaseQuantity(item))
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"
                  type="button"
                  onClick={() => {
                    dispatch(removeFromCart(id))
                    deleteNotify();
                  }}
                >
                  Remove
                </button>
                
              </div>
            );
          })
        ) : (
          <h2>
            Cart is Empty, please 
            <Link className="no-underline text-blue-500" to="/">
               "Explore"
            </Link>{" "}
          </h2>
        )}
      </div>

      <Link className="no-underline text-blue-500" to="/checkout">
        {cart.length > 2 && <button className="border-2 border-[#514a9d] font-semibold text-[1rem] m-1 p-1 px-3 rounded-md bg-white hover:bg-lightgray cursor-pointer">Next</button>}
      </Link>
      <ToastContainer autoClose={2000} />

    </div>
  );
};
