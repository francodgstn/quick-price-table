# GitHub Deployment Guide

This guide will help you publish this project to GitHub with automatic deployment to GitHub Pages.

## Prerequisites

- Git installed on your system
- A GitHub account
- Git repository initialized (already done)

## Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `quick-price-table` (or your preferred name)
   - **Description:** "AI-assisted React pricing table builder with configuration management"
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### 2. Connect Local Repository to GitHub

Copy the commands from your new repository page, or use these (replace `YOUR-USERNAME`):

```bash
# Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/quick-price-table.git

# Push to GitHub
git branch -M main  # Rename master to main (if needed)
git push -u origin main
```

**Note:** If you're already on `master` branch and want to keep it:
```bash
git remote add origin https://github.com/YOUR-USERNAME/quick-price-table.git
git push -u origin master
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Source:** GitHub Actions (recommended)
5. Click **Save**

**That's it!** The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Run on every push to `main` (or `master`)
- Install dependencies
- Build the React app
- Deploy to GitHub Pages

### 4. Update README with Your Live URL

1. After the first deployment completes (check the **Actions** tab)
2. Your site will be live at: `https://YOUR-USERNAME.github.io/quick-price-table`
3. Update the `README.md` file:
   - Replace `YOUR-USERNAME` in the Live Demo link with your actual GitHub username
4. Commit and push:
   ```bash
   git add README.md
   git commit -m "Update README with live demo URL"
   git push
   ```

### 5. Verify Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Visit your live site at: `https://YOUR-USERNAME.github.io/quick-price-table`

## Automatic Deployments

Every time you push changes to the `main` (or `master`) branch, GitHub Actions will:
1. Build your app
2. Deploy to GitHub Pages
3. Update your live site automatically

No manual deployment needed! 🎉

## Troubleshooting

### Build Failed
- Check the **Actions** tab for error details
- Ensure all dependencies are in `package.json`
- Verify `npm run build` works locally

### 404 on Live Site
- Wait a few minutes after first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the workflow completed successfully

### Wrong Branch
If the workflow is set for `main` but you're on `master`:
- Either rename your branch: `git branch -M main`
- Or update `.github/workflows/deploy.yml` line 5 to use `master`

## Local Development

Continue developing locally as usual:

```bash
# Start dev server
npm start

# Make changes and commit
git add .
git commit -m "Your changes"

# Push to GitHub (triggers automatic deployment)
git push
```

## Environment Variables (if needed)

If you need environment variables:
1. Add them to GitHub Secrets (Settings → Secrets and variables → Actions)
2. Reference them in `.github/workflows/deploy.yml`
3. Use them in your build process

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file in the `public/` folder with your domain
2. Configure DNS records with your domain provider
3. Enable custom domain in GitHub Pages settings

## Next Steps

- ✅ Push to GitHub
- ✅ Enable GitHub Pages
- ✅ Wait for deployment
- ✅ Update README with live URL
- 🎉 Share your project!

---

**Current Commit:** `3e7b345` - Ready for GitHub publication
**Workflow Status:** Configured and ready to run
**GitHub Pages:** Will be live after first push
