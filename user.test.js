const MongoClient = require("mongodb").MongoClient;
const User = require("./staff")
const { faker } = require('@faker-js/faker');

const password = faker.internet.password();
const phonenumber = faker.phone.phoneNumber();
const name = faker.name.findName();
const staffnumber = faker.random.numeric(5);
const username = faker.internet.userName()

const jwt = require('jsonwebtoken');
//const Security = require("./security");
function generateAccessToken(payload) {
  return jwt.sign(payload, "secretkey", {expiresIn:'1h'});
}

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

  test("New staff registration",async () => {
    const res = await User.register(username, password ,name ,phonenumber,staffnumber,"staff")
    expect(res).toBe("new staff registered")
  })

  test("Duplicate username", async () => {
    const res = await User.register(username, password ,name ,phonenumber,staffnumber,"staff")
    expect(res).toBe("username already existed")
  })

  test("Staff duplicate staff number", async () => {
    const res = await User.register(username, password ,name ,phonenumber,staffnumber,"staff")
    expect(res).toBe("staff number existed")
  })

  test("Staff login invalid password", async () => {
    const res = await User.login("Faqih", "2022")
    expect(res).toBe("invalid password")
  })

  test("Staff login successfully", async () => {
    const res = await User.login("Faqih", "Fifa2022")

        expect(res.username).toBe(username),
        expect(res.phonenumber).toBe(phonumber),
        expect(res.role).toBe(role)
  })
  
  test("Delete", async () => {
    const res = await User.delete("Faqih")
    expect(res.username).toBe(username)
  })

  test("View",  async () => {
    const res = await User.view("Aiman")
    expect(res.username).toBe(username)
  
  })

});

function verifyToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  jwt.verify(token, "secretkey", (err,user)=>{
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}