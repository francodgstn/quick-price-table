import React, { useState } from 'react';
import { ChevronDown, ChevronUp, GripVertical, Trash2, Star, X } from 'lucide-react';

export default function PlanEditor({
  plan,
  idx,
  styles,
  collapsedPlans,
  togglePlanCollapse,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  updatePlan,
  removePlan,
  setFeatured,
  addFeature,
  updateFeature,
  removeFeature,
  plansLength
}) {
  const [monthlyActionCollapsed, setMonthlyActionCollapsed] = useState(true);
  const [yearlyActionCollapsed, setYearlyActionCollapsed] = useState(true);
  
  return (
    <div 
      className="border rounded-lg" 
      style={{ borderColor: '#e5e7eb' }}
      draggable
      onDragStart={(e) => handleDragStart(e, idx)}
      onDragOver={(e) => handleDragOver(e, idx)}
      onDragEnd={handleDragEnd}
    >
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => togglePlanCollapse(plan.id)}
      >
        <div className="flex items-center gap-2">
          <GripVertical size={18} className="cursor-move" style={{ color: '#9ca3af' }} />
          <span className="font-semibold" style={{ color: '#1f2937' }}>{plan.name}</span>
          {plan.isFeatured && (
            <Star size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
          )}
        </div>
        <div className="flex items-center gap-2">
          {plansLength > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePlan(plan.id);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          )}
          {collapsedPlans[plan.id] ? (
            <ChevronDown size={18} style={{ color: '#1f2937' }} />
          ) : (
            <ChevronUp size={18} style={{ color: '#1f2937' }} />
          )}
        </div>
      </div>

      {!collapsedPlans[plan.id] && (
        <div className="p-4 pt-0 space-y-3">
          <input
            type="text"
            value={plan.name}
            onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
            className="font-semibold text-lg border rounded px-2 py-1 w-full"
            style={{ color: '#1f2937', borderColor: '#d1d5db' }}
          />

          <textarea
            value={plan.description}
            onChange={(e) => updatePlan(plan.id, 'description', e.target.value)}
            className="w-full text-sm border rounded px-2 py-1"
            rows="2"
            style={{ borderColor: '#d1d5db' }}
          />

          {/* Monthly Pricing & Action - Collapsible */}
          <div className="border rounded" style={{ borderColor: '#e5e7eb' }}>
            <div 
              className="flex justify-between items-center p-3 cursor-pointer"
              onClick={() => setMonthlyActionCollapsed(!monthlyActionCollapsed)}
              style={{ backgroundColor: '#f9fafb' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: '#1f2937' }}>Monthly Price & Action</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                  CHF {plan.monthlyPrice}
                </span>
              </div>
              {monthlyActionCollapsed ? (
                <ChevronDown size={16} style={{ color: '#1f2937' }} />
              ) : (
                <ChevronUp size={16} style={{ color: '#1f2937' }} />
              )}
            </div>
            
            {!monthlyActionCollapsed && (
              <div className="p-3 space-y-3">
                <div>
                  <label className="text-xs" style={{ color: styles.textColor }}>Monthly Price</label>
                  <input
                    type="number"
                    value={plan.monthlyPrice}
                    onChange={(e) => updatePlan(plan.id, 'monthlyPrice', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: styles.textColor }}>Action Type</label>
                  <div className="flex gap-2 mb-2">
              <button
                onClick={() => updatePlan(plan.id, 'monthly', { ...plan.monthly, useEmbed: false })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${!plan.monthly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: !plan.monthly?.useEmbed ? '#3b82f6' : '#f3f4f6',
                  color: !plan.monthly?.useEmbed ? 'white' : '#374151'
                }}
              >
                Button Link
              </button>
              <button
                onClick={() => updatePlan(plan.id, 'monthly', { ...plan.monthly, useEmbed: true })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${plan.monthly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: plan.monthly?.useEmbed ? '#3b82f6' : '#f3f4f6',
                  color: plan.monthly?.useEmbed ? 'white' : '#374151'
                }}
              >
                Embed Code
              </button>
            </div>
            
            {!plan.monthly?.useEmbed ? (
              <>
                <div className="mb-2">
                  <label className="text-xs" style={{ color: styles.textColor }}>Button Text</label>
                  <input
                    type="text"
                    value={plan.monthly?.buttonText || ''}
                    onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, buttonText: e.target.value })}
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>
                <div>
                  <label className="text-xs" style={{ color: styles.textColor }}>Button Link</label>
                  <input
                    type="url"
                    value={plan.monthly?.buttonLink || ''}
                    onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, buttonLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`monthly-new-tab-${plan.id}`}
                    checked={plan.monthly?.openInNewTab !== false}
                    onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, openInNewTab: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`monthly-new-tab-${plan.id}`} className="text-xs" style={{ color: styles.textColor }}>
                    Open in new tab
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label className="text-xs" style={{ color: styles.textColor }}>Embed Code</label>
                <textarea
                  value={plan.monthly?.embedCode || ''}
                  onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, embedCode: e.target.value })}
                  placeholder="Paste your embed code here..."
                  className="w-full border rounded px-2 py-1 text-sm"
                  rows="3"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
            )}
            
            <div className="pt-2 border-t" style={{ borderColor: '#e5e7eb' }}>
              <label className="text-xs" style={{ color: styles.textColor }}>Promotional Text (replaces action when shown)</label>
              <input
                type="text"
                value={plan.monthly?.promotionalText || ''}
                onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, promotionalText: e.target.value })}
                placeholder="e.g., Coming Soon, Contact Us, etc."
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#d1d5db' }}
              />
              <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>If set, shows instead of button/embed</p>
            </div>
            
            <div className="pt-2 border-t" style={{ borderColor: '#e5e7eb' }}>
              <label className="flex items-center gap-2 text-xs mb-2" style={{ color: styles.textColor }}>
                <input
                  type="checkbox"
                  checked={plan.monthly?.showEquivalentPrice !== false}
                  onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, showEquivalentPrice: e.target.checked })}
                  className="rounded"
                />
                <span className="font-semibold">Show Equivalent Price</span>
              </label>
              
              {plan.monthly?.showEquivalentPrice !== false && (
                <div>
                  <label className="text-xs block mb-1" style={{ color: styles.textColor }}>
                    Equivalent Template (optional)
                  </label>
                  <input
                    type="text"
                    value={plan.monthly?.equivalentTemplate || ''}
                    onChange={(e) => updatePlan(plan.id, 'monthly', { ...plan.monthly, equivalentTemplate: e.target.value })}
                    placeholder="e.g., Save {savings_vs_monthly} with yearly plan"
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                    Placeholders: {'{savings_vs_monthly}'}, {'{yearly_rate_equivalent}'}, {'{monthly_rate}'}, {'{yearly_rate}'}
                  </p>
                </div>
              )}
            </div>
                </div>
              </div>
            )}
          </div>

          {/* Yearly Pricing & Action - Collapsible */}
          <div className="border rounded" style={{ borderColor: '#e5e7eb' }}>
            <div 
              className="flex justify-between items-center p-3 cursor-pointer"
              onClick={() => setYearlyActionCollapsed(!yearlyActionCollapsed)}
              style={{ backgroundColor: '#f9fafb' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: '#1f2937' }}>Yearly Price & Action</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#10b981', color: 'white' }}>
                  CHF {plan.yearlyPrice}
                </span>
              </div>
              {yearlyActionCollapsed ? (
                <ChevronDown size={16} style={{ color: '#1f2937' }} />
              ) : (
                <ChevronUp size={16} style={{ color: '#1f2937' }} />
              )}
            </div>
            
            {!yearlyActionCollapsed && (
              <div className="p-3 space-y-3">
                <div>
                  <label className="text-xs" style={{ color: styles.textColor }}>Yearly Price</label>
                  <input
                    type="number"
                    value={plan.yearlyPrice}
                    onChange={(e) => updatePlan(plan.id, 'yearlyPrice', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: '#1f2937' }}>Action Type</label>
                  <div className="flex gap-2 mb-2">
              <button
                onClick={() => updatePlan(plan.id, 'yearly', { ...plan.yearly, useEmbed: false })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${!plan.yearly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: !plan.yearly?.useEmbed ? '#10b981' : '#f3f4f6',
                  color: !plan.yearly?.useEmbed ? 'white' : '#374151'
                }}
              >
                Button Link
              </button>
              <button
                onClick={() => updatePlan(plan.id, 'yearly', { ...plan.yearly, useEmbed: true })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${plan.yearly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: plan.yearly?.useEmbed ? '#10b981' : '#f3f4f6',
                  color: plan.yearly?.useEmbed ? 'white' : '#374151'
                }}
              >
                Embed Code
              </button>
            </div>
            
            {!plan.yearly?.useEmbed ? (
              <>
                <div className="mb-2">
                  <label className="text-xs" style={{ color: styles.textColor }}>Button Text</label>
                  <input
                    type="text"
                    value={plan.yearly?.buttonText || ''}
                    onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, buttonText: e.target.value })}
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>
                <div>
                  <label className="text-xs" style={{ color: styles.textColor }}>Button Link</label>
                  <input
                    type="url"
                    value={plan.yearly?.buttonLink || ''}
                    onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, buttonLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`yearly-new-tab-${plan.id}`}
                    checked={plan.yearly?.openInNewTab !== false}
                    onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, openInNewTab: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`yearly-new-tab-${plan.id}`} className="text-xs" style={{ color: styles.textColor }}>
                    Open in new tab
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label className="text-xs" style={{ color: styles.textColor }}>Embed Code</label>
                <textarea
                  value={plan.yearly?.embedCode || ''}
                  onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, embedCode: e.target.value })}
                  placeholder="Paste your embed code here..."
                  className="w-full border rounded px-2 py-1 text-sm"
                  rows="3"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
            )}
            
            <div className="pt-2 border-t" style={{ borderColor: '#e5e7eb' }}>
              <label className="text-xs" style={{ color: styles.textColor }}>Promotional Text (replaces action when shown)</label>
              <input
                type="text"
                value={plan.yearly?.promotionalText || ''}
                onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, promotionalText: e.target.value })}
                placeholder="e.g., Coming Soon, Contact Us, etc."
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#d1d5db' }}
              />
              <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>If set, shows instead of button/embed</p>
            </div>
            
            <div className="pt-2 border-t" style={{ borderColor: '#e5e7eb' }}>
              <label className="flex items-center gap-2 text-xs mb-2" style={{ color: styles.textColor }}>
                <input
                  type="checkbox"
                  checked={plan.yearly?.showEquivalentPrice !== false}
                  onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, showEquivalentPrice: e.target.checked })}
                  className="rounded"
                />
                <span className="font-semibold">Show Equivalent Price</span>
              </label>
              
              {plan.yearly?.showEquivalentPrice !== false && (
                <div>
                  <label className="text-xs block mb-1" style={{ color: styles.textColor }}>
                    Equivalent Template (optional)
                  </label>
                  <input
                    type="text"
                    value={plan.yearly?.equivalentTemplate || ''}
                    onChange={(e) => updatePlan(plan.id, 'yearly', { ...plan.yearly, equivalentTemplate: e.target.value })}
                    placeholder="e.g., Only {yearly_rate_equivalent} per month"
                    className="w-full border rounded px-2 py-1 text-sm"
                    style={{ borderColor: '#d1d5db' }}
                  />
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                    Placeholders: {'{savings_vs_monthly}'}, {'{yearly_rate_equivalent}'}, {'{monthly_rate}'}, {'{yearly_rate}'}
                  </p>
                </div>
              )}
            </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setFeatured(plan.id)}
            className={`w-full px-3 py-1 rounded text-sm flex items-center justify-center gap-2 ${plan.isFeatured ? 'font-semibold' : ''}`}
            style={{
              backgroundColor: plan.isFeatured ? '#f59e0b' : '#f3f4f6',
              color: plan.isFeatured ? 'white' : '#374151'
            }}
          >
            <Star size={14} fill={plan.isFeatured ? 'white' : 'none'} />
            {plan.isFeatured ? 'Featured' : 'Set as Featured'}
          </button>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold" style={{ color: '#1f2937' }}>Features</label>
              <button
                onClick={() => addFeature(plan.id)}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: '#3b82f6', color: 'white' }}
              >
                + Add
              </button>
            </div>
            {plan.features.map((feature, fIdx) => (
              <div key={fIdx} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={feature.included}
                  onChange={(e) => updateFeature(plan.id, fIdx, 'included', e.target.checked)}
                  className="w-4 h-4"
                />
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => updateFeature(plan.id, fIdx, 'text', e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-xs"
                  style={{ borderColor: '#d1d5db' }}
                />
                <button
                  onClick={() => removeFeature(plan.id, fIdx)}
                  className="text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
