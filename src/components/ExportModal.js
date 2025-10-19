import React from 'react';
import { Download, Copy, Check } from 'lucide-react';

export default function ExportModal({ 
  showExportModal, 
  setShowExportModal, 
  styles, 
  htmlContent, 
  copySuccess, 
  onCopy, 
  onDownload 
}) {
  if (!showExportModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-xl font-bold" style={{ color: styles.textColor }}>Export HTML</h2>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Copy this code and paste it into Google Sites using the Embed component
          </p>
        </div>
        
        <div className="p-4" style={{ maxHeight: '300px', overflow: 'auto' }}>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto" style={{ borderColor: '#e5e7eb', border: '1px solid' }}>
            <code>{htmlContent}</code>
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
            onClick={onDownload}
            className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            style={{ 
              backgroundColor: styles.primaryColor,
              color: 'white'
            }}
          >
            <Download size={18} />
            Download
          </button>
          <button
            onClick={onCopy}
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
