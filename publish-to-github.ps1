# Script to publish project to GitHub
# Make sure Git is installed first: https://git-scm.com/download/win

Write-Host "Publishing to GitHub..." -ForegroundColor Green

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

# Initialize git repository if not already initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add remote if not exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/rashireader908/simulation-.git
} else {
    Write-Host "Remote already exists: $remoteExists" -ForegroundColor Green
    Write-Host "Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/rashireader908/simulation-.git
}

# Create .gitignore if it doesn't exist
if (-not (Test-Path .gitignore)) {
    Write-Host "Creating .gitignore..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
"@ | Out-File -FilePath .gitignore -Encoding UTF8
}

# Stage all files
Write-Host "Staging files..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: Enhanced simulation with detailed breakdowns, what-if analysis, and export features"
} else {
    Write-Host "No changes to commit." -ForegroundColor Green
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You may need to authenticate. If prompted, use a Personal Access Token." -ForegroundColor Cyan

# Try to push, handle different branch scenarios
$currentBranch = git branch --show-current
if (-not $currentBranch) {
    git branch -M main
    $currentBranch = "main"
}

git push -u origin $currentBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully published to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/rashireader908/simulation-" -ForegroundColor Cyan
} else {
    Write-Host "`nPush failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Authentication required - use Personal Access Token" -ForegroundColor Yellow
    Write-Host "2. Repository might not be empty - try: git push -u origin $currentBranch --force" -ForegroundColor Yellow
    Write-Host "3. Check your GitHub credentials" -ForegroundColor Yellow
}
