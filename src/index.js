import MongoDB from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import TestDAO from "./dao/test.dao.js";
dotenv.config();

const port = process.env.PORT || 8000;
const { MongoClient } = MongoDB;
console.log(process.env.PORT);
console.log(process.env.DB_URI);
MongoClient.connect(process.env.DB_URI, {
  poolSize: 50,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await TestDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
