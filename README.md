# E-commerce Shop-Hub

## 📋 Project Overview
A full-stack e-commerce application built with Firebase and React for online shopping with user authentication, product browsing, cart management, and payment processing via Chapa (Ethiopian payment gateway).

## 🛠 Tech Stack

**Frontend:**
- React 19 + Next.js 16
- React Router 7
- Material-UI (MUI 9) & Tailwind CSS 4
- Axios & React Icons

**Backend:**
- Firebase Cloud Functions
- Express.js
- Chapa Payment Integration

**Database & Auth:**
- Firebase Authentication
- Firestore Database

## 📦 Requirements

- **Node.js** v16+ & npm/yarn
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Environment Variables:**
  - `CHAPA_SECRET_KEY` - Chapa payment API key
  - Firebase config credentials

## 🚀 How to Run

### 1. Clone & Install
```bash
git clone <repo-url>
cd E-commerce
npm install
cd client && npm install && cd ..
cd functions && npm install && cd ..
```

### 2. Setup Environment
Create `.env` in the `functions/` folder:
```
CHAPA_SECRET_KEY=your_chapa_secret_key
```

### 3. Run Frontend (Development)
```bash
cd client
npm start
```
Runs on `http://localhost:3000`

### 4. Run Backend (Firebase Functions - Local)
```bash
firebase emulators:start
```
Or deploy to Firebase:
```bash
firebase deploy
```

### 5. Deploy to Firebase
```bash
npm run build  # Build client
firebase deploy
```

## 📁 Project Structure
```
client/          - React frontend app
functions/       - Express.js Firebase Cloud Functions
firebase.json    - Firebase configuration
```
Tailwind CSS 4 - Utility-first styling
Axios - HTTP client
React Icons & Carousel - UI enhancements
React Spinners - Loading indicato

GROUP MEMBERS:-ABEL WENDEMAGEGN
              -ABLANTE MEGBARU
              -FELMETA BERSISA
              -GERSAM SILESHI