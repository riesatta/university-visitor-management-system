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
  
  it('view user', async()=>{
    return request.get('/find/Vladimir.Spinka88')
    .expect('Content-Type', /text/)
    .expect(200).then(response=>{
      expect(response.text).toBe('User available');
    });
  });
  it('no user', async()=>{
    return request.get('/find/toni kroos')
    .expect('Content-Type', /text/)
    .expect(404).then(response=>{
      expect(response.text).toBe("Username not exist");
    });
  });
  it('login successfully', async () => {
    return request
      .post('/login')
      .send({username: "Arifaiman", password: "1234" })
      .expect('Content-Type', /json/)
      .expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
            phonenumber: expect.any(String),
            
					})
				);
			});
  });
    it('register', async () => {
        return request
      .post('/register')
      .send({'username': fusername, 'password': fakepass, 'name':fkname, 'phonenumber':fphone,'staffnumber' :fstaffnumber,role:'staff'})
      .expect('Content-Type', /text/)
      .expect(200).then(response => {
        expect(response.text).toEqual("New user registered");
      });
  });

  it('login failed', async () => {
    return request
      .post('/login')
      .send({username: "Arifaiman", password: "1235" })
      .expect('Content-Type', /text/)
      .expect(404).then(response => {
        expect(response.text).toEqual("Wrong password");
      });
  })

  

  it('register failed', async () => {
    return request
      .post('/register')
      .send({'username': 'Vladimir.Spinka88', 'password': "123456", 'name':'Angkaramessi','phonenumber':'01123456789','staffnumber':'99' })
      .expect('Content-Type', /text/)
      .expect(404).then(response => {
        expect(response.text).toEqual("The username or staff number already existed");
      });
  })

  it('update', async () => {
        return request
      .patch('/update')
      .send({username: 'Naomi92' })
      .expect(200)
	  
  });

  it('update visitors', async () => {
    return request
  .patch('/update/visitors')
  .send({username: 'messi' })
  .expect(200)

});

  it('delete', async () => {
    return request
        .delete('/delete')
        .send({username: 'Lavina63'})
        .expect(200)
});
});