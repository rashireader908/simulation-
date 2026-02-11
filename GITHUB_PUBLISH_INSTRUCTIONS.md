# Publishing to GitHub

## Quick Setup

### Option 1: Using the PowerShell Script (Recommended)

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or use GitHub Desktop: https://desktop.github.com/

2. **Run the script**:
   ```powershell
   .\publish-to-github.ps1
   ```

3. **If authentication is required**:
   - GitHub no longer accepts passwords for HTTPS
   - Use a Personal Access Token instead:
     - Go to: https://github.com/settings/tokens
     - Generate new token (classic) with `repo` scope
     - Use the token as your password when prompted

### Option 2: Manual Steps

1. **Install Git** (if needed):
   ```powershell
   # Check if Git is installed
   git --version
   ```

2. **Initialize repository**:
   ```powershell
   git init
   git remote add origin https://github.com/rashireader908/simulation-.git
   ```

3. **Create .gitignore** (if needed):
   ```powershell
   # The script will create this automatically
   ```

4. **Add and commit files**:
   ```powershell
   git add .
   git commit -m "Initial commit: Enhanced simulation with detailed breakdowns, what-if analysis, and export features"
   ```

5. **Push to GitHub**:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

### Option 3: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository
3. Select this folder
4. Publish repository → Choose the remote: `rashireader908/simulation-`
5. Click "Publish repository"

## Authentication

If you're prompted for credentials:
- **Username**: Your GitHub username (`rashireader908`)
- **Password**: Use a Personal Access Token (not your GitHub password)
  - Create one at: https://github.com/settings/tokens
  - Select `repo` scope
  - Copy the token and use it as the password

## Troubleshooting

### "Repository is not empty"
If the GitHub repository has files (like README), you may need to pull first:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` scope

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart your terminal/PowerShell after installation
- Or add Git to your PATH manually

## Repository URL

After publishing, your code will be available at:
https://github.com/rashireader908/simulation-
