# 📌 Post-it Wall (Idea Mural)

An interactive system to capture and organize ideas through a visual interface of "sticky notes." This project is being built using **FastAPI**, **PostgreSQL**, **Docker** and **React**.

## 🚀 Technologies
* **Back-end:** Python 3.11 + FastAPI.
* **Front-end:** React.
* **Database:** PostgreSQL (running via Docker).
* **ORM:** SQLAlchemy 2.0 (using Psycopg 3).
* **Infrastructure:** Docker & Docker Compose.

---

## 🛠️ Getting Started
Currently, the API and the Backend runs on Docker, but is able to run locally. The frontend runs only locally at the moment.

### 1. Start the Database
Make sure you have Docker Desktop running, then execute:
```bash
cd backend
docker compose up -d
```
### 2. Envirnment Setup (Windows)
```bash
cd backend
python -m venv venv

.\venv\Scripts\activate

pip install -r requirements.txt
```

### 3.1 . Run the API via Local
```bash
cd backend
uvicorn api.main:app --reload
```
### 3.2 . Run the API via Docker
```bash
cd backend
docker compose up --build
```

### 4. Run the Frontend
```bash
cd frontend
npm start
```
## Devlog

### 02/08/2026

* **First commits**: Added importants files such as main.py and db files. As well as adding docker-compose.

### 02/09/2026

* **Added Docker**: Added dockerfile and configured Docker to work on the backend
* **Added React Frontend**: Added the base for the Frontend using react.

### 02/10/2026

* **Added Forms**: Now you can put post-its directly into the site.
* **Made delete possible**: In addition to the forms, you can also delete the postits, so all current endpoints are implemented on React

### 02/19/2026

* **Made edit possible**: Now you can edit your already published post-its
