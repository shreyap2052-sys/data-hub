# The Data Hub

A simple REST API built with Node.js and Express for Sprint 09 (Track B).

The project is a mock blog API where I implemented basic CRUD operations using an in-memory array instead of a database.

## What I built

* Express server running on port 5000
* Blog post CRUD API
* GET all posts and GET post by ID
* POST to create a post
* PUT to update a post
* DELETE to remove a post
* Basic 404 handling
* Custom middleware for request logging
* Simple `/login` endpoint with a mock JWT token
* Tested the API using Thunder Client

## Tech Used

* Node.js
* Express
* Thunder Client
* Git / GitHub

## API Routes

```text
GET     /posts
GET     /posts/:id
POST    /posts
PUT     /posts/:id
DELETE  /posts/:id
POST    /login
```

## Running the project

Install the dependencies:

```bash
npm install
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
  "author": "Shreya",
  "content": "This is my first Data Hub post."
}
```

## Note

The data is stored only in memory using a JavaScript array, so all posts are cleared when the server is restarted.

The login endpoint is also just a mock authentication setup for this sprint and does not use a real JWT authentication system.

## Project Files

```text
data-hub/
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── Prompts.md
└── .gitignore
```

## Sprint

Sprint 09 — Track B: Fullstack Developers
