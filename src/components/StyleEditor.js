import React from 'react';

export default function StyleEditor({ styles, setStyles }) {
  return (
    <div>
      <h3 className="font-semibold mb-4" style={{ color: styles.textColor }}>Styling</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Primary Color</label>
          <input
            type="color"
            value={styles.primaryColor}
            onChange={(e) => setStyles({...styles, primaryColor: e.target.value})}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Accent Color</label>
          <input
            type="color"
            value={styles.accentColor}
            onChange={(e) => setStyles({...styles, accentColor: e.target.value})}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Background Color</label>
          <input
            type="color"
            value={styles.backgroundColor}
            onChange={(e) => setStyles({...styles, backgroundColor: e.target.value})}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Border Radius</label>
          <input
            type="range"
            min="0"
            max="24"
            value={styles.borderRadius}
            onChange={(e) => setStyles({...styles, borderRadius: e.target.value})}
            className="w-full"
          />
          <span className="text-xs" style={{ color: styles.textColor }}>{styles.borderRadius}px</span>
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Font Family</label>
          <select
            value={styles.fontFamily}
            onChange={(e) => setStyles({...styles, fontFamily: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            style={{ borderColor: '#d1d5db' }}
          >
            <option value="system-ui">System UI</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="Arial, sans-serif">Arial</option>
          </select>
        </div>
      </div>
    </div>
  );
}
