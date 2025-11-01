# 🚀 Deployment Guide

This guide covers deploying your Call Analytics Dashboard to various cloud platforms.

## Prerequisites

- [x] Supabase project set up (see [SETUP_GUIDE.md](SETUP_GUIDE.md))
- [x] Code pushed to GitHub
- [x] Environment variables ready

## 🔷 Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy React apps with zero configuration.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/call-analytics.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Create React App

3. **Add Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add these variables:
     ```
     REACT_APP_SUPABASE_URL = your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY = your_supabase_anon_key
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

**Your site will be at**: `https://your-project-name.vercel.app`

### Continuous Deployment

Every push to `main` will automatically deploy! No additional configuration needed.

---

## 🟢 Netlify

Netlify is another excellent option with great features.

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to https://netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Authorize and select your repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Add Environment Variables**
   - Click "Show advanced" → "New variable"
   - Add:
     ```
     REACT_APP_SUPABASE_URL
     REACT_APP_SUPABASE_ANON_KEY
     ```

5. **Deploy site**

**Your site will be at**: `https://your-site-name.netlify.app`

### Custom Domain

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS instructions

---

## 📘 Azure Static Web Apps

### Steps:

1. **Install Azure CLI**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Create a Static Web App**
   - Go to https://portal.azure.com/
   - Create a new "Static Web App"
   - Connect to your GitHub repository

3. **Configure**
   - App location: `/`
   - API location: (leave blank)
   - Output location: `build`

4. **Add Environment Variables**
   - In the Azure portal, go to Configuration
   - Add your Supabase credentials

5. **Deploy**
   - Azure will automatically deploy on every push

---

## 🟠 AWS Amplify

### Steps:

1. **Push to GitHub**

2. **Go to AWS Amplify Console**
   - https://console.aws.amazon.com/amplify/

3. **New app** → **Host web app**

4. **Connect repository**
   - Select GitHub
   - Authorize and choose your repository

5. **Build settings** (auto-detected)
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: build
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

6. **Add environment variables**
   - Go to "Environment variables"
   - Add your Supabase credentials

7. **Save and deploy**

---

## 🔴 GitHub Pages

GitHub Pages is free but requires a bit more setup.

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/call-analytics",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Create `.env.production`**
   ```
   REACT_APP_SUPABASE_URL=your_url
   REACT_APP_SUPABASE_ANON_KEY=your_key
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

**Note**: GitHub Pages doesn't support environment variables securely. Consider using Vercel or Netlify instead for production apps.

---

## 🐳 Docker Deployment

For containerized deployment:

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   ARG REACT_APP_SUPABASE_URL
   ARG REACT_APP_SUPABASE_ANON_KEY
   ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
   ENV REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run**
   ```bash
   docker build --build-arg REACT_APP_SUPABASE_URL=your_url \
                --build-arg REACT_APP_SUPABASE_ANON_KEY=your_key \
                -t call-analytics .
   docker run -p 80:80 call-analytics
   ```

---

## 🔍 Post-Deployment Checklist

After deploying, verify:

- [ ] App loads without errors
- [ ] Charts are displaying correctly
- [ ] Can enter email and open edit modal
- [ ] Can save data to Supabase
- [ ] Data persists on page reload
- [ ] Overwrite warning appears for existing users
- [ ] UI is responsive on mobile devices
- [ ] No console errors in browser

## 🐛 Common Deployment Issues

### Issue: "Network Error" when saving data

**Solution**: 
- Check environment variables are set correctly
- Verify Supabase URL and key in hosting platform
- Check Supabase RLS policies

### Issue: Blank page after deployment

**Solution**:
- Check browser console for errors
- Verify build completed successfully
- Check that `build` folder was published

### Issue: Environment variables not working

**Solution**:
- Ensure variables start with `REACT_APP_`
- Redeploy after adding variables
- Check variables are set in the hosting platform, not just .env

### Issue: 404 on page refresh

**Solution**:
- Add a `_redirects` file for Netlify: `/* /index.html 200`
- For Vercel, add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

---

## 🎉 Success!

Once deployed, share your dashboard URL with others!

**Example URLs:**
- Vercel: `https://call-analytics.vercel.app`
- Netlify: `https://call-analytics.netlify.app`
- Custom domain: `https://dashboard.yourdomain.com`

---

**Need help?** Open an issue on GitHub or check the documentation of your hosting platform.

