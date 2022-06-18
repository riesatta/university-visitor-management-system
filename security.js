let security;
const bcrypt = require("bcryptjs")
class Security{
    static async injectDB(conn) {
        security = await conn.db("Newdatabase").collection("security")    
}

static async register(securityname,securityusername,password,phonenumber,role) {
    return security.findOne({        
     'securityname': securityname,    
     }).then(async user =>{
    if (user) {
     if ( user.securityname == securityname )
     {
      return "username already existed"
     }}
    else
    {
    const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt)
     await security.insertOne({      
      securityname : securityname,
      securityusername: securityusername,
      password : hashed,
      phonenumber: phonenumber,
      role: role
      
     })
     return "new security registered"
    }
     
    })
}

static async logins(securityusername,password,role){
  const user = await security.findOne({ securityusername: securityusername })

  if(!user) {
    return "invalid username"
  }

  const valid = await bcrypt.compare(password, user.password)
  
  if(!valid) {
    return "invalid password"
  }

  
  return user;
}

  


   static async delete(securityusername) {
    const exist= await security.findOne({securityusername: securityusername})
     if(exist){
       const data= await security.deleteOne(
         {securityusername : securityusername}
         ).then(result=>{ 
           console.log(result)})
         return exist
     }
     else{
       return "Security is not exist"
        }
}
}

module.exports = Security;
