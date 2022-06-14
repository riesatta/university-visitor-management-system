let security;

class Security{
    static async injectDB(conn) {
        security = await conn.db("Newdatabase").collection("security")    
}

static async register(securityname, securitypassword,phonenumber) {


    return security.findOne({        
    
     'securitynane': securityname,    
     }).then(async user =>{
    if (user) {
     if ( user.securityname == securityname )
     {
      return "username already existed"
     }
    else
    {
  
     await security.insertOne({      
      securityname : securityname,
      securitypassword : securitypassword,
      phonenumber: phonenumber,

      
     })
     return "new staff registered"
    }
     }
    })
}
}

module.exports = Security;
