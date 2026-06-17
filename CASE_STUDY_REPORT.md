<div style="page-break-after: always;"></div>

# Order Returns System – Case Study Report

| | |
|---|---|
| **Candidate** | Navanith Krishna R |
| **Institution** | BMS College of Engineering |
| **Program** | B.E. Computer Science and Engineering |
| **Project Type** | Full-Stack Web Application |
| **Export As** | Navanith_Krishna_R_Case_Study_Report.pdf |
| **Date** | June 2026 |

---

## 1. Executive Summary

The **Order Returns System** is a full-stack enterprise web application developed to manage product return requests end to end. Built with **React**, **Node.js/Express**, and **MongoDB Atlas**, the system allows users to submit return requests through a professional dashboard, automatically evaluates eligibility against defined business rules, persists records to a cloud database, and presents real-time analytics including approval rates.

The project demonstrates practical software engineering skills: REST API design, document-based data modeling, frontend state management, client-side validation, error handling across layers, and integration of a decoupled frontend and backend. The application is fully functional, locally deployable, and suitable for technical demonstration in recruiter and interview settings.

> **📷 Screenshot recommendation:** Insert a full dashboard overview image after this section showing stats cards, the return form, and the history table.

---

## 2. Problem Statement

E-commerce and retail businesses process a high volume of product return requests. Without a centralized system, return decisions become inconsistent, manual tracking is error-prone, and teams lack visibility into approval trends. Key pain points include:

- No standardized way to enforce return policies (e.g., 30-day window, item condition)
- Manual status assignment leading to inconsistent outcomes
- Difficulty searching and filtering historical return data
- Lack of real-time metrics on approval performance

The project addresses these gaps by providing a single dashboard where return requests are submitted, automatically evaluated, stored persistently, and managed through search, filter, and delete operations.

---

## 3. Project Overview

The Order Returns System follows a classic three-tier architecture: a **React single-page application** (port 5173) communicates with an **Express REST API** (port 5000), which reads and writes to **MongoDB Atlas**. The frontend handles user interaction, form validation, and business-rule evaluation; the backend handles data persistence and API routing; the database stores return documents with a unique constraint on Order ID.

**Primary deliverables:** return submission form, automated status engine, dashboard analytics, searchable/filterable data table, delete-with-confirmation, REST CRUD API, Mongoose data model, and cloud database integration.

> **📷 Screenshot recommendation:** Insert a UI close-up of the return submission form with a visible status result (Approved or Rejected).

---

## 4. System Architecture

```
┌─────────────────────┐    HTTP/JSON (REST)    ┌─────────────────────┐    Mongoose    ┌─────────────────────┐
│   React Frontend    │ ◄────────────────────► │   Express Backend   │ ◄────────────► │   MongoDB Atlas     │
│   (Vite :5173)      │   /api/returns         │   (Node :5000)      │                │   orderReturns DB   │
└─────────────────────┘                        └─────────────────────┘                └─────────────────────┘
```

**Data flow:** User submits form → `returnLogic.js` computes status → Axios POST to API → Mongoose saves document → frontend re-fetches all records → dashboard stats and table update. Cross-origin requests are enabled via CORS. Environment variables (`VITE_API_URL`, `MONGO_URI`) configure connectivity without hard-coded values.

> **📷 Screenshot recommendation:** Insert an architecture or network diagram screenshot (Postman request + response alongside the live dashboard) to illustrate end-to-end flow.

---

## 5. Frontend Implementation

The frontend is built with **React 19** and **Vite 8**, organized into pages, components, services, utils, and styles.

| Module | Role |
|--------|------|
| `DashboardPage.jsx` | Central state orchestration — loading, CRUD, alerts, delete confirmation |
| `ReturnForm.jsx` | Form input, validation, status display on submit |
| `ReturnTable.jsx` | Search, filter, and tabular display of return history |
| `DashboardStats.jsx` | Metrics cards — total, approved, rejected, approval rate |
| `returnService.js` | Axios client for GET, POST, DELETE API calls |
| `returnLogic.js` | Business rule engine for status calculation |

**State management** uses React hooks (`useState`, `useEffect`, `useCallback`). After every create or delete, `loadReturns()` re-fetches data to keep analytics synchronized. UX features include loading spinners, success/error alerts, and a confirmation dialog before deletion. Styling uses a custom CSS design system with responsive layout — no third-party UI library.

---

## 6. Backend Implementation

The backend uses **Express 5** with a modular structure: routes → controllers → models, supported by middleware.

| File | Responsibility |
|------|----------------|
| `server.js` | App entry — CORS, JSON parsing, route mounting, error handler |
| `returnRoutes.js` | Maps HTTP methods to controller functions |
| `returnController.js` | `getReturns`, `createReturn`, `deleteReturn` handlers |
| `Return.js` | Mongoose schema with required fields and unique `orderId` |
| `asyncHandler.js` | Wraps async routes to forward errors to middleware |
| `errorHandler.js` | Maps validation errors and duplicate key (`11000`) to HTTP 400 |
| `db.js` | MongoDB Atlas connection via `MONGO_URI` |

The API is intentionally thin: it accepts pre-computed status from the frontend and persists documents. This keeps the backend focused on data integrity (schema validation, uniqueness) while the frontend handles policy evaluation for this project scope.

---

## 7. Database Design (MongoDB Atlas)

**Platform:** MongoDB Atlas (cloud-hosted, free-tier cluster)  
**Database:** `orderReturns`  
**Collection:** `returns` (auto-created by Mongoose)

| Field | Type | Constraints | Purpose |
|-------|------|-------------|---------|
| `orderId` | String | Required, unique | Primary business identifier |
| `customerName` | String | Required | Customer identification |
| `email` | String | Required | Contact information |
| `itemName` | String | Required | Product being returned |
| `reason` | String | Required | Return justification |
| `condition` | String | Required | New / Good / Damaged |
| `status` | String | Required | Computed approval result |
| `submittedAt` | String | Required | Submission timestamp |
| `_id` | ObjectId | Auto-generated | MongoDB document ID |

Connection is configured through `backend/.env`. Network access and database user credentials are managed in the Atlas console. The unique index on `orderId` enforces data integrity at the database layer.

> **📷 Screenshot recommendation:** Insert a MongoDB Atlas screenshot showing the `orderReturns` database, `returns` collection, and sample documents.

---

## 8. REST API Design

**Base URL:** `http://localhost:5000/api/returns`

| Method | Endpoint | Action | Success Code |
|--------|----------|--------|--------------|
| `GET` | `/api/returns` | Retrieve all return records | 200 |
| `POST` | `/api/returns` | Create a new return request | 201 |
| `DELETE` | `/api/returns/:id` | Delete a record by MongoDB `_id` | 200 |

The API follows REST conventions: resource-oriented URL, JSON request/response bodies, appropriate HTTP status codes, and centralized error responses (`{ "error": "message" }`). The frontend Axios service abstracts endpoint paths, enabling a single configuration point via `VITE_API_URL`.

> **📷 Screenshot recommendation:** Insert a Postman screenshot showing a successful POST request with JSON body and 201 response.

---

## 9. Features Implemented

- Return request submission with multi-field form
- Automatic approval/rejection status calculation
- Dashboard analytics: total returns, approved count, rejected count, approval rate
- Return history table with Order ID, customer, item, condition, status, and timestamp
- Real-time search by Order ID or Customer Name
- Status filter: All / Approved / Rejected
- Delete return with confirmation dialog
- Loading indicators and success/error notifications
- MongoDB Atlas cloud persistence
- Responsive enterprise dashboard UI

---

## 10. Business Rules

Return status is determined by `returnLogic.js` in the following evaluation order:

| Priority | Condition | Status Result |
|----------|-----------|---------------|
| 1 | Purchase date is after today | `Invalid Purchase Date` |
| 2 | More than 30 days since purchase | `Rejected - Return Window Expired` |
| 3 | Item condition is **Damaged** | `Rejected - Item Damaged` |
| 4 | Within 30 days AND condition is **New** or **Good** | `Approved` |

The 30-day return window and condition-based rejection rules mirror common retail return policies. Rejected statuses are stored as descriptive strings to aid readability in the UI and database.

---

## 11. Validation Logic

**Frontend (`ReturnForm.jsx`):**

| Validation | Rule |
|------------|------|
| Required fields | All form fields must be filled |
| Email format | Must contain `@` |
| Duplicate Order ID | Case-insensitive check against existing records |
| Future purchase date | Blocked at form level before submission |

**Backend (Mongoose + error handler):**

| Validation | Rule |
|------------|------|
| Schema required fields | Mongoose rejects incomplete documents |
| Unique Order ID | Duplicate `orderId` triggers MongoDB error code 11000 → HTTP 400 |
| JSON parsing | Express `express.json()` middleware handles malformed bodies |

Validation is layered: the frontend provides immediate user feedback; the backend enforces data integrity regardless of client behavior.

> **📷 Screenshot recommendation:** Insert a screenshot showing a validation error message (e.g., duplicate Order ID or empty field) in the UI.

---

## 12. Assumptions Made

1. No user authentication or role-based access — open dashboard for demo scope
2. Business rules execute on the frontend; backend stores the computed status without re-evaluation
3. Purchase date is used for status calculation but is **not persisted** in MongoDB
4. A single MongoDB database serves all data (no multi-tenant separation)
5. Email validation is basic (`@` check), not full RFC compliance
6. Application runs locally with frontend on port 5173 and backend on port 5000
7. CORS is open for development; production would restrict allowed origins
8. Status values are human-readable strings, not enum codes

---

## 13. AI Tools Used

| Tool | Contribution |
|------|-------------|
| **ChatGPT** | Architecture planning, debugging guidance, and technical concept clarification during development |
| **Cursor AI** | Code refactoring, UI/UX redesign, project restructuring, and documentation generation |
| **GitHub Copilot** | Boilerplate code generation and React component scaffolding |

All AI-assisted output was reviewed, understood, tested manually, and integrated into the final codebase. AI tools accelerated development but architectural and business logic decisions were validated independently.

---

## 14. Challenges Faced

| Challenge | Impact | Resolution |
|-----------|--------|------------|
| **MongoDB Atlas configuration** | Connection failures during initial setup due to IP whitelisting and credential formatting | Configured Network Access rules, created a dedicated DB user, and validated the connection string in `backend/.env` |
| **React + Express integration** | CORS errors and API URL mismatches between frontend and backend | Enabled CORS middleware on Express; centralized API base URL in `frontend/.env` via `VITE_API_URL` |
| **API testing using Postman** | Uncertainty around request body format and expected response codes | Tested all three endpoints manually; verified JSON schema against Mongoose model fields |
| **Git merge/rebase conflicts** | Conflicts during project restructuring when reorganizing frontend/backend folders | Resolved conflicts file-by-file, preserved working API routes and component imports, verified app still ran after merge |
| **Frontend/backend restructuring** | Broken imports and inconsistent folder layout after separating concerns | Reorganized into `frontend/` and `backend/` directories with clear module boundaries; updated all import paths and environment configs |

---

## 15. Testing Performed

Testing was conducted manually across all application layers. No automated test suite is included in the current codebase.

| Test Area | Method | Result |
|-----------|--------|--------|
| **API endpoints** | Postman — GET, POST, DELETE on `/api/returns` | All endpoints return expected status codes and JSON |
| **Form validation** | Browser — empty fields, invalid email, duplicate Order ID, future date | Validation messages display correctly; invalid submissions blocked |
| **Business rules** | Browser — test cases for Approved, each Rejected variant, invalid date | Status engine returns correct result for each scenario |
| **Search & filter** | Browser — search by Order ID and customer name; filter by status | Table updates in real time with correct matches |
| **Delete flow** | Browser — delete with confirmation dialog | Record removed from UI and database |
| **Database persistence** | MongoDB Atlas console — verify documents after submission | Records appear in `returns` collection with correct fields |
| **Error handling** | Postman + browser — duplicate Order ID, backend offline | Appropriate error messages shown to user |
| **Responsive UI** | Browser — resize viewport across desktop, tablet, mobile widths | Layout adapts without broken components |

> **📷 Screenshot recommendation:** Insert a Postman collection screenshot or a side-by-side of a test case input and its resulting dashboard/database record.

---

## 16. Conclusion

The Order Returns System successfully demonstrates end-to-end full-stack development — from user-facing React components through a RESTful Express API to persistent cloud storage in MongoDB Atlas. The application solves a realistic business problem (return request management) with automated policy enforcement, live analytics, and a professional user interface.

Key technical outcomes include a decoupled client-server architecture, a well-defined REST API, a Mongoose data model with integrity constraints, layered validation, and structured error handling. Challenges encountered during Atlas setup, cross-origin integration, API testing, and project restructuring were resolved through systematic debugging and incremental verification.

**Future enhancements** would include server-side business rule validation, user authentication (JWT), automated unit and integration tests, API pagination, input sanitization, and CI/CD deployment pipeline.

---

| | |
|---|---|
| **Author** | Navanith Krishna R |
| **Institution** | BMS College of Engineering |
| **Degree** | B.E. Computer Science and Engineering |
| **Project** | Order Returns System |
| **Document** | Navanith_Krishna_R_Case_Study_Report.pdf |

---

### PDF Export Instructions

1. Add recommended screenshots to the `screenshots/` folder and embed them at marked locations above.
2. Open this file in **Cursor / VS Code** with the *Markdown PDF* extension.
3. Export as **`Navanith_Krishna_R_Case_Study_Report.pdf`**.
4. Target length: **2–3 pages** (text sections); screenshots may extend to 4 pages total.

*© 2026 Navanith Krishna R · Order Returns System · ANSR Case Study Submission*
