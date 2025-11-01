# ⚡ Quick Start Guide

Get your Call Analytics Dashboard up and running in 5 minutes!

## 🏃‍♂️ Super Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start
```

App opens at http://localhost:3000 🎉

**Note**: Without Supabase setup, you can still view and interact with the dashboard, but data won't persist.

## 🗄️ With Supabase (Data Persistence)

### Step 1: Create Supabase Project (2 minutes)

1. Go to https://supabase.com/ and sign up
2. Create a new project
3. Wait for it to initialize (~2 min)

### Step 2: Get Credentials (30 seconds)

1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon public key

### Step 3: Setup Database (1 minute)

1. Go to **SQL Editor** in Supabase
2. Click **New query**
3. Copy and paste from `supabase-setup.sql`
4. Click **Run** (Ctrl+Enter)

### Step 4: Configure App (30 seconds)

Create a `.env` file in the project root:

```env
REACT_APP_SUPABASE_URL=paste_your_url_here
REACT_APP_SUPABASE_ANON_KEY=paste_your_key_here
```

### Step 5: Run! (30 seconds)

```bash
npm start
```

## ✅ Verify It Works

1. App opens at http://localhost:3000
2. Click "Edit Data" button
3. Enter your email
4. Modify some values
5. Click "Save Changes"
6. Refresh the page
7. Your data should still be there! ✨

## 🚀 Deploy to Cloud (2 minutes)

### Fastest: Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add environment variables when prompted
# Or add them in the Vercel dashboard
```

### Alternative: Netlify

1. Push to GitHub
2. Go to https://netlify.com
3. "New site from Git"
4. Select your repo
5. Add environment variables
6. Deploy!

## 📁 Project Structure

```
call-analytics/
├── src/
│   ├── App.tsx          # Main component
│   ├── App.css          # Styles
│   ├── types.ts         # TypeScript types
│   └── supabaseClient.ts # Supabase config
├── public/              # Static files
└── package.json         # Dependencies
```

## 🎯 Key Files to Know

- `App.tsx` - All the magic happens here
- `.env` - Your Supabase credentials (create this)
- `supabase-setup.sql` - Database schema
- `README.md` - Full documentation

## 🆘 Common Issues

### "Network Error" when saving

**Fix**: Check your `.env` file has correct Supabase credentials

### Blank page

**Fix**: Open browser console (F12) and check for errors

### Data not persisting

**Fix**: Verify Supabase table was created correctly

### "Module not found"

**Fix**: Run `npm install` again

## 📚 Next Steps

Once running locally:

1. ✅ Customize the data
2. ✅ Modify colors in `App.css`
3. ✅ Add more charts
4. ✅ Deploy to production
5. ✅ Share with others!

## 💡 Tips

- Press `Ctrl+C` to stop the dev server
- Changes auto-reload (hot reload)
- Check browser console for errors (F12)
- Use React DevTools for debugging

## 🔗 Helpful Links

- [Full README](README.md)
- [Detailed Setup Guide](SETUP_GUIDE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Features List](FEATURES.md)

## 🎉 That's It!

You're ready to start building amazing call analytics dashboards!

**Questions?** Check the full documentation or open an issue on GitHub.

---

**Time to first run**: ~5 minutes
**Time with Supabase**: ~10 minutes
**Time to deploy**: ~15 minutes total

Happy coding! 🚀

