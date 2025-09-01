# Candidate Profile Playground

A simple full-stack application to store and query candidate profile information using MongoDB, Express.js, and vanilla JavaScript.

##  Architecture

```
Frontend (HTML/CSS/JS)  REST API (Express.js)  Database (MongoDB)
```

- **Frontend**: Single HTML page with vanilla JavaScript
- **Backend**: Express.js REST API with CORS enabled
- **Database**: MongoDB with text indexing for search
- **Hosting**: Can be deployed to Heroku, Vercel, Railway, or similar platforms

##  Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas account)

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd candidate-profile-playground
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

4. **Seed the database**:
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```

6. **Open the frontend**:
   - Open `index.html` in your browser
   - Or serve it using a simple HTTP server:
     ```bash
     npx http-server . -p 3000
     ```

##  API Endpoints

### Core Endpoints
- `GET /health` - Health check
- `POST /api/profile` - Create profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile

### Query Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/skill/:skill` - Get projects by skill (e.g., `/api/projects/skill/python`)
- `GET /api/skills/top` - Get top skills
- `GET /api/search?q=<query>` - Full-text search

## 🔧 Sample API Calls

### Using cURL

```bash
# Health check
curl http://localhost:5000/health

# Get profile
curl http://localhost:5000/api/profile

# Search for Python projects
curl "http://localhost:5000/api/projects/skill/python"

# Full-text search
curl "http://localhost:5000/api/search?q=javascript"

# Get top skills
curl http://localhost:5000/api/skills/top
```

### Using JavaScript (Frontend)
```javascript
// Get profile
const profile = await fetch('http://localhost:5000/api/profile').then(r => r.json());

// Search
const results = await fetch('http://localhost:5000/api/search?q=react').then(r => r.json());
```

##  Production Deployment

### Backend Deployment (Heroku)

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

4. **Seed production database**:
   ```bash
   heroku run npm run seed
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL in index.html**:
   ```javascript
   const API_URL = 'https://your-heroku-app.herokuapp.com';
   ```

2. **Deploy to Vercel**:
   ```bash
   npx vercel --prod
   ```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Create database user
4. Get connection string
5. Whitelist your IP (or use 0.0.0.0/0 for development)

## 📊 Database Schema

See `schema.md` for detailed database structure.

**Key Collections:**
- `profiles` - Stores candidate information

**Key Indexes:**
- Text index on name, skills, projects, education, work
- Unique index on email

##  Testing the API

### Postman Collection

```json
{
  "info": { "name": "Candidate Profile API" },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{baseUrl}}/health"
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{baseUrl}}/api/profile"
      }
    },
    {
      "name": "Search",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{baseUrl}}/api/search?q=javascript"
      }
    },
    {
      "name": "Projects by Skill",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{baseUrl}}/api/projects/skill/python"
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    }
  ]
}
```

##  Features

### ✅ Implemented
- ✅ CRUD operations for profiles
- ✅ Full-text search across all fields
- ✅ Skill-based project filtering
- ✅ Responsive frontend with modern UI
- ✅ Health check endpoint
- ✅ CORS enabled for cross-origin requests
- ✅ MongoDB text indexing
- ✅ Error handling and validation

###  Known Limitations
- Single profile per database (designed for personal use)
- No authentication/authorization
- No rate limiting
- Basic error handling
- No automated tests
- No data validation beyond required fields
- Search is case-insensitive but requires exact word matches

##  Development Workflow

1. **Make changes** to the code
2. **Test locally** using `npm run dev`
3. **Update frontend API URL** for production
4. **Deploy backend** to Heroku/Railway
5. **Deploy frontend** to Vercel/Netlify
6. **Test production** endpoints

##  Environment Variables

```bash
# Required
MONGODB_URI=mongodb://localhost:27017/candidate_profile

# Optional
PORT=5000
NODE_ENV=development
```

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

MIT License - feel free to use this project as a starting point for your own profile playground!
