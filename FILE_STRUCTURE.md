# Project File Structure

## Overview

```
quick-price-table/
│
├── public/                      # Static files
│   └── index.html              # HTML template
│
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── PricingTableBuilder.js
│   │   ├── StyleEditor.js
│   │   ├── HeaderEditor.js
│   │   ├── PlansEditor.js
│   │   ├── PlanEditor.js
│   │   ├── PricingPreview.js
│   │   ├── ExportModal.js
│   │   ├── defaultData.js
│   │   └── htmlGenerator.js
│   │
│   ├── App.js                  # Root component
│   ├── index.js                # React entry point
│   └── index.css               # Global CSS
│
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── README.md                   # Full documentation
├── QUICKSTART.md              # Quick start guide
├── setup.bat                   # Windows setup script
└── FILE_STRUCTURE.md          # This file

```

## Component Details

### PricingTableBuilder.js (Main Component)
**Purpose**: Central component managing all state and coordinating child components
**State**:
- `plans` - Array of pricing plans
- `styles` - Color and styling configuration
- `header` - Header title and subtitle
- `billingPeriod` - Monthly/yearly toggle
- `showEditor` - Editor visibility
- `collapsedPlans` - Track which plans are collapsed

**Key Functions**:
- Plan management (add, update, remove, reorder)
- Feature management
- Drag and drop handlers
- Export functions

---

### StyleEditor.js
**Purpose**: UI for customizing colors, fonts, and border radius
**Props**:
- `styles` - Current style configuration
- `setStyles` - Function to update styles

**Features**:
- Color pickers for primary, accent, and background colors
- Border radius slider
- Font family selector (includes Montserrat, System UI, Georgia, etc.)

---

### HeaderEditor.js
**Purpose**: UI for configuring the pricing table header
**Props**:
- `header` - Header configuration
- `setHeader` - Function to update header
- `styles` - For consistent theming

**Features**:
- Toggle header visibility
- Edit title
- Edit subtitle

---

### PlansEditor.js
**Purpose**: Manages the list of plans and the "Add Plan" button
**Props**:
- `plans` - Array of plans
- `setPlans` - Function to update plans
- All plan manipulation functions
- Drag and drop handlers

**Features**:
- Add new plans (max 4)
- Renders PlanEditor for each plan

---

### PlanEditor.js
**Purpose**: Edit individual plan details
**Props**:
- `plan` - Plan object
- `idx` - Plan index for drag/drop
- Various update functions

**Features**:
- Collapsible panel
- Drag handle for reordering
- Plan name and description
- Monthly/yearly pricing
- Action type toggle (button vs embed)
- Feature management
- Featured plan toggle

---

### PricingPreview.js
**Purpose**: Live preview of the pricing table
**Props**:
- `plans` - Plans to display
- `styles` - Styling configuration
- `header` - Header configuration
- `billingPeriod` - Current billing period
- `setBillingPeriod` - Toggle function

**Features**:
- Real-time preview
- Responsive grid layout
- Monthly/yearly toggle
- Featured plan highlighting

---

### ExportModal.js
**Purpose**: Modal for exporting HTML
**Props**:
- `showExportModal` - Visibility state
- `setShowExportModal` - Toggle function
- `styles` - For consistent theming
- `htmlContent` - Generated HTML
- `copySuccess` - Copy success state
- `onCopy` - Copy handler
- `onDownload` - Download handler

**Features**:
- Display generated HTML
- Copy to clipboard
- Download as file
- Success feedback

---

### defaultData.js
**Purpose**: Default configuration values
**Exports**:
- `defaultPlans` - Initial HMD Basel plans
- `defaultStyles` - Color scheme (#cc0000 red, #1c1c1c black)
- `defaultHeader` - "HMD Basel Membership" header

---

### htmlGenerator.js
**Purpose**: Generate standalone HTML file
**Function**: `generateHTML(plans, styles, header)`
**Returns**: Complete HTML string with:
- Inline CSS
- Montserrat font import (if selected)
- JavaScript for billing toggle
- All plan data
- Fully functional pricing table

---

## Data Flow

1. **User Input** → Component State
2. **Component State** → Preview Update
3. **Export Click** → htmlGenerator.js
4. **Generated HTML** → ExportModal
5. **Copy/Download** → User's clipboard/file system

## State Management

All state is managed in `PricingTableBuilder.js` and passed down as props. No global state management library is used for simplicity.

## Styling Approach

- Inline styles for dynamic theming
- Tailwind-like utility classes for layout
- Responsive design with CSS Grid
- No external CSS frameworks required
