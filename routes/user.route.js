import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.delete("/", deleteAllUsers);

export default router;
