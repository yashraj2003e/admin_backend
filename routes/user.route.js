import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/:id", verifyToken, getUser);

export default router;
