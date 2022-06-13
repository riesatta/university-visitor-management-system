const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitors");
MongoClient.connect(
  // TODO: Connection 
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.b5mhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
).catch(err => {
  console.error(err.stack)
  process.exit(1)
}).then(async client => {
  console.log('Connected to MongoDB');
  User.injectDB(client);
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

app.get('/find/:username', async(req,res)=>{
  console.log(req.params);
  const user= await User.view(req.params.username)
  if(user=="Username cannot be found")
  {
    return res.status(404).send("Username not exist")
  }
  return res.status(200).send('User available')
})

app.get('/find/visitor/:name', async(req,res)=>{
  console.log(req.params);
  const userv= await Visitor.viewvisitor(req.params.name)
  if(userv=="Username cannot be found")
  {
    return res.status(404).send("Username not exist")
  }
  return res.status(200).send('User available')
})


app.post('/login', async (req, res) => {
  //console.log(req.body)
    let user = await User.login(req.body.username, req.body.password, req.body.phonenumber, req.body.role)
    if (user.status == "invalid password"){
      res.status(404).send("Wrong password")
       
    }
    else if(user.status == "No such document"){
      res.status(404).send("Username not existed")
        
    }
    else{
        res.status(200).json({
          username: user.username,
          phonenumber: user.phonenumber,
          role: user.role,
          token: generateAccessToken({
            role: user.role
          }),
          
        });
    }
})

/**
 * @swagger
 * /login:
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

app.post('/register', async (req, res) => {
  //console.log(req.body)
    const rgs = await User.register(req.body.username, req.body.password, req.body.name, req.body.phonenumber, req.body.staffnumber,req.body.role)
    if (rgs == "username already existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else if(rgs=="staff number existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else{
        return res.status(200).send("New user registered")
    }
})

app.post('/register/visitors', async (req, res) => {
  //console.log(req.body)
    const rgsv = await Visitor.registervisitor(req.body.name, req.body.vphonenumber, req.body.block)
    if (rgsv == "username already existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else{
        return res.status(200).send("New user registered")
    }
})

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

app.patch('/update/visitor', async (req, res) => {
  const uptv = await Visitor.update(req.body.name)
  if(req.user.role=="staff"){
    if (uptv == "name not exist"){
      return res.status(404).send("the username does not exist")
  }
  else{
    return res.status(200).json(uptv)
  }  
  }
  else{
    return res.status(403).send('Unauthorized')
  }
})

app.patch('/update', async (req, res) => {
      const upt = await User.update(req.body.username)
      if(req.user.role=="staff"){
        if (upt == "username not exist"){
          return res.status(404).send("the username does not exist")
      }
      else{
        return res.status(200).json(upt)
      }  
      }
      else{
        return res.status(403).send('Unauthorized')
      }
  })

  app.delete('/delete', async (req, res) => {
      const dlt = await User.delete(req.body.username,req.body.role)
      if(req.user.role == "staff"){
        if (dlt == "username not exist"){
          return res.status(404).send("The username not exist")
          
      }
        else {
          return res.status(200).json(dlt)
      } 
      }
      else{
        return res.status(403).send('Unauthorized')
       
      } 
  })

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})

const jwt = require('jsonwebtoken');
function generateAccessToken(payload) {
  return jwt.sign(payload, "secretkey", {expiresIn:'1h'});
}

