const supertest = require('supertest');
const request = supertest('http://localhost:5000');
const { faker } = require('@faker-js/faker');
const fakepass = faker.internet.password();
const fphone = faker.phone.phoneNumber();
const fkname = faker.name.findName();
const fstaffnumber = faker.random.numeric(5);
const fusername = faker.internet.userName()
describe('Express Route Test', function () {
  it('should return hello world', async () => {
  return request.get('/hello')
    .expect(200)
    .expect('Content-Type', /text/)
    .then(res => {
    expect(res.text).toBe('Hello BENR2423');
    });
   })

  it('login successfully', async () => {
    return request
      .post('/login')
      .send({'username': "Arifaiman", 'password': "1234" })
      .expect('Content-Type', /text/)
      .expect(200).then(response => {
        expect(response.text).toEqual("login successful!");
      });
  });
    it('register', async () => {
        return request
      .post('/register')
      .send({'username': fusername, 'password': fakepass, 'name':fkname, 'phonenumber':fphone,'staffnumber' :fstaffnumber})
      .expect('Content-Type', /text/)
      .expect(200).then(response => {
        expect(response.text).toEqual("New user registered");
      });
  });

  it('login failed', async () => {
    return request
      .post('/login')
      .send({'username': "Arifaiman", 'password': "1235" })
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
      .send({username: 'Margarett_Reilly' })
      .expect(200)
	  
  });

  it('delete', async () => {
    return request
        .delete('/delete')
        .send({username: 'Nikki56'})
        .expect(200)
});
});