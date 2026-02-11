# Deployment Guide

This guide will help you publish your project to GitHub and deploy it to Vercel.

## Prerequisites

1. **Git** - Install from https://git-scm.com/download/win
2. **GitHub Account** - You already have: `rashireader908`
3. **Vercel Account** - Sign up at https://vercel.com (free)

## Step 1: Publish to GitHub

### Option A: Using PowerShell Script (Recommended)

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - During installation, make sure to select "Add Git to PATH"
   - Restart PowerShell after installation

2. **Run the script**:
   ```powershell
   .\publish-to-github.ps1
   ```

3. **If authentication is required**:
   - GitHub no longer accepts passwords for HTTPS
   - Use a Personal Access Token instead:
     - Go to: https://github.com/settings/tokens
     - Click "Generate new token (classic)"
     - Name it: "Money Sandbox Project"
     - Select scope: `repo` (full control of private repositories)
     - Click "Generate token"
     - **Copy the token immediately** (you won't see it again!)
     - When prompted for password, paste the token

### Option B: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository
3. Select this folder: `C:\Users\dogpo\Documents\Project fintech sim`
4. Publish repository → Choose: `rashireader908/simulation-`
5. Click "Publish repository"

### Option C: Manual Git Commands

If Git is installed and in your PATH:

```powershell
# Initialize repository
git init

# Add remote
git remote add origin https://github.com/rashireader908/simulation-.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Money Sandbox financial simulator"

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** (you can use your GitHub account)
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `rashireader908/simulation-`
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Environment Variables** (if needed):
   - This project doesn't require any environment variables
   - Click "Deploy"

6. **Wait for Deployment**:
   - Vercel will automatically build and deploy your project
   - You'll get a URL like: `https://simulation-xxxxx.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```powershell
   vercel login
   ```

3. **Deploy**:
   ```powershell
   vercel
   ```

4. **For production deployment**:
   ```powershell
   vercel --prod
   ```

## Step 3: Connect GitHub to Vercel (Auto-Deploy)

After your first deployment:

1. Go to your project on Vercel dashboard
2. Go to **Settings** → **Git**
3. Connect your GitHub repository
4. Enable **Automatic deployments**:
   - Every push to `main` branch will trigger a new deployment
   - Pull requests will create preview deployments

## Project Configuration

The project is already configured for Vercel:

- ✅ `vercel.json` - Vercel configuration file
- ✅ `next.config.js` - Next.js configuration
- ✅ `.gitignore` - Excludes node_modules and build files
- ✅ `package.json` - Contains build scripts

## Troubleshooting

### Git Issues

**"Git is not recognized"**:
- Install Git from https://git-scm.com/download/win
- Make sure to select "Add Git to PATH" during installation
- Restart PowerShell after installation

**"Authentication failed"**:
- Use a Personal Access Token, not your GitHub password
- Create token at: https://github.com/settings/tokens
- Select `repo` scope

### Vercel Issues

**Build fails**:
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Ensure `npm run build` works locally first

**"Module not found"**:
- Run `npm install` locally to ensure all dependencies are installed
- Check that all imports use correct paths

**Environment variables**:
- This project doesn't require environment variables
- If you add any later, set them in Vercel dashboard → Settings → Environment Variables

## Repository URLs

- **GitHub**: https://github.com/rashireader908/simulation-
- **Vercel**: Will be provided after deployment (e.g., `https://simulation-xxxxx.vercel.app`)

## Next Steps

1. ✅ Publish to GitHub
2. ✅ Deploy to Vercel
3. ✅ Set up automatic deployments
4. 🎉 Your site is live!

## Support

If you encounter issues:
1. Check the build logs in Vercel dashboard
2. Verify your GitHub repository is accessible
3. Ensure all files are committed and pushed to GitHub
4. Check that `npm run build` works locally
