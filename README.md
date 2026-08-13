# Portfolio - MERN Stack Developer Portfolio

A full-stack developer portfolio built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Admin Dashboard**: Manage portfolio data, experiences, projects, and contact messages
- **Timeline/Experience Section**: Display professional journey with CRUD operations
- **Projects Section**: Showcase projects with image support via Cloudinary
- **Contact Form**: Receive and manage messages
- **Responsive Design**: Modern, professional UI with dark sidebar
- **Data Persistence**: All data stored in MongoDB database

## Tech Stack

- **Frontend**: React 19, Vite, Framer Motion, Lucide Icons
- **Backend**: Express.js, Node.js
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Deployment**: Render (Free Tier)

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd myportfolio
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your credentials:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.ljwulsp.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
PORT=5000
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
```

Update `.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

4. **Run the application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Access the application at http://localhost:5173

## Deployment to Render (Free)

### Prerequisites
- GitHub account with the repository pushed
- Render account (free tier)
- MongoDB Atlas account
- Cloudinary account

### Step-by-Step Deployment

#### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

#### 2. Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the backend service:
   - **Name**: portfolio-backend
   - **Root Directory**: backend
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB connection string
     - `CLOUDINARY_URL`: Your Cloudinary URL
     - `PORT`: 5000
5. Click **"Deploy Web Service"**

#### 3. Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the frontend service:
   - **Name**: portfolio-frontend
   - **Root Directory**: frontend
   - **Build Command**: npm install && npm run build
   - **Publish Directory**: dist
   - **Environment Variables**:
     - `VITE_API_URL`: https://portfolio-backend.onrender.com/api
4. Click **"Deploy Static Site"**

#### 4. Update CORS Settings

After deployment, update the backend CORS settings in `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://portfolio-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### 5. Redeploy Backend

Push the CORS update and Render will automatically redeploy.

### Important Notes

- **Free Tier Limitations**: Render free tier spins down services after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.
- **MongoDB Atlas Free Tier**: 512MB storage limit, suitable for small portfolios.
- **Cloudinary Free Tier**: 25GB storage, 25GB bandwidth per month.
- **Environment Variables**: Never commit `.env` files to GitHub. Use Render's environment variable settings instead.

## Project Structure

```
myportfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│       ├── Dashboard.jsx
│   │   ├── sections/
│   │   ├── lib/
│   │   └── config.js
│   ├── package.json
│   └── vite.config.js
├── render.yaml
└── README.md
```

## License

MIT
