import React, { useState } from 'react';
import { Settings, Eye, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { defaultPlans, defaultStyles, defaultHeader } from './defaultData';
import { generateHTML } from './htmlGenerator';
import StyleEditor from './StyleEditor';
import HeaderEditor from './HeaderEditor';
import PlansEditor from './PlansEditor';
import PricingPreview from './PricingPreview';
import ExportModal from './ExportModal';
import ConfigManager from './ConfigManager';

// Collapsible Section Component
function CollapsibleSection({ title, isCollapsed, onToggle, children }) {
  return (
    <div className="border-b" style={{ borderColor: '#e5e7eb' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        style={{ backgroundColor: isCollapsed ? 'transparent' : '#f9fafb' }}
      >
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        {isCollapsed ? (
          <ChevronDown size={20} className="text-gray-900" />
        ) : (
          <ChevronUp size={20} className="text-gray-900" />
        )}
      </button>
      {!isCollapsed && (
        <div className="p-6 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function PricingTableBuilder() {
  const [billingPeriod, setBillingPeriod] = useState(defaultHeader.defaultBillingPeriod || 'monthly');
  const [showEditor, setShowEditor] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [draggedPlan, setDraggedPlan] = useState(null);
  
  const [plans, setPlans] = useState(defaultPlans);
  const [styles, setStyles] = useState(defaultStyles);
  const [header, setHeader] = useState(defaultHeader);
  
  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState({
    styling: false,
    header: false,
    plans: false
  });
  
  // Initialize all plans as collapsed
  const [collapsedPlans, setCollapsedPlans] = useState(() => {
    const collapsed = {};
    defaultPlans.forEach(plan => {
      collapsed[plan.id] = true;
    });
    return collapsed;
  });

  const updatePlan = (id, field, value) => {
    setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePlan = (id) => {
    if (plans.length <= 1) return;
    setPlans(plans.filter(p => p.id !== id));
  };

  const setFeatured = (id) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return { ...p, isFeatured: false };
    }));
  };

  const addFeature = (planId) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          features: [...p.features, { text: 'New feature', included: true }]
        };
      }
      return p;
    }));
  };

  const updateFeature = (planId, featureIndex, field, value) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        const newFeatures = [...p.features];
        newFeatures[featureIndex] = { ...newFeatures[featureIndex], [field]: value };
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const removeFeature = (planId, featureIndex) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          features: p.features.filter((_, i) => i !== featureIndex)
        };
      }
      return p;
    }));
  };

  const togglePlanCollapse = (planId) => {
    setCollapsedPlans(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDragStart = (e, index) => {
    setDraggedPlan(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedPlan === null || draggedPlan === index) return;
    
    const newPlans = [...plans];
    const draggedItem = newPlans[draggedPlan];
    newPlans.splice(draggedPlan, 1);
    newPlans.splice(index, 0, draggedItem);
    
    setPlans(newPlans);
    setDraggedPlan(index);
  };

  const handleDragEnd = () => {
    setDraggedPlan(null);
  };

  const loadConfig = (config) => {
    setPlans(config.plans);
    setStyles(config.styles);
    setHeader(config.header);
    
    // Update collapsed state for new plans
    const collapsed = {};
    config.plans.forEach(plan => {
      collapsed[plan.id] = true;
    });
    setCollapsedPlans(collapsed);
    
    // Update billing period if specified in header
    if (config.header.defaultBillingPeriod) {
      setBillingPeriod(config.header.defaultBillingPeriod);
    }
  };

  const copyToClipboard = async () => {
    const html = generateHTML(plans, styles, header);
    try {
      await navigator.clipboard.writeText(html);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadHTML = () => {
    const html = generateHTML(plans, styles, header);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-table.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
      {styles.fontFamily.includes('Montserrat') && (
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      )}
      
      <div className="border-b bg-white" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Pricing Table Builder</h1>
            <div className="flex gap-2 flex-wrap">
              <ConfigManager
                plans={plans}
                styles={styles}
                header={header}
                onLoadConfig={loadConfig}
                buttonStyle={{
                  backgroundColor: '#8b5cf6',
                  color: 'white'
                }}
              />
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                style={{ 
                  backgroundColor: styles.accentColor,
                  color: 'white'
                }}
              >
                <Download size={18} />
                <span>Export HTML</span>
              </button>
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                style={{ 
                  backgroundColor: styles.primaryColor,
                  color: 'white'
                }}
              >
                {showEditor ? <Eye size={18} /> : <Settings size={18} />}
                <span>{showEditor ? 'Preview Mode' : 'Edit Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ExportModal
        showExportModal={showExportModal}
        setShowExportModal={setShowExportModal}
        styles={styles}
        htmlContent={generateHTML(plans, styles, header)}
        copySuccess={copySuccess}
        onCopy={copyToClipboard}
        onDownload={downloadHTML}
      />

      <div className="flex">
        {showEditor && (
          <div className="w-96 border-r overflow-y-auto" style={{ 
            backgroundColor: 'white',
            borderColor: '#e5e7eb',
            maxHeight: 'calc(100vh - 73px)'
          }}>
            <CollapsibleSection
              title="Styling"
              isCollapsed={collapsedSections.styling}
              onToggle={() => toggleSection('styling')}
            >
              <StyleEditor styles={styles} setStyles={setStyles} />
            </CollapsibleSection>

            <CollapsibleSection
              title="Header"
              isCollapsed={collapsedSections.header}
              onToggle={() => toggleSection('header')}
            >
              <HeaderEditor header={header} setHeader={setHeader} styles={styles} />
            </CollapsibleSection>

            <CollapsibleSection
              title="Plans"
              isCollapsed={collapsedSections.plans}
              onToggle={() => toggleSection('plans')}
            >
              <PlansEditor
                plans={plans}
                setPlans={setPlans}
                styles={styles}
                collapsedPlans={collapsedPlans}
                togglePlanCollapse={togglePlanCollapse}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                updatePlan={updatePlan}
                removePlan={removePlan}
                setFeatured={setFeatured}
                addFeature={addFeature}
                updateFeature={updateFeature}
                removeFeature={removeFeature}
              />
            </CollapsibleSection>
          </div>
        )}

        <PricingPreview
          plans={plans}
          styles={styles}
          header={header}
          billingPeriod={billingPeriod}
          setBillingPeriod={setBillingPeriod}
        />
      </div>
    </div>
  );
}
