# Deployment Guide

## Deploying the Pricing Table Builder

### Option 1: Static Hosting (Recommended for the app itself)

#### Netlify
1. Build the project:
   ```bash
   npm run build
   ```
2. Sign up at https://netlify.com
3. Drag and drop the `build` folder to Netlify
4. Done! You'll get a URL like `https://your-site.netlify.app`

#### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   cd C:\git\quick-price-table
   vercel
   ```
3. Follow the prompts

#### GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/quick-price-table",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

---

## Embedding the Generated Pricing Table

### Google Sites
1. Open your Google Site
2. Click "Insert" → "Embed"
3. Click "Embed Code"
4. Paste your exported HTML
5. Click "Next" → "Insert"

### WordPress
1. Install "HTML Code Embedder" or similar plugin
2. Create/edit a page
3. Add an HTML block
4. Paste your exported HTML
5. Publish

### Wix
1. Add an "HTML iframe" element
2. Click "Enter Code"
3. Paste your exported HTML
4. Save and publish

### Squarespace
1. Add a "Code" block
2. Paste your exported HTML
3. Apply changes

### Custom Website
Simply paste the exported HTML into your page where you want the pricing table to appear.

---

## Using as an Embedded Widget

If you want to host the pricing table HTML separately and embed it as an iframe:

1. Upload the exported HTML to a web server
2. Use an iframe to embed it:
   ```html
   <iframe 
     src="https://yoursite.com/pricing-table.html" 
     width="100%" 
     height="800" 
     frameborder="0"
     style="border: none;">
   </iframe>
   ```

---

## Environment Variables

If you need to add environment variables (e.g., for analytics):

1. Create a `.env` file in the project root:
   ```
   REACT_APP_ANALYTICS_ID=your-id-here
   ```

2. Access in your code:
   ```javascript
   const analyticsId = process.env.REACT_APP_ANALYTICS_ID;
   ```

3. For production, set environment variables in your hosting platform's dashboard

---

## Domain Configuration

### Using a Custom Domain

#### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed

#### Vercel
1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS as instructed

---

## Performance Optimization

The exported HTML is already optimized, but for the React app:

1. **Code Splitting**: Already handled by Create React App
2. **Image Optimization**: Use WebP format if adding images
3. **Lazy Loading**: Consider for heavy components
4. **CDN**: Use a CDN for static assets in production

---

## Security Considerations

### For Embedded Pricing Tables
- Ensure HTTPS is enabled
- Validate any user input if you add form features
- Use CSP headers if hosting on your server

### For the React App
- Keep dependencies updated:
  ```bash
  npm audit
  npm audit fix
  ```

---

## Monitoring

### Google Analytics
Add to `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Backup Strategy

1. **Code**: Use Git and push to GitHub/GitLab
2. **Configurations**: Export your plans/styles as JSON
3. **Exported HTML**: Keep copies of all versions

---

## Troubleshooting Deployment

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank page after deployment
- Check browser console for errors
- Verify homepage in package.json matches deployment URL
- Check if routing is properly configured

### CORS errors
- Ensure all resources are served from the same domain or have proper CORS headers

---

## Support

For issues with:
- **React App**: Check Create React App documentation
- **Deployment**: Refer to your hosting provider's docs
- **HTML Export**: Test the HTML file locally first

## Updates

To update the app:
1. Pull latest changes
2. Run `npm install`
3. Test locally with `npm start`
4. Build and redeploy
