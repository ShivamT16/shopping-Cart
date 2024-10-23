import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from "react-redux"

import { Loader } from "./Loader";
import { addToCart, fetchProducts, cartNotify } from "../actions";

export function Product() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
         dispatch(fetchProducts())
  },[dispatch])

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    sortFilter: "",
    categoryFilter: [],
    ratingFilter: 0
  });
  const [state, setState] = useState({ bottom: false });
  const categories = [ { _id: 1, category: "Wired" }, { _id: 2, category: "Wireless" }, { _id: 3, category: "Speaker" } ];

  const toggleDrawer = (open) => () => {
    setState({ bottom: open });
  };

  useEffect(() => {
    Mainfunction();
  }, []);

  const Mainfunction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleClearFilter = () => {
    setFilter({
      sortFilter: "",
      categoryFilter: [],
      ratingFilter: 0
    });
  };

  const sortingHandler = (sortElement) => {
    setFilter({ ...filter, sortFilter: sortElement });
  };

  const checkboxHandler = (categoryElement) => {
    const category = categoryElement.toLowerCase();
    filter.categoryFilter.includes(category)
      ? setFilter({
          ...filter,
          categoryFilter: filter.categoryFilter.filter(
            (categoryFilter) => categoryFilter !== category
          )
        })
      : setFilter({
          ...filter,
          categoryFilter: [...filter.categoryFilter, category]
        });
  };

  const ratingHandler = (ratingElement) => {
    setFilter({ ...filter, ratingFilter: ratingElement });
  };

  const priceFiltered =
    filter.sortFilter.length > 0
      ? [...products].sort((a, b) =>
          filter.sortFilter === "LtoH" ? a.price - b.price : b.price - a.price
        )
      : [...products];

  const categoryFiltered =
    filter.categoryFilter.length > 0
      ? [...priceFiltered].filter(({ category }) =>
          filter.categoryFilter.includes(category)
        )
      : [...priceFiltered];

  const ratingFiltered =
    filter.ratingFilter.length > 0
      ? [...categoryFiltered].filter(
          ({ rating }) => rating >= filter.ratingFilter
        )
      : [...categoryFiltered];
      
  const filterSection = (
    <form className="py-4 px-8" onReset={handleClearFilter}>
          <button className="border-2 border-[#514a9d] px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" type="reset">Clear Filters</button>
          <p className="w-[10rem] text-left text-[20px] mt-1">
            <strong>Price</strong>
          </p>
          <p className="w-[10rem] text-left text-[20px] ">
            <input
              type="radio"
              name="price"
              value="LtoH"
              onChange={(e) => sortingHandler(e.target.value)}
            />
            Low to High
          </p>
          <p className="w-[10rem] text-left text-[20px]">
            <input
              type="radio"
              name="price"
              value="HtoL"
              checked={filter.sortFilter === "" ? false : null}
              onChange={(e) => sortingHandler(e.target.value)}
            />
            High to Low
          </p>
          <p className="w-[10rem] text-left text-[20px] mt-1">
            <strong>Category</strong>
          </p>
          
          {categories.map(({ _id, category }) => (
            <div className="w-[10rem] m-1 text-left text-[20px]" key={_id}>
              <input
                type="checkbox"
                value={category}
                name="category"
                onChange={(e) => checkboxHandler(e.target.value)}
                checked={filter.category === "" ? false : null}
              />
              {category}
            </div>
          ))}

          <p className="w-[10rem] text-left text-[20px]">
            <strong>Rating </strong>
          </p>
          <p>
            1
            <input
              type="range"
              min="1"
              max="5"
              onChange={(e) => ratingHandler(e.target.value)}
            />
            5
          </p>
        </form>
  )

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block bg-[whitesmoke] border-r-2 border-gray-500 m-0 p-8">
        <button className="border-2 border-[#514a9d] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" onClick={() => navigate(-1)}> Back </button>
        {filterSection}
      </div>
      <div className="flex bg-[whitesmoke] md:hidden">
        <button className="w-fit h-fit my-1 mx-2 border-2 border-[#514a9d] md: m-1 p-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" onClick={toggleDrawer(true)} >Apply Filter</button>
        <Drawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer(false)}
          >
     {filterSection}
     <button onClick={toggleDrawer(false)} className="border-2 border-[#514a9d] m-1 px-2 py-1 rounded-md bg-white hover:bg-lightgray cursor-pointer" >Apply Filter</button>
        </Drawer>
      </div>

      {loading && <Loader />}

      <div className="bg-[whitesmoke] flex flex-wrap gap-4 p-4 pb-[5rem] pt-8 items-center justify-center">
        {ratingFiltered.map((item) => {
          const { id, name, price, image, rating } = item;
          return (
            <div key={id} className="border-[1.9px] border-[#514a9d] p-4 rounded-[20px]" >
              <Link className="no-underline text-blue-500" to={`/productDetail/${id}`} >
                <img className="h-[15rem] w-[14rem] border-[1.5px] border-[#24c6dc] rounded-[2rem] p-4" alt="product img" src={image} />
                <ul className="m-1">{name}</ul>
                <p className="m-1">
                  ₹{price}  ⭐{rating}
                </p>
                </Link>
              
              {cart.find((element) => element.id === item.id) ? (
                <Link to="/cart">
                  <button className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"> Go to Cart </button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    dispatch(addToCart(item))
                    cartNotify();
                  }}
                  className="border-2 border-[#514a9d] text-[1rem] m-1 px-1 rounded-md bg-white hover:bg-lightgray cursor-pointer"
                >
                  Add to Cart
                </button>
              )} 
              
            </div>
          );
        })}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}