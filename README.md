# ARZ International — Website

A MERN-stack website for ARZ International, a study-abroad consultancy. Students can browse study destinations, submit a multi-step application, and reach the team through a contact form — all now backed by a real API.

**Study destinations:** South Korea · United Kingdom · Australia · Europe

## Tech Stack

- **Frontend:** React 19, React Router, Tailwind CSS + daisyUI, Vite
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## Project Structure

```
├── src/                    # Frontend (React)
│   ├── Navbar/, Footer/    # Site chrome
│   ├── Pages/               # Home, Countries, About, Contact, Portfolio, Legal, 404
│   ├── component/           # Reusable homepage sections
│   ├── Form/                 # Multi-step application form
│   ├── config/api.js         # Talks to the backend
│   └── utils/                 # Shared helpers (e.g. scroll-to-form)
└── backend/                 # Backend (Express + MongoDB) — see backend/README.md
```

## Running Locally

### 1. Frontend

```bash
npm install
cp .env.example .env      # points the frontend at the backend
npm run dev
```

### 2. Backend

See [`backend/README.md`](./backend/README.md) for full setup — you'll need a MongoDB connection string (a free MongoDB Atlas cluster works well if you don't want to install MongoDB locally).

```bash
cd backend
npm install
cp .env.example .env      # add your MONGO_URI here
npm start
```

With both running, the application form, contact form, and newsletter box save directly to MongoDB.

## Notes on This Pass

This update focused on design consistency, working navigation, and backend connectivity:

- **Navbar & countries** — trimmed to the four active destinations (South Korea, UK, Australia, Europe); dropdown, mobile menu and active-page highlighting rebuilt.
- **Typography** — unified the whole site on two fonts (Fraunces for headings, DM Sans for body text) instead of five mismatched, mostly-unloaded font families.
- **Footer** — real links to real pages instead of dead `#` anchors, plus a working, backend-connected newsletter box.
- **New pages** — Contact, About (was empty), Europe country page, and Privacy/Terms/Cookie pages, plus a 404 page.
- **Buttons & pages audit** — fixed a layout bug hiding page content behind the fixed navbar, wired up roughly a dozen buttons that had no `onClick`, fixed a couple of mismatched images/data (e.g. an "ARZ" logo slot that was showing an Australia photo), and removed unused/duplicate homepage sections.
- **Backend** — added a small Express + MongoDB API for the application form, contact form, and newsletter, and connected all three from the frontend.
