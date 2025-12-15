import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobile from "./components/CartMobile";
import Chatbot from "./components/Chatbot";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Fetch user details (requires access token)
  const fetchUser = async () => {
    try {
      const response = await Axios.get(SummaryApi.userDetails.url);
      dispatch(setUserDetails(response.data.data));
    } catch (error) {
      console.error("Error fetching user details:", error.response || error);
    }
  };

  // Fetch categories
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios.get(SummaryApi.getCategory.url);
      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response || error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // Fetch subcategories
  const fetchSubCategory = async () => {
    try {
      // Subcategory API expects POST, send empty object if needed
      const response = await Axios.post(SummaryApi.getSubCategory.url, {});
      if (response.data.success) {
        dispatch(setAllSubCategory(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error.response || error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Chatbot />
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/checkout" && <CartMobile />}
    </GlobalProvider>
  );
}

export default App;
