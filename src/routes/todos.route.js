import { Router } from "express";

import TodosController from "../controller/todos.controller.js";

const router = new Router();

router.route("/ping").get(TodosController.ping);
router.route("/").get(TodosController.apiGetTodos);
router.route("/").post(TodosController.apiAddTodo);
router.route("/:id").get(TodosController.apiGetTodo);
router.route("/:id").delete(TodosController.apiDeleteTodo);

export default router;
