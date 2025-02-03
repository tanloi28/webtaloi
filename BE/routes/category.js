import { Router } from "express";
import { createCategory, getAllCategory, getCategoryById, removeCategory, updateCategory } from "../controllers/category.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";


const categoryRouter = Router()
categoryRouter.get("/", getAllCategory)
categoryRouter.get("/:id", getCategoryById)
categoryRouter.use("/", checkAuth, checkIsAdmin);
categoryRouter.post("/", createCategory)
categoryRouter.patch("/:id", updateCategory)
categoryRouter.delete("/:id", removeCategory)
export default categoryRouter