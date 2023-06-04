import { Router } from "express";

import CategoriesController from "../controller/categories.controller.js";

const router = new Router();

router.route("/ping").get(CategoriesController.ping);
router.route("/").get(CategoriesController.apiGetCategories);
router.route("/").post(CategoriesController.apiAddCategory);
router.route("/").patch(CategoriesController.apiUpdateCategory);
router.route("/:id").get(CategoriesController.apiGetCategory);
router.route("/:id").delete(CategoriesController.apiDeleteCategory);

export default router;
