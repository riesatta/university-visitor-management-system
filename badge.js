let badge
class Badge {
    static async injectDB(conn) {
        badge = await conn.db("Newdatabase").collection("badge")
    }
static async viewbadge(visitid){
    const exist= await badge.findOne({visitid: visitid})
        if(exist){
            const user= await badge.findOne(
            {visitid : visitid}
            ).then(result=>{ 
             console.log(result)})
            return exist
        }
        else{
            return "Id cannot be found"
            }
      }
      static async deletebadge(visitid) {
        const exist= await badge.findOne({visitid: visitid})
         if(exist){
           const data= await badge.deleteOne(
             {visitid : visitid}
             ).then(result=>{ 
               console.log(result)})
             return exist
         }
         else{
           return "staff not exist"
            }
   }
}

module.exports=Badge