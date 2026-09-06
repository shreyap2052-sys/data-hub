# The Data Hub

A REST API built with Node.js and Express for Sprint 10 (Track B).

The project started as an in-memory blog API and was upgraded to use MongoDB Atlas with Mongoose for persistent data storage.

## What I built

* Express REST API
* MongoDB Atlas database connection
* Mongoose Post and User models
* Blog post CRUD operations
* User creation
* Post-to-user relationship using `authorId`
* Mongoose `populate()` for author details
* Route for the 3 most recent posts
* Custom request logging middleware
* Basic 404 handling
* Simple `/login` endpoint with a mock token
* API testing using Thunder Client

## Tech Used

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Thunder Client
* Git / GitHub

## API Routes

```text
GET     /
GET     /posts
GET     /posts/:id
POST    /posts
PUT     /posts/:id
DELETE  /posts/:id

POST    /users
GET     /posts/recent

POST    /login
```

## Running the project

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```text
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:5000
```

## Example POST

```json
{
  "title": "My First Post",
  "content": "This is my first Data Hub post."
}
```

A post can also be connected to a user using `authorId`.

## Project Files

```text
data-hub/

├── models/
│   ├── Post.js
│   └── User.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── Prompts.md
└── .gitignore
```

## Sprint

Sprint 10 — Track B: Fullstack Developers
