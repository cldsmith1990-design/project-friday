# QUICK COMMAND REFERENCE

## Initial Setup (Run Once)

```bash
cd /path/to/project-friday
git init
git add .
git commit -m "Initial commit: Project Friday hub system v2.4"
git remote add origin https://github.com/YOUR-USERNAME/project-friday.git
git branch -M main
git push -u origin main
```

## Daily Updates (Run Each Time You Make Changes)

```bash
git add .
git commit -m "Updated [describe what you changed]"
git push
```

## Common Commands

| Task | Command |
|------|---------|
| Check status | `git status` |
| See changes | `git diff` |
| View history | `git log --oneline` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Discard all changes | `git checkout .` |

## Example Update Flow

```bash
# Made changes to work-hub.html

git add work-hub.html
git commit -m "Added ticket filtering to Work Hub"
git push

# Site updates automatically in ~30 seconds
```

## Your Live URLs

```
Main: https://YOUR-USERNAME.github.io/project-friday/
Life: https://YOUR-USERNAME.github.io/project-friday/life-hub.html
Work: https://YOUR-USERNAME.github.io/project-friday/work-hub.html
```

Replace YOUR-USERNAME with your GitHub username.
