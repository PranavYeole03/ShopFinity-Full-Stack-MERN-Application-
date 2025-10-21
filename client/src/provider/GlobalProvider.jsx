import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddItemCart } from "../store/cartProduct";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

// Create context
export const GlobalContext = createContext(null);

// Custom hook for consuming context
export const useGlobalContext = () => useContext(GlobalContext);

// Provider component
const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [NotDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);

  // Fetch cart items
  const fetchCartItem = async () => {
    try {
      const response = await Axios.get(SummaryApi.getCartItem.url);
      if (response.data.success) {
        dispatch(handleAddItemCart(response.data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Update cart quantity
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios.put(SummaryApi.updateCartQty.url, { _id: id, qty });
      if (response.data.success) {
        fetchCartItem();
        return response.data;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  // Delete cart item
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios.delete(SummaryApi.deleteCartQty.url, { data: { _id: cartId } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Fetch address
  const fetchAddress = async () => {
    try {
      const response = await Axios.get(SummaryApi.getAddress.url);
      if (response.data.success) {
        dispatch(handleAddAddress(response.data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Fetch orders
  const fetchOrder = async () => {
    try {
      const response = await Axios.get(SummaryApi.getOrderItems.url);
      if (response.data.success) {
        dispatch(setOrder(response.data.data));
      }
    } catch (error) {
      console.error("Fetch order error:", error.response || error);
    }
  };

  // Logout
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  // Calculate total price and quantity
  useEffect(() => {
    const Qty = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
    setTotalQty(Qty);

    const tPrice = cartItem.reduce(
      (prev, curr) => prev + PriceWithDiscount(curr.productId.price, curr.productId.discount) * curr.quantity,
      0
    );
    setTotalPrice(tPrice);

    const NotDiscountPrice = cartItem.reduce((prev, curr) => prev + curr.productId.price * curr.quantity, 0);
    setNotDiscountTotalPrice(NotDiscountPrice);
  }, [cartItem]);

  // Fetch data when user changes
  useEffect(() => {
    fetchCartItem();
    fetchAddress();
    fetchOrder();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        totalPrice,
        totalQty,
        NotDiscountTotalPrice,
        handleLogOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Export default provider (Vite-friendly)
export default GlobalProvider;
