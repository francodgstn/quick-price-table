# Quick Price Table Builder

> **Note:** This project was primarily created using AI-assisted coding (GitHub Copilot & AI vibe coding). It showcases how AI tools can help rapidly prototype and build full-featured web applications.

A React-based pricing table builder for creating beautiful, responsive pricing tables with customizable styles and features.

🔗 **Live Demo:** [https://YOUR-USERNAME.github.io/quick-price-table](https://YOUR-USERNAME.github.io/quick-price-table)

## Features

- 🎨 **Customizable Styling** - Colors, fonts, border radius, and layout modes
- 📱 **Fully Responsive** - Grid layout with tablet/mobile optimization
- 🔄 **Layout Modes** - Responsive grid or horizontal scroll with snap
- 💾 **Configuration Management** - Save, load, export, and import configurations
- 💰 **Dual Billing** - Monthly/Yearly pricing with automatic calculations
- 🎯 **Featured Plans** - Highlight popular plans with badges
- � **Smart Placeholders** - Dynamic price calculations with templates
- ✨ **Drag & Drop** - Reorder plans easily
- 🎭 **Compact Mode** - Collapsible features for embedding
- 📤 **HTML Export** - Standalone, self-contained HTML files
- � **FREE Display** - Show "FREE" instead of "$0" for zero prices
- 🎨 **Live Preview** - Real-time updates as you edit

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/quick-price-table.git
cd quick-price-table

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `build` folder.

## Usage Guide

### 1. **Configuration Panel** (Left Sidebar)

#### Styling Section
- **Colors**: Primary, Accent, Background, and Text colors
- **Border Radius**: Adjust card roundness (0-24px)
- **Font Family**: Choose from System UI, Montserrat, Georgia, etc.
- **Layout Mode**: 
  - *Responsive*: Stacks on mobile, grid on desktop
  - *Horizontal Scroll*: Side-by-side cards with swipe
- **Compact Mode**: Collapse features by default (ideal for Google Sites)
- **FREE Display**: Show "FREE" instead of "$0" for zero prices

#### Header Section
- Toggle header visibility
- Customize title and subtitle
- Set featured badge text
- Choose default billing period (Monthly/Yearly)

#### Plans Section
- Add up to 4 pricing plans
- Drag to reorder plans
- Set monthly and yearly prices
- Add/remove features with inclusion toggles
- Configure separate actions for monthly/yearly billing
- Add promotional text per billing period
- Use price calculation templates with placeholders

### 2. **Configuration Management** (Top Bar)

Click the **"Configs"** button to:
- **Save Current**: Store current configuration in browser
- **Export JSON**: Download configuration as file
- **Import JSON**: Load configuration from file
- **Load Saved**: Click any saved config to restore it
- **Delete**: Remove unwanted configurations

### 3. **Price Templates**

Use these placeholders in "Equivalent Template" fields:
- `{savings_vs_monthly}` - Total savings vs monthly billing
- `{yearly_rate_equivalent}` - Monthly equivalent of yearly price
- `{monthly_rate}` - The monthly price
- `{yearly_rate}` - The yearly price

**Example:** `"Save {savings_vs_monthly} with yearly plan"` → "Save $120 with yearly plan"

### 4. **Exporting**

Click **"Export HTML"** to:
- **Copy to Clipboard**: Get HTML code for embedding
- **Download HTML**: Get standalone HTML file

The exported HTML is:
- ✅ Self-contained (no external dependencies)
- ✅ Includes all styles and fonts
- ✅ Fully responsive
- ✅ Works offline

## Embedding in Google Sites

1. Enable **Compact Mode** in Styling section (reduces height)
2. Choose **Horizontal Scroll** layout mode (better for mobile)
3. Click **"Export HTML"** → **"Copy to Clipboard"**
4. In Google Sites:
   - Add an **"Embed"** component
   - Select **"Embed Code"**
   - Paste the HTML
   - Adjust iframe height if needed
5. Save and publish

## Technologies Used

- **React 18** - UI framework
- **Create React App** - Build tooling
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **LocalStorage API** - Configuration persistence

## Project Structure

```
quick-price-table/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ConfigManager.js        # Configuration management
│   │   ├── PricingTableBuilder.js  # Main app component
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
└── package.json
```

## Development

This project uses:
- **React 18.2.0**
- **Node.js** (v14 or higher recommended)
- **pnpm** (preferred) or npm/yarn

### Available Scripts

```bash
npm start          # Start dev server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from CRA (one-way operation)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## AI-Assisted Development Disclaimer

This project was primarily created using AI-assisted coding techniques, including GitHub Copilot and conversational AI programming. It serves as an example of how AI tools can accelerate software development while maintaining code quality and functionality.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created with AI assistance as a demonstration of modern AI-assisted development workflows.

