# Gmail Label Service

A full-stack application for managing Gmail labels using the Google Gmail API.

The project consists of:

- A **Spring Boot backend** that handles OAuth authentication and Gmail API REST calls
- A **React + TypeScript frontend** for interacting with labels

---

## Tech Stack

**Backend**

- Java 17
- Spring Boot
- Google Gmail API
- OAuth 2.0

**Frontend**

- React
- TypeScript
- MUI
- TanStack Query
- React Router
- React Hook Form

---

## Project Structure

```text
gmail-label-service/
├── gmail-label-service/        # Spring Boot backend
├── gmail-label-service-ui/     # React frontend
└── README.md                   # Project overview
```

---

## Getting Started (High Level)

1. Configure and run the backend
2. Complete Google OAuth authentication
3. Start the frontend UI
4. Manage Gmail labels via the browser

Detailed instructions are provided in each subproject:

- Backend README
- Frontend README

---

## Features

- Authenticate with Gmail using OAuth 2.0
- List Gmail labels
- Create new labels
- Update existing labels
- Delete labels
- View label details in a data grid UI
