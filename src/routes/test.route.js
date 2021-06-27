import { Router } from "express";
import TestController from "../controller/test.controller.js";

const router = new Router();

router.route("/").get(TestController.apiGetTest);

export default router;
