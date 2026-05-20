# 🚀 SocialPulse — Social Media Analytics Dashboard

A full-stack Social Media Analytics Dashboard that fetches and analyzes GitHub statistics in real-time, with Google Authentication, AI Pulse Score, and cloud deployment on AWS EC2.

> ⚠️ **Best experienced on Laptop/Desktop** — Mobile support coming soon!

---

## 🔗 Live Links

| Platform | URL |
|---|---|
| 🌐 Frontend (Vercel) | https://socialpulsedashboard.vercel.app |
| 🖥️ Backend (AWS EC2) | http://13.233.97.252 |
| 🐙 GitHub Repo | https://github.com/Rodevops07/socialpulsedashboard |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express |
| Authentication | Firebase Google OAuth |
| API | GitHub REST API |
| Containerization | Docker + Docker Compose |
| Cloud | AWS EC2 (ap-south-1, Mumbai) |
| CI/CD | GitHub Actions |
| Deployment | Vercel (Frontend) + AWS EC2 (Backend) |

---

## 📊 Features

- ✅ Real-time GitHub API integration — fetch user statistics
- ✅ Interactive dashboard with animated charts and metrics
- ✅ Firebase Google OAuth — secure user login
- ✅ AI Pulse Score calculation algorithm
- ✅ Docker containerized — frontend & backend both
- ✅ Automated CI/CD pipeline via GitHub Actions

---

## 📁 Project Structure

```
socialpulsedashboard/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── firebase.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   └── Explorer.js
│   │   └── components/
│   │       ├── StatCard.js
│   │       ├── RepoCard.js
│   │       └── AuthPortal.js
│   ├── vercel.json
│   └── Dockerfile
├── backend/
│   ├── server.js
│   ├── routes/socialRoutes.js
│   ├── controllers/socialController.js
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/deploy.yml
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- Docker + Docker Compose
- Firebase project (Google OAuth enabled)

### 1. Clone the repo

```bash
git clone https://github.com/Rodevops07/socialpulsedashboard.git
cd socialpulsedashboard
```

### 2. Setup Frontend

```bash
cd frontend
cp .env.example .env
# Add your Firebase config in .env
npm install
npm start
```

### 3. Setup Backend

```bash
cd backend
npm install
node server.js
```

### 4. Run with Docker

```bash
docker-compose up -d
```

Frontend runs on `http://localhost:80`
Backend runs on `http://localhost:8080`

---

## ☁️ AWS EC2 Deployment

```bash
# SSH into EC2
ssh -i ~/Downloads/yotube24-key.pem ec2-user@13.233.97.252

# Start containers
cd Capstone
docker-compose up -d
```

---

## ⚙️ CI/CD — GitHub Actions

Auto-deploys to AWS EC2 on every push to `main` branch.

Secrets required in GitHub:
| Secret | Value |
|---|---|
| `EC2_HOST` | `13.233.97.252` |
| `EC2_USERNAME` | `ec2-user` |
| `EC2_KEY` | Private key content (.pem) |

---

## 🔧 Environment Variables

### Frontend `.env`
```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_API_URL=
```

### Backend `.env`
```
PORT=8080
```

---

## 👨‍💻 Developer

**Rohit Pujari**
- GitHub: [@Rodevops07](https://github.com/Rodevops07)
- Live Project: [socialpulsedashboard.vercel.app](https://socialpulsedashboard.vercel.app)

---

## 📄 License

MIT License — feel free to use and modify!
