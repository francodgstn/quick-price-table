import React from 'react';

export default function StyleEditor({ styles, setStyles }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700">Primary Color</label>
        <input
          type="color"
            value={styles.primaryColor}
            onChange={(e) => setStyles({...styles, primaryColor: e.target.value})}
            className="w-12 h-8 rounded cursor-pointer border"
            style={{ borderColor: '#d1d5db' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Accent Color</label>
          <input
            type="color"
            value={styles.accentColor}
            onChange={(e) => setStyles({...styles, accentColor: e.target.value})}
            className="w-12 h-8 rounded cursor-pointer border"
            style={{ borderColor: '#d1d5db' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Background Color</label>
          <input
            type="color"
            value={styles.backgroundColor}
            onChange={(e) => setStyles({...styles, backgroundColor: e.target.value})}
            className="w-12 h-8 rounded cursor-pointer border"
            style={{ borderColor: '#d1d5db' }}
          />
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm text-gray-700 whitespace-nowrap">Border Radius</label>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="24"
              value={styles.borderRadius}
              onChange={(e) => setStyles({...styles, borderRadius: e.target.value})}
              className="flex-1"
            />
            <span className="text-xs text-gray-700 w-8 text-right">{styles.borderRadius}px</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm text-gray-700 whitespace-nowrap">Font Family</label>
          <select
            value={styles.fontFamily}
            onChange={(e) => setStyles({...styles, fontFamily: e.target.value})}
            className="flex-1 px-3 py-2 border rounded text-sm"
            style={{ borderColor: '#d1d5db' }}
          >
            <option value="system-ui">System UI</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="Arial, sans-serif">Arial</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm mb-2 text-gray-700">Layout Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setStyles({...styles, layoutMode: 'responsive'})}
              className={`flex-1 px-3 py-2 rounded text-xs transition-all ${styles.layoutMode !== 'horizontal-scroll' ? 'font-semibold' : ''}`}
              style={{
                backgroundColor: styles.layoutMode !== 'horizontal-scroll' ? styles.primaryColor : '#f3f4f6',
                color: styles.layoutMode !== 'horizontal-scroll' ? 'white' : '#374151'
              }}
            >
              Responsive
            </button>
            <button
              onClick={() => setStyles({...styles, layoutMode: 'horizontal-scroll'})}
              className={`flex-1 px-3 py-2 rounded text-xs transition-all ${styles.layoutMode === 'horizontal-scroll' ? 'font-semibold' : ''}`}
              style={{
                backgroundColor: styles.layoutMode === 'horizontal-scroll' ? styles.primaryColor : '#f3f4f6',
                color: styles.layoutMode === 'horizontal-scroll' ? 'white' : '#374151'
              }}
            >
              Horizontal Scroll
            </button>
          </div>
          <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
            Responsive: Stacks on mobile. Horizontal Scroll: Always side-by-side with swipe
          </p>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
            <input
              type="checkbox"
              checked={styles.compactMode || false}
              onChange={(e) => setStyles({...styles, compactMode: e.target.checked})}
              className="w-4 h-4 rounded"
              style={{ accentColor: styles.accentColor }}
            />
            Compact Mode
          </label>
          <p className="text-xs mt-1 ml-6" style={{ color: '#9ca3af' }}>
            Collapse features by default to reduce height (ideal for Google Sites)
          </p>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
            <input
              type="checkbox"
              checked={styles.showFreeForZeroPrice !== false}
              onChange={(e) => setStyles({...styles, showFreeForZeroPrice: e.target.checked})}
              className="w-4 h-4 rounded"
              style={{ accentColor: styles.accentColor }}
            />
            Show "FREE" for Zero Price
          </label>
          <p className="text-xs mt-1 ml-6" style={{ color: '#9ca3af' }}>
            Display "FREE" instead of "CHF 0" when price is zero
          </p>
        </div>
    </div>
  );
}

