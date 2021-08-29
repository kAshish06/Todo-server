import TodosDAO from "../dao/todos.dao.js";

export default class TodosController {
  static ping(req, res, next) {
    res.json({ result: "pong" });
  }
  static async apiGetTodos(req, res, next) {
    let todos = [];
    try {
      todos = await TodosDAO.getTodos();
    } catch (e) {
      console.log(`Error in getting todos: ${e}`);
    }
    res.json({ todos });
  }

  static async apiAddTodo(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      createdOn: new Date(),
    };
    let todoResponse = {};
    try {
      todoResponse = await TodosDAO.addTodo(todo);
    } catch (e) {
      console.log(`Error in creating new todo. Error: ${e}`);
    }

    res.json({ status: "Success", todo: todoResponse });
  }

  static async apiGetTodo(req, res, next) {
    let apiResponse = {};
    try {
      apiResponse = await TodosDAO.getTodo(req.query.id);
    } catch (e) {
      console.log(`Error un deleting todo. Error: ${e}`);
    }
    res.json({ status: "success", response: apiResponse });
  }

  static async apiDeleteTodo(req, res, next) {
    let apiResponse = {};
    try {
      console.log(req.params);
      console.log(req.query.id);
      apiResponse = await TodosDAO.deleteTodo(req.params.id);
    } catch (e) {
      console.log(`Error un deleting todo. Error: ${e}`);
    }
    res.json({ status: "success", response: apiResponse });
  }
}
