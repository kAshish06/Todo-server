import MongoDB from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import TestDAO from "./dao/test.dao.js";
import TodosDAO from "./dao/todos.dao.js";
import CategoriesDAO from "./dao/categories.dao.js";
import ExpansesDAO from "./dao/expanses.dao.js";
dotenv.config();

const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = MongoDB;
MongoClient.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await TestDAO.injectDB(client);
    await TodosDAO.injectDB(client);
    await CategoriesDAO.injectDB(client);
    await ExpansesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
