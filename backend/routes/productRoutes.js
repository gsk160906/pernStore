import express from "express";
import {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verifyUser, getAllProducts);
router.get("/:id", verifyUser, getProduct);
router.post("/", verifyUser, createProduct);
router.put("/:id", verifyUser, updateProduct);
router.delete("/:id", verifyUser, deleteProduct);


export default router;