import React from 'react';

export default function HeaderEditor({ header, setHeader, styles }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showHeader"
          checked={header.enabled}
          onChange={(e) => setHeader({...header, enabled: e.target.checked})}
          className="w-4 h-4"
        />
        <label htmlFor="showHeader" className="text-sm text-gray-700">
            Show Header
          </label>
        </div>
        {header.enabled && (
          <>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Title</label>
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
              <label className="block text-sm mb-1 text-gray-700">Subtitle</label>
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
              <label className="block text-sm mb-1 text-gray-700">Featured Badge Text</label>
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
        
        <div>
          <label className="block text-sm mb-2 text-gray-700">Default Billing Period</label>
          <div className="flex gap-2">
            <button
              onClick={() => setHeader({...header, defaultBillingPeriod: 'monthly'})}
              className={`flex-1 px-3 py-2 rounded text-sm transition-all ${header.defaultBillingPeriod !== 'yearly' ? 'font-semibold' : ''}`}
              style={{
                backgroundColor: header.defaultBillingPeriod !== 'yearly' ? styles.primaryColor : '#f3f4f6',
                color: header.defaultBillingPeriod !== 'yearly' ? 'white' : '#374151'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setHeader({...header, defaultBillingPeriod: 'yearly'})}
              className={`flex-1 px-3 py-2 rounded text-sm transition-all ${header.defaultBillingPeriod === 'yearly' ? 'font-semibold' : ''}`}
              style={{
                backgroundColor: header.defaultBillingPeriod === 'yearly' ? styles.primaryColor : '#f3f4f6',
                color: header.defaultBillingPeriod === 'yearly' ? 'white' : '#374151'
              }}
            >
              Yearly
            </button>
          </div>
          <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
            Which billing period to show by default when the page loads
          </p>
        </div>
    </div>
  );
}

