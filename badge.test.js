const MongoClient = require("mongodb").MongoClient;
const Badge = require("./badge")


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
      Badge.injectDB(client);
    })
  
    afterAll(async () => {
      await client.close();
    })
  
    
    test("Delete", async () => {
      const res = await Badge.deletebadge("Faqih")
      expect(res.visitid).toBe(visitid)
    })
  
    test("View", async () => {
      const res = await Badge.viewbadge("01")
      expect(res.name).toBe(name),
      expect(res.visitid).toBe(visitid),
      expect(res.block).toBe(block),
      expect(res.time).toBe(time),
      expect(res.date).toBe(date),
      expect(res.tovisit).toBe(tovisit),
  
      expect(res.reason).toBe(reason),
      expect(res.parking).toBe(parking)

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