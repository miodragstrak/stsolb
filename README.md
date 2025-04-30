# 🔥 Solana Validator Dashboard

A lightweight Solana validator analytics dashboard that visualizes account activity, validator stability, and staking performance.

## ✨ Features

- Validator account insights (Epoch credits, Delta, Owner info)
- APY & strategy visualization
- Clean, responsive UI
- Express + Vite + React stack

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/miodragstrak/stsolb.git
cd solana-validator-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` and rename to `.env`:

```bash
cp .env.example .env
```

You can modify the port if needed (default is `5000`).

### 4. Run the app

```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

---

## 📦 Build for production

To generate the production build of the frontend:

```bash
npm run build
```

To serve only the backend:

```bash
npm start
```

---

## 📁 Project structure

```
client/      # Vite + React frontend
server/      # Express backend
.env         # Your environment variables
```

---

## 🛠 Tech stack

- React + Vite
- Express.js
- Solana Web3.js
- Axios
- Tailwind CSS
- Recharts

---

## 📄 License

MIT