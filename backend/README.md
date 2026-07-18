# ARZ International — Backend API

A small Express + MongoDB (Mongoose) API that powers three things on the site:

1. **Student application form** (`/api/applications`)
2. **Contact form** (`/api/contact`)
3. **Newsletter sign-up** (`/api/newsletter`)

## 1. Install

```bash
cd backend
npm install
```

## 2. Configure

```bash
cp .env.example .env
```

Then edit `.env`:

- `MONGO_URI` — a MongoDB connection string. Easiest options:
  - **Local MongoDB**: install MongoDB Community Server, then use `mongodb://127.0.0.1:27017/arz-international`.
  - **MongoDB Atlas (free tier, no local install needed)**: create a free cluster at https://www.mongodb.com/cloud/atlas, create a database user, allow your IP, and copy the connection string it gives you.
- `PORT` — defaults to `5000`.
- `CLIENT_ORIGIN` — the URL your frontend runs on (defaults to `http://localhost:5173`, Vite's default).

## 3. Run

```bash
npm start
```

You should see:

```
✔ MongoDB connected
✔ ARZ International API running on http://localhost:5000
```

## 4. Connect the frontend

In the project root (not `/backend`), create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Then run the frontend as usual (`npm run dev`). The application form, the contact page, and the footer's newsletter box will now save to MongoDB.

## Endpoints

| Method | Path                | Purpose                          |
|--------|---------------------|-----------------------------------|
| POST   | /api/applications   | Submit a student application      |
| GET    | /api/applications   | List all applications (internal)  |
| POST   | /api/contact        | Submit the contact form           |
| GET    | /api/contact        | List all contact messages         |
| POST   | /api/newsletter     | Subscribe an email address        |
| GET    | /api/health         | Health check                      |

## Deploying

This backend is a plain Node/Express app, so it deploys easily to services like Render, Railway, or Fly.io:

1. Push the `backend` folder to its own repo (or deploy the subfolder).
2. Set the `MONGO_URI`, `PORT` (most hosts set this for you) and `CLIENT_ORIGIN` environment variables in the host's dashboard.
3. Point `VITE_API_URL` in the frontend's `.env` at your deployed backend URL, then rebuild the frontend.
