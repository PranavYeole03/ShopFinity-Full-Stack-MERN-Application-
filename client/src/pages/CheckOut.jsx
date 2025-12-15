import React, { useState } from "react";
import { DisplayPrice } from "../utils/DisplayPrice";
import { useGlobalContext } from "../provider/GlobalProvider";
import { Charges } from "../utils/Price";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { NotDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } =
    useGlobalContext();
  const { deliveryCharge, totalAmount } = Charges(totalPrice);
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.address.addressList);
  const [selectAddress, setSelectAddress] = useState(null);
  const cartItemList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  // ✅ Cash on Delivery Handler
  const handleCashOnDelivery = async () => {
    // 🔸 Check if address is selected
    if (selectAddress === null || !addressList[selectAddress]) {
      toast.error("Select an address before payment.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate("/success", { state: { text: "Order" } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // ✅ Online Payment Handler
  // const handleOnlinePayment = async () => {
  //   // 🔸 Check if address is selected
  //   if (selectAddress === null || !addressList[selectAddress]) {
  //     toast.error("Select an address before payment.");
  //     return;
  //   }

  //   try {
  //     toast.loading("Loading payment gateway...");
  //     const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  //     const stripePromise = await loadStripe(stripePublicKey);

  //     const response = await Axios({
  //       ...SummaryApi.payment_url,
  //       data: {
  //         list_items: cartItemList,
  //         addressId: addressList[selectAddress]?._id,
  //         subTotalAmt: totalPrice,
  //         totalAmt: totalPrice,
  //       },
  //     });

  //     const { data: responseData } = response;

  //     stripePromise.redirectToCheckout({ sessionId: responseData.id });

  //     fetchCartItem?.();
  //     fetchOrder?.();
  //   } catch (error) {
  //     AxiosToastError(error);
  //   }
  // };
  const handleOnlinePayment = async () => {
  if (selectAddress === null || !addressList[selectAddress]) {
    toast.error("Select an address before payment.");
    return;
  }

  try {
    // const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    // const stripe = await loadStripe(stripePublicKey);

    const response = await Axios({
      ...SummaryApi.payment_url,
      data: {
        list_items: cartItemList,
        addressId: addressList[selectAddress]?._id,
        subTotalAmt: totalPrice,
        totalAmt: totalPrice,
      },
    });

    const { data: responseData } = response;

    console.log("Stripe session response:", responseData);

    if (!responseData?.id) {
      toast.error("Failed to create payment session. Check backend logs.");
      return;
    }

    //await stripe.redirectToCheckout({ sessionId: responseData.id });
  } catch (error) {
    AxiosToastError(error);
  }
};


  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 lg:flex-row flex-col flex w-full gap-5 justify-between">
        <div className="w-full">
          {/* Address */}
          <h3 className="text-lg font-semibold">Choose Your Address</h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList.map((address, index) => (
              <label
                htmlFor={"address" + index}
                key={index}
                className={!address.status ? "hidden" : undefined}
              >
                <div className="border p-3 rounded flex gap-3 hover:bg-blue-100">
                  <div>
                    <input
                      id={"address" + index}
                      type="radio"
                      value={index}
                      onChange={(e) => setSelectAddress(Number(e.target.value))}
                      name="address"
                    />
                  </div>
                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-double flex justify-center items-center cursor-pointer hover:bg-blue-100"
            >
              Add Address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          {/* Summary */}
          <h3 className="text-lg font-semibold">Summary</h3>
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
              <p>{totalQty} Item(s)</p>
            </div>

            {/* Delivery Charge */}
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p>{deliveryCharge === 0 ? "Free" : DisplayPrice(deliveryCharge)}</p>
            </div>

            {/* Grand Total */}
            <div className="font-black flex items-center justify-between ml-1">
              <p>Grand Total</p>
              <p>{DisplayPrice(totalAmount)}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-sm flex flex-col gap-2">
            <button
              onClick={handleOnlinePayment}
              className="py-2 px-4 bg-sky-400 text-white font-semibold hover:bg-green-500"
            >
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 border-2 bg-white text-black font-semibold hover:bg-green-400"
            >
              💸 Cash On Delivery 💸
            </button>
          </div>
        </div>
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckOut;
