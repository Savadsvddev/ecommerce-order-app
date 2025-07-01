import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import { getCartItems } from "../api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
import CartIcon from "../components/CartIcon";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = localStorage.getItem("token");
  const user = "User";

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchCart());
  }, [dispatch, localStorage.getItem("token")]);

  return (
    <div className="p-5 shadow-md flex justify-between">
      {/* Left */}
      <div className="flex items-center gap-8">
        <img
          // src={"/images/logo/logo_new.jpeg"}
          src={"/images/logo/logo_1.jpg"}
          alt="logo"
          width={75}
          height={50}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        {/* Category */}

        {/* Search */}
        <div className="hidden md:flex gap-3 items-center border border-[hsl(0,0%,89.8%)] rounded-full p-2 px-5">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-5 items-center">
        <CartIcon cartLength={items?.length}/>
        {!isLogin ? (
          // <Link href={"#"}>
            <button className="bg-[#EE8821] p-1 px-3 rounded-[8px] px-4 py-2 text-white cursor-pointer" onClick={()=> navigate("/login")}>
              Login
            </button>
          // </Link>
        ) : (
          <ProfileMenu />
        )}
      </div>
    </div>
  );
}

export default Header;
