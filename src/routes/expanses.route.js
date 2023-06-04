import { Router } from "express";

import ExpansesController from "../controller/expanses.controller.js";

const router = new Router();

router.route("/ping").get(ExpansesController.ping);
router.route("/").get(ExpansesController.apiGetExpanses);
router.route("/").post(ExpansesController.apiAddExpanses);
router.route("/:id").patch(ExpansesController.apiUpdateExpanse);
router.route("/:id").get(ExpansesController.apiGetExpanse);
router.route("/:id").delete(ExpansesController.apiDeleteExpanses);

export default router;
