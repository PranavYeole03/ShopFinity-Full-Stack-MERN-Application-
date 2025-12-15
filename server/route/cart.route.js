import { Router } from "express";
import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartItemController } from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.post("/create",auth,addToCartItemController)
cartRouter.get("/get",auth,getCartItemController)
cartRouter.put("/update-qty",auth,updateCartItemController)
cartRouter.delete("/delete-qty",auth,deleteCartItemController)

export default cartRouter