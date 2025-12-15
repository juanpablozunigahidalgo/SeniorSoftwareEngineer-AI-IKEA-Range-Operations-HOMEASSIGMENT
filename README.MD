# Store Stock Management API

> **Coding Assignment Submission**
> **Role:** Senior Software Engineer - AI | IKEA Range Operations | Enabling Functions
> **Candidate:** Juan Pablo Zúñiga Hidalgo
> **Delivery Date:** Thursday, December 18, 2025

---

## 📋 Overview

This repository contains the implementation of a **Store Stock Management API**, designed to handle product inventory operations with a focus on data integrity, atomic transactions, and scalable architecture.

The project was built as a home assignment to demonstrate backend engineering capabilities, including API design, error handling, and business logic implementation for an e-commerce context.

### Key Features
* **Product CRUD:** Full lifecycle management (Create, Read, Update, Delete) for products.
* **Inventory Control:** Dedicated endpoints for incrementing and decrementing stock levels.
* **Safety Mechanisms:**
    * Validation to ensure stock never drops below zero.
    * Error handling for invalid operations or non-existent resources.
    * *(Optional: Mention here if you implemented Optimistic Locking or Transactions)*.

---

## 🛠️ Tech Stack & Design Decisions

### Technology Choices
* **Runtime:** Node.js (TypeScript) / Python (FastAPI) *[Select your stack]*
* **Database:** PostgreSQL / MongoDB *[Select your DB]*
* **Containerization:** Docker & Docker Compose

### Design Rationale
* **Architecture:** The project follows a layered architecture (Controller-Service-Repository) to separate concerns and improve testability.
* **Validation:** Input validation is enforced at the entry point (DTOs) to fail fast and protect the domain logic.
* **Scalability:** The `increment/decrement` logic is designed to be concurrency-safe, anticipating high-traffic scenarios typical in retail operations like IKEA's.

---

## 🚀 Getting Started

### Prerequisites
* Docker & Docker Compose
* Node.js v18+ / Python 3.10+ *(Adjust based on your choice)*

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/juanpablozunigahidalgo/store-stock-api.git](https://github.com/juanpablozunigahidalgo/store-stock-api.git)
    cd store-stock-api
    ```

2.  **Environment Setup:**
    ```bash
    cp .env.example .env
    # Adjust variables in .env if necessary
    ```

3.  **Run with Docker (Recommended):**
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:3000`.

4.  **Run Locally (Dev Mode):**
    ```bash
    npm install
    npm run dev
    ```

---

## 📡 API Usage

### Core Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/products` | Create a new product |
| `GET` | `/products` | List all products |
| `GET` | `/products/:id` | Get details of a single product |
| `POST` | `/products/:id/increment` | Add stock (default +1) |
| `POST` | `/products/:id/decrement` | Remove stock (safe check) |

### Example Request (Increment Stock)

```bash
curl -X POST http://localhost:3000/products/123/increment \
  -H "Content-Type: application/json" \
  -d '{ "amount": 5 }'