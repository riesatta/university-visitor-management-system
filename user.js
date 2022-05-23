let users;

class User {
  static async injectDB(conn) {
    users = await conn.db("Newdatabase").collection("users")
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
   */
  static async register(username, password,name,phonenumber,staffnumber) {


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

   await users.insertOne({      
    'username' : username,
    'password' : password,
    'name': name,
    'phonenumber': phonenumber,
    'staffnumber': staffnumber,
    
   })
   return "new staff registered"
  }
   }) 
  }
 
  static async login(username, password) {

   return users.findOne({        
  
   'username': username   
   }).then(async user =>{
  
  if (user) {
    
    if(user.password!=password){
      return "invalid password"
    }
    else{
   
    return "login successful"
    }
  }
  else
  {
   return "No such document"
  }
   })
  }

  static async update(username) {
   const exist= await users.findOne({username: username})
    if(exist){
      const data= await users.updateOne(
        {"username" : username},
        {"$set":
       { 'staffnumber':"20002"}
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
           {"username" : username}
           ).then(result=>{ 
             console.log(result)})
           return data
       }
       else{
         return "username not exist"
          }
 }
}
 
 module.exports = User;