const mongoose = require("mongoose");
const request = require("supertest");
const authService = require('../services/auth.service');

const app = require("../app");
const helper = require('../services/user.services');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to MongoDB established for Jest") },
    err => { console.log('Failed to connect to MongoDB', err) }
  );;
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/users", () => {
  it("Should return all users", async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000);
});

describe("GET /api/users/:username", () => {
  let token;

  beforeAll(() => {
      // Create a test token using a mock secret
      user = {username:"admin", email:"admin@aueb.gr", roles:["EDITOR","READER","ADMIN"]}
      token = authService.generateAccessToken(user)
  });
  
  it("Should return a user", async () => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .get("/api/users/" + result.username )
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(result.username);
    expect(res.body.data.email).toBe(result.email);
  }, 10000);
});
describe("POST /api/users", () => {

  beforeAll(() => {
    // Create a test token using a mock secret
    user = {username:"admin", email:"admin@aueb.gr", roles:["EDITOR","READER","ADMIN"]}
    token = authService.generateAccessToken(user)
  });
  it("Should create a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: "test4",
        password: "12345",
        name: "test4 name",
        surname: "test4 surname",
        email: "test4@aueb.gr",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
  }, 10000);
});

describe("POST /api/users", () => {
  // WITH ERROR takes last inserted User
  beforeAll(() => {
    // Create a test token using a mock secret
    user = {username:"admin", email:"admin@aueb.gr", roles:["EDITOR","READER","ADMIN"]}
    token = authService.generateAccessToken(user)
  });
  it("Should try to create a user that already exists, returns error", async () => {
    const result = await helper.findLastInsertedUser();
    
    const res = await request(app)
      .post("/api/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: result.username,
        password: "12345",
        name: "new name",
        surname: "new surname",
        email: "new@aueb.gr",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.data).toBeTruthy();
  }, 10000);
});

describe("PATCH /api/users/:username", () => {
  beforeAll(() => {
    // Create a test token using a mock secret
    user = {username:"admin", email:"admin@aueb.gr", roles:["EDITOR","READER","ADMIN"]}
    token = authService.generateAccessToken(user)
  });
  it("Should update a user", async () => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .patch("/api/users/" + result.username)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: result.username,
        password: "12345",
        name: "new updated name",
        surname: "new updated surname",
        email: "new@aueb.gr",
        address: {
          area: "area 15",
          road: "road15"
        },
        phone: [
          {
            type: "mobile",
            number: "60303030"
          }
        ]
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
  }, 10000);
});

describe("DELETE /api/users/:username", () => {
  beforeAll(() => {
    // Create a test token using a mock secret
    user = {username:"admin", email:"admin@aueb.gr", roles:["EDITOR","READER","ADMIN"]}
    token = authService.generateAccessToken(user)
  });
  it("Should delete a user", async () => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .delete("/api/users/" + result.username)
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toBe(200);
  }, 10000);
});