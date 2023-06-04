import { ObjectId } from "bson";

export default class ExpansesDAO {
  expansesDatabase;
  expansesCollection;

  static async injectDB(client) {
    if (this.expansesCollection) {
      return;
    }
    try {
      this.expansesDatabase = await client.db("expanses");
      this.expansesCollection = await client
        .db("expanses")
        .collection("expanses");
    } catch (e) {
      console.log(`Error in connecting to database. Error: ${e}`);
    }
  }

  static async getExpanses() {
    let cursor;
    try {
      cursor = await this.expansesCollection.find();
    } catch (e) {
      console.log(`Error in getting expanses. ${e}`);
    }
    return await cursor.toArray();
  }

  static async addExpanse(expanse) {
    try {
      return await this.expansesCollection.insertOne(expanse);
    } catch (e) {
      console.log(`Error in adding expanse. Error: ${e}`);
    }
  }

  static async updateExpanses(id, patchPayload) {
    try {
      return await this.expansesCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { ...patchPayload } }
      );
    } catch (e) {
      console.log(`Error in updating expanse. Error: ${e}`);
    }
  }

  static async getExpanse(id) {
    try {
      return await this.expansesCollection.find(id);
    } catch (e) {
      console.log(`Error in finding the expanse. Error: ${id}`);
    }
  }

  static async deleteExpanse(id) {
    try {
      return await this.expansesCollection.deleteOne({ _id: ObjectId(id) });
    } catch (e) {
      console.log(`Error in deleteing expanse from DB. Error: ${e}`);
    }
  }
}
