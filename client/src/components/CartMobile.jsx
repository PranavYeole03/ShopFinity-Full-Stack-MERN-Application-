import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPrice } from "../utils/DisplayPrice";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobile = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 ">
          <div className="bg-green-500 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2 ">
              <div className="p-2 bg-green-500 rounded w-fit animated-pulse">
                <FaShoppingCart />
              </div>
              <div className="text-xs">
                <p>{totalQty}Items</p>
                <p>{DisplayPrice(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/cart"} className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
