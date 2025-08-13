const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const helper = require('../services/user.services');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to MongoDB established for Jest") },
    err => { console.log('Failed to connect to MongoDB', err) }
  );
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/users-products", () => {
  it("Should return all user's products", async () => {
    const res = await request(app)
      .get('/api/users-products');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000);
});

describe("GET /api/users-products/:username", () => {
  it("Should return a user's products", async () => {
    const res = await request(app)
      .get("/api/users/user3" );
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe("user3");
    expect(res.body.data.products.length).toBeGreaterThan(0);
  }, 10000);
});

describe("POST /api/users-products", () => {
  it("Should add a product to user", async () => {
    const res = await request(app)
      .post("/api/users-products")
      .send({
        username: "user3",
        products: {
          product: "new product",
          cost: 20,
          quantity: 20
        }
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
  }, 10000);
});

describe("PATCH /api/users-products/:username", () => {
  it("Should update a product of user", async () => {
    const result = await helper.findUsersProduct('user3', 'new product');
  
    const res = await request(app)
      .patch("/api/users-products/" + result.username)
      .send({
        username: result.username,
        product: {
          _id: result.products[0].id,
          quantity: 3000,
        }
      });
      expect(res.statusCode).toBe(200);
  }, 10000);
});

describe("DELETE /api/users-products/:username/products/:id", () => {
  it("Should delete a product from user", async () => {
    const result = await helper.findUsersProduct('user3', 'new product');

    const res = await request(app)
      .delete("/api/users-products/" + result.username + "/products/" + result.products[0].id)
    expect(res.statusCode).toBe(200);
  }, 10000);
});