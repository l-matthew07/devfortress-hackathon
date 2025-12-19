# Athena Smart Merchant Assistant

A Shopify embedded app that lets merchants ask natural-language questions about their store and receive AI-generated insights and recommendations powered by Athena AI.

## 🎯 Features

- ✅ Chat-style interface for asking questions
- ✅ AI-powered insights using Athena AI (OpenAI-compatible)
- ✅ Real-time store data analysis (currently using mock data)
- ✅ Clean, demo-friendly UI built with Shopify Polaris
- ✅ Structured responses with insights, explanations, and actionable recommendations

## 🏗️ Tech Stack

- **Frontend**: React + Shopify Polaris UI
- **Backend**: Node.js + Express
- **AI**: Athena AI API (OpenAI-compatible)
- **Shopify**: Admin API (or mocked data for demo)

## 📁 Project Structure

```
.
├── backend/
│   ├── server/
│   │   ├── index.js              # Express server
│   │   ├── routes/
│   │   │   └── askAthena.js      # API route for /ask-athena
│   │   └── services/
│   │       ├── shopifyService.js # Store data service (mock/real)
│   │       └── athenaService.js  # Athena AI integration
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── App.css               # Styles
│   │   └── index.js              # React entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Athena AI API key (or OpenAI API key)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=3001
NODE_ENV=development

# Athena AI API Configuration
ATHENA_API_URL=https://api.openai.com/v1/chat/completions
ATHENA_API_KEY=your_athena_api_key_here
# Or use OPENAI_API_KEY instead
# OPENAI_API_KEY=your_openai_api_key_here
ATHENA_MODEL=gpt-4
```

4. Start the backend server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend API will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory (optional, defaults to localhost:3001):
```env
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### POST `/api/ask-athena`

Ask Athena a question about the store.

**Request:**
```json
{
  "question": "Why did my sales drop today?"
}
```

**Response:**
```json
{
  "success": true,
  "question": "Why did my sales drop today?",
  "response": {
    "insight": "Your sales today are $543.87 from 12 orders, which is below average.",
    "explanation": "The drop could be attributed to various factors including marketing campaign timing, product availability, or seasonal trends.",
    "action": "Review your marketing campaigns and consider running a limited-time promotion to boost sales."
  }
}
```

## 🎨 UI Components

The app features a clean chat interface with:

- **Header**: "Athena Smart Merchant Assistant" title
- **Chat History**: Displays previous questions and responses
- **Response Sections**:
  - 🧠 **Insight**: Quick summary
  - 📊 **Explanation**: Detailed analysis
  - ⚡ **Recommended Action**: Actionable next step
- **Input Field**: Multi-line text input for questions
- **Send Button**: Submit questions to Athena

## 🔧 Configuration

### Mock Data

The app currently uses mock store data for demo purposes. The mock data includes:
- 5 sample products with prices and inventory
- Daily order statistics
- Revenue metrics
- Abandoned cart count
- Low stock alerts

To use real Shopify data, update `backend/server/services/shopifyService.js` to call the Shopify Admin API.

### AI Fallback

If the Athena AI API is unavailable or not configured, the app will use rule-based fallback responses based on the question keywords. This ensures the demo works even without API credentials.

## 🎯 Example Questions

Try asking Athena:
- "Why did my sales drop today?"
- "What should I do about low inventory?"
- "How many abandoned carts do I have?"
- "Which products are selling best?"
- "What's my revenue today?"

## 📝 Notes for Hackathon

- **Authentication**: Not implemented (focus on core functionality)
- **Billing**: Not implemented
- **Webhooks**: Not implemented
- **Deep Analytics**: Not implemented (basic insights only)
- **Historical Charts**: Not implemented

## 🔐 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `ATHENA_API_URL`: Athena/OpenAI API endpoint
- `ATHENA_API_KEY` or `OPENAI_API_KEY`: API key for AI service
- `ATHENA_MODEL`: Model to use (default: gpt-4)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001/api)

## 📄 License

MIT

## 🤝 Contributing

This is a hackathon project. Contributions welcome!