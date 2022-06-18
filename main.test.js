const supertest = require('supertest');
const request = supertest('http://localhost:5000');
const { faker } = require('@faker-js/faker');
const { response } = require('express');
const fakepass = faker.internet.password();
const fphone = faker.phone.phoneNumber();
const fkname = faker.name.findName();
const fstaffnumber = faker.random.numeric(5);
const fusername = faker.internet.userName()
describe('Express Route Test', function () {
  //find visitor
  it('view visitor', async()=>{
    return request.get('/find/publicview/visitor/Arthur Shelby')
    .expect('Content-Type', /json/)
    .expect(200).then(response=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          name:expect.any(String),
          "Time arrived":expect.any(String),
          Date: expect.any(String)
        })
      );
    });
  });
  
  //no visitor
  it('no visitor', async()=>{
    return request.get('/find/publicview/visitor/kroos')
    .expect('Content-Type', /text/)
    .expect(404).then(response=>{
      expect(response.text).toBe("Visitor not exist");
    });
  });

  //find badge
  it('view visitor', async()=>{
    return request.get('/find/publicview/badge/01')
    .expect('Content-Type', /json/)
    .expect(200).then(response=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          name:expect.any(String),
          visitid:expect.any(String),
          reason:expect.any(String),
          "Time arrived":expect.any(String),
          Date: expect.any(String),
          tovisit:expect.any(String),
          block:expect.any(String),
          parking:expect.any(String),
        })
      );
    });
  });
  
  //no badge
  it('no badge', async()=>{
    return request.get('/find/publicview/badge/:visitid')
    .expect('Content-Type', /text/)
    .expect(404).then(response=>{
      expect(response.text).toBe("Id not exist");
    });
  });

  //login staff
  it('staff login successfully', async () => {
    return request
      .post('/login/staff')
      .send({username: "Arif", password: "1234" })
      .expect('Content-Type', /json/)
      .expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
            phonenumber: expect.any(String),
            role: expect.any(String),
            token: expect.any(String)
            
					})
				);
			});
  });

//login staff faile
  it('staff login failed', async () => {
    return request
      .post('/login/staff')
      .send({username: "Arifaiman", password: "1236" })
      .expect('Content-Type', /text/)
      .expect(404).then(response => {
        expect(response.text).toEqual("Wrong password or username");
      });
  })

//login admin
it('admin login successfully', async () => {
  return request
    .post('/login/adminonly')
    .send({name: "University Backend Admin", password: "ogx1234" })
    .expect('Content-Type', /json/)
    .expect(200).then(response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String)
          
        })
      );
    });
});

//admin fail login
it('admin login failed', async () => {
  return request
    .post('/login/adminonly')
    .send({name: "Arifaiman", password: "1235" })
    .expect('Content-Type', /text/)
    .expect(404).then(response => {
      expect(response.text).toEqual("Wrong password or username");
    });
})

//login security success
it('security login successfully', async () => {
  return request
    .post('/login/security')
    .send({securityusername: "KPG", password: "123" })
    .expect('Content-Type', /json/)
    .expect(200).then(response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          securityusername:expect.any(String),
          role:expect.any(String),
          token: expect.any(String)
          
        })
      );
    });
});

//login security fail
it('security login failed', async () => {
  return request
    .post('/login/security')
    .send({username: "Arifaiman", password: "1235" })
    .expect('Content-Type', /text/)
    .expect(404).then(response => {
      expect(response.text).toEqual("Wrong password or username");
    });
})

//register visitor
  it('visitor register', async()=>{
    return request
    .post('/register/visitors')
    .send({name:"Kevin De BrUYNE",phonenumber:"01119692051",visitid:"17",block:"Satria",time:"5.00PM",date: "20/6/2022",tovisit:"Kai Havertz",Relationship:"Brother",reason:"Family visit",parking:"307B"})
    .expect(200)
  });

//visitor register fail
it('visitor register failed', async () => {
  return request
    .post('/register/visitors')
    .send({name:"Timo Werner",phonenumber:"01119692051",visitid:"01",block:"Satria",time:"5.00PM",date: "20/6/2022",tovisit:"Kai Havertz",Relationship:"Brother",reason:"Family visit",parking:"307B"})
    .expect('Content-Type', /text/)
    .expect(404).then(response => {
      expect(response.text).toEqual("visit id existed");
    });
})

//update block
it('update block', async () => {
  return request
.patch('/update/visitor/block')
.send({name: 'Arthur Shelby', block:"Dewan Dekan"})
.expect(200)

});

//update time
it('update time', async () => {
  return request
.patch('/update/visitor/time')
.send({name: 'Arthur Shelby', time:"9.00AM"})
.expect(200)

});

//update phonenumber
it('update phonenumber', async () => {
  return request
.patch('/update/visitor/phonenumber')
.send({name: 'Arthur Shelby', phonenumber:"0172635168"})
.expect(200)

});

//update date
it('update date', async () => {
  return request
.patch('/update/visitor/date')
.send({name: 'Arthur Shelby', date:"9/9/2022"})
.expect(200)

});

//delete visitor
it('delete visitor', async () => {
  return request
      .delete('/delete/visitor')
      .send({name: 'Wahab'})
      .expect(200)
});

  //find staff
  it('view staff', async()=>{
    return request.get('/find/publicview/staff/Aiman')
    .expect('Content-Type', /json/)
    .expect(200).then(response=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          username:expect.any(String),
          staffnumber:expect.any(String)
        })
      );
    });
  });
  
  //no visitor
  it('no staff', async()=>{
    return request.get('/find/publicview/staff/messi')
    .expect('Content-Type', /text/)
    .expect(404).then(response=>{
      expect(response.text).toBe("Username not exist");
    });
  });

//register staff
it('staff register', async()=>{
  return request
  .post('/register/staff')
  .send({username:"lakaka",password:"Chelshit",name:"Timo Werner",phonenumber:"0178926152",staffnumber:fstaffnumber,role:"staff"})
  .expect(200)
}); 

//register fail
it('staff register', async()=>{
  return request
  .post('/register/staff')
  .send({username:"lakaka",password:"Chelshit",name:"Timo Werner",phonenumber:"0178926152",staffnumber:fstaffnumber,role:"staff"})
  .expect(404)
}); 

//delete staff
it('delete visitor', async () => {
  return request
      .delete('/delete/staff')
      .send({username: 'lakaka'})
      .expect(200)
});

//register security
it('staff register', async()=>{
  return request
  .post('/register/staff')
  .send({securityname:"Kimmich",securityusername:"Joshua",password:"Chelshit",phonenumber:"0178926152",role:"security"})
  .expect(200)
}); 

//security register fail
it('staff register', async()=>{
  return request
  .post('/register/staff')
  .send({securityname:"Kimmich",securityusername:"Joshua",password:"Chelshit",phonenumber:"0178926152",role:"security"})
  .expect(404)
}); 
 
//delete security
it('delete security', async () => {
  return request
      .delete('/delete/security')
      .send({securityusername: 'Kimmich'})
      .expect(200)
});
});


const jwt = require('jsonwebtoken');
//const Security = require("./security");
function generateAccessToken(payload) {
  return jwt.sign(payload, "secretkey", {expiresIn:'1h'});
}
function verifyToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  jwt.verify(token, "secretkey", (err,user)=>{
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}