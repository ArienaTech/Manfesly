# Manifestly - Quick Start

## 🎯 What You Just Built

A complete web app called **Manifestly** - a science-meets-manifestation platform with:

✅ Beautiful landing page  
✅ Full authentication (email + Google OAuth)  
✅ AI-powered daily sessions (OpenAI GPT-4)  
✅ Emotional tracking with charts  
✅ Streak counter  
✅ Shareable session cards  
✅ Guest mode  
✅ Profile management  

## 🚀 Get Started in 3 Steps

### 1. Set Up Environment Variables

Create a `.env` file:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 2. Set Up Supabase Database

Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor.

### 3. Start the App

```bash
npm run dev
```

Visit `http://localhost:5000`

## 📚 Detailed Setup

See `SETUP_GUIDE.md` for complete step-by-step instructions including:
- Creating a Supabase project
- Getting OpenAI API key
- Configuring Google OAuth
- Deploying to production

## 🎨 Features Overview

### For Users
- **Landing Page** (`/`) - Marketing site with auth
- **Guest Session** (`/guest`) - Try without signing up
- **Dashboard** (`/dashboard`) - View progress and stats
- **Session** (`/session`) - Complete Neuro-Flow™ session
- **Profile** (`/profile`) - Manage account settings

### Tech Stack
- React 18 + TypeScript
- Tailwind CSS (custom design system)
- Supabase (database + auth)
- OpenAI GPT-4 Turbo
- Recharts (data visualization)
- React Router v6

## 📁 Project Structure

```
src/
├── components/       # UI components (Button, Card, etc.)
├── contexts/        # AuthContext
├── lib/            # Supabase, OpenAI, utilities
├── pages/          # Landing, Dashboard, etc.
├── types/          # TypeScript types
└── App.tsx         # Routes
```

## 🎨 Design System

**Colors:**
- Primary: Green (#22c55e)
- Secondary: Lavender (#a855f7)
- Background: Soft gradient

**Features:**
- Montserrat font
- Glassmorphism effects
- Rounded corners (2xl, 3xl)
- Smooth transitions (300ms)
- Mobile responsive

## 🔐 Environment Variables Needed

| Variable | Where to Get It |
|----------|----------------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `VITE_OPENAI_API_KEY` | OpenAI Platform → API Keys |

## 📊 Database Tables

### users
- id, email, name, intention, created_at

### sessions
- id, user_id, emotion_score, prompt, reflection, created_at

## 🚢 Deploy

### Netlify
```bash
npm run build
```
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables

### Vercel
- Same as Netlify
- Auto-detects Vite config

## 🧪 Test Locally

1. **Guest mode**: Go to `/guest`
2. **Sign up**: Create account
3. **Complete session**: Emotion → Prompt → Reflection
4. **View dashboard**: Charts, stats, past sessions
5. **Share**: Download session card

## ⚡ Scripts

```bash
npm run dev      # Start dev server (port 5000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Common Issues

**"Missing Supabase environment variables"**
- Create `.env` file in root
- Restart dev server

**OpenAI errors**
- Add billing to OpenAI account
- Verify API key is correct

**Google OAuth not working**
- Configure in Supabase dashboard
- Add correct redirect URI

## 🎯 Next Steps

1. **Customize design**: Edit `tailwind.config.js`
2. **Add features**: Email reminders, community, etc.
3. **Improve AI**: Fine-tune prompts in `src/lib/openai.ts`
4. **Analytics**: Add Mixpanel/PostHog
5. **Mobile app**: React Native version

## 📖 Documentation

- Full setup: `SETUP_GUIDE.md`
- Architecture: `README.md`
- Database schema: `supabase-schema.sql`

---

**Ready to manifest! 🌟**

Need help? Check `SETUP_GUIDE.md` for detailed instructions.
