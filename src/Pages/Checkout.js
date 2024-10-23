import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export const Checkout = () => {
  const cart = useSelector((state) => state.cart)
  const [discount, setDiscount] = useState(0)
  const notify = () => toast.success("Order Placed");

  const totalPrice = cart.reduce( (acc, curr) => (acc += curr.price * curr.quantity), 0 );


  const handleDiscount = (e) => {
    setDiscount(e.target.value)
    toast.success(`Promo Code CART${e.target.value} Applied`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold m-2 text-center"> Order Summary </h1>
      
      <div className="border-b-2 border-r-2 border-[#514a9d] flex flex-col flex-wrap items-end p-6 mx-[26rem]">
        {cart.map((item) => {
          const { id, name, price, image, quantity } = item;
          return (
            <div key={id} className="border-2 border-[#24c6dc] rounded-md flex flex-wrap gap-2 p-1 my-1">
              <img className="h-[6rem] w-[6rem] border-0 p-1" alt="product img" src={image} />
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <ul>{name}</ul>
                <ul>
                  Price:  ₹ {price} X {quantity}
                </ul>
              </div>
            </div>
          );
        })}

        <div className="text-center mt-2 mr-24 leading-7" >
          <p>Apply Promo Code</p>
          <button className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" value="10" onClick={handleDiscount} >CART10</button> 
          <button className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" value="15" onClick={handleDiscount}>CART15</button> 
          <button className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" onClick={() => toast.error("Promo Code Expired") } >CART20</button>
          <p>Discount Amount:- ₹{discount}</p>
          <button className="border-2 border-[#514a9d] text-[1.1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" onClick={() => {setDiscount(0); toast.warn("Promo Code Removed") } } >Remove PromoCode</button>
        </div>
      </div>
      
      <p className="pl-[18rem] m-2">
        <strong>Total price:  ₹ {totalPrice - discount } </strong>
      </p>
      <button className="border-2 border-[#514a9d] text-[1.2rem] m-2 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" onClick={notify}>
        Place Order
      </button>
      <ToastContainer autoClose={2000} />

    </div>
  );
};
