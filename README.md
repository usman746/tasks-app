# Tasks Management App

## Overview

This project is a full-stack application featuring a **React.js** front end, built using **Vite**, and a **Node.js**/Express **back end** connected to **MongoDB**. The application provides user authentication and task management functionalities, allowing users to register, log in, and perform CRUD operations on tasks.

## Table of Contents

- [Tasks Management App](#tasks-management-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Front-end Overview](#front-end-overview)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Front-end Setup](#front-end-setup)
  - [Assumptions and Decisions](#assumptions-and-decisions)
  - [Known Issues and Limitations](#known-issues-and-limitations)
  - [Future Enhancements](#future-enhancements)

---

## Front-end Overview

The front end is developed using **React.js** with **Vite** as the build tool, **Tailwind CSS** for styling, and **Material UI** (MUI) components for enhanced UI elements. The application includes pages for:

- **Login, and Signup**
- **Task Dashboard**: View, Create, Edit, and Delete tasks

**Technologies used**:

- **Vite** - For fast bundling and development
- **React Router** - For navigation and routing
- **Redux Toolkit** - For state management, especially managing user sessions and task state
- **Tailwind CSS** - For utility-first styling
- **Material UI (MUI)** - For additional UI components

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** or **Yarn** installed

### Front-end Setup

1. **Clone the repository**:

   ```bash
   https://github.com/usman746/tasks-app.git
   cd tasks-app

   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the front-end**:
   ```bash
    npm run dev
By default, the front end will be available at `http://localhost:5173`.

4. **Environment Variables**: Create a `.env` file in the front-end folder to store environment variables like the back-end API URL.

```plaintext
   VITE_BASE_URL=http://localhost:5000/api
   VITE_FRONTEND_URL=http://localhost:5173
```

- **VITE_BASE_URL**: Back end URL for api endpoints.
- **VITE_FRONTEND_URL**: Front end URL where application is deployed.

## Assumptions and Decisions

- **Authentication**: Users are required to register and log in before accessing task-related features.
- **Data Structure**: Tasks include fields for title, description, due date, and status.
- **Task Management**: Only authenticated users can perform CRUD operations on their tasks. Each user's tasks are private.
- **Styling**: Tailwind CSS is used for custom styling, while MUI is utilized for more complex UI components (dialogs, modals, etc.).
- **State Management**: Redux Toolkit is used to manage global state, such as the user session and tasks, to ensure better synchronization across components.
- **API Integration**: The front end communicates with the back end using RESTful API calls, ensuring a clear separation of concerns between the client and server.
- **User Experience**: Emphasis is placed on a responsive design to ensure usability across different devices and screen sizes.
- **Logout**: The logout functionality is only handled on front end side where the tokens are removed from the local storage.

---

## Known Issues and Limitations

- **Session Management**: JWT tokens are stored in local storage, which may have security implications. For production, consider using HTTP-only cookies for improved security.
- **Error Handling**: Error messages are basic and may need enhancement for better user experience and clarity.
- **Mobile Responsiveness**: While the UI is designed to be responsive, additional adjustments may be necessary for optimal display on various devices.
- **Token Expiration**: Handling of token expiration on the client side is minimal; users may not receive clear indications of expiration until an API request fails.
- **Testing**: Limited unit and integration testing have been conducted.

---

## Future Enhancements

- **Enhanced Error Messages**: Provide more user-friendly error messages and feedback to users in case of errors.
- **Role-Based Access Control**: Implement different user roles and permissions to provide a more tailored user experience.
- **Pagination for Task Lists**: Introduce pagination to the task list to improve performance and manageability for users with many tasks.
- **Optimized State Management**: Further optimize state management, potentially integrating caching mechanisms to improve performance.
- **Detailed Logging and Monitoring**: Set up advanced logging and monitoring on the server side to facilitate debugging and operational oversight.
- **Unit and Integration Testing**: Expand testing coverage to improve code quality and reliability.

---
