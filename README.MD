# Store Stock Management API

> **Coding Assignment Submission**
> **Role:** Senior Software Engineer - AI | IKEA Range Operations | Enabling Functions
> **Candidate:** Juan Pablo Zúñiga Hidalgo
> **Delivery Date:** Thursday, December 18, 2025

---

## 📝 Overview
This repository contains a robust **RESTful API** designed to manage store inventory. It implements full product lifecycle management and enforces strict business rules for stock adjustments to ensure data integrity.

The solution addresses all functional requirements and includes several **bonus implementations**, including containerization (Docker), interactive documentation (Swagger), and integration testing.

---

## 🛠️ Technology & Design Decisions

### Tech Stack
* **Runtime:** Node.js with **TypeScript** (Strict typing for maintainability).
* **Framework:** Express.js (Lightweight, unopinionated routing).
* **Database:** PostgreSQL 15 (ACID compliance for reliable stock transactions).
* **ORM:** TypeORM (Data Mapper pattern for clean repository isolation).
* **Validation:** `class-validator` & `class-transformer` (DTO-based validation).

### Architecture Strategy
The project follows a **Layered Architecture** (Controller → Service → Repository) to separate concerns:

1.  **Controllers:** Handle HTTP requests, parsing, and response formatting.
2.  **Services:** encapsulate business logic. *Example:* The `adjustStock` method resides here to validate that stock never drops below zero before reaching the database.
3.  **Repositories:** Abstract the data access layer.

### Concurrency Note
In this implementation, stock adjustments are handled via logical validation in the application layer.
* **Current Approach:** Fetch Product → Validate Stock → Save New Value.
* **Production Scalability:** For a high-concurrency environment (e.g., Black Friday), this logic is designed to be easily refactored to use **Pessimistic Locking** (`SELECT ... FOR UPDATE`) or raw SQL atomic increments to prevent race conditions.

---

## 🚀 Getting Started

### Prerequisites
* **Docker & Docker Compose** (Recommended)
* *Or:* Node.js v16+ and a local PostgreSQL instance.

### Option A: Run with Docker (Preferred)
This will provision both the API and the PostgreSQL database in isolated containers.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Start the environment:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the API:**
    * Server running at: `http://localhost:3000`
    * Database port mapped to: `5434` (to avoid conflicts with local DBs).

### Option B: Run Locally (Dev Mode)
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment:**
    Ensure `.env` matches your local database credentials.
3.  **Start the server:**
    ```bash
    npm run dev
    ```

---

## 📖 API Documentation

This project includes **Swagger/OpenAPI** integration for interactive testing and documentation.

👉 **View Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Core Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/products` | Create a new product (Unique SKU required). |
| `GET` | `/products` | Retrieve all inventory items. |
| `POST` | `/products/{id}/increment` | Safe stock addition. |
| `POST` | `/products/{id}/decrement` | Safe stock removal (Validates negatives). |

---

## ✅ Testing

A custom integration test script is included to verify the end-to-end flow, specifically testing the **"Stock cannot go below zero"** constraint.

**To run the test:**
```bash
# Requires Python 3 and 'requests' library
python test_api.py