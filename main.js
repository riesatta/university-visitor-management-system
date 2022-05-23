const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
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
const port = process.env.PORT || 3000

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

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/hello', (req, res) => {
  res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
  console.log(req.body)
    const user = await User.login(req.body.username, req.body.password)
    if (user == "invalid password"){
        return res.status(404).send("Wrong password")
    }
    else if(user == "No such document"){
        return res.status(404).send("Username not existed")
    }
    else{
        return res.status(200).send("login successful!")
    }
})

app.post('/register', async (req, res) => {
  console.log(req.body)
    const user = await User.register(req.body.username, req.body.password, req.body.name, req.body.phonenumber, req.body.staffnumber)
    if (user == "username already existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else if(user=="staff number existed"){
        return res.status(404).send("The username or staff number already existed")
    }
    else{
        return res.status(200).send("New user registered")
    }
})

app.patch('/update', async (req, res) => {
    console.log(req.body);
      const user = await User.update(req.body.username)
      if (user == "username not exist"){
          return res.status(404).send("the username does not exist")
      }
      else{
        return res.status(200).json(user)
      }  
  })

  app.delete('/delete', async (req, res) => {
      const user = await User.delete(req.body.username,)
      if (user == "username not exist"){
          return res.status(404).send("The username not exist")
      }
      else {
          return res.status(200).json(user)
      }  
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})