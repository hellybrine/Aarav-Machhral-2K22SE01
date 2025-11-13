# Boostly

Boostly is a full-stack application that enables college students to recognize peers, send monthly credits, endorse recognitions, and redeem earned credits for vouchers. It is built with a **React (Vite) frontend**, **Flask backend**, **SQLite database**, and **Docker** for deployment.

---

## 🚀 Getting Started

You can run Boostly using **Docker (recommended)** or run both the backend and frontend manually.

---

# Option A — Run with Docker (Recommended)

## Prerequisites
- Docker Desktop  
- Docker Compose

## Run the Application

```bash
cd src
docker compose build --no-cache
docker compose up
````

### Services

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:5000](http://localhost:5000) |

### Initialize Sample Data

```bash
curl -X POST http://localhost:5000/init
```

---

# Option B — Run Locally (Without Docker)

## Backend — Flask

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at:
**[http://localhost:5000](http://localhost:5000)**

## Frontend — React + Vite

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
**[http://localhost:5173](http://localhost:5173)**

---

# 📁 Project Structure

```
project/
│
├── backend/         # Flask backend
├── frontend/        # React (Vite) frontend
├── src/             # Docker orchestration (docker-compose)
└── README.md
```

---

# 📘 API Reference

**Base URL:** `http://localhost:5000`

---

## 1. Send Recognition

**POST** `/recognitions`

**Body**

```json
{
  "from_id": 1,
  "to_id": 2,
  "credits": 10,
  "message": "Great help on project!"
}
```

---

## 2. Endorse Recognition

**POST** `/recognitions/{id}/endorse`

---

## 3. Redeem Credits

**POST** `/students/{id}/redeem`

**Body**

```json
{ "credits": 20 }
```

---

## 4. Get Student Details

**GET** `/students/{id}`

---

## 5. List All Students

**GET** `/students`

---

## 6. Leaderboard

**GET** `/leaderboard?limit=10`

---

## 7. Initialize Sample Data

**POST** `/init`

---

# 🧪 Sample cURL Commands

### Send a Recognition

```bash
curl -X POST http://localhost:5000/recognitions \
  -H "Content-Type: application/json" \
  -d '{"from_id":1,"to_id":2,"credits":10,"message":"Thanks!"}'
```

### Endorse

```bash
curl -X POST http://localhost:5000/recognitions/1/endorse
```

### Redeem Credits

```bash
curl -X POST http://localhost:5000/students/2/redeem \
  -H "Content-Type: application/json" \
  -d '{"credits":20}'
```

### Leaderboard

```bash
curl http://localhost:5000/leaderboard
```

---

# ✨ Features

* Send recognition with credits
* Monthly credit sending limit
* Prevent self-recognition
* Endorsement system
* Credit redemption (₹5 per credit)
* Voucher generation
* Leaderboard ranking
* Monthly credit reset with carry-forward
* Dockerized setup
* Functional frontend integrated with backend

---

# 🔄 Workflow Overview

1. Start backend and frontend (Docker or local).
2. Initialize sample data using:

   ```
   POST /init
   ```
3. Use the frontend to:

   * Send recognitions
   * Endorse recognitions
   * Redeem credits
   * View leaderboard
