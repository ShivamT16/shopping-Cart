import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartNotify } from "../actions";

export const ProductDetail = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const {id} = useParams()
  
  return (
    <div>
      {products
        .filter((product) => product.id === Number(id))
        .map((item) => {
          const { id, name, price, description, image } = item;
          return (
            <div>
              <div key={id} className="border border-[#514a9d] bg-[whitesmoke] rounded-[2rem] flex flex-wrap p-8 m-8 mx-[4rem]">
                <div>
                  <img className="h-[15rem] w-[14rem] border-[1.5px] border-[#24c6dc] rounded-[2rem] p-4" alt="product img" src={image} />
                  <ul>{name}</ul>
                  <p>INR: {price}</p>
                </div>
                <div className="mx-0 my-1 p-0 md:w-[50rem] text-justify p-[1.5rem] m-0 mx-4">
                  <p> {description} </p>

                  {cart.find((element) => element.id === item.id) ? (
                    <Link to="/cart">
                      <button className="border-2 border-[#514a9d] text-[1rem] my-2 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"> Go to Cart</button>
                    </Link>
                  ) : (
                    <button className="border-2 border-[#514a9d] text-[1rem] my-2 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"
                      onClick={() => {
                        cartNotify();
                        dispatch(addToCart(item))
                      }}
                    >
                      Add to Cart
                    </button>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      <ToastContainer autoClose={2000} />
    </div>
  );
};