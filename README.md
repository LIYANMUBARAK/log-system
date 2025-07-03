# ✅ Log Ingestion and Querying System — Full Stack Project

## ✅ Bonus Features Implemented

| Feature                              | Status     |
|--------------------------------------|------------|
| 🔌 Real-Time Log Ingestion (Socket.IO) | ✅ Done     |
| 🐳 Docker & Docker Compose Setup       | ✅ Done     |
| 📦 JSON File-Based Persistence         | ✅ Done     |
| 🎨 Debounced Search Input              | ✅ Done     |
| 🚦 Rate-limit.                         | ✅ Done     |
| 📊 Analytics Dashboard (Recharts)      | ❌ Not done |
| 🧪 Unit Tests for Backend              | ❌ Not done |

## 📘 Project Overview

This is a **full-stack log ingestion and querying system** built using:

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Real-time updates**: Socket.IO
- **Persistence**: File-based JSON storage (no DB)
- **DevOps**: Docker & Docker Compose

## ⚙️ Features

### ✅ Log Ingestion (POST /logs)
- Accepts structured logs via POST
- Validates against schema
- Writes to a JSON file

### ✅ Log Querying (GET /logs)
- Full-text message search
- Filter by:
  - Level
  - Resource ID
  - Timestamp range
  - Trace ID, Span ID, Commit
- Combined filtering supported (AND logic)
- Sorted by timestamp (newest first)

### ✅ Frontend (React)
- Log Viewer with:
  - **FilterBar** for all filter options
  - **Debounced** search input
  - **Dynamic** updates on filter change
  - **Color-coded** log levels
- Dark/Light Theme Toggle
- Real-time updates via WebSocket

## 🧠 Design Decisions

| Area | Decision |
|------|----------|
| **Persistence** | Used `fs` module to read/write logs.json manually |
| **Real-time** | Implemented via `Socket.IO` for full-duplex updates |
| **Filtering** | Done using JS `Array.filter()` and `Array.sort()` |
| **Debounce** | Custom hook to reduce API requests |
| **Docker** | For reproducible full-stack setup |

## 📁 Folder Structure

```
.
├── backend/
│   ├── index.js             # Express API + Socket.IO
│   ├── routes/logs.js       # POST/GET /logs
│   └── utils/fileHandler.js # JSON file I/O logic
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/logs.js
│   │   ├── components/
│   │   │   ├── FilterBar.jsx
│   │   │   └── LogList.jsx
│   │   └── hooks/useDebounce.js
├── logs.json                # Persistent log storage
├── docker-compose.yml
└── README.md
```

## 🔌 API Schema & Endpoints

### 📬 POST `/logs`

```json
{
  "level": "error",
  "message": "Failed to connect to database.",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}
```

- **Status 201:** Log created
- **Status 400:** Invalid schema
- **Status 500:** Server error

### 🔍 GET `/logs`

**Optional query params:**

```
level=
message=
resourceId=
timestamp_start=
timestamp_end=
traceId=
spanId=
commit=
```

- Supports **combined filtering**
- Case-insensitive `message` search
- Returns logs in **reverse-chronological** order

## 🧪 How to Run the Project

### 🚨 Prerequisites

- Docker installed

### ▶️ Step-by-step Instructions

```bash
# Build images
docker-compose build --no-cache

# Start the stack
docker-compose up
```

OR

🧭 Run Locally without Docker

Backend Setup
```bash
cd backend
npm install
npm start
```

Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/logs
- **WebSocket**: http://localhost:3000

## 💡 Developer Notes

- Uses Socket.IO for real-time log updates across clients
- All logs are persisted in a flat JSON file: `logs.json`
- No external DB or libraries like MongoDB used
- Light and Dark themes supported
- Dockerized both client and server for quick startup

## 🙋 Author

- 👤 Name: **Liyan Mubarak**
- 📧 Contact: liyanmubarakc@gmail.com
