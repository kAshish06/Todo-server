export default class TestDAO {
  testDatabase;
  testCollection;
  static async injectDB(client) {
    if (this.testCollection) {
      return;
    }
    try {
      this.testDatabase = await client.db("todo");
      this.testCollection = await client.db("todo").collection("test");
    } catch (e) {
      console.error(
        `Unable to establish a connection with database. Error: ${e}`
      );
    }
  }

  static async getTest() {
    let cursor = await this.testCollection.find();
    return await cursor.toArray();
  }
}
