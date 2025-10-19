import React from 'react';
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
          <span className="font-semibold" style={{ color: styles.textColor }}>{plan.name}</span>
          {plan.isFeatured && (
            <Star size={14} fill={styles.accentColor} style={{ color: styles.accentColor }} />
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
            <ChevronDown size={18} style={{ color: styles.textColor }} />
          ) : (
            <ChevronUp size={18} style={{ color: styles.textColor }} />
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
            style={{ color: styles.textColor, borderColor: '#d1d5db' }}
          />

          <textarea
            value={plan.description}
            onChange={(e) => updatePlan(plan.id, 'description', e.target.value)}
            className="w-full text-sm border rounded px-2 py-1"
            rows="2"
            style={{ borderColor: '#d1d5db' }}
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs" style={{ color: styles.textColor }}>Monthly</label>
              <input
                type="number"
                value={plan.monthlyPrice}
                onChange={(e) => updatePlan(plan.id, 'monthlyPrice', parseFloat(e.target.value) || 0)}
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#d1d5db' }}
              />
            </div>
            <div>
              <label className="text-xs" style={{ color: styles.textColor }}>Yearly</label>
              <input
                type="number"
                value={plan.yearlyPrice}
                onChange={(e) => updatePlan(plan.id, 'yearlyPrice', parseFloat(e.target.value) || 0)}
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#d1d5db' }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: styles.textColor }}>Monthly Action</label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => updatePlan(plan.id, 'monthly', { ...plan.monthly, useEmbed: false })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${!plan.monthly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: !plan.monthly?.useEmbed ? styles.primaryColor : '#f3f4f6',
                  color: !plan.monthly?.useEmbed ? 'white' : styles.textColor
                }}
              >
                Button Link
              </button>
              <button
                onClick={() => updatePlan(plan.id, 'monthly', { ...plan.monthly, useEmbed: true })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${plan.monthly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: plan.monthly?.useEmbed ? styles.primaryColor : '#f3f4f6',
                  color: plan.monthly?.useEmbed ? 'white' : styles.textColor
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
          </div>

          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: styles.textColor }}>Yearly Action</label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => updatePlan(plan.id, 'yearly', { ...plan.yearly, useEmbed: false })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${!plan.yearly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: !plan.yearly?.useEmbed ? styles.primaryColor : '#f3f4f6',
                  color: !plan.yearly?.useEmbed ? 'white' : styles.textColor
                }}
              >
                Button Link
              </button>
              <button
                onClick={() => updatePlan(plan.id, 'yearly', { ...plan.yearly, useEmbed: true })}
                className={`flex-1 px-3 py-2 rounded text-xs transition-all ${plan.yearly?.useEmbed ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: plan.yearly?.useEmbed ? styles.primaryColor : '#f3f4f6',
                  color: plan.yearly?.useEmbed ? 'white' : styles.textColor
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
          </div>

          <button
            onClick={() => setFeatured(plan.id)}
            className={`w-full px-3 py-1 rounded text-sm flex items-center justify-center gap-2 ${plan.isFeatured ? 'font-semibold' : ''}`}
            style={{
              backgroundColor: plan.isFeatured ? styles.accentColor : '#f3f4f6',
              color: plan.isFeatured ? 'white' : styles.textColor
            }}
          >
            <Star size={14} fill={plan.isFeatured ? 'white' : 'none'} />
            {plan.isFeatured ? 'Featured' : 'Set as Featured'}
          </button>

          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: '#f9fafb' }}>
            <input
              type="checkbox"
              id={`show-equivalent-${plan.id}`}
              checked={plan.showEquivalentPrice !== false}
              onChange={(e) => updatePlan(plan.id, 'showEquivalentPrice', e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={`show-equivalent-${plan.id}`} className="text-xs cursor-pointer" style={{ color: styles.textColor }}>
              Show equivalent price (monthly/yearly)
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold" style={{ color: styles.textColor }}>Features</label>
              <button
                onClick={() => addFeature(plan.id)}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: styles.primaryColor, color: 'white' }}
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
