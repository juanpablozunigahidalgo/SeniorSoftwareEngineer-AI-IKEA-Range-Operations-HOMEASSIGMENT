# Backend Coding Assignment: Store Stock Management API

## 📝 Overview
You are required to build a small backend application that manages store product stocks. The system should allow creating products, updating product details, deleting products, and adjusting stock levels (increment/decrement).

This assignment tests backend development skills including **API design**, **data modeling**, **validation**, **error handling**, and **code structure**.

---

## 🛠️ Requirements

### 1. Technology
* **Language/Framework:** Any backend stack is allowed (Node.js/Express, Java/Spring Boot, Python/FastAPI, Go, Ruby, etc.).
* **Database:** A persistent database is preferred (PostgreSQL, MongoDB, SQLite, etc.). An in-memory store is acceptable **only** if you explain your approach and trade-offs.

### 2. Functional Requirements

#### A. Product Model
A product must contain at least the following fields:

| Field | Type | Notes |
| :--- | :--- | :--- |
| `id` | String/Number | Unique identifier |
| `name` | String | **Required** |
| `sku` | String | **Required** & **Unique** |
| `stock` | Integer | Defaults to `0` |
| `createdAt` | Date | Auto-set on creation |
| `updatedAt` | Date | Auto-updated on modification |

---

#### B. API Endpoints

**1. Create a Product**
* **Endpoint:** `POST /products`
* **Request Body:**
    ```json
    {
      "name": "Apple iPhone 16",
      "sku": "IP16-256-BLK",
      "stock": 20
    }
    ```
* **Responses:**
    * `201 Created`: Returns the full product object.

**2. Get All Products**
* **Endpoint:** `GET /products`
* **Response:**
    * `200 OK`: Returns an array of products.

**3. Get Product by ID**
* **Endpoint:** `GET /products/:id`
* **Responses:**
    * `200 OK`: Returns the product object.
    * `404 Not Found`: If the ID does not exist.

**4. Update Product**
* **Endpoint:** `PUT /products/:id`
* **Note:** Partial or full updates are allowed.
* **Request Body:**
    ```json
    {
      "name": "Updated Name",
      "stock": 10
    }
    ```
* **Responses:**
    * `200 OK`: Returns the updated product.
    * `404 Not Found`: If the ID does not exist.

**5. Delete Product**
* **Endpoint:** `DELETE /products/:id`
* **Responses:**
    * `204 No Content`: Successful deletion.
    * `404 Not Found`: If the ID does not exist.

**6. Increment Stock**
* **Endpoint:** `POST /products/:id/increment`
* **Request Body:**
    ```json
    { "amount": 5 }
    ```
* **Behavior:**
    * Increases stock by `amount`.
    * Default `amount` is **1** if not provided.
* **Responses:**
    * `200 OK`: Returns the updated product.
    * `400 Bad Request`: If amount is invalid.
    * `404 Not Found`: If product does not exist.

**7. Decrement Stock**
* **Endpoint:** `POST /products/:id/decrement`
* **Request Body:**
    ```json
    { "amount": 3 }
    ```
* **Behavior:**
    * Decreases stock by `amount`.
    * **Constraint:** Stock must **never** go below zero.
* **Responses:**
    * `200 OK`: Returns the updated product.
    * `400 Bad Request`: If `amount` > `current stock`.
    * `404 Not Found`: If product does not exist.

---

### 3. 🌟 Bonus Requirements (Optional)
Impress us by adding any of the following:
* [ ] Add **pagination/filtering** to `GET /products`.
* [ ] Add **authentication** (JWT, API Key, etc.).
* [ ] Add **unit tests** or **integration tests**.
* [ ] Use **DB transactions** for increment/decrement operations.
* [ ] Add a **Dockerfile** & `docker-compose` setup.
* [ ] Implement **optimistic locking** to avoid race conditions in stock decrements.

---

## 📦 Deliverables
Please submit the following:
1.  **Source Code:** A link to a Git repository or a ZIP file.
2.  **Run Instructions:** A `README.md` with steps to run the project.
3.  **Design Decisions:** A brief explanation of your framework choice, database strategy, etc.
4.  **Testing:** Example `curl` commands or a Postman collection.