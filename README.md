# 🌊 Data Nile

<div align="center">

**A full-stack React application with QR code generation, drag-and-drop uploads, and a Firebase + Express backend**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material--UI-6.4-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 Live Demo](https://data-nile.vercel.app)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [License](#-license)
- [Author](#-author)

---

## 🔍 Overview

**Data Nile** is a full-stack JavaScript application built around a React + Material-UI frontend and an Express + Firebase backend. It provides QR code generation, drag-and-drop file upload, and a polished UX powered by SweetAlert2 dialogs.

## ✨ Features

- 📷 **QR code generation** with `qrcode.react`
- 📤 **Drag-and-drop file upload** via `react-dropzone`
- 🎨 **Material-UI 6** design system with FontAwesome and React Icons
- 🍭 **SweetAlert2** for elegant alerts and dialogs
- 🔥 **Firebase 11** integration for auth and storage
- 🌐 **Express REST API** backend
- 🧭 **Client-side routing** with React Router 6

## 🛠️ Tech Stack

**Frontend**
- React 18, React Router 6
- Material-UI 6 (`@mui/material`, `@mui/icons-material`)
- Axios for HTTP
- SweetAlert2 for dialogs
- qrcode.react, react-dropzone, react-icons, FontAwesome

**Backend**
- Node.js + Express 4
- Firebase 11 (Auth & Firestore)
- CORS middleware

**Tooling**
- Create React App (react-scripts 5)
- Testing Library (Jest, React Testing Library)
- Web Vitals

## 📂 Project Structure

```
Data_Nile/
├── my-app/         # React frontend (CRA)
│   ├── src/
│   ├── public/
│   └── package.json
├── My-Backend/     # Express server
│   └── package.json
├── data nile-plan/ # Project planning notes
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project

### Installation

```bash
git clone https://github.com/Bassel610/Data_Nile.git
cd Data_Nile
```

**Run the frontend:**

```bash
cd my-app
npm install
npm start            # http://localhost:3000
```

**Run the backend (in a second terminal):**

```bash
cd My-Backend
npm install
npm start
```

### Environment Variables

Create a `.env` file inside `my-app/` with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

## 📜 Available Scripts

Inside `my-app/`:

| Script | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build |
| `npm test` | Run the test suite |
| `npm run eject` | Eject from CRA (⚠️ irreversible) |

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

## 👤 Author

**Basel Sherif** — Front-end Developer

- 🐙 GitHub: [@Bassel610](https://github.com/Bassel610)
- 💼 LinkedIn: [basel-sherif-68330a217](https://www.linkedin.com/in/basel-sherif-68330a217)
- 📧 Email: [baselsherif9@gmail.com](mailto:baselsherif9@gmail.com)

---

<div align="center">

⭐ If you found this project useful, please consider giving it a star!

</div>
