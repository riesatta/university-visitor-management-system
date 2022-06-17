let users;
const bcrypt = require("bcryptjs")

class Staff {
  static async injectDB(conn) {
    users = await conn.db("Newdatabase").collection("staff")
  }
/**
   * @remarks
   * This method is not implemented yet. To register a new user, you need to call this method.
   * 
   * @param {*} username 
   * @param {*} password 
   * @param {*} name
   * @param {*} phonenumber 
   * @param {*} staffnumber
   * @param {*} role
   */

  static async register(username, password,name,phonenumber,staffnumber,role) {


  return users.findOne({        
  
   'username': username,    
   }).then(async user =>{
  if (user) {
   if ( user.username == username )
   {
    return "username already existed"
   }

   else if (user.staffnumber==staffnumber)
   {
     return "staff number existed"
   }
  }
  else
  {
    const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt)
   await users.insertOne({      
    username : username,
    password : hashed,
    name: name,
    phonenumber: phonenumber,
    staffnumber: staffnumber,
    role : role
    
   })
   return "new staff registered"
  }
   }) 
  }
 


  static async login(username,password,phonenumber,role){
    const user = await users.findOne({ username: username })
  
    if(!user) {
      return "invalid username"
    }
  
    const valid = await bcrypt.compare(password, user.password)
    
    if(!valid) {
      return "invalid password"
    }
    
    return user;
  }
  static async update(username) {
   const exist= await users.findOne({username: username})
    if(exist){
      const data= await users.updateOne(
        {username : username},
        {"$set":
       { staffnumber:"200401"}
       } //update
        ).then(result=>{ 
          console.log(result)})
        return data
    }
    else{
      return "username not exist"
       }
    
    }



  static async delete(username) {
      const exist= await users.findOne({username: username})
       if(exist){
         const data= await users.deleteOne(
           {username : username}
           ).then(result=>{ 
             console.log(result)})
           return exist
       }
       else{
         return "staff is not exist"
          }
 }
 static async view(username){
  const exist= await users.findOne({username: username})
     if(exist){
       const user= await users.findOne(
         {username : username}
         ).then(result=>{ 
           console.log(result)})
         return exist
     }
     else{
       return "Username cannot be found"
        }
}


}
 
 module.exports = Staff;