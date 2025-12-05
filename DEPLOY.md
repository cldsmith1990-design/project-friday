# DEPLOYMENT INSTRUCTIONS

## Steps to Deploy Project Friday to GitHub

### 1. Create GitHub Repository

Go to: https://github.com/new

**Settings:**
- Repository name: `project-friday`
- Visibility: Private (recommended) or Public
- DO NOT initialize with README (we already have one)
- Click "Create repository"

### 2. Open Terminal in Project Folder

Navigate to the `project-friday` folder you downloaded.

```bash
cd /path/to/project-friday
```

### 3. Run These Commands (Copy/Paste)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Project Friday hub system v2.4"

# Add your GitHub repository as remote
# REPLACE 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/project-friday.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to repository on GitHub.com
2. Click "Settings" tab
3. Click "Pages" in left sidebar
4. Under "Source", select: `Deploy from a branch`
5. Under "Branch", select: `main` and folder: `/ (root)`
6. Click "Save"
7. Wait 1-2 minutes

Your site will be live at:
```
https://yourusername.github.io/project-friday/
```

### 5. Test Your Site

Open these URLs to verify:
- Main dashboard: `https://yourusername.github.io/project-friday/`
- Life Hub: `https://yourusername.github.io/project-friday/life-hub.html`
- Work Hub: `https://yourusername.github.io/project-friday/work-hub.html`

## Making Updates Later

When you change files:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with description
git commit -m "Description of what you changed"

# Push to GitHub (auto-deploys)
git push
```

Site updates in ~30 seconds after push.

## Troubleshooting

**"git: command not found"**
- Install git: https://git-scm.com/downloads

**"Permission denied (publickey)"**
- Use HTTPS instead of SSH (already in commands above)

**"Repository not found"**
- Check username in git remote command
- Verify repository exists on GitHub

**Site not loading**
- Wait 2-3 minutes after enabling Pages
- Check Pages settings show green checkmark
- Verify branch is set to `main`

## File Structure (What Got Deployed)

```
project-friday/
├── .gitignore             # Excludes temp files
├── README.md              # Project documentation
├── index.html             # Main dashboard ✓
├── life-hub.html          # Central hub ✓
├── work-hub.html          # Work operations ✓
├── finance-hub.html       # Placeholder
├── academic-hub.html      # Placeholder
├── emotional-hub.html     # Placeholder
└── automotive-hub.html    # Placeholder
```

## Next Steps

After deployment:
1. Bookmark your live URL
2. Test all hub navigation
3. Build out placeholder hubs
4. Add real data to Work Hub and Life Hub

---

**Questions? Something not working?**

Common fixes:
- Wrong username in remote URL → Run: `git remote set-url origin https://github.com/CORRECT-username/project-friday.git`
- Need to restart → Everything is saved in GitHub, just clone again
