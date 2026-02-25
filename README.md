## 💰 Expense Tracker — MERN Stack Web Application

A full-stack **Expense Tracker** application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
This app allows users to track daily expenses and monitor spending patterns through a clean and responsive interface.

The project focuses on building a complete CRUD-based system with proper data flow between the frontend and backend.

## ✨ Features

- Add and delete expense entries
- View expense history and totals
- Persistent data storage using MongoDB
- Responsive UI for desktop and mobile devices

## 🛠 Tech Stack

**Frontend**

- **React** — component-based UI and state management
- **CSS** — styling and responsive design

**Backend**

- **Node.js** — server runtime
- **Express.js** — REST API and routing
- **MongoDB** — NoSQL database for storing data

## 📌 What I Learned

- Designing RESTful APIs
- Managing frontend and backend communication
- Implementing CRUD operations with MongoDB
- Structuring a full-stack application
- Handling application state and asynchronous data flows

## ▶️ How to Run the Project

This project requires **Node.js** and **MongoDB**. **Yarn** is used as the package manager for this project.

Here are the instructions to run this project locally:

1. Visit the source code repository on <LinkBlank href="https://github.com/smsh119/Expense_Tracker">GitHub</LinkBlank>
2. Clone the repository
3. Install server dependencies. Open "Back_End" folder in a terminal window and execute this command:

```bash
yarn install
```

4. Configure server environment variables

```bash
# Create a .env file in the root of the server directory.
# Add these variables with valid values in .env file.

SALT_ROUNDS = #Add a Salt Round value such as 10
JWT_SECRET_KEY = #Add a JWT secret key such as "jwt_secret"
```

5. To run the server, execute this command:

```bash
yarn start
```

6. Install client dependencies. Open "Expense_Tracker_FE" folder in another terminal window and execute this command:

```bash
yarn install
```

7. Configure client environment variables

```bash
# Create a .env file in the root of the client directory.
# Add these variables with valid values in .env file.

VITE_BE_URL = #Add your server URL here
```

8. To run the client, execute this command:

```bash
yarn dev
```

Please reach out to me if there is any difficulty in starting this project.

## 🕒 Timeline

- **Decemeber 2023:** - Developed the application using MERN (MongoDB, Express, React, Node.js) stack.
- **February 2026:** - Updated UI, imporved responsiveness, and fixed bugs for representational purposes.

## 🎯 Purpose

This project was created to:

- Gain hands-on experience with full-stack development
- Understand real-world data flow in web applications
- Practice building scalable and maintainable systems
- Strengthen knowledge of the MERN ecosystem

## 🔗 Live Demo

[View the live demo](https://expense-tracker.suzatsmsh.cloud)

> A practice full-stack project focused on real-world expense management and data handling.

