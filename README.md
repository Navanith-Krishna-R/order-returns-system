# Order Returns System

## Project Overview

The Order Returns System is a React-based web application that allows customers to submit product return requests and enables efficient return management.

The application validates return requests, calculates return eligibility, maintains return history, provides dashboard analytics, and stores data using Local Storage.

## Application Preview

![Order Returns System Dashboard](./screenshots/dashboard-overview.png)

The dashboard displays return statistics, approval rates, return history, search and filtering functionality, and return management features.

## Features

* Submit return requests
* Automatic return status calculation
* Dashboard analytics
* Search return requests
* Filter by Approved or Rejected status
* Delete return requests
* Local Storage persistence
* Form validation
* Duplicate Order ID prevention
* Future date validation
* Responsive enterprise dashboard UI

## Technologies Used

* React.js
* JavaScript (ES6+)
* Vite
* CSS3
* Local Storage

## Business Rules

### Approved

* Item condition is New or Good
* Purchase date falls within the allowed return window

### Rejected

* Item condition is Damaged
* Return window has expired

## Dashboard Metrics

The dashboard displays:

* Total Returns
* Approved Returns
* Rejected Returns
* Approval Rate

## Search and Filter

Users can:

* Search by Order ID
* Search by Customer Name
* Filter Approved requests
* Filter Rejected requests
* View all requests

## Validation Implemented

* All fields are mandatory
* Email validation
* Duplicate Order ID validation
* Future purchase date validation

## Data Persistence

All return requests are stored in Local Storage and remain available after refreshing the browser.

## Project Structure

src/
├── components/
│ └── ReturnForm.jsx
├── utils/
│ └── returnLogic.js
├── App.jsx
├── App.css
└── main.jsx

## Installation

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Run the project:

npm run dev

Open:

http://localhost:5173

## Future Enhancements

* Backend integration
* Database storage
* Authentication and authorization
* Export reports to PDF/Excel
* Admin dashboard
* Email notifications

## Author

Navanith Krishna R

B.E. Computer Science and Engineering

BMS College of Engineering

Mail:navanith.cs22@bmsce.ac.in
