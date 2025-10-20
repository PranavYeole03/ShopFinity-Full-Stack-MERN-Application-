import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  SearchProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";

const productRouter = Router();

productRouter.post("/create", auth,admin, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product", getProductByCategory);
productRouter.post('/get-product-by-category-and-subcategory',getProductByCategoryAndSubCategory);
productRouter.post("/get-product-details",getProductDetails)
productRouter.put("/update-product-details",auth,admin,updateProductDetails)
productRouter.delete("/delete-product-details",auth,admin,deleteProductDetails)
productRouter.post("/search-product",SearchProduct)


export default productRouter;
