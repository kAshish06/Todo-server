import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import testRouter from "./routes/test.route.js";
import todoRouter from "./routes/todos.route.js";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/test", testRouter);
app.use("/api/v1/todos", todoRouter);

export default app;
