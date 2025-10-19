import React from 'react';

export default function HeaderEditor({ header, setHeader, styles }) {
  return (
    <div>
      <h3 className="font-semibold mb-4" style={{ color: styles.textColor }}>Header</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showHeader"
            checked={header.show}
            onChange={(e) => setHeader({...header, show: e.target.checked})}
            className="w-4 h-4"
          />
          <label htmlFor="showHeader" className="text-sm" style={{ color: styles.textColor }}>
            Show Header
          </label>
        </div>
        {header.show && (
          <>
            <div>
              <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Title</label>
              <input
                type="text"
                value={header.title}
                onChange={(e) => setHeader({...header, title: e.target.value})}
                className="w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: '#d1d5db' }}
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Subtitle</label>
              <input
                type="text"
                value={header.subtitle}
                onChange={(e) => setHeader({...header, subtitle: e.target.value})}
                className="w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: '#d1d5db' }}
                placeholder="Enter subtitle..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: styles.textColor }}>Featured Badge Text</label>
              <input
                type="text"
                value={header.featuredBadgeText || 'Most Popular'}
                onChange={(e) => setHeader({...header, featuredBadgeText: e.target.value})}
                className="w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: '#d1d5db' }}
                placeholder="Most Popular"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
