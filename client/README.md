# Inventory Management System (IMS)

A fullstack Inventory Management System (IMS) built with the MERN stack, featuring both REST API and GraphQL API on top of the same database.
The system allows you to manage products, stock, and manufacturers – with support for creating, reading, updating, and deleting records.

## Features

🔹 Add products with details (name, description, price, SKU, category, manufacturer).

🔹 View all products with pagination & search.

🔹 Update product details (e.g., price, stock amount).

🔹 Delete products from the system.

🔹 Manage manufacturers (name, contact info, country, address, etc.).

🔹 Two API options: REST and GraphQL.

# Technologies
## Backend

Node.js

Express

Mongoose (MongoDB ODM)

Apollo Server (GraphQL)

Nodemon (dev auto-restart)

Concurrently (run multiple servers in parallel)

# Frontend

React (Vite)

TypeScript

TailwindCSS

# Database

## MongoDB Atlas
 (cloud-hosted database)

 ## Projektstruktur
IMS-main/
│
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page views (e.g., product list)
│   │   └── api/             # API requests (REST)
│   └── package.json
│
├── server/
│   ├── RESTserver/          # REST API with Express
│   │   ├── routes/          # Product routes
│   │   └── models/          # Mongoose models
│   │
│   ├── GRAPHQLserver/       # GraphQL API
│   │   ├── schema/          # Type definitions
│   │   ├── resolvers/       # Queries & Mutations
│   │   └── db/              # DB connection
│   │
│   └── package.json
│
├── .env                     # Environment variables (local)
├── package.json             # Root config (start scripts)



## Installation

### 1. Clone the repository
git clone https://github.com/<your-username>/IMS-main.git
cd IMS-main

### 2. Install dependencies
npm install
cd client && npm install
cd ../server/RESTserver && npm install
cd ../GRAPHQLserver && npm install

### 3. Create a .env file in RESTserver and GRAPHQLserver

DATABASE=mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
DATABASE_PASSWORD=<your password>
DB_NAME=IMS-1
PORT=3000   # for the REST server

### ⚠️ Don’t forget to create a separate .env file in the GraphQL server as well (with port 4000).

### 4. Start the project
 From the root:
 npm start

### This will start:

Client → http://localhost:5173

REST API → http://localhost:3000

GraphQL API → http://localhost:4000

## API Endpoints
### REST API

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| GET    | `/product`     | Fetch all products (with pagination) |
| GET    | `/product/:id` | Fetch a product by ID                |
| POST   | `/product`     | Create a new product                 |
| PUT    | `/product/:id` | Update a product                     |
| DELETE | `/product/:id` | Delete a product                     |


## GraphQL API
### Example query:

query {
  products {
    id
    name
    price
    category
    amountInStock
  }
}



### Example mutation:

mutation {
  addProduct(
    input: {
      name: "Laptop",
      description: "Apple MacBook Pro",
      price: 1800,
      category: "Electronics",
      amountInStock: 100
    }
  ) {
    id
    name
  }
}


## 🧾 Example Data
### Product

{
  "name": "Apple MacBook Pro",
  "description": "Powerful laptop for professionals",
  "price": 1800,
  "amountInStock": 120,
  "sku": "LAP-APPLE-MBP-13",
  "category": "Electronics",
  "manufacturer": {
    "name": "Apple Inc.",
    "country": "USA",
    "website": "https://apple.com",
    "contact": {
      "name": "Support",
      "email": "support@apple.com",
      "phone": "+1 800-275-2273"
    }
  }
}


## 📌 Notes

SKU is a unique ID for each product in stock. Example: LAP-APPLE-MBP-13.

Both REST and GraphQL share the same MongoDB database.

The frontend currently consumes the REST API, but can easily be adapted to GraphQL.