const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User),
      Product: m2s(Product)
    },
    "securitySchemes": {
      "bearerAuth": {
          "type": 'http',
          "scheme": 'bearer',
          "bearerFormat": 'JWT',
      }
    }
  },
  "security": [{
    "bearerAuth": []
  }],
  "openapi":"3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Products CRUD API",
    "description": "Products Project Application",
    "contact": {
      "name": "API Support",
      "url": "https://www.example.com",
      "email":"support@example.com"
    },
  },
  "servers": [
    {
      url: 'http://localhost:3000',
      description: 'Local Server'
    },
    {
      url: "https://www.example.com",
      description: "Testing Server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "API for users"
    },
    {
      "name": "Products",
      "description": "API for products"
    },
    {
      "name": "Users and Products",
      "description": "API for users and their products"
    },
    {
      "name": "Auth",
      "description": "API for Authentication"
    }
  ],
  "paths":{
    "/api/users": {
      "get": {
        "tags": [
          "Users"
        ],
        "description": "Returns all users",
        "responses": {
          "200": {          
            "description": "A list of users.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Users"
        ],
        "description": "Create new user in system",
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }, 
                  "name": { "type": "string" },
                  "surname": { "type": "string" },
                  "email": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["username", "password","name", "surname", "email"]
              },
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "New user is created",
          }
        }
      }
    },
    "/api/users/{username}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "description": "Get user from system with specific username",
        "responses": {
          "200": {
            "description": "User find",
            "schema": {
              "$ref": "#/components/schemas/user"
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Users"
        ],
        "description": "Update user in system",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "name": { "type": "string" },
                  "surname": { "type": "string" },
                  "email": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    },
                  },
                  "phone":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["email"]
              },
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "Update a user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Users"
        ],
        "description": "Delete user in system",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "User that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        }],
        "responses": {
          "200": {
            "description": "Delete a user",
          }
        }
      } 
    },
    "/api/products": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Find all products",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "tags": [
          "Products"
        ],
        "description": "Create new product in system",
        "requestBody": {
          "description": "Product to create",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "$ref": "#/components/schemas/Product",
                "required": ["product", "cost", "quantity"]              
              }
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "New Porducts is created",
          }
        }
      }
    },
    "/api/products/{id}": {
      "get": {
        "tags": [
          "Products"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "Find product with id",
            "type": "string"
          }
        ],
        "description": "Get product from system with specific id",
        "responses": {
          "200": {
            "description": "Product find",
          }
        }
      },
      "patch": {
        "tags": [
          "Products"
        ],
        "description": "Update product in system, find by id",
        "parameters": [{
          "name": "update product in system",
          "in": "path",
          "description": "Product that we will update",
          "schema":{
            "$ref": "#/components/schemas/Product",
            "required": ["email"]
          }
        }],
        "requestBody": {
          "description": "Product to update",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "$ref": "#/components/schemas/Product",
                "required": ["product", "cost", "quantity"]              
              }
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "Update a product",
          }
        }
      },
      "delete": {
        "tags": [
          "Products"
        ],
        "description": "Delete product in system",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of product that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Product",
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Delete a user"
          }
        }
      } 
    },
    "/api/user-products": {
      "get": {
        "tags": [
          "Users and Products"
        ],
        "summary": "Find all users with their products",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/User",
            }
          }
        }
      },
      "post": {
        "tags": [
          "Users and Products"
        ],
        "description": "Add new product for user in system",
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "products":{
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "product": { "type": "string" },
                        "cost": { "type": "number" },
                        "quantity": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["quantity"]
              },
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "New product is added",
          }
        }
      } 
    },
    "/api/user-products/{username}": {
      "get": {
        "tags": [
          "Users and Products"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Find user with products",
            "type": "string"
          }
        ],
        "summary": "Get a user with the products",
        "responses": {
          "200": {
            "description": "User and Product find",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Users and Products"
        ],
        "description": "Update product from user system",
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "product": {
                    "type": "object",
                    "properties": {
                      "_id": {"type": "string" },
                      "quantity": { "type": "number" }
                    },
                  }                 
                },
                "required": ["quantity"]
              },
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "Update a product of user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }       
    },
    "/api/user-products/{username}/products/{id}": {
      "delete": {
        "tags": [
          "Users and Products"
        ],
        "description": "Delete product from user in system",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "Username that we want to find",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        },{
          "name": "id",
          "in": "path",
          "description": "Id of product that we want to delete",
          "schema": {
            "$ref": "#/components/schemas/User"
          }
      }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a product from user",
          }
        }
      } 
    },
    "/api/auth/login":{
      "post": {
        "tags": [
          "Auth"
        ],
        "description": "Login user",
        "requestBody": {
          "description": "Login user and return token",
          "content": {
            // "application/x-www-form-urlencoded": {
            "application/json": {  
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }                  
                },
                "required": ["username", "password"]
              },
            }
          }, 
        },
        "responses": {
          "200": {
            "description": "Token returned",
          }
        }
      }
    }
  }
};
