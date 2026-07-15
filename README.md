# DevForge

Professional Full Stack Project Generator built using FastAPI, React, PostgreSQL, SQLAlchemy, Render, and Vercel.

DevForge automatically generates starter full-stack projects with customizable frontend, backend, database, authentication, Docker configuration, and production-ready folder structures.

---

## Live Demo

### Frontend

https://dev-forge-fidr.vercel.app

### Backend API

https://devforge-5419.onrender.com

---

## Features

* Dynamic Full Stack Project Generation
* React Frontend Template Generation
* FastAPI Backend Template Generation
* Node.js Backend Template Generation
* PostgreSQL Database Configuration
* Authentication Starter Template Support
* Dockerfile Generation
* Docker Compose Configuration
* Automatic README Generation
* Environment File Generation
* Project ZIP Download
* PostgreSQL-Based Project History Tracking
* Project Analytics and Statistics
* Production-Ready Folder Structure

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* FastAPI
* Python
* SQLAlchemy
* Uvicorn

### Database

* PostgreSQL
* Neon Database

### Deployment

* Vercel
* Render

### Version Control

* Git
* GitHub

### Containerization

* Docker
* Docker Compose

---

## Architecture

```text
User
  ↓
React Frontend (Vercel)
  ↓
FastAPI Backend (Render)
  ↓
PostgreSQL Database (Neon)
  ↓
Project Generation Engine
  ↓
ZIP Download
```

Users configure project requirements through the React frontend. The FastAPI backend dynamically generates project templates, stores project metadata in PostgreSQL, packages the generated files into ZIP archives, and returns them for download.

---

## API Endpoints

### Health Check

```http
GET /
```

Returns backend status.

### Generate Project

```http
POST /generate
```

Generates a new project based on user selections and returns a downloadable ZIP archive.

### Project History

```http
GET /history
```

Returns generated project history stored in PostgreSQL.

### Project Statistics

```http
GET /stats
```

Returns project analytics such as total generated projects.

---

## Deployment

### Frontend Hosting

Platform: Vercel

URL:
https://dev-forge-fidr.vercel.app

### Backend Hosting

Platform: Render

URL:
https://devforge-5419.onrender.com

### Database Hosting

Platform: Neon PostgreSQL

---

## Links

### GitHub Profile

https://github.com/Venukaranam98

### Project Repository

https://github.com/Venukaranam98/DevForge

### Live Frontend

https://dev-forge-fidr.vercel.app

### Live Backend API

https://devforge-5419.onrender.com


## Installation
To install DevForge, follow these steps:
1. Clone the repository using `git clone https://github.com/Venukaranam98/DevForge.git`.
2. Install the required dependencies using `pip install -r requirements.txt`.
3. Start the application using `uvicorn main:app --reload`.