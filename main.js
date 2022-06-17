const MongoClient = require("mongodb").MongoClient;
const Staff = require("./staff");
const Visitor = require("./visitors");
const Security=require("./security");
const Admin=require("./admin");
const Badge=require("./badge");
MongoClient.connect(
  
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.b5mhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
).catch(err => {
  console.error(err.stack)
  process.exit(1)
}).then(async client => {
  console.log('Connected to MongoDB');
  Staff.injectDB(client);
  Visitor.injectDB(client);
  Security.injectDB(client);
  Admin.injectDB(client);
  Badge.injectDB(client);
})
const express = require('express');
const { userInfo } = require("os");
const app = express()
const port = process.env.PORT || 5000

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title: 'MyVMS API',
      version: '1.0.0',
    },
  },
  apis: ['./main.js'],
}
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//staff login
app.post('/login/staff', async (req, res) => {
  //console.log(req.body)
    let user = await Staff.login(req.body.username, req.body.password, req.body.phonenumber, req.body.role)
    if (user == "invalid password"||user== "invalid username"){
      return res.status(404).send("Wrong password or username") 
    }
    
    else{
        return res.status(200).json({
          username: user.username,
          phonenumber: user.phonenumber,
          role: user.role,
          token: generateAccessToken({
            role: user.role
          }),
          
        });
    }
})

//admin login
app.post('/login/adminonly', async (req, res) => {
  const ad = await Admin.login(req.body.name, req.body.password, req.body.role)
  if (ad == "invalid password"||ad == "invalid username"){
    return res.status(404).send("Wrong password or username")
  }

  else{
      return res.status(200).json({
        token: generateAccessToken({
          role: ad.role
        }),
        
      });
  }
})
//security login
app.post('/login/security', async (req, res) => {
    const secu = await Security.logins(req.body.securityusername, req.body.password, req.body.role)
    if (secu == "invalid password"||secu == "invalid username"){
      return res.status(404).send("Wrong password or username")
    }
    else{
        return res.status(200).json({
          securityusername: secu.securityusername,
          role: secu.role,
          token: generateAccessToken({
            role: secu.role
          }),
          
        });
    }
})
/**
 * @swagger
 * /login/staff:
 *   post:
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * 
 *       404:
 *         description: Invalid username or password
 */





//PUBLIC TO VIEW 
//visitor
app.get('/find/publicview/visitor/:name', async(req,res)=>{
  const public= await Visitor.viewvisitor(req.params.name)
  if(public=="Username cannot be found")
  {
    return res.status(404).send("Visitor not exist")
  }
  return res.status(200).json({
    name: public.name,
    "Time arrived": public.time,
    Date: public.date
  })
})

//badge
app.get('/find/publicview/badge/:visitid', async(req,res)=>{
  const publicb= await Badge.viewbadge(req.params.visitid)
  if(publicb=="Id cannot be found")
  {
    return res.status(404).send("Id not exist")
  }
  return res.status(200).json({
    name: publicb.name,
    visitid: publicb.visitid,
    reason: publicb.reason,
    "Time arrived": publicb.time,
    Date: publicb.date,
    tovisit: publicb.tovisit,
    block: publicb.block,
    parking: publicb.parking,
  })
})
 
//staff
app.get('/find/publicview/staff/:username', async(req,res)=>{
  let find= await Staff.view(req.params.username)
  if(req.user.role=="security"||req.user.role == "admin"){
    if(find=="Username cannot be found")
  {
    return res.status(404).send("Username not exist")
  }
  return res.status(200).json({
    username: find.username,
    staffnumber: find.staffnumber,
    phonenumber: find.phonenumber
  })
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})


//only authorized person can access
app.use((req, res, next)=>{
  const authHeader=req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  jwt.verify(token, "secretkey", (err,user)=>{
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
});

////STAFF///
//register visitor
app.post('/register/visitors', async (req, res) => {
    const rgsv = await Visitor.registervisitor(req.body.name, req.body.phonenumber,req.body.visitid, req.body.block, req.body.time, req.body.date, req.body.tovisit, req.body.Relationship,req.body.reason,req.body.parking)
    if(req.user.role=="staff"||req.user.role == "admin"){
      if (rgsv == "visit id existed"){
        return res.status(404).send("visit id existed")
    }
    else{
        return res.status(200).send("New visitor registered")
    }
    }
    else{
      return res.status(403).send('Unauthorized')
    }
})

//update visitor BLOCK
app.patch('/update/visitor/block', async (req, res) => {
  const uptv = await Visitor.updateblock(req.body.name,req.body.block)
  if(req.user.role=="staff"||req.user.role == "admin"){
    if (uptv == "Visitor is not exist"){
      return res.status(404).send("visitor does not exist")
  }
  else{
    return res.status(200).json({
      name: uptv.name,
      Updated: "Block to visit updated"
    })
  }  
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})

//update visitor DATE
app.patch('/update/visitor/date', async (req, res) => {
  const uptv = await Visitor.updatedate(req.body.name,req.body.date)
  if(req.user.role=="staff"||req.user.role == "admin"){
    if (uptv == "Visitor is not exist"){
      return res.status(404).send("visitor does not exist")
  }
  else{
    return res.status(200).json({
      name: uptv.name,
      Updated: "Date updated"
    })
  }  
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})

//update visitor TIME
app.patch('/update/visitor/time', async (req, res) => {
  const uptv = await Visitor.updatetime(req.body.name,req.body.time)
  if(req.user.role=="staff"){
    if (uptv == "Visitor is not exist"){
      return res.status(404).send("visitor does not exist")
  }
  else{
    return res.status(200).json({
      name: uptv.name,
      Updated: "Time updated"
    })
  }  
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})

//update visitor PHONE NUMBER
app.patch('/update/visitor/phonenumber', async (req, res) => {
  const uptv = await Visitor.updatephonenumber(req.body.name,req.body.phonenumber)
  if(req.user.role=="staff"||req.user.role == "admin"){
    if (uptv == "Visitor is not exist"){
      return res.status(404).send("visitor does not exist")
  }
  else{
    return res.status(200).json({
      name: uptv.name,
      Updated: "Phone Number updated"
    })
  }  
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})
  //delete visitor
  app.delete('/delete/visitor', async (req, res) => {
      const dlt = await Visitor.delete(req.body.name)
      if(req.user.role == "staff"||req.user.role == "admin"){
        if (dlt == "Visitor is not exist"){
          return res.status(404).send("Visitor is not exist")
          
      }
        else {
          return res.status(200).json({
  
            status: "DELETED FROM DATA"
          })
      } 
      }
      else{
        return res.status(403).send('Unauthorized')
       
      } 
  })


//SECURITY

//SECURITY AND STAFF AND ADMIN
//find visitor
app.get('/find/visitor/:name', async(req,res)=>{
  const userv= await Visitor.viewvisitor(req.params.name)
  if(req.user.role=="staff"||req.user.role=="security"||req.user.role == "admin"){
    if(userv=="Username cannot be found")
  {
    return res.status(404).send("Visitor not exist")
  }
  return res.status(200).json({
    name: userv.name,
    "phone number": userv.phonenumber,
    block: userv.block,
    "Time arrived": userv.time,
    Date: userv.date,
    "Student/Staff to visit": userv.tovisit,
    Relationship: userv.Relationship,
  })
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})

//ADMIN
//register staff
app.post('/register/staff', async (req, res) => {
    const rgs = await Staff.register(req.body.username, req.body.password, req.body.name, req.body.phonenumber, req.body.staffnumber,req.body.role)
    if(req.user.role=="admin"){
      if (rgs == "username already existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else if(rgs=="staff number existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else{
        return res.status(200).send("New Staff registered")
    }
    }
    else{
      return res.status(403).send('Unauthorized')
    }
})

//delete staff
app.delete('/delete/staff', async (req, res) => {
  const dlts = await Staff.delete(req.body.username)
  if(req.user.role == "admin"){
    if (dlts == "staff is not exist"){
      return res.status(404).send("Staff is not exist")
      
  }
    else {
      return res.status(200).json({

        status: "STAFF DELETED"
      })
  } 
  }
  else{
    return res.status(403).send('Unauthorized')
   
  } 
})

//register security
app.post('/register/security', async (req, res) => {
    const rgs = await Security.register(req.body.securityname, req.body.securityusername, req.body.password, req.body.phonenumber,req.body.role)
    if(req.user.role=="admin"){
      if (rgs == "username already existed"){
        return res.status(404).send("The security already existed")
    }
    else{
        return res.status(200).send("New Security registered")
    }
    }
    else{
      return res.status(403).send('Unauthorized')
    }
})

//delete security
app.delete('/delete/security', async (req, res) => {
  const dltse = await Security.delete(req.body.securityusername)
  if(req.user.role == "admin"){
    if (dltse == "Security is not exist"){
      return res.status(404).send("Security is not exist")
      
  }
    else {
      return res.status(200).json({

        status: "Security deleted"
      })
  } 
  }
  else{
    return res.status(403).send('Unauthorized')
   
  } 
})
const jwt = require('jsonwebtoken');
//const Security = require("./security");
function generateAccessToken(payload) {
  return jwt.sign(payload, "secretkey", {expiresIn:'1h'});
}
