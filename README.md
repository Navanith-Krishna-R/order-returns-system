# Order Returns System

**Full-Stack Enterprise Web Application**

| | |
|---|---|
| **Author** | Navanith Krishna R |
| **Program** | B.E. Computer Science and Engineering |
| **Institution** | BMS College of Engineering |
| **Submission Document** | README_Order_Returns_System.pdf |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Application Preview](#2-application-preview)
3. [Features](#3-features)
4. [Technology Stack](#4-technology-stack)
5. [Folder Structure](#5-folder-structure)
6. [Installation Steps](#6-installation-steps)
7. [MongoDB Atlas Setup](#7-mongodb-atlas-setup)
8. [API Endpoints](#8-api-endpoints)
9. [Business Rules](#9-business-rules)
10. [Assumptions Made During Development](#10-assumptions-made-during-development)
11. [AI Tools Used During Development](#11-ai-tools-used-during-development)
12. [Author Information](#12-author-information)

---

## 1. Project Overview

The **Order Returns System** is a full-stack web application designed to manage product return requests in an enterprise-style dashboard. Customers (or support staff acting on their behalf) can submit return requests through a responsive web interface. The system automatically evaluates each request against defined business rules, assigns an approval status, and persists all records to **MongoDB Atlas** via a RESTful **Node.js / Express** backend.

The application demonstrates end-to-end full-stack development: a **React** single-page frontend communicates with a backend API, data is stored in a cloud-hosted MongoDB cluster, and the UI presents real-time analytics, search, filtering, and CRUD operations in a professional dashboard layout suitable for desktop, tablet, and mobile viewports.

**Key capabilities at a glance:**

- Submit and manage return requests through a validated form
- Automatic status determination (Approved / Rejected) based on item condition and purchase date
- Live dashboard metrics: total returns, approved count, rejected count, and approval rate
- Search by Order ID or Customer Name; filter by approval status
- Persistent storage with MongoDB Atlas and REST API integration

---

## 2. Application Preview

### 2.1 Dashboard Screenshot

> **Placeholder:** Replace the image below with a screenshot of the running dashboard (stats cards, return form, and history table).

![Order Returns System — Dashboard Overview](./screenshots/dashboard-overview.png)

*Figure 1 — Dashboard showing return statistics, submission form, search/filter toolbar, and return history table.*

---

### 2.2 MongoDB Atlas Screenshot

> **Placeholder:** Replace the image below with a screenshot of your MongoDB Atlas cluster showing the `orderReturns` database and `returns` collection.

![MongoDB Atlas — Database and Collection](./screenshots/mongodb-atlas-cluster.png)

*Figure 2 — MongoDB Atlas cluster with the `orderReturns` database and persisted return documents.*

---

### 2.3 API Response Screenshot

> **Placeholder:** Replace the image below with a screenshot of an API response (e.g., Postman, Thunder Client, or browser DevTools Network tab showing a successful `GET /api/returns` or `POST /api/returns` response).

![API Response — REST Endpoint Example](./screenshots/api-response-example.png)

*Figure 3 — Sample REST API response from the Order Returns backend.*

---

## 3. Features

### 3.1 Return Management

| Feature | Description |
|---------|-------------|
| **Create return requests** | Multi-field form with client-side validation (required fields, email format, duplicate Order ID check) |
| **Automatic status calculation** | Evaluates purchase date and item condition to produce Approved or Rejected status |
| **View return history** | Sortable-style data table displaying all submitted returns |
| **Delete returns** | Remove records with a confirmation dialog to prevent accidental deletion |

### 3.2 Dashboard & Analytics

| Feature | Description |
|---------|-------------|
| **Total Returns** | Count of all submitted return requests |
| **Approved / Rejected counts** | Breakdown by final status |
| **Approval Rate** | Percentage of approved returns relative to total submissions |
| **Real-time refresh** | Metrics update automatically after create or delete operations |

### 3.3 Search & Filter

| Feature | Description |
|---------|-------------|
| **Search** | Filter by Order ID or Customer Name (case-insensitive) |
| **Status filter** | View All, Approved only, or Rejected only |

### 3.4 User Experience

| Feature | Description |
|---------|-------------|
| **Loading indicators** | Spinner displayed while fetching data from the API |
| **Alert notifications** | Success and error messages for all CRUD operations |
| **Responsive UI** | Enterprise dashboard design adapted for multiple screen sizes |
| **Accessibility** | Semantic HTML, ARIA labels, and labelled form controls |

---

## 4. Technology Stack

### 4.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | Component-based UI framework |
| Vite | 8.x | Build tool and development server |
| Axios | 1.x | HTTP client for REST API communication |
| CSS3 | — | Custom enterprise design system (no UI library) |
| ESLint | 10.x | Code quality and linting |

### 4.2 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ recommended | JavaScript runtime |
| Express | 5.x | REST API framework |
| Mongoose | 9.x | MongoDB ODM and schema validation |
| MongoDB Atlas | — | Cloud-hosted document database |
| CORS | 2.x | Cross-origin resource sharing for frontend |
| dotenv | 17.x | Environment variable management |
| Nodemon | 3.x | Auto-restart during development |

### 4.3 Architecture

```
┌─────────────────┐     HTTP (REST)      ┌─────────────────┐     Mongoose      ┌─────────────────┐
│  React Frontend │  ◄─────────────────► │  Express API    │  ◄──────────────► │  MongoDB Atlas  │
│  (Vite :5173)   │   /api/returns       │  (Node :5000)   │                   │  orderReturns   │
└─────────────────┘                      └─────────────────┘                   └─────────────────┘
```

---

## 5. Folder Structure

```
order-returns-system/
│
├── frontend/                          # React + Vite client application
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── AlertMessage.jsx       # Success/error toast notifications
│   │   │   ├── ConfirmDialog.jsx      # Delete confirmation modal
│   │   │   ├── DashboardStats.jsx     # Metrics cards (total, approved, rejected, rate)
│   │   │   ├── LoadingSpinner.jsx     # Loading state indicator
│   │   │   ├── ReturnForm.jsx         # Return submission form
│   │   │   └── ReturnTable.jsx        # Searchable, filterable data table
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx      # Main dashboard page (state & API orchestration)
│   │   ├── services/
│   │   │   └── returnService.js       # Axios API client (GET, POST, DELETE)
│   │   ├── styles/
│   │   │   ├── App.css                # Dashboard and component styles
│   │   │   └── index.css              # Global base styles
│   │   ├── utils/
│   │   │   └── returnLogic.js         # Business rule engine (status calculation)
│   │   ├── App.jsx                    # Root layout (header, main, footer)
│   │   └── main.jsx                   # React entry point
│   ├── .env.example                   # Frontend environment template
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Node.js + Express REST API
│   ├── config/
│   │   └── db.js                      # MongoDB connection handler
│   ├── controllers/
│   │   └── returnController.js        # Request handlers (CRUD logic)
│   ├── middleware/
│   │   ├── asyncHandler.js            # Async error wrapper for route handlers
│   │   └── errorHandler.js            # Centralized error response middleware
│   ├── models/
│   │   └── Return.js                  # Mongoose schema and model
│   ├── routes/
│   │   └── returnRoutes.js            # API route definitions
│   ├── .env.example                   # Backend environment template
│   ├── package.json
│   └── server.js                      # Application entry point
│
├── screenshots/                       # Documentation screenshots (add before PDF export)
│   ├── dashboard-overview.png         # [Placeholder]
│   ├── mongodb-atlas-cluster.png      # [Placeholder]
│   └── api-response-example.png       # [Placeholder]
│
├── .gitignore
└── README.md                          # This document
```

---

## 6. Installation Steps

### 6.1 Prerequisites

| Requirement | Details |
|-------------|---------|
| Node.js | v18 or later recommended |
| npm | Bundled with Node.js |
| MongoDB Atlas | Free-tier cluster account |
| Git | For cloning the repository |

### 6.2 Clone the Repository

```bash
git clone <repository-url>
cd order-returns-system
```

### 6.3 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your MongoDB Atlas connection string (see [Section 7](#7-mongodb-atlas-setup)):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/orderReturns?retryWrites=true&w=majority
```

Start the backend development server:

```bash
npm run dev
```

The API will be available at: **http://localhost:5000**

For production:

```bash
npm start
```

### 6.4 Frontend Setup

Open a **new terminal** from the project root:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend will be available at: **http://localhost:5173**

The default frontend `.env` configuration:

```env
VITE_API_URL=http://localhost:5000
```

### 6.5 Verify the Installation

1. Ensure the backend console displays `MongoDB Connected` and `Server running on port 5000`.
2. Open **http://localhost:5173** in a browser.
3. Submit a test return request and confirm it appears in the history table.
4. Verify the record exists in MongoDB Atlas under the `returns` collection.

---

## 7. MongoDB Atlas Setup

Follow these steps to configure cloud database connectivity:

### Step 1 — Create a Cluster

1. Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **free shared cluster** (M0 tier is sufficient for development and demonstration).

### Step 2 — Create a Database User

1. Navigate to **Database Access** → **Add New Database User**.
2. Set a username and strong password.
3. Assign **Read and write** permissions to any database.

### Step 3 — Configure Network Access

1. Navigate to **Network Access** → **Add IP Address**.
2. For local development, add your current IP address.
3. Alternatively, use `0.0.0.0/0` to allow access from any IP (development only; not recommended for production).

### Step 4 — Obtain the Connection String

1. Go to **Database** → **Connect** → **Drivers**.
2. Copy the connection string template.
3. Replace `<username>`, `<password>`, and `<cluster>` with your credentials.
4. Append the database name: `/orderReturns?retryWrites=true&w=majority`

**Example:**

```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/orderReturns?retryWrites=true&w=majority
```

### Step 5 — Paste into Backend Environment

Add the connection string to `backend/.env` as the `MONGO_URI` variable.

### Database Details

| Property | Value |
|----------|-------|
| Database name | `orderReturns` |
| Collection name | `returns` (auto-created by Mongoose on first insert) |
| Unique index | `orderId` (enforced by Mongoose schema) |

---

## 8. API Endpoints

**Base URL:** `http://localhost:5000/api/returns`

| # | Method | Endpoint | Description | Success Response |
|---|--------|----------|-------------|------------------|
| 1 | `GET` | `/api/returns` | Fetch all return requests | `200 OK` — JSON array of return objects |
| 2 | `POST` | `/api/returns` | Create a new return request | `201 Created` — JSON object of saved return |
| 3 | `DELETE` | `/api/returns/:id` | Delete a return request by MongoDB `_id` | `200 OK` — `{ "message": "Deleted successfully" }` |

### 8.1 Return Object Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | String | Yes | Unique order identifier |
| `customerName` | String | Yes | Customer full name |
| `email` | String | Yes | Customer email address |
| `itemName` | String | Yes | Product being returned |
| `reason` | String | Yes | Reason for the return |
| `condition` | String | Yes | Item condition: `New`, `Good`, or `Damaged` |
| `status` | String | Yes | Computed approval status |
| `submittedAt` | String | Yes | Timestamp of submission (locale string) |
| `_id` | ObjectId | Auto | MongoDB document identifier |
| `__v` | Number | Auto | Mongoose version key |

### 8.2 POST Request Example

**Request:**

```http
POST /api/returns HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

```json
{
  "orderId": "ORD-001",
  "customerName": "Jane Doe",
  "email": "jane@example.com",
  "itemName": "Wireless Headphones",
  "reason": "Wrong size",
  "condition": "New",
  "status": "Approved",
  "submittedAt": "6/17/2026, 10:30:00 AM"
}
```

**Response (`201 Created`):**

```json
{
  "_id": "684f1a2b3c4d5e6f7a8b9c0d",
  "orderId": "ORD-001",
  "customerName": "Jane Doe",
  "email": "jane@example.com",
  "itemName": "Wireless Headphones",
  "reason": "Wrong size",
  "condition": "New",
  "status": "Approved",
  "submittedAt": "6/17/2026, 10:30:00 AM",
  "__v": 0
}
```

### 8.3 Error Responses

| Status | Condition | Example Response |
|--------|-----------|-------------------|
| `400 Bad Request` | Validation error or duplicate `orderId` | `{ "error": "Return validation failed: ..." }` |
| `500 Internal Server Error` | Unhandled server error | `{ "error": "Internal Server Error" }` |

---

## 9. Business Rules

Return approval status is calculated automatically on the frontend by `returnLogic.js` before the record is sent to the API. The rules are evaluated in the following order:

### 9.1 Approval Criteria

A return is **Approved** when **all** of the following conditions are met:

| Rule | Condition |
|------|-----------|
| Valid purchase date | Purchase date is not in the future |
| Return window | Purchase date is within **30 days** of the current date |
| Item condition | Condition is **New** or **Good** |

**Result:** `Approved`

### 9.2 Rejection Criteria

A return is **Rejected** when any of the following conditions apply:

| Rule | Condition | Result Status |
|------|-----------|---------------|
| Future purchase date | Purchase date is after today | `Invalid Purchase Date` |
| Expired window | More than 30 days since purchase | `Rejected - Return Window Expired` |
| Damaged item | Item condition is **Damaged** | `Rejected - Item Damaged` |

### 9.3 Evaluation Flow

```
                    ┌──────────────────────┐
                    │  Submit Return Form  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │ Purchase date > today?│──Yes──► Invalid Purchase Date
                    └──────────┬───────────┘
                               │ No
                    ┌──────────▼───────────┐
                    │  Days since purchase  │
                    │       > 30?           │──Yes──► Rejected - Return Window Expired
                    └──────────┬───────────┘
                               │ No
                    ┌──────────▼───────────┐
                    │  Condition = Damaged? │──Yes──► Rejected - Item Damaged
                    └──────────┬───────────┘
                               │ No
                    ┌──────────▼───────────┐
                    │      Approved         │
                    └──────────────────────┘
```

### 9.4 Additional Validation Rules

| Validation | Where Enforced |
|------------|----------------|
| All form fields required | Frontend (`ReturnForm.jsx`) |
| Email must contain `@` | Frontend |
| Duplicate Order ID prevention | Frontend (case-insensitive) + Backend (unique index) |
| Purchase date cannot be in the future | Frontend (form validation + business logic) |

---

## 10. Assumptions Made During Development

The following assumptions were made to scope and implement the project within the assignment requirements:

| # | Assumption | Rationale |
|---|------------|-----------|
| 1 | **No user authentication** | The dashboard is open-access; no login, roles, or session management is implemented. |
| 2 | **Business logic runs on the frontend** | Status calculation occurs in `returnLogic.js` on the client; the backend stores the computed status without re-validating business rules. |
| 3 | **Purchase date is not persisted** | Purchase date is used only for status calculation at submission time and is not stored in the MongoDB document. |
| 4 | **30-day return window** | Returns are eligible only if the purchase occurred within the last 30 calendar days. |
| 5 | **Three item conditions** | Supported values are `New`, `Good`, and `Damaged`; no other conditions are modeled. |
| 6 | **Order ID uniqueness** | Each return maps to a unique Order ID; duplicate submissions are blocked. |
| 7 | **Single-tenant deployment** | One MongoDB database serves all data; no multi-tenant or organization-level separation. |
| 8 | **Local development environment** | Frontend (`:5173`) and backend (`:5000`) run locally with CORS enabled for cross-origin requests. |
| 9 | **Basic email validation** | Email format is validated with a simple `@` presence check, not full RFC compliance. |
| 10 | **Status stored as plain string** | Approval statuses are stored as human-readable strings rather than enum codes. |

---

## 11. AI Tools Used During Development

| Tool | Purpose |
|------|---------|
| **Cursor AI** | Code refactoring, project restructuring, UI/UX redesign, debugging assistance, and documentation generation |
| **GitHub Copilot** | Boilerplate code generation and React component scaffolding during initial development |

All AI-assisted output was reviewed, tested, and integrated manually to ensure correctness and alignment with project requirements.

---

## 12. Author Information

| | |
|---|---|
| **Name** | Navanith Krishna R |
| **Degree** | B.E. Computer Science and Engineering |
| **Institution** | BMS College of Engineering |
| **Project** | Order Returns System — Full-Stack Enterprise Web Application |
| **Year** | 2026 |

---

## Exporting This Document as PDF

To submit as **README_Order_Returns_System.pdf**:

1. Add your screenshots to the `screenshots/` folder (see [Section 2](#2-application-preview)).
2. Open this `README.md` in VS Code, Cursor, or any Markdown viewer.
3. Export using one of the following methods:
   - **VS Code / Cursor:** Install the *Markdown PDF* extension → right-click `README.md` → **Markdown PDF: Export (pdf)** → save as `README_Order_Returns_System.pdf`.
   - **Online:** Paste the rendered Markdown into a Markdown-to-PDF converter (e.g., [md2pdf.netlify.app](https://md2pdf.netlify.app)).
   - **GitHub:** Push to a repository, open the rendered README in the browser, and use **Print → Save as PDF**.

---

*Document generated for ANSR submission — Order Returns System © 2026*
