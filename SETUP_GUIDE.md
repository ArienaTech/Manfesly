# Manifestly Setup Guide

This guide will walk you through setting up Manifestly from scratch.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New project"
5. Fill in:
   - **Name**: manifestly
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to you
6. Click "Create new project" and wait ~2 minutes

### 2.2 Get Your Supabase Credentials

1. In your project dashboard, click the **Settings** gear icon (bottom left)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** → This is your `VITE_SUPABASE_URL`
   - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`

### 2.3 Set Up the Database

1. Click **SQL Editor** in the sidebar
2. Click **New query**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click **Run**
6. You should see "Success. No rows returned"

### 2.4 Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if needed
6. Application type: **Web application**
7. Add authorized redirect URI:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
8. Copy **Client ID** and **Client Secret**
9. Back in Supabase:
   - Go to **Authentication** → **Providers**
   - Find **Google** and toggle it on
   - Paste your Client ID and Secret
   - Click **Save**

## Step 3: Set Up OpenAI

### 3.1 Get Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Click your profile icon (top right)
4. Select **View API keys**
5. Click **Create new secret key**
6. Give it a name (e.g., "Manifestly")
7. Copy the key (you won't see it again!)
8. This is your `VITE_OPENAI_API_KEY`

### 3.2 Add Billing (Required)

1. Go to **Settings** → **Billing**
2. Add a payment method
3. Set up usage limits if desired

**Note**: GPT-4 Turbo costs ~$0.01 per prompt. For 100 users doing 1 session/day, that's ~$1/day.

## Step 4: Configure Environment Variables

1. In the root of the project, create a `.env` file
2. Add your credentials:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_OPENAI_API_KEY=sk-your-openai-key-here
```

3. Save the file

**Important**: Never commit `.env` to Git! It's already in `.gitignore`.

## Step 5: Run the App

```bash
npm run dev
```

Visit `http://localhost:5000` in your browser.

## Step 6: Test the App

### Test Guest Mode
1. Go to homepage
2. Click "Try Guest Session" (you'll need to add this button)
3. Complete a session without signing in

### Test Sign Up
1. Click "Start Free Session"
2. Toggle to "Sign up"
3. Enter email and password
4. Click "Sign Up"

### Test Neuro-Flow Session
1. Click "Start Session"
2. Move the emotion slider
3. Click "Continue" to generate prompt
4. Write a reflection
5. Click "Complete Session"

### Test Dashboard
1. View your stats
2. Check the emotional progress chart
3. See your past sessions
4. Click "Share" to download a session card

## Troubleshooting

### "Missing Supabase environment variables"
- Check that `.env` file exists
- Check variable names match exactly
- Restart dev server after creating `.env`

### OpenAI errors
- Verify API key is correct
- Ensure billing is set up
- Check usage limits

### Google OAuth not working
- Verify redirect URI matches exactly
- Check client ID and secret are correct
- Make sure Google provider is enabled in Supabase

### Database errors
- Verify SQL schema was run successfully
- Check RLS policies are enabled
- Ensure user is authenticated

## Next Steps

### Deploy to Production

**Recommended**: Netlify or Vercel

1. Push code to GitHub
2. Connect to Netlify/Vercel
3. Add environment variables in dashboard
4. Deploy!

### Customize

- Edit colors in `tailwind.config.js`
- Change fonts in `index.html`
- Modify AI prompts in `src/lib/openai.ts`
- Add more features!

## Getting Help

- Check [Supabase docs](https://supabase.com/docs)
- Check [OpenAI docs](https://platform.openai.com/docs)
- Review React/TypeScript error messages carefully

---

**You're all set! Happy manifesting! 🎉**
