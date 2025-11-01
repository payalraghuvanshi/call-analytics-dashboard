# 🚀 Quick Setup Guide

## Step-by-Step Supabase Setup

### 1. Create a Supabase Project

1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign in with GitHub (or create an account)
4. Click "New Project"
5. Fill in the details:
   - **Name**: call-analytics (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
6. Click "Create new project" (this takes ~2 minutes)

### 2. Get Your API Credentials

1. Once the project is created, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: Copy this (e.g., https://xxxxx.supabase.co)
   - **Project API keys** → **anon public**: Copy this key
4. Keep these safe - you'll need them in a moment!

### 3. Create the Database Table

1. In Supabase, click **SQL Editor** in the sidebar
2. Click **New query**
3. Copy and paste this SQL:

```sql
-- Create the call_analytics table
CREATE TABLE call_analytics (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hourly_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index for faster lookups
CREATE INDEX idx_call_analytics_email ON call_analytics(email);

-- Enable Row Level Security
ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (for development)
CREATE POLICY "Enable all operations for all users" ON call_analytics
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **Run** or press `Ctrl+Enter`
5. You should see "Success. No rows returned"

### 4. Configure Your App

1. In your project folder, create a `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your_project_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
   ```

2. Replace `your_project_url_here` with the URL you copied in Step 2
3. Replace `your_anon_key_here` with the anon key you copied in Step 2

**Example:**
```
REACT_APP_SUPABASE_URL=https://abcdefghijk.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Verify Your Setup

1. Start your app:
   ```bash
   npm start
   ```

2. Open http://localhost:3000

3. Click the "Edit Data" button

4. Enter your email when prompted

5. Modify some values and click "Save Changes"

6. Go back to Supabase → **Table Editor** → **call_analytics**

7. You should see your data saved there! 🎉

### 6. Verify Data Persistence

1. Close and reopen the app
2. Your email should be remembered
3. Click "Edit Data" again
4. Try to save new values
5. You should see a warning about overwriting existing data

**Success!** Your app is now fully functional with persistent storage.

## 🌐 Deploy to Production

### Option 1: Vercel (Easiest)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to https://vercel.com/

3. Click "New Project"

4. Import your GitHub repository

5. In "Environment Variables", add:
   - `REACT_APP_SUPABASE_URL`: Your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

7. Wait 2-3 minutes and your site will be live! 🚀

### Option 2: Netlify

1. Go to https://netlify.com/

2. Click "Add new site" → "Import an existing project"

3. Connect to GitHub and select your repository

4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

5. Click "Show advanced" → "New variable"

6. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

7. Click "Deploy site"

## 🔒 Production Security (Optional but Recommended)

For production apps, you should implement proper authentication:

1. In Supabase, enable Email/Password authentication:
   - Go to **Authentication** → **Providers**
   - Enable "Email"

2. Update the RLS policy:
```sql
-- Remove the permissive policy
DROP POLICY "Enable all operations for all users" ON call_analytics;

-- Create a more secure policy
CREATE POLICY "Users can only access their own data" ON call_analytics
  FOR ALL
  USING (auth.email() = email)
  WITH CHECK (auth.email() = email);
```

3. Update your app to use Supabase Auth (see Supabase docs)

## 📞 Need Help?

- **Supabase Issues**: Check https://supabase.com/docs
- **React Issues**: Check the browser console for errors
- **Environment Variables**: Make sure `.env` file is in the root directory
- **Data Not Saving**: Verify your Supabase credentials and table structure

## ✅ Checklist

- [ ] Supabase project created
- [ ] API credentials copied
- [ ] Database table created
- [ ] `.env` file configured
- [ ] App running locally
- [ ] Data saving successfully
- [ ] Overwrite warning working
- [ ] Code pushed to GitHub
- [ ] App deployed to hosting platform
- [ ] Environment variables set on hosting platform

---

**Congratulations!** 🎉 Your Call Analytics Dashboard is ready!

