# 🔴 CRITICAL ISSUE FOUND: Database Tables Missing

## Root Cause
The application loads but fails during authentication initialization because the Supabase database tables have NOT been created.

## Error Details
```
ERROR: Could not find the table 'public.users' in the schema cache PGRST205
```

This happens when the `AuthContext` tries to:
1. Check for existing session
2. Fetch user profile from `users` table
3. Table doesn't exist → Error → App hangs/fails to load

## ✅ Solution: Create Database Schema

### Step 1: Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project: `uoxcavoznrhgltlsojfu`

### Step 2: Run SQL Schema
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the ENTIRE content from `/workspace/supabase-schema.sql` (shown below)
4. Paste it into the SQL editor
5. Click **RUN** button

### Database Schema to Execute:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  intention TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emotion_score INTEGER NOT NULL CHECK (emotion_score >= 1 AND emotion_score <= 10),
  prompt TEXT NOT NULL,
  reflection TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_created_at_idx ON sessions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON users FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Sessions table policies
CREATE POLICY "Users can view own sessions" 
  ON sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" 
  ON sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" 
  ON sessions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" 
  ON sessions FOR DELETE 
  USING (auth.uid() = user_id);
```

### Step 3: Verify Tables Created
After running the SQL, verify in Supabase Dashboard:
1. Go to **Table Editor** in left sidebar
2. You should see 2 new tables:
   - `users`
   - `sessions`

### Step 4: Reload the App
Once the database schema is created:
```bash
# The dev server is already running at http://localhost:5000
# Just refresh your browser!
```

## Why This Happened
- The app code and configuration are correct
- Dev server starts fine
- But authentication fails silently when it can't find the database tables
- This causes the app to show loading state forever or display blank screen

## After Database Setup
The app will work fully:
- ✅ Landing page loads
- ✅ Sign up / Sign in works
- ✅ Dashboard shows session history
- ✅ Neuro-Flow sessions save to database
- ✅ Profile management works

---

**NEXT STEP**: Go to Supabase Dashboard and run the SQL schema!
