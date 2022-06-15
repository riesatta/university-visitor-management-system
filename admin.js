let admin;
const bcrypt = require("bcryptjs")
class Admin{
    static async injectDB(conn) {
		admin = await conn.db("Newdatabase").collection("admin")
	}

static async login(name,password){
  const user = await admin.findOne({ name: name })

  if(!user) {
    return "invalid username"
  }

  const valid = await bcrypt.compare(password, user.password)
  
  if(!valid) {
    return "invalid password"
  }

  
  return user;
}
}
module.exports = Admin;