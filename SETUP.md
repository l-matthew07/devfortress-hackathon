# Quick Setup Guide

## 🚀 Fast Setup (2 terminals)

### Terminal 1 - Backend
```bash
cd backend
npm install
# Create .env file with your API key
echo "ATHENA_API_KEY=your_key_here" > .env
echo "PORT=3001" >> .env
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

That's it! Open http://localhost:3000 in your browser.

## 📝 Environment Setup

### Backend `.env` file
Create `backend/.env`:
```env
PORT=3001
NODE_ENV=development
ATHENA_API_KEY=your_athena_or_openai_api_key
ATHENA_MODEL=gpt-4
```

**Note**: If you don't have an API key, the app will use fallback responses based on question keywords.

### Frontend `.env` file (optional)
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## ✅ Verify It Works

1. Backend running on port 3001
2. Frontend running on port 3000
3. Open browser to http://localhost:3000
4. Try asking: "Why did my sales drop today?"

## 🐛 Troubleshooting

**Backend won't start:**
- Check if port 3001 is available
- Ensure Node.js 16+ is installed
- Run `npm install` in backend directory

**Frontend won't start:**
- Check if port 3000 is available
- Ensure Node.js 16+ is installed
- Run `npm install` in frontend directory

**No AI responses:**
- Check your API key in backend/.env
- Without API key, fallback responses will be used (works for demo)
- Check backend console for errors
