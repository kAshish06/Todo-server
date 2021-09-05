import { ObjectId } from "bson";

export default class TodosDAO {
  todoDatabase;
  todosCollection;
  static async injectDB(client) {
    if (this.todosCollection) {
      return;
    }
    try {
      this.todoDatabase = await client.db("todo");
      this.todosCollection = await client.db("todo").collection("todos");
    } catch (e) {
      console.log(`Error in connecting to database. Error: ${e}`);
    }
  }

  static async getTodos() {
    let cursor;
    try {
      cursor = await this.todosCollection.find();
    } catch (e) {
      console.log(`Error in reading todos from todos collection. Error: ${e}`);
    }

    return await cursor.toArray();
  }

  static async addTodo(todo) {
    try {
      console.log(todo);
      return await this.todosCollection.insertOne(todo);
    } catch (e) {
      console.log(
        `Error while inserting todo in todos collection. Error: ${e}`
      );
    }
  }
  static async getTodo(id) {
    try {
      return await this.todosCollection.find(id);
    } catch (e) {
      console.log(`Error while deleting todo from DB. Error: ${e}`);
    }
  }
  static async deleteTodo(id) {
    try {
      console.log(id);
      return await this.todosCollection.deleteOne({ _id: ObjectId(id) });
    } catch (e) {
      console.log(`Error while deleting todo from DB. Error: ${e}`);
    }
  }
}
