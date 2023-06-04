import ExpansesDAO from "../dao/expanses.dao.js";

export default class ExpansesController {
  static async ping(req, res, next) {
    return res.json({ result: "pong" });
  }

  static async apiGetExpanses(req, res, next) {
    let expanses = [];
    try {
      expanses = await ExpansesDAO.getExpanses();
    } catch (e) {
      console.log(`Error in getting expanses. Error: ${e}`);
    }
    res.json({ expanses });
  }
  static async apiAddExpanses(req, res, next) {
    let expanseResponse;
    try {
      const date = new Date();
      const body = req.body;
      const expanse = {
        title: body.title,
        description: body.desc || "",
        amount: body.amount,
        createdOn: date,
        expanseDate: date,
        lastUpdatedOn: date,
      };
      expanseResponse = await ExpansesDAO.addExpanse(expanse);
    } catch (e) {
      console.log(`Error in getting expanses. Error: ${e}`);
    }
    res.json({ status: "Success", expanse: expanseResponse });
  }
  static async apiUpdateExpanse(req, res, next) {}
  static async apiGetExpanse(req, res, next) {}
  static async apiDeleteExpanses(req, res, next) {
    let apiResponse = { status: "success" };
    let id = req.params.id;
    try {
      apiResponse = await ExpansesDAO.deleteExpanse(id);
    } catch (e) {
      console.log(`Error in deleting expanse: ${id}`);
      console.log(e);
      apiResponse.status = "error";
      apiResponse._id = id;
    }
    res.json(apiResponse);
  }
}
