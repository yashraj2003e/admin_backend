import Router from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/getCart", verifyToken, getCartItems);
router.post("/addToCart", verifyToken, addToCart);
router.delete("/deleteFromCart", verifyToken, deleteFromCart);

export default router;
