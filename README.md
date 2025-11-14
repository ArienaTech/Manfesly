# Manifestly

> **Rewire your mind. Redesign your reality.**

Manifestly is a science-meets-manifestation platform that helps users rewire their emotional, attentional, and belief systems through daily Neuro-Flow™ sessions. Built with React, TypeScript, Supabase, and OpenAI.

![Manifestly](https://img.shields.io/badge/Status-MVP-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)

## 🧠 Core Features

### ✅ Implemented
- **Landing Page** - Clean hero section with authentication CTAs
- **Authentication** - Email/password and Google OAuth via Supabase
- **Daily Neuro-Flow™ Sessions**
  - Emotion check-in slider (1-10 scale)
  - AI-generated personalized prompts (OpenAI GPT-4)
  - Guided reflection and journaling
- **Dashboard**
  - Past sessions history
  - Emotional progress chart (Recharts)
  - Streak counter for daily sessions
  - Beautiful stats cards
- **Shareable Cards** - Export session insights as beautiful images
- **Guest Mode** - Try a free session without creating an account
- **Profile Management** - Customize name and intention

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase-schema.sql`

This will create:
- `users` table
- `sessions` table
- Row Level Security policies
- Necessary indexes

### 4. Configure Google OAuth (Optional)

1. In Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URL: `your-app-url`

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5000`

### 6. Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
manifestly/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Slider.tsx
│   │   ├── Modal.tsx
│   │   ├── AuthModal.tsx
│   │   └── ShareCard.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                 # Utilities and configs
│   │   ├── supabase.ts
│   │   ├── openai.ts
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── NeuroFlow.tsx
│   │   ├── Profile.tsx
│   │   └── GuestSession.tsx
│   ├── types/               # TypeScript definitions
│   │   └── database.ts
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── supabase-schema.sql      # Database schema
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Green spectrum (#22c55e)
- **Secondary**: Lavender spectrum (#a855f7)
- **Background**: Soft gradient (light green → lavender)

### Typography
- **Font**: Montserrat
- **Weights**: 300, 400, 500, 600, 700

### Components
- Rounded cards with glassmorphism
- Smooth transitions (300ms ease-in-out)
- Soft shadows and borders
- Mobile-responsive design

## 📊 Database Schema

### users
```sql
id          UUID (PK, references auth.users)
email       TEXT (NOT NULL, UNIQUE)
name        TEXT
intention   TEXT
created_at  TIMESTAMP
```

### sessions
```sql
id             UUID (PK)
user_id        UUID (FK → users.id)
emotion_score  INTEGER (1-10)
prompt         TEXT (NOT NULL)
reflection     TEXT
created_at     TIMESTAMP
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Supabase Auth handles authentication
- Environment variables for sensitive keys

## 🌟 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4 Turbo
- **Charts**: Recharts
- **Routing**: React Router v6
- **Image Export**: html-to-image
- **Build Tool**: Vite

## 📝 How It Works

### Neuro-Flow™ Session

1. **Check In**: User rates their current emotional state (1-10)
2. **AI Prompt**: OpenAI generates a personalized reflection prompt based on:
   - Current emotion score
   - Past session patterns
   - User's intention (if set)
3. **Reflection**: User journals their thoughts (2-5 minutes)
4. **Save**: Session is saved to Supabase
5. **Track**: Progress is visualized on dashboard

### Streak Calculation

- Tracks consecutive days with at least one session
- Calculates from most recent session backwards
- Updates in real-time on dashboard

## 🚢 Deployment

### Netlify / Vercel

1. Connect your Git repository
2. Set environment variables in dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

### Environment Variables to Set
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENAI_API_KEY`

## 🤝 Contributing

This is an MVP. Future enhancements could include:
- Daily email reminders (Supabase Edge Functions)
- Mood patterns analysis
- Community features
- Mobile app (React Native)
- More AI models and customization

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

Built with:
- [Supabase](https://supabase.com) - Backend & Auth
- [OpenAI](https://openai.com) - AI Prompts
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Data Visualization

---

**Made with 💚 for transformation and growth**
