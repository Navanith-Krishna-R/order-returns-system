# Order Returns System

## Project Overview

The Order Returns System is a full-stack enterprise web application for managing product return requests. Customers can submit returns through a professional dashboard, and the system automatically validates eligibility, calculates approval status, and persists all data in MongoDB Atlas.

The application provides real-time dashboard analytics, search and filter capabilities, and a responsive UI designed for desktop, tablet, and mobile devices.

## Application Preview

![Order Returns System Dashboard](./screenshots/dashboard-overview.png)

The dashboard displays return statistics, approval rates, return history, search and filtering functionality, and return management features.

## Features

- Create return requests with form validation
- View return request history in a modern data table
- Delete return requests with confirmation dialog
- Automatic return status calculation (Approved / Rejected)
- Dashboard statistics (Total, Approved, Rejected, Approval Rate)
- Search by Order ID or Customer Name
- Filter by Approved or Rejected status
- MongoDB Atlas persistence via REST API
- Loading indicators and success/error notifications
- Responsive enterprise dashboard UI

## Technology Stack

### Frontend
- React 19
- Vite
- Axios
- CSS3 (custom enterprise design system)

### Backend
- Node.js
- Express 5
- MongoDB Atlas
- CORS
- dotenv

## Folder Structure

```
order-returns-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlertMessage.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ReturnForm.jsx
│   │   │   └── ReturnTable.jsx
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx
│   │   ├── services/
│   │   │   └── returnService.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   └── returnLogic.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   │   └── returnController.js
│   ├── models/
│   │   └── Return.js
│   ├── routes/
│   │   └── returnRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   └── errorHandler.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
└── README.md
```

## Installation Steps

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- MongoDB Atlas account and cluster

### Clone the Repository

```bash
git clone <repository-url>
cd order-returns-system
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at: **http://localhost:5173**

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB Atlas connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/orderReturns?retryWrites=true&w=majority
```

Start the backend server:

```bash
npm run dev
```

The backend runs at: **http://localhost:5000**

## MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Copy the connection string and paste it into `backend/.env` as `MONGO_URI`
5. The application uses the `orderReturns` database and a `returns` collection (auto-created by Mongoose)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/returns` | Fetch all return requests |
| POST | `/api/returns` | Create a new return request |
| DELETE | `/api/returns/:id` | Delete a return request by ID |

### POST Request Body Example

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

## Business Rules

### Approved
- Item condition is New or Good
- Purchase date falls within the 30-day return window

### Rejected
- Item condition is Damaged
- Return window has expired (more than 30 days)
- Invalid purchase date (future date)

## AI Tools Used During Development

- **Cursor AI** — Code refactoring, project restructuring, UI/UX redesign, and documentation generation
- **GitHub Copilot** — Assisted with boilerplate code and component scaffolding during initial development

## Author

Navanith Krishna R  
B.E. Computer Science and Engineering  
BMS College of Engineering