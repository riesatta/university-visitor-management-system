
let visitors;
let badge;
class Visitor {
	static async injectDB(conn) {
		visitors = await conn.db("Newdatabase").collection("visitors")
    badge = await conn.db("Newdatabase").collection("badge")
	}

  //REGISTER VISITOR
  static async registervisitor(name,phonenumber,visitid,block,time,date,tovisit,Relationship,reason,parking) {
    return visitors.findOne({        
    
     'name': name,    
     }).then(async user =>{
    if (user) {
     if ( user.visitid == visitid )
     {
      return "visit id existed"
     }
    }
    else
    {
  
     await visitors.insertOne({      
      "name" : name,
      phonenumber: phonenumber,
      visitid:visitid,
      "block to visit" : block,
      time:time,
      date: date,
      tovisit: tovisit,
      "Relationship": Relationship,
     })
     await badge.insertOne({
      "name" : name,
      visitid:visitid,
      reason:reason,
      time:time,
      tovisit:tovisit,
      "block to visit" : block,
      parking : parking,
      date:date
     })
     return "new visitors registered"
    }
     }) 
    }

//VIEW VISITOR
    static async viewvisitor(name){
        const exist= await visitors.findOne({"name" : name})
           if(exist){
             const user= await visitors.findOne(
               {"name" : name}
               ).then(result=>{ 
                 console.log(result)})
               return exist
           }
           else{
             return "Username cannot be found"
              }
      }

//update block
    static async updateblock(name,block) {
        const exist= await visitors.findOne({name: name})
         if(exist){
           const data= await visitors.updateOne(
             {name : name},
             {"$set":
            { "block to visit":block}
            } //update
             ).then(result=>{ 
               console.log(result)})
               const datab= await badge.updateOne(
                {name : name},
                {"$set":
               { "block to visit":block}
               } //update
                )
            
             return exist
         }
         else{
           return "Visitor is not exist"
            }
         
         }

//update Date    
static async updatedate(name,date) {
  const exist= await visitors.findOne({name: name})
    if(exist){
      const data= await visitors.updateOne(
        {name : name},
        {"$set":
        { date:date}
        } //update
        ).then(result=>{ 
        console.log(result)})
        const datab= await badge.updateOne(
          {name : name},
          {"$set":
         { date:date}
         } //update
          )
        return exist
    }
    else{
      return "Visitor is not exist"
        }
           
}

//update time
static async updatetime(name,time) {
  const exist= await visitors.findOne({name: name})
    if(exist){
      const data= await visitors.updateOne(
        {name : name},
        {"$set":
        { time:time}
        } //update
        ).then(result=>{ 
        console.log(result)})
        const datab= await badge.updateOne(
          {name : name},
          {"$set":
         { time:time}
         } //update
          )        
        return exist
    }
    else{
      return "Visitor is not exist"
        }
           
}

//update phone number
static async updatephonenumber(name,phonenumber) {
  const exist= await visitors.findOne({name: name})
    if(exist){
      const data= await visitors.updateOne(
        {name : name},
        {"$set":
        { phonenumber:phonenumber}
        } //update
        ).then(result=>{ 
        console.log(result)})
        const datab= await badge.updateOne(
          {name : name},
          {"$set":
         { phonenumber:phonenumber}
         } //update
          )
        return exist
    }
    else{
      return "Visitor is not exist"
        }
           
}

//delete
static async delete(name) {
  const exist= await visitors.findOne({name: name})
   if(exist){
     const data= await visitors.deleteOne(
       {name : name}
       )

       await badge.deleteOne(
        {name:name}
       )
       return exist
   }
   else{
     return "Visitor is not exist"
      }
}




}

module.exports = Visitor;