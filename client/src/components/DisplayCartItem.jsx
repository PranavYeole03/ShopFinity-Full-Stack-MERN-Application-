import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPrice } from "../utils/DisplayPrice";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import empty_cart from "../assets/empty_cart.webp";
import { Charges } from "../utils/Price";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { NotDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  console.log(user);
  // Use Charges utility to calculate delivery + grand total
  const { deliveryCharge, totalAmount } = Charges(totalPrice);
  const navigate = useNavigate();

  const redirectToCheckOut = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };

  return (
    <section className="bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="bg-white w-full lg:max-w-sm min-h-screen max-h-screen ml-auto">
        {/* Header */}
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="cursor-pointer hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {cartItem[0] ? (
            <>
              {/* Savings Section */}
              <div className="flex items-center justify-between p-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your Total Savings:</p>
                <p>{DisplayPrice(NotDiscountTotalPrice - totalPrice)}</p>
              </div>
              {totalPrice >= 1000 ? (
                <div className="bg-green-200 py-2">
                  <h1 className="font-semibold text-center text-green-800 animate-pulse">
                    🎉 You got free delivery on this order!
                  </h1>
                </div>
              ) : (
                <>
                  <div className="bg-green-200 flex items-center justify-between">
                    <p className="font-medium animate-pulse  cursor-auto">
                      Shop for more than {DisplayPrice(1000)} to free delivery
                    </p>
                  </div>
                  <div className=" bg-green-200 hidden lg:block">
                    <h1 className="font-semibold animate-pulse  text-center">
                      Almost there! Add a few more items to unlock FREE delivery.
                    </h1>
                  </div>

                  <Link
                    to={"/"}
                    className="bg-green-400 w-full flex justify-center items-center rounded lg:hidden"
                  >
                   Continue Shopping
                  </Link>
                </>
              )}

              {/* Cart Items */}
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={index + item + "Cart"}
                        className="flex w-full gap-4"
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            alt={item?.productId?.name}
                            className="object-scale-down w-full h-full"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit} Units
                          </p>
                          <p className="font-semibold">
                            {DisplayPrice(
                              PriceWithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Bill Details */}
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill Details</h3>

                {/* Items Total */}
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items Total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPrice(NotDiscountTotalPrice)}
                    </span>
                    <span className="font-semibold">
                      {DisplayPrice(totalPrice)}
                    </span>
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex gap-4 justify-between ml-1">
                  <p>Total Quantity</p>
                  <p className="flex items-center gap-2">{totalQty} Item</p>
                </div>

                {/* Delivery Charge */}
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className="flex items-center gap-2">
                    {deliveryCharge === 0
                      ? "Free"
                      : DisplayPrice(deliveryCharge)}
                  </p>
                </div>

                {/* Grand Total */}
                <div className="font-black flex items-center justify-between ml-1">
                  <p className="font-semibold">Grand Total</p>
                  <p>{DisplayPrice(totalAmount)}</p>
                </div>
              </div>
            </>
          ) : (
            // Empty Cart
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={empty_cart}
                className="w-full h-full object-scale-down"
                alt="Empty Cart"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-300 px-4 py-2"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* Footer - Proceed Button */}
        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-gray-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div className="flex items-center px-4 py-1 bg-blue-200 text-black hover:animate-pulse rounded-full">
                <div>{DisplayPrice(totalAmount)}</div>
              </div>
              <button
                onClick={redirectToCheckOut}
                className="flex items-center gap-1 cursor-pointer hover:bg-blue-300 hover:text-black"
              >
                Proceed
                <span>
                  <FaCaretRight size={25} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
