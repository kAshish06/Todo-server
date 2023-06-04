import { ObjectId } from "bson";

export default class CategoriesDAO {
  todoDatabase;
  categoriesCollection;
  static async injectDB(client) {
    if (this.categoriesCollection) {
      return;
    }
    try {
      this.todoDatabase = await client.db("todo");
      this.categoriesCollection = await client
        .db("todo")
        .collection("categories");
    } catch (e) {
      console.log(`Error in connecting to database. Error: ${e}`);
    }
  }

  static async getCategories() {
    let cursor;
    try {
      cursor = await this.categoriesCollection.find();
    } catch (e) {
      console.log(`Error in reading todos from todos collection. Error: ${e}`);
    }

    return await cursor.toArray();
  }

  static async addCategory(todo) {
    try {
      return await this.categoriesCollection.insertOne(todo);
    } catch (e) {
      console.log(
        `Error while inserting todo in todos collection. Error: ${e}`
      );
    }
  }

  static async updateCategory(id, patchPayload) {
    try {
      return await this.categoriesCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { ...patchPayload } }
      );
    } catch (e) {
      console.log(`Error while patching todo in todos collection. Error: ${e}`);
    }
  }
  static async getCategory(id) {
    try {
      return await this.categoriesCollection.find(id);
    } catch (e) {
      console.log(`Error while deleting todo from DB. Error: ${e}`);
    }
  }
  static async deleteCategory(id) {
    try {
      console.log(id);
      return await this.categoriesCollection.deleteOne({ _id: ObjectId(id) });
    } catch (e) {
      console.log(`Error while deleting todo from DB. Error: ${e}`);
    }
  }
}
