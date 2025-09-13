# 🚀 Netlify Deployment Guide

## Quick Deploy to Netlify

### Method 1: Drag & Drop (Easiest)

1. **Build the project** (already done):
   ```bash
   npm run build
   ```

2. **Go to Netlify**: https://app.netlify.com
3. **Sign up/Login** with GitHub account
4. **Drag the `dist` folder** to the deploy area
5. **Your app is live!** 🎉

### Method 2: GitHub Integration (Recommended)

1. **Push to GitHub** (already done)
2. **Go to Netlify**: https://app.netlify.com
3. **Click "New site from Git"**
4. **Choose GitHub** and authorize
5. **Select your repository**: `jayesh4321/school-payment-management-system`
6. **Configure build settings**:
   - **Base directory**: `lumina-pay-dashboard`
   - **Build command**: `npm run build`
   - **Publish directory**: `lumina-pay-dashboard/dist`
7. **Click "Deploy site"**

### Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   cd lumina-pay-dashboard
   netlify deploy --prod --dir=dist
   ```

## Environment Variables

After deployment, add these environment variables in Netlify dashboard:

1. **Go to Site Settings** → **Environment Variables**
2. **Add these variables**:
   ```
   VITE_API_BASE_URL=https://your-backend-api.herokuapp.com
   VITE_APP_NAME=Lumina Pay Dashboard
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENVIRONMENT=production
   ```

## Custom Domain (Optional)

1. **Go to Domain Settings** in Netlify
2. **Add custom domain** (if you have one)
3. **Configure DNS** as instructed
4. **Enable HTTPS** (automatic with Netlify)

## Performance Optimizations

The `netlify.toml` file includes:
- ✅ **Caching headers** for static assets
- ✅ **SPA routing** redirects
- ✅ **Build optimization**
- ✅ **Asset compression**

## Backend Deployment

For the backend, consider:
- **Heroku** (free tier available)
- **Railway** (free tier)
- **Render** (free tier)
- **Vercel** (for serverless functions)

## Troubleshooting

### Build Issues
- Check Node.js version (use 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### API Connection Issues
- Update `VITE_API_BASE_URL` in environment variables
- Ensure backend CORS is configured for your domain
- Check backend deployment status

### Routing Issues
- The `netlify.toml` includes SPA redirects
- All routes redirect to `index.html`

## Free Tier Limits

- **100GB bandwidth** per month
- **300 build minutes** per month
- **Custom domains** supported
- **HTTPS** included
- **Form handling** (100 submissions/month)

Your app will be available at: `https://your-app-name.netlify.app`
