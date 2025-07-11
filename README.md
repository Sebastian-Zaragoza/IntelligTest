# 🔍 Overview

**IntelligTest** is a full-stack, AI-powered exam generator designed to help students convert their handwritten or digital notes into customized tests. It leverages **Google Vision AI** for text extraction and a **Custom GPT model** for question generation, all wrapped in a modern microservices-based architecture.

## 🚀 Features

- ✍️ Upload notes as images or screenshots
- 📄 Extract text using Google Vision AI (via REST API)
- 🤖 Generate test questions using a custom GPT service
- 📝 Answer and evaluate tests with strict or relaxed modes
- 🔐 Secure user authentication (JWT-based)
- 🧩 Built using Microservices with Docker Compose
- 🌐 Frontend built with React

## 🏗️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js (Express) microservices
- **AI Services:** Google Cloud Vision, OpenAI/GPT APIs
- **Auth:** JWT
- **Architecture:** Microservices (API Gateway, orchestration)
- **Containerization:** Docker & Docker Compose

## 📦 Microservices Structure

```
├── api-gateway
├── auth-service
├── evaluatetest-service
├── extracttext-service
├── generatetest-service
├── notes-service
├── section-service
├── test-service
├── user-interface
└── docker-compose.yml
```

Each service is independently deployable and follows the single-responsibility principle.

## 🛠️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sebastian-Zaragoza/IntelligTest.git
cd IntelligTest
```

2. **Configure environment variables** for each service (you may use `.env` files).

3. **Start all services**
```bash
docker-compose up --build
```

> ⚠️ Make sure you have Docker and Docker Compose installed.

4. **Access the application** at: `http://localhost:PORT` (as configured in your `docker-compose.yml`).

## 📌 Services Description

| Service | Responsibility |
|--------|----------------|
| `api-gateway` | Routes requests and validates JWT tokens |
| `auth-service` | Manages user registration, login, token generation |
| `notes-service` | Handles uploading and editing of extracted notes |
| `extracttext-service` | Interfaces with Google Vision AI to extract text |
| `generatetest-service` | Uses GPT to generate questions from notes |
| `test-service` | Orchestrates test generation and stores test data |
| `evaluatetest-service` | Evaluates student answers and provides feedback |
| `section-service` | Manages logical grouping of notes and tests |
| `user-interface` | React-based frontend for students |

## 📄 License

MIT © Sebastian Zaragoza


## 📫 Contact

👤 **Sebastian Zaragoza**  
🔗 GitHub: https://github.com/Sebastian-Zaragoza  
✉️ Email: galindozaragozasebastian@gmail.com
