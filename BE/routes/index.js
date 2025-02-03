import { Router } from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";
import authRouter from "./user.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/users', authRouter)
router.use("/order", orderRouter);
router.use("/cart",checkAuth, cartRouter);

export default router