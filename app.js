import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import productRouter from "./routes/product.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.listen(3000, () => console.log("Server is running on port 3000 !"));
