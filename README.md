# Node.js Movie Lobby API

A simple Node.js API for managing movies. It uses Express.js for routing, MongoDB for data storage, Redis for caching, and Jest for testing. 

### Setup Instructions:

```
# Install dependencies
npm install

# Start MongoDB (ensure MongoDB is installed)
mongod

# Start Redis (ensure Redis is installed)
redis-server

# Create .env file with required configurations
cp .env.example .env

# Build and start the application
npm run build
npm start

# For development with hot reload
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### API Documentation:

**List all movies:**
```
GET /api/movies
Response: 200 OK
[
  {
    "_id": "...",
    "title": "The Matrix",
    "genre": "Sci-Fi",
    "rating": 9.0,
    "streamingLink": "http://example.com/matrix"
  }
]
```

**Search movies**

```GET /api/search?q=matrix
Response: 200 OK
[
  {
    "_id": "...",
    "title": "The Matrix",
    "genre": "Sci-Fi",
    "rating": 9.0,
    "streamingLink": "http://example.com/matrix"
  }
]
```

**Add new movie (requires admin role)**
```
POST /api/movies
Headers: x-user-role: admin
Body: {
  "title": "Inception",
  "genre": "Sci-Fi",
  "rating": 8.8,
  "streamingLink": "http://example.com/inception"
}
Response: 201 Created
```

**Update movie (requires admin role)**
```
PUT /api/movies/:id
Headers: x-user-role: admin
Body: {
  "rating": 9.2
}
Response: 200 OK
```

**Delete movie (requires admin role)**
```
DELETE /api/movies/:id
Headers: x-user-role: admin
Response: 204 No Content
```