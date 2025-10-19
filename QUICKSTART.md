# Quick Start Guide

## Option 1: Automated Setup (Recommended)

1. Double-click `setup.bat` on your Desktop
2. The script will copy the project to `C:\git\quick-price-table`
3. Open a terminal in `C:\git\quick-price-table`
4. Run:
   ```bash
   npm install
   npm start
   ```

## Option 2: Manual Setup

1. Copy the `quick-price-table` folder from your Desktop to `C:\git\`
2. Open a terminal and navigate to the folder:
   ```bash
   cd C:\git\quick-price-table
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## What's Included

The project has been split into the following files:

### Core Files
- `src/App.js` - Main app entry point
- `src/index.js` - React DOM rendering
- `src/index.css` - Global styles

### Components
- `PricingTableBuilder.js` - Main component with state management
- `StyleEditor.js` - Color and font customization
- `HeaderEditor.js` - Header title/subtitle editor
- `PlansEditor.js` - Plans list manager
- `PlanEditor.js` - Individual plan configuration
- `PricingPreview.js` - Live preview display
- `ExportModal.js` - HTML export dialog

### Utilities
- `defaultData.js` - Default plans, styles, and header
- `htmlGenerator.js` - Generates standalone HTML

## Troubleshooting

### npm not found
Install Node.js from https://nodejs.org/

### Port already in use
The app runs on port 3000 by default. If it's in use, you'll be prompted to use a different port.

### Dependencies installation fails
Try:
```bash
npm cache clean --force
npm install
```

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder that you can deploy to any web server.

## Next Steps

1. Customize your pricing plans in the editor
2. Export the HTML using the "Export HTML" button
3. Embed it in Google Sites or your website
4. Enjoy your beautiful pricing table!
