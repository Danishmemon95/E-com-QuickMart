import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../Controllers/categoryController.js";

import { authenticate, authoriseAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authoriseAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authoriseAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authoriseAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
