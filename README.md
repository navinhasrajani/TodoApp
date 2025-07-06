# TodoApp

A full-stack Todo App with user authentication and CRUD functionality using **Node.js**, **Express**, **MongoDB**, and **React**.

---

## 📁 Project Structure

# TODOAPP/
```
├── TodoBackend/ # Node.js + Express + MongoDB
├── TodoFrontend/ # React (Frontend)
```

---

## 🚀 Features

- User Registration & Login (with JWT)
- Create, Read, Update, Delete Todos
- Token-based route protection
- MongoDB for persistent storage
- RESTful API structure

---

## ⚙️ Backend Setup

1. Navigate to backend directory:

```bash
cd TodoBackend
```
2. Install dependencies:
```
npm install
```

3. Create a .env file and add:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```
npm start
```