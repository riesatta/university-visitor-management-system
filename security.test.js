const MongoClient = require("mongodb").MongoClient;
const Security = require("./security")

const jwt = require('jsonwebtoken');
//const Security = require("./security");
function generateAccessToken(payload) {
  return jwt.sign(payload, "secretkey", {expiresIn:'1h'});
}

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
      Security.injectDB(client);
    })
  
    afterAll(async () => {
      await client.close();
    })
  
    test("New security registration",async () => {
      const res = await Security.register(name, username ,password,phonenumber,"security")
      expect(res).toBe("new security registered")
    })
  
    test("Duplicate username",async () => {
      const res = await Security.register(username, password ,name ,phonenumber,staffnumber,"security")
      expect(res).toBe("username already existed")
    })
  
    test("security login invalid password", async () => {
      const res = await Security.logins("KPG", "2022")
      expect(res).toBe("invalid password")
    })
  
    test("security login successfully", async () => {
      const res = await Security.logins("KPG", "123","security")
      expect(res.securityname).toBe("Kim Pan Gon"),
      expect(res.phonenumber).toBe("01876528175"),
      expect(res.role).toBe("security")
    })
    
    test("Delete", async () => {
      const res = await Security.delete("Jerald Mante","security")
      expect(res.securityusername).toBe("Jerald Mante")
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