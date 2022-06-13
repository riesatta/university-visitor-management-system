
let visitors;
class Visitor {
	static async injectDB(conn) {
		visitors = await conn.db("Newdatabase").collection("visitors")
	}
  static async registervisitor(name,vphonenumber,block) {
    return visitors.findOne({        
    
     'name': name,    
     }).then(async user =>{
    if (user) {
     if ( user.name == name )
     {
      return "username already existed"
     }
    }
    else
    {
  
     await visitors.insertOne({      
      name : name,
      phonenumber: vphonenumber,
      block : block
      
     })
     return "new visitors registered"
    }
     }) 
    }
    static async viewvisitor(name){
        const exist= await visitors.findOne({"name" : name})
           if(exist){
             const user= await visitors.findOne(
               {"name" : name}
               ).then(result=>{ 
                 console.log(result)})
               return user
           }
           else{
             return "Username cannot be found"
              }
      }
    static async update(name) {
        const exist= await visitors.findOne({name: name})
         if(exist){
           const data= await visitors.updateOne(
             {name : name},
             {"$set":
            { block:"fke"}
            } //update
             ).then(result=>{ 
               console.log(result)})
             return data
         }
         else{
           return "username not exist"
            }
         
         }
}

module.exports = Visitor;