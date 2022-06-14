const MongoClient = require("mongodb").MongoClient;
const User = require("./user")
const { faker } = require('@faker-js/faker');

const password = faker.internet.password();
const phonenumber = faker.phone.phoneNumber();
const name = faker.name.findName();
const staffnumber = faker.random.numeric(5);
const username = faker.internet.userName()

describe("User Account", () => {
  let client;
  beforeAll(async () => {
    client = await MongoClient.connect(
      "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.b5mhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true },
    );
    User.injectDB(client);
  })

  afterAll(async () => {
    await client.close();
  })

  /*test("New staff registration", async () => {
    const res = await User.register(username, password ,name ,phonenumber,staffnumber)
    expect(res).toBe("new staff registered")
  })

  test("Duplicate username", async () => {
    const res = await User.register("Margarett_Reilly", "1234","Arif","016768868","8")
    expect(res).toBe("username already existed")
  })

  test("User duplicate staff number", async () => {
    const res = await User.register("Arifaiman", "1234","Arif","016768868","84330")
    expect(res).toBe("staff number existed")
  })

  test("User login invalid password", async () => {
    const res = await User.login("Vladimir.Spinka88", "1235")
    expect(res).toBe("invalid password")
  })*/

  test("User login successfully", async () => {
    const res = await User.login("Vladimir.Spinka88", "snazHxw1S1TKsLW")
    expect(res).toBe("login successful")
  })
  
  test('should run', () => {
});
});