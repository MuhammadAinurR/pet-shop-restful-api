# Pet Shop RESTful API

## Overview
this repository contains the code for a RESTful API for a pet shop, built using Express.js, Prisma, and ZenStack. The API provides functionality for pet database, user authentication, including login and token generation.

## Features
- User authentication with JWT tokens
- Prisma for database operations
- ZenStack for middleware and REST API handling

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- PostgreSQL (for Prisma, im using one from vercel here)

### Installation
1. Clone the repository:
   `git clone https://github.com/MuhammadAinurR/pet-shop-restful-api`
2. Install depedencies:
   `npm install`
3. Setup your environment variables:
   - Create a `.env` file and add the following:
     `JWT_SECRET=your_jwt_secret_key`
     `DATABASE_URL=your_postgres_database_url`
     Replace `your_jwt_secret_key` with a secure secret for JWT token generation and `your_postgres_database_url` with your PostgreSQL database connection URL.

# Usage
## Register
To register, send a POST request to `/api/user` with the following Json paylaod:

      {
            "data": {
            "type": "user",
            "attributes": {
               "email": "trial-email@gmail.com",
               "password": "trial-emailpassword"
            }
         }
      }
if success, the api will return JSON object with a type, id, attributes, links, relation, etc
![img](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/1.%20Register.png?raw=true)

## Authentication
To authenticate, send a POST request to `/api/login` with the following JSON payload:

    {
      "email": "user@exmaple.com",
      "password":"password123"
    }
if the credentials are valid, the API will return JSON object with a user ID, email, and a JWT token
![img2](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/2.%20Login.png?raw=true)

## Create Order
To create order, send a POST request to `api/order` with header and body payload:
header:

      key: Authorization
      Value: Bearer {JWT token you got from login}
JSON:

      {
         "data": {
            "type": "order",
            "attributes": {},
            "relationships": {
               "user": {
                  "data": {
                     "type": "user",
                     "id": "clq3sau4s0001ue13m160nipz" // this is your user id from prev login response
                  }
               },
               "pets": {
                  "data": [
                  {
                     "type": "pet",
                     "id": "max"
                  }
                  ]
               }
            }
         }
      }
![img3](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/3.%20Create%20Order.png?raw=true)
in this case max already ordered so he will not appear on public or anonym user
![img4](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/3.%20Create%20Order.png?raw=true)
but he will still appear on logged in user
![img5](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/5.%20Max%20found%20on%20logged%20in%20user.png?raw=true)
and if someone trying to order max again, he will get error like this
![img6](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/6.%20Orderring%20Max%20Error.png?raw=true)
and now max having order id on the all pet list
![img7](https://github.com/MuhammadAinurR/pet-shop-restful-api/blob/main/img/7.%20now%20max%20having%20orderId.png?raw=true)

Endpoints
`/api/login` (POST): User login and token generation

# Contributing
Feel free to contribute by opening issues or submitting pull requests.
