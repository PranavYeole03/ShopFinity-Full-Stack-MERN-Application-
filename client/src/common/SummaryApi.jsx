export const baseURL = "https://shopfinity-full-stack-mern-application-cwxr.onrender.com";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  ForgotPassword: {
    url: "/api/user/forget-password",
    method: "put",
  },
  verifyForgotPasswordOtp: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  ResetPassword: {
    url: "/api/user/resetpassword",
    method: "put",
  },
  RefreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  createSubCategory: {
    url: "/api/subcategory/create",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/product/get-product",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "put",
  },
  deleteProduct: {
    url: "/api/product/delete-product-details",
    method: "delete",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "post",
  },
  addToCart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCartQty: {
    url: "/api/cart/delete-qty",
    method: "delete",
  },
  createAddress: {
    url: "/api/address/create-address",
    method: "post",
  },
  getAddress: {
    url: "/api/address/get-address",
    method: "get",
  },
  updateAddress: {
    url: "/api/address/update-address",
    method: "put",
  },
  deleteAddress: {
    url: "/api/address/delete-address",
    method: "delete",
  },
  cashOnDeliveryOrder: {
    url: "/api/order/cash-delivery",
    method: "post",
  },
  payment_url: {
    url: "/api/order/checkout",
    method: "post",
  },
  getOrderItems: {
    url: "/api/order/get-list",
    method: "get",
  },
};

export default SummaryApi;
