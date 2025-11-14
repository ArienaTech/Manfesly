# 🚀 Get Started with Manifestly

Welcome! Your complete web app is ready. Here's how to get it running:

## ⚡ Super Quick Start (5 Minutes)

### Step 1: Install
```bash
npm install
```

### Step 2: Add Environment Variables
Create a `.env` file in the project root:
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **Don't have these yet?** See `SETUP_GUIDE.md` for how to get them (takes 10 min)

### Step 3: Run!
```bash
npm run dev
```

Open `http://localhost:5000` 🎉

---

## 📖 Documentation

| File | What It's For |
|------|--------------|
| `QUICKSTART.md` | Quick reference guide |
| `SETUP_GUIDE.md` | Complete setup instructions |
| `README.md` | Full project documentation |
| `PROJECT_SUMMARY.md` | Build status & features |

---

## 🎯 What You Can Do

### Without Environment Variables
- ✅ View the landing page
- ✅ See the design and UI
- ✅ Explore component structure

### With Environment Variables
- ✅ Full authentication
- ✅ Create sessions
- ✅ AI-generated prompts
- ✅ Track progress
- ✅ Everything!

---

## 🆘 Quick Troubleshooting

**App won't start?**
- Run `npm install` first
- Check Node.js version (18+)

**"Missing environment variables" warning?**
- Create `.env` file (see Step 2 above)
- Restart dev server after adding `.env`

**Need help with setup?**
- Read `SETUP_GUIDE.md`
- All steps explained in detail

---

## 📁 Project Structure

```
src/
├── components/    # UI components (Button, Card, etc.)
├── pages/         # App pages (Landing, Dashboard, etc.)
├── contexts/      # React contexts (Auth)
├── lib/          # Supabase, OpenAI, utilities
└── types/        # TypeScript types
```

---

## 🎨 Features Included

✅ Landing page with auth  
✅ Email + Google login  
✅ Daily AI sessions  
✅ Progress dashboard  
✅ Streak tracking  
✅ Share cards  
✅ Guest mode  
✅ Profile settings  

---

## 🚢 Ready to Deploy?

```bash
npm run build
```

Output folder: `dist/`

Deploy to: Netlify, Vercel, Cloudflare Pages, etc.

---

## 💡 Tips

1. **Test guest mode first**: Visit `/guest` to try without setup
2. **Read the guides**: Everything is documented
3. **Customize**: Edit colors in `tailwind.config.js`

---

**Need detailed setup?** → Read `SETUP_GUIDE.md`  
**Want to understand the code?** → Read `README.md`  
**Quick reference?** → Read `QUICKSTART.md`

---

**Happy manifesting! 🌟**
