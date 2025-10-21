import React, { useState, useEffect } from 'react';
import { Save, Download, Upload, Trash2, FolderOpen, X, RotateCcw } from 'lucide-react';

export default function ConfigManager({ 
  plans, 
  styles, 
  header, 
  onLoadConfig,
  onResetToDefaults,
  buttonStyle 
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [configName, setConfigName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Load saved configurations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pricingTableConfigs');
    if (saved) {
      try {
        setSavedConfigs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved configs:', e);
      }
    }
  }, []);

  // Save configurations to localStorage
  const saveToLocalStorage = (configs) => {
    localStorage.setItem('pricingTableConfigs', JSON.stringify(configs));
    setSavedConfigs(configs);
  };

  // Get current configuration
  const getCurrentConfig = () => ({
    plans,
    styles,
    header,
    timestamp: new Date().toISOString()
  });

  // Save current configuration with a name
  const saveConfig = () => {
    if (!configName.trim()) return;
    
    const newConfig = {
      id: Date.now(),
      name: configName.trim(),
      ...getCurrentConfig()
    };

    const updated = [...savedConfigs, newConfig];
    saveToLocalStorage(updated);
    setConfigName('');
    setShowSaveDialog(false);
  };

  // Delete a saved configuration
  const deleteConfig = (id) => {
    const updated = savedConfigs.filter(c => c.id !== id);
    saveToLocalStorage(updated);
  };

  // Load a saved configuration
  const loadConfig = (config) => {
    onLoadConfig({
      plans: config.plans,
      styles: config.styles,
      header: config.header
    });
    setShowMenu(false);
  };

  // Export current config as JSON file
  const exportConfig = () => {
    const config = getCurrentConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pricing-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import config from JSON file
  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        onLoadConfig({
          plans: config.plans || [],
          styles: config.styles || {},
          header: config.header || {}
        });
        setShowMenu(false);
      } catch (error) {
        alert('Failed to import configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Format timestamp for display
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        style={buttonStyle}
      >
        <FolderOpen size={18} />
        <span>Configs</span>
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div 
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50"
            style={{ borderColor: '#e5e7eb' }}
          >
            <div className="p-4 border-b" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="font-semibold text-lg">Configuration Manager</h3>
            </div>

            <div className="p-4 space-y-3">
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="px-3 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Save size={16} />
                  Save Current
                </button>
                <button
                  onClick={exportConfig}
                  className="px-3 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors bg-green-500 text-white hover:bg-green-600"
                >
                  <Download size={16} />
                  Export JSON
                </button>
                <label className="px-3 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors bg-purple-500 text-white hover:bg-purple-600 cursor-pointer">
                  <Upload size={16} />
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={importConfig}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => {
                    if (window.confirm('Reset to default configuration? All unsaved changes will be lost.')) {
                      onResetToDefaults();
                      setShowMenu(false);
                    }
                  }}
                  className="px-3 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors bg-orange-500 text-white hover:bg-orange-600"
                >
                  <RotateCcw size={16} />
                  Reset Defaults
                </button>
              </div>

              {/* Saved Configurations List */}
              {savedConfigs.length > 0 && (
                <>
                  <div className="border-t pt-3" style={{ borderColor: '#e5e7eb' }}>
                    <h4 className="font-medium text-sm mb-2" style={{ color: '#6b7280' }}>
                      Saved Configurations ({savedConfigs.length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {savedConfigs.map((config) => (
                        <div
                          key={config.id}
                          className="flex items-center justify-between p-2 rounded border hover:bg-gray-50"
                          style={{ borderColor: '#e5e7eb' }}
                        >
                          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => loadConfig(config)}>
                            <p className="font-medium text-sm truncate">{config.name}</p>
                            <p className="text-xs" style={{ color: '#9ca3af' }}>
                              {formatDate(config.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete "${config.name}"?`)) {
                                deleteConfig(config.id);
                              }
                            }}
                            className="ml-2 p-1 rounded hover:bg-red-100 text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {savedConfigs.length === 0 && (
                <div className="text-center py-4 text-sm" style={{ color: '#9ca3af' }}>
                  No saved configurations yet
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setShowSaveDialog(false)}
          >
            <div 
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Save Configuration</h3>
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Configuration Name</label>
                <input
                  type="text"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  placeholder="e.g., Summer Pricing 2025"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: '#e5e7eb' }}
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') saveConfig();
                  }}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="px-4 py-2 rounded border font-medium"
                  style={{ borderColor: '#e5e7eb' }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveConfig}
                  disabled={!configName.trim()}
                  className="px-4 py-2 rounded font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
