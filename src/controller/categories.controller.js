import CategoriesDAO from "../dao/categories.dao.js";
// import { convertBase64MediaToBlob } from "../utils/commonUtils.js";
export default class CategoriesController {
  static ping(req, res, next) {
    res.json({ result: "pong" });
  }
  static async apiGetCategories(req, res, next) {
    let categories = [];
    try {
      categories = await CategoriesDAO.getCategories();
    } catch (e) {
      console.log(`Error in getting categories: ${e}`);
    }
    res.json({ categories });
  }

  static async apiAddCategory(req, res, next) {
    const date = new Date();
    const category = {
      title: req.body.title,
      description: req.body.description,
      media: req.body.media,
      createdOn: date,
      lastUpdatedOn: date,
    };
    let categoryResponse = {};
    try {
      categoryResponse = await CategoriesDAO.addCategory(category);
    } catch (e) {
      console.log(`Error in creating new category. Error: ${e}`);
    }

    res.json({ status: "Success", category: categoryResponse });
  }
  static async apiUpdateCategory(req, res, next) {
    let apiResponse = {};
    const updatePayload = {
      ...req.body.data,
      lastUpdatedOn: new Date(),
    };
    try {
      apiResponse = await CategoriesDAO.updateCategory(
        req.body.id,
        updatePayload
      );
    } catch (e) {
      console.log(`Error in patching category. Error: ${e}`);
    }
    return res.json({ status: "Success", category: apiResponse });
  }

  static async apiGetCategory(req, res, next) {
    let apiResponse = {};
    try {
      apiResponse = await CategoriesDAO.getCategory(req.query.id);
    } catch (e) {
      console.log(`Error In deleting category. Error: ${e}`);
    }
    res.json({ status: "success", response: apiResponse });
  }

  static async apiDeleteCategory(req, res, next) {
    let apiResponse = {};
    try {
      console.log(req.params);
      console.log(req.query.id);
      apiResponse = await CategoriesDAO.deleteCategory(req.params.id);
    } catch (e) {
      console.log(`Error un deleting category. Error: ${e}`);
    }
    res.json({ status: "success", response: apiResponse });
  }
}
