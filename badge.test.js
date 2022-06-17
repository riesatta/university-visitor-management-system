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
      const res = await Badge.deletebadge("Messi")
      expect(res.visitid).toBe("30")
    })
  
    test("View", async () => {
      const res = await Badge.viewbadge("01")
      expect(res.name).toBe("Luong In Yee"),
      expect(res.visitid).toBe("01"),
      expect(res.block).toBe("FTKMP"),
      expect(res.time).toBe("5.00PM"),
      expect(res.date).toBe("21/6/2022"),
      expect(res.tovisit).toBe("Luong In Lee"),
  
      expect(res.reason).toBe("Family visit"),
      expect(res.parking).toBe("206A")

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