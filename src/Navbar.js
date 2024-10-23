import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const [search, setSearch] = useState("");

    return (
      <div>
        <nav className="p-8 bg-[#514a9d] flex flex-wrap items-center justify-around" >
        <NavLink className="text-[whitesmoke] px-12 py-0 text-[2rem] italic no-underline" to="/">
          Shopping Cart
        </NavLink>
        <div>
          <input
            className="h-8 w-[20rem] text-base rounded-full py-0 px-2 border-0 hover:bg-[lightgray]"
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <span className="m-0 ml-[-2rem] cursor-pointer" onClick={() => setSearch("")} >❌</span> }
        </div>

        <div className="flex flex-wrap items-baseline gap-8 text-2xl">
          <NavLink className="no-underline text-white" to="/">
            Explore
          </NavLink>
          <NavLink className="no-underline text-white" style={{marginTop: "-.2rem"}} to="/cart">
            Cart({cart.length > 0 ? "🛒" + cart.length : "🛒"})
          </NavLink>
        </div>
      </nav>

      {search &&
      <div className="absolute border border-blue-500 text-left mx-[30%] py-0 px-8 bg-white shadow-[0px_10px_10px_2px_lightblue]">
        {products.filter(
          ({ name, category }) =>
            name
              .toUpperCase()
              .toLowerCase()
              .includes(search.toUpperCase().toLowerCase()) ||
            category
              .toUpperCase()
              .toLowerCase()
              .includes(search.toUpperCase().toLowerCase())
        ).map((item) => {
          const { id, name, category, image } = item;
          return (
            <div key={id} >
              <Link className="no-underline text-black inline-flex items-center border-b border-[#24c6dc] w-[21rem] hover:bg-[whitesmoke]" to={`/productDetail/${id}`}>
                <img
                  className="h-12 w-12 m-1 border-0"
                  alt="voice"
                  src={image}
                />
                {name} || ({category})
              </Link>
            </div>
          );
        }) } 
        </div>}

    </div>
    )
}