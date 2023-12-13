# Pet Shop RESTful API

## Overview
this repository contains the code for a RESTful API for a pet shop, built using Express.js, Prisma, and ZenStack. The API provides functionality for user authentication, including login and token generation.

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

## Authentication
To authenticate, send a POST request to `/api/login` with the following JSON payload:

    {
      "email": "user@exmaple.com",
      "password":"password123"
    }
if the credentials are valid, the API will return JSON object with a user ID, email, and a JWT token

Endpoints
`/api/login` (POST): User login and token generation

# Contributing
Feel free to contribute by opening issues or submitting pull requests.
