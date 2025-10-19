# Quick Price Table Builder

A React-based pricing table builder for creating beautiful, responsive pricing tables with customizable styles and features.

## Features

- 🎨 Customizable colors, fonts, and styling
- 📱 Fully responsive design
- ✨ Drag and drop plan ordering
- 🎯 Featured plan highlighting
- 💰 Monthly/Yearly billing toggle
- 📝 Custom features with checkmarks
- 🔗 Button links or embed codes for CTAs
- 📤 Export to standalone HTML file
- 🎭 Collapsible plan editors

## Installation

1. Navigate to the project folder:
   ```bash
   cd C:\git\quick-price-table
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build` folder.

## Project Structure

```
quick-price-table/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PricingTableBuilder.js  # Main component
│   │   ├── StyleEditor.js          # Style customization
│   │   ├── HeaderEditor.js         # Header settings
│   │   ├── PlansEditor.js          # Plans list manager
│   │   ├── PlanEditor.js           # Individual plan editor
│   │   ├── PricingPreview.js       # Live preview
│   │   ├── ExportModal.js          # HTML export modal
│   │   ├── defaultData.js          # Default configuration
│   │   └── htmlGenerator.js        # HTML export logic
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Usage

1. **Customize Styles**: Adjust colors, fonts, and border radius in the Styling section
2. **Edit Header**: Toggle header visibility and customize title/subtitle
3. **Manage Plans**: Add, remove, reorder (drag & drop), and collapse plans
4. **Configure Features**: Add/remove features, toggle inclusion, and set pricing
5. **Set Actions**: Choose between button links or embed codes for CTAs
6. **Export**: Click "Export HTML" to download or copy the standalone HTML file

## Exporting to Google Sites

1. Click the "Export HTML" button
2. Click "Copy to Clipboard"
3. In Google Sites, add an "Embed" component
4. Select "Embed Code"
5. Paste the HTML code
6. Save and publish

## Technologies Used

- React 18
- Lucide React (icons)
- Create React App

## License

MIT
