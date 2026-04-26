# AlgoSensei 🧠

**AI-Powered Algorithmic Mastery Platform**

AlgoSensei is a next-generation coding practice platform that combines LeetCode-style problem solving with AI-powered assistance, real-time emotion tracking, and voice interaction. Master data structures and algorithms with personalized guidance from your AI sensei.

---

## ✨ Features

### 🎯 Core Features
- **150+ Curated Problems**: Across 10+ categories (Arrays, DP, Graphs, Trees, etc.)
- **Multi-Language Support**: Python, JavaScript, Java, C++, Go
- **Monaco Code Editor**: Professional coding environment with syntax highlighting
- **Real-Time Test Execution**: Instant feedback with detailed test case results
- **Progress Tracking**: Personal dashboard with stats, streaks, and achievements

### 🤖 AI-Powered Features
- **VIPER AI Assistant**: Real-time coding help using Google Gemini
- **Code Watch**: AI monitors your code for anti-patterns and provides live suggestions
- **Voice Interface**: Hands-free interaction with speech recognition and synthesis
- **Smart Hints**: Context-aware problem-solving guidance

### 📊 Analytics & Tracking
- **Confidence Camera**: ML-powered emotion and focus detection using MediaPipe
- **Dynamic Stats**: Skill radar charts and performance metrics
- **Profile System**: Customizable avatars and bio

### 🎨 Modern UI/UX
- **Glassmorphic Design**: Sleek, matte-black theme with premium aesthetics
- **Responsive Layout**: Optimized for desktop and mobile
- **Smooth Animations**: Framer Motion for fluid transitions
- **Victory Effects**: Confetti celebrations on problem completion

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for authentication & database)
- Google AI Studio API key (for Gemini AI)
- Groq API key (for alternative AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/VENOMRK22/algoSensei.git
cd algoSensei

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Keys
GOOGLE_AI_STUDIO_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Git Version (optional)
NEXT_PUBLIC_GIT_COMMIT=your_commit_hash
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
algoSensei/
├── src/
│   ├── app/              # Next.js 15 app router
│   │   ├── api/          # API routes (AI, code execution)
│   │   ├── dashboard/    # Main dashboard
│   │   ├── profile/      # User profile
│   │   ├── translator/   # Code translator
│   │   └── workspace/    # Coding workspace
│   ├── components/       # React components
│   │   ├── profile/      # Profile components (stats, radar)
│   │   └── workspace/    # Editor, console, AI assistant
│   ├── data/             # Problem datasets (arrays, graphs, etc.)
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities (Firebase, AI clients)
├── public/               # Static assets
└── scripts/              # Seed scripts
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Editor**: Monaco Editor

### Backend & Services
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Gemini 2.0, Groq
- **ML Vision**: MediaPipe Tasks Vision
- **Speech**: Web Speech API

### Development
- **Linting**: ESLint
- **Package Manager**: npm
- **Version Control**: Git

---

## 🎮 Usage

### 1. **Dashboard**
Browse problem categories, view your stats, and track progress

### 2. **Workspace**
- Select a problem from Navigator
- Write code in Monaco Editor
- Run test cases or submit for full evaluation
- Get AI assistance with VIPER or Code Watch

### 3. **Profile**
- Customize your avatar and bio
- View skill radar and performance metrics
- Track solved problems and streaks

### 4. **Voice Control**
Use voice commands to interact with VIPER AI (requires HTTPS)

---

## 📊 Problem Categories

1. Arrays & Hashing
2. Two Pointers
3. Sliding Window
4. Binary Search
5. Linked Lists
6. Trees
7. Graphs
8. Dynamic Programming (1D & 2D)
9. Greedy Algorithms
10. Backtracking & Recursion

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 4BITS

---

## 🙏 Acknowledgments

- LeetCode for problem inspiration
- Google for Gemini AI and MediaPipe
- Monaco Editor team
- Next.js and Vercel teams

---

## 📞 Contact

**Developer**: VENOMRK22  
**GitHub**: [@VENOMRK22](https://github.com/VENOMRK22)  
**Repository**: [algoSensei](https://github.com/VENOMRK22/algoSensei)

---

**Built with ❤️ for algorithmic excellence**
