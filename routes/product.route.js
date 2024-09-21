import Router from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/getProducts", getProducts);
router.post("/addProduct", addProduct);
router.delete("/deleteProduct/:productId", deleteProduct);

export default router;
