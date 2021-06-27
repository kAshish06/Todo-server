import TestDAO from "../dao/test.dao.js";

export default class TestController {
  static async apiGetTest(req, res, next) {
    let query = "";
    let testData;
    try {
      testData = await TestDAO.getTest();
    } catch (e) {
      console.log(`Error in reading test collection ${e}`);
    }
    console.log(testData);
    res.json({
      tests: testData,
    });
  }
}
