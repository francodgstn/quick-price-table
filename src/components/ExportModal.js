import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

export default function ExportModal({ 
  showExportModal, 
  setShowExportModal, 
  styles, 
  htmlContent,
  astroContent,
  copySuccess, 
  onCopy, 
  onDownload,
  onDownloadAstro
}) {
  const [exportFormat, setExportFormat] = useState('html');
  
  if (!showExportModal) return null;

  const currentContent = exportFormat === 'html' ? htmlContent : astroContent;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-xl font-bold" style={{ color: styles.textColor }}>Export Pricing Table</h2>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            {exportFormat === 'html' 
              ? 'Copy this code and paste it into Google Sites using the Embed component'
              : 'Use this Astro component in your Astro + Tailwind project'
            }
          </p>
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setExportFormat('html')}
              className="px-4 py-2 rounded text-sm font-medium transition-all"
              style={{
                backgroundColor: exportFormat === 'html' ? '#3b82f6' : '#f3f4f6',
                color: exportFormat === 'html' ? 'white' : '#374151'
              }}
            >
              HTML
            </button>
            <button
              onClick={() => setExportFormat('astro')}
              className="px-4 py-2 rounded text-sm font-medium transition-all"
              style={{
                backgroundColor: exportFormat === 'astro' ? '#3b82f6' : '#f3f4f6',
                color: exportFormat === 'astro' ? 'white' : '#374151'
              }}
            >
              Astro Component
            </button>
          </div>
        </div>
        
        <div className="p-4" style={{ maxHeight: '300px', overflow: 'auto' }}>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto" style={{ borderColor: '#e5e7eb', border: '1px solid' }}>
            <code>{currentContent}</code>
          </pre>
        </div>
        
        <div className="p-4 border-t flex gap-3 justify-end flex-wrap" style={{ borderColor: '#e5e7eb' }}>
          <button
            onClick={() => setShowExportModal(false)}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: '#f3f4f6',
              color: styles.textColor
            }}
          >
            Close
          </button>
          <button
            onClick={exportFormat === 'html' ? onDownload : onDownloadAstro}
            className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            style={{ 
              backgroundColor: styles.primaryColor,
              color: 'white'
            }}
          >
            <Download size={18} />
            Download {exportFormat === 'html' ? '.html' : '.astro'}
          </button>
          <button
            onClick={() => onCopy(currentContent)}
            className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            style={{ 
              backgroundColor: copySuccess ? styles.accentColor : styles.primaryColor,
              color: 'white'
            }}
          >
            {copySuccess ? (
              <>
                <Check size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
