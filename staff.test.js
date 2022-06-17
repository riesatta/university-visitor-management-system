const MongoClient = require("mongodb").MongoClient;
const User = require("./staff")
const { faker } = require('@faker-js/faker');

const fpassword = faker.internet.password();
const fphonenumber = faker.phone.phoneNumber();
const fname = faker.name.findName();
const fstaffnumber = faker.random.numeric(5);
const fusername = faker.internet.userName()

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
    const res = await User.register(fusername, fpassword ,fname ,fphonenumber,fstaffnumber,"staff")
    expect(res).toBe("new staff registered")
  })

  test("Duplicate username", async () => {
    const res = await User.register(fusername, fpassword ,fname ,fphonenumber,fstaffnumber,"staff")
    expect(res).toBe("username already existed")
  })

  test("Staff duplicate staff number", async () => {
    const res = await User.register(fusername, fpassword ,fname ,fphonenumber,fstaffnumber,"staff")
    expect(res).toBe("staff number existed")
  })

  test("Staff login invalid password", async () => {
    const res = await User.login("Aiman", "badar","0172984186","staff")
    expect(res).toBe("invalid password")
  })

  test("Staff login successfully", async () => {
    const res = await User.login("Aiman", "Badar","0172984186","staff")

        expect(res.username).toBe("Aiman"),
        expect(res.phonenumber).toBe("0172984186"),
        expect(res.role).toBe("staff")
  })
  
  test("Delete", async () => {
    const res = await User.delete("Jevon_Sawayn")
    expect(res.username).toBe("Jevon_Sawayn")
  })

  test("View",  async () => {
    const res = await User.view("Aiman")
    expect(res.username).toBe("Aiman")
  
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