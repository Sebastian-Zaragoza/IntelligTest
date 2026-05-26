## Overview
An AI-powered study platform designed to collapse the entire study-to-feedback loop into a single user action by integrating an OCR-driven photo-to-notes flow that lets users verify and correct extracted text before anything is generated, automated test generation that guarantees the original notes, dual evaluation modes,  and personalized per-answer feedback delivered in the same session, effectively eliminating the manual chain of transcription, re-reading, and tool-instructing that used to consume most of a student's study window.

## Note
I've successfully deply the entire system at [intelligtest.com](https://intelligtest.com) using Google Cloud Platform (Google Kubernetes Engine, Google Artifacts and a Load Balancer). The journey doesn't stop here:  I'm working on new features such as UI update, statistics, timer, AI recommendations and reminders based on forgetting curve, simulation based on teacher's evaluation and more. Saty tuned, big thins are coming! 

![Google Cloud Deployment](resources/IntelligTestDeployment.gif)
##

## Demo Video
Explore the core functionalities of the **IntelligTest** in this comprehensive ~2-minute walkthrough. This video demonstrates how the platform streamlines authentication, OCR content extraction, and dual evaluation modes into a seamless, user-friendly experience.

[![IntelligTest Demo Video](https://img.youtube.com/vi/Hig4P99KXTc/maxresdefault.jpg)](https://www.youtube.com/watch?v=Hig4P99KXTc)

### Key Features Covered:

*   **Secure Authentication Workflow:** A robust and accessible process enabling users to create accounts, log in securely, recover passwords, and reconfirm unverified accounts.
*   **Smart Notes Extraction (OCR) & Customization:** Watch how the system intelligently extracts text from screenshots or photos of notes, allowing users to verify and refine the data before effortlessly generating automated tests.
*   **Dual Evaluation Modes:** 
    *   *Non-Strict Mode:* Explores flexible evaluation where answers are validated based on semantic alignment, accepting correct concepts without requiring exact phrasing.
    *   *Strict Mode:* Showcases rigorous assessment, requiring verbatim equivalence for evaluations that demand absolute precision.

## Features
- **Note Upload and Text Extraction**: Upload images or screenshots of notes; extract text using Google Cloud Vision AI.
- **AI-Driven Test Generation**: Generate customized questions from extracted notes via GPT.
- **Test Taking and Evaluation**: Answer generated tests with options for strict or relaxed evaluation modes.
- **User Authentication**: Secure registration, login, and JWT-based authorization.
- **Note and Test Management**: Edit extracted notes, organize into sections, and store test data.
- **Feedback and Scoring**: Automated evaluation of answers with detailed feedback.
- **Microservices Design**: Independent services for modularity and scalability.
- **Containerization**: Docker and Kubernetes using Minikube.

## Tech Stack
### Overall
- **Architecture**: Microservices with API Gateway for routing.
- **Containerization**: Docker and Kubernetes.
- **Authentication**: JWT (JSON Web Tokens).
- **AI Integrations**: Google Cloud Vision API, OpenAI GPT API.
- **Databases**: Likely MongoDB or similar for each service (inferred from typical Node.js setups).
- **Languages**: TypeScript/JavaScript.

### Backend (Microservices)
- Node.js with Express.js.
- RESTful APIs for inter-service communication.

### Frontend
- React with Vite for fast development and building.
- Tailwind CSS or similar for styling (inferred from common practices).

## Microservices Architecture
## Note
- If you want to know about the entire software architecture analyzed, designed, and implemented, you can view the IntelligTest Notion Page for more details. Feel free to view! [IntelligTest Notion Page Here](https://fish-margin-192.notion.site/IntelligTest-1e62551c1caa80a19cc8cd77ceeca41d).

IntelligTest employs a microservices architecture to break down the application into independent, loosely coupled services. Each service handles a specific domain responsibility, allowing for independent development, scaling, and deployment. Communication between services is facilitated through the API Gateway, which handles routing, authentication, and load balancing. Services interact via HTTP/REST APIs, with JWT tokens ensuring secure access. This design promotes resilience, as failure in one service does not affect others, and enables easier maintenance and updates.

The architecture includes:
- **API Gateway**: Central entry point for all client requests.
- **Core Services**: Authentication, note handling, text extraction, test generation, evaluation, and storage.
- **Orchestration**: Docker and Kubernetes.
- **Inter-Service Communication**: Synchronous HTTP calls; potential for asynchronous messaging in future expansions.

## Services

Each service is containerized and can be developed/tested independently. Below is a detailed breakdown of each service, including its purpose, key features, technologies, and internal structure (based on standard Node.js/Express patterns).

### API Gateway
- **Purpose**: Acts as the single entry point for all external requests, routing them to appropriate microservices while validating JWT tokens for security.
- **Key Features**: Request routing, authentication middleware, rate limiting (if implemented), and error handling.
- **Technologies**: Node.js, Express.js, JWT verification libraries.
- **Internal Structure**:
  ```
  api-gateway/
  ├── src/
  │   ├── config/          # Configuration for routes and services
  │   ├── middleware/      # Authentication and validation logic
  │   ├── routes/          # Proxy routes to other services
  │   └── server.ts        # Main entry point
  ├── .env                 # Environment variables (e.g., service URLs, JWT secrets)
  ├── Dockerfile           # Docker build instructions
  ├── package.json         # Dependencies (express, jsonwebtoken, etc.)
  └── tsconfig.json        # TypeScript config (if using TS)
  ```

### Auth Service
- **Purpose**: Manages user authentication, including registration, login, token issuance, and password management.
- **Key Features**: User signup/login, JWT token generation/refresh, email verification (if applicable).
- **Technologies**: Node.js, Express.js, bcrypt for hashing, JWT for tokens, possibly Mongoose for user models.
- **Internal Structure**:
  ```
  auth-service/
  ├── src/
  │   ├── controllers/     # Handlers for auth endpoints
  │   ├── models/          # User schema (e.g., MongoDB models)
  │   ├── routes/          # API routes for /register, /login, etc.
  │   └── server.ts        # Server setup
  ├── .env                 # DB URI, JWT secrets
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Notes Service
- **Purpose**: Handles the uploading, storage, and editing of student notes after text extraction.
- **Key Features**: File upload handling, note editing, persistence in database.
- **Technologies**: Node.js, Express.js, Multer for file uploads, database ORM.
- **Internal Structure**:
  ```
  notes-service/
  ├── src/
  │   ├── controllers/     # Logic for note CRUD operations
  │   ├── models/          # Note schemas
  │   ├── routes/          # Endpoints for /upload, /edit
  │   └── server.ts
  ├── .env
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Extract Text Service
- **Purpose**: Interfaces with Google Cloud Vision AI to extract text from uploaded note images.
- **Key Features**: Image processing, API calls to Google Vision, text parsing and return.
- **Technologies**: Node.js, Express.js, @google-cloud/vision library.
- **Internal Structure**:
  ```
  extracttext-service/
  ├── src/
  │   ├── controllers/     # Extraction logic
  │   ├── routes/          # Endpoint for /extract
  │   └── server.ts
  ├── .env                 # Google API keys
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Generate Test Service
- **Purpose**: Utilizes GPT to generate exam questions based on extracted notes.
- **Key Features**: Prompt engineering for GPT, question formatting, variety in question types.
- **Technologies**: Node.js, Express.js, OpenAI API client.
- **Internal Structure**:
  ```
  generatetest-service/
  ├── src/
  │   ├── controllers/     # GPT integration and question generation
  │   ├── routes/          # Endpoint for /generate
  │   └── server.ts
  ├── .env                 # OpenAI API keys
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Test Service
- **Purpose**: Orchestrates the overall test generation process and stores test data.
- **Key Features**: Test creation, storage, retrieval, integration with other services.
- **Technologies**: Node.js, Express.js, database for test persistence.
- **Internal Structure**:
  ```
  test-service/
  ├── src/
  │   ├── controllers/     # Test management logic
  │   ├── models/          # Test schemas
  │   ├── routes/          # Endpoints for /create, /get
  │   └── server.ts
  ├── .env
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Evaluate Test Service
- **Purpose**: Evaluates student answers against generated tests, providing scores and feedback.
- **Key Features**: Answer comparison (strict/relaxed modes), scoring algorithms, feedback generation.
- **Technologies**: Node.js, Express.js, possibly NLP for relaxed evaluation.
- **Internal Structure**:
  ```
  evaluatetest-service/
  ├── src/
  │   ├── controllers/     # Evaluation logic
  │   ├── routes/          # Endpoint for /evaluate
  │   └── server.ts
  ├── .env
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### Section Service
- **Purpose**: Manages logical groupings or sections for notes and tests.
- **Key Features**: Section creation, assignment of notes/tests to sections.
- **Technologies**: Node.js, Express.js, database models.
- **Internal Structure**:
  ```
  section-service/
  ├── src/
  │   ├── controllers/     # Section CRUD
  │   ├── models/          # Section schemas
  │   ├── routes/          # Endpoints for sections
  │   └── server.ts
  ├── .env
  ├── Dockerfile
  ├── package.json
  └── tsconfig.json
  ```

### User Interface (Frontend)
- **Purpose**: Provides the React-based frontend for user interactions, including dashboards for notes, tests, and results.
- **Key Features**: Responsive UI, forms for uploads/answers, real-time feedback.
- **Technologies**: React, Vite, TypeScript, Axios for API calls, possibly Tailwind CSS.
- **Internal Structure**:
  ```
  user-interface/
  ├── src/
  │   ├── components/      # Reusable UI components (e.g., UploadForm, TestViewer)
  │   ├── hooks/           # Custom hooks for state management, API fetching
  │   ├── pages/           # Page components (e.g., Dashboard, TestPage)
  │   ├── api/             # API service wrappers
  │   └── main.tsx         # App entry point
  ├── .env                 # VITE_API_URL for gateway
  ├── index.html
  ├── vite.config.ts
  ├── package.json
  └── tsconfig.json
  ```

## Project Structure

The repository is organized around microservices, with each service in its own directory:

```
IntelligTest/
├── api-gateway/             # API routing and security
├── auth-service/            # User authentication
├── evaluatetest-service/    # Test evaluation
├── extracttext-service/     # Text extraction via Google Vision
├── generatetest-service/    # Question generation via GPT
├── notes-service/           # Note management
├── section-service/         # Section organization
├── test-service/            # Test orchestration and storage
├── user-interface/          # React frontend
├── docker-compose.yml       # Container orchestration
└── README.md                # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- API keys for Google Cloud Vision and OpenAI
- Database setup (e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/Sebastian-Zaragoza/IntelligTest.git
   cd IntelligTest
   ```

2. Configure Environment Variables:
   - For each service, copy `.env.example` to `.env` and fill in values (e.g., API keys, DB URIs, JWT secrets).

3. Build and Run with Docker:
   ```
   docker-compose up --build
   ```
   - This starts all services and the frontend (accessible at http://localhost:3000 or configured port).

4. Alternative: Run Individually (for development)
   - Navigate to each service folder, run `npm install` and `npm run dev`.

## Usage

- **Register/Login**: Create an account via the frontend.
- **Upload Notes**: Submit images; text is extracted and editable.
- **Generate Test**: Select notes to create a custom exam.
- **Take Test**: Answer questions; submit for evaluation.
- **View Results**: Get scores and feedback.

All interactions route through the API Gateway for security.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contact

For inquiries, contact Sebastian Zaragoza via GitHub or email (galindozaragozasebastian@gmail.com).

Thank you for exploring IntelligTest! 📚✨
