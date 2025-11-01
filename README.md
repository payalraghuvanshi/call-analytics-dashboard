# 📊 Call Analytics Dashboard

A modern, interactive call analytics dashboard for voice agents built with React, TypeScript, and React Bootstrap. Features real-time data visualization, user authentication, and persistent data storage with Supabase.

![Dashboard Preview](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)

## ✨ Features

- 📈 **Interactive Charts**: Visualize call metrics with beautiful, responsive charts
- 🎨 **Modern Dark Theme**: Sleek UI inspired by modern design trends
- ✏️ **Editable Data**: Customize chart values and persist your changes
- 💾 **Cloud Storage**: Data saved to Supabase and synced across sessions
- 🔐 **Email Authentication**: Simple email-based user identification
- ⚠️ **Overwrite Protection**: Warns users before overwriting existing data
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📸 Screenshots

The dashboard includes:
- **Metrics Overview**: Total calls, successful calls, failed calls, and average duration
- **Hourly Call Volume Chart**: Track call patterns throughout the day (Editable)
- **Call Duration Distribution**: Visualize call lengths
- **Success Rate Pie Chart**: See the ratio of successful to failed calls

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier works!)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/payalraghuvanshi/call-analytics-dashboard.git
cd call-analytics
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**

   a. Go to [Supabase](https://supabase.com/) and create a new project
   
   b. Once your project is ready, go to **Settings** → **API**
   
   c. Copy your **Project URL** and **anon/public key**
   
   d. In the Supabase SQL Editor, run this query to create the required table:
   ```sql
   CREATE TABLE call_analytics (
     id BIGSERIAL PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     hourly_data JSONB NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Create an index for faster email lookups
   CREATE INDEX idx_call_analytics_email ON call_analytics(email);

   -- Enable Row Level Security (optional but recommended)
   ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;

   -- Create a policy to allow all operations (for development)
   -- In production, you should implement proper authentication
   CREATE POLICY "Allow all operations" ON call_analytics
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

4. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variables in Site Settings → Environment Variables
7. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/call-analytics",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript
- **UI Framework**: React Bootstrap
- **Charts**: Recharts
- **Backend/Database**: Supabase
- **Styling**: CSS3 with modern gradients and animations

## 📂 Project Structure

```
call-analytics/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.tsx         # Application entry point
│   ├── index.css         # Global styles
│   ├── types.ts          # TypeScript type definitions
│   ├── supabaseClient.ts # Supabase configuration
│   └── ...
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Changing Colors

Edit the gradient colors in `src/App.css`:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Background gradient */
background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
```

### Adding More Charts

1. Import chart components from Recharts
2. Create dummy data in your desired format
3. Add a new chart card in the `App.tsx` component
4. Style with existing CSS classes

### Modifying Data Structure

Update the types in `src/types.ts` and adjust the Supabase table schema accordingly.

## 🔒 Security Notes

- The current implementation uses a simple email-based identification system
- For production, implement proper authentication (Supabase Auth supports email/password, OAuth, etc.)
- Update Row Level Security policies in Supabase for production use
- Never commit your `.env` file to version control

## 🐛 Troubleshooting

### Supabase Connection Issues

- Verify your Supabase URL and anon key are correct
- Check that the table exists in your Supabase project
- Ensure RLS policies allow operations

### Build Errors

- Clear node_modules and package-lock.json, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Chart Display Issues

- Ensure parent containers have defined heights
- Check browser console for errors
- Verify data format matches chart requirements

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Built with ❤️ using modern web technologies

## 🙏 Acknowledgments

- Design inspired by [SuperBryn](https://superbryn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- UI components from [React Bootstrap](https://react-bootstrap.github.io/)
- Backend by [Supabase](https://supabase.com/)

---

⭐ Star this repo if you find it helpful!
