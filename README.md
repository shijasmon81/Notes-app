# Notes App

A full-stack note-taking application built with **FastAPI** (backend), **Next.js** (frontend), and **MongoDB**. Users can **sign up, log in, create, update, and delete notes**. Notes are tied to individual users and stored persistently.

---

## Features

- User authentication (Sign up & Login) with JWT.
- CRUD operations for notes (Create, Read, Update, Delete).
- Rich text editor for note content.
- Responsive UI with Navbar, profile display, and modals.
- Mobile-friendly layout.
- Full Docker support for local deployment.

---

## Installation & Local Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- Git (if cloning the repository)

### Steps

1. **Clone the repository**

```bash
git clone <PRIVATE_GIT_REPO_URL>
cd <project-root>
```

2. **Set environment variables**

**Backend `.env` example:**

```env
MONGO_URL=mongodb://mongo:27017
JWT_SECRET_KEY=supersecretkey
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

**Frontend `.env.local` example:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run with Docker Compose**

```bash
docker-compose up --build
```

Services started:

- MongoDB → port 27017  
- Backend (FastAPI) → port 8000  
- Frontend (Next.js) → port 3000  

**Access the app:**

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API docs: [http://localhost:8000/docs](http://localhost:8000/docs)  

---

## Project Structure

```
/backend
├─ /app
│  ├─ /api        # FastAPI routes (auth, notes)
│  ├─ /core       # Config & security utilities
│  ├─ /models     # Pydantic models
│  ├─ /schemas    # Request/response schemas
│  ├─ /services   # Business logic for notes
│  ├─ /db         # MongoDB connection
│  └─ main.py     # App initialization
├─ requirements.txt
├─ Dockerfile

/frontend
├─ /components    # React components (Navbar, NoteCard, NoteEditor)
├─ /pages         # Next.js pages (index, signin, signup)
├─ /redux         # Redux slices for auth & notes
├─ /services      # API calls using Axios
├─ /styles        # CSS styles
├─ package.json
├─ Dockerfile
```

---

## Design Decisions & Trade-offs

- **FastAPI backend** for asynchronous support and simple API creation.  
- **Next.js frontend** for server-side rendering and seamless React integration.  
- **MongoDB** for flexible, document-based note storage.  
- **JWT authentication** ensures stateless and scalable sessions.  
- **Redux** for global state management.  
- **Docker Compose** for easy local deployment without manual dependency installation.  

**Trade-offs:**

- Chose MongoDB for flexibility over SQL; schema-less structure may need additional validation.  
- Rich text content stored as HTML, which requires careful sanitization.  
- Mobile-responsive but accessibility improvements may be needed.  

---

## External Resources

- **PyJWT** – JWT utilities  
- **Passlib** – Password hashing  
- **React Quill** – Rich text editor  
- **Redux Toolkit** – State management  

All external snippets have been adapted and integrated properly.

---

## Environment & Delivery

- App runs entirely in local Docker containers. No cloud dependencies.  
- Secrets and API keys are never committed; environment variables are used.  
- Can be packaged as a private Git repository or ZIP file for delivery.

---

## Commands Reference

- **Build & run all services:**  
  ```bash
  docker-compose up --build
  ```
- **Stop all services:**  
  ```bash
  docker-compose down
  ```
- **View backend logs:**  
  ```bash
  docker logs -f notes-backend
  ```
- **View frontend logs:**  
  ```bash
  docker logs -f notes-frontend
  ```
