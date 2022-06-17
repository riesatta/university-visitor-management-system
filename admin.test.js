const MongoClient = require("mongodb").MongoClient;
const Admin = require("./admin")
describe("User Account", () => {
    let client;
    beforeAll(async () => {
      client = await MongoClient.connect(
        "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.b5mhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true },
      );
      Admin.injectDB(client);
    })
  
    afterAll(async () => {
      await client.close();
    })
  
    test("Admin login successfully", async () => {
      const res = await Admin.login("University Backend Admin", "ogx1234")
      expect(res.username).toBe("University Backend Admin"),
      expect(res.role).toBe("ogx1234")
    })
     });
  