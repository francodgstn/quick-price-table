import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function PricingPreview({ plans, styles, header, billingPeriod, setBillingPeriod }) {
  const [expandedCards, setExpandedCards] = useState({});
  
  const toggleCard = (planId) => {
    setExpandedCards(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };
  
  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavingsText = (plan) => {
    // Get current period's configuration
    const currentConfig = billingPeriod === 'monthly' ? plan.monthly : plan.yearly;
    
    // Check if equivalent price should be shown
    if (currentConfig?.showEquivalentPrice === false) {
      return '';
    }
    
    // Get currency label
    const currency = styles.currency || 'CHF';
    
    // Calculate the values
    const monthlyRate = plan.monthlyPrice;
    const yearlyRate = plan.yearlyPrice;
    let savingsVsMonthly = 0;
    let yearlyRateEquivalent = 0;
    
    // Always calculate savings and equivalent if we have both prices
    if (plan.yearlyPrice > 0 && plan.monthlyPrice > 0) {
      const totalMonthlyPrice = plan.monthlyPrice * 12;
      savingsVsMonthly = Math.round(totalMonthlyPrice - plan.yearlyPrice);
      yearlyRateEquivalent = Math.round(plan.yearlyPrice / 12);
    }
    
    // If template is provided, use it with placeholders
    const template = currentConfig?.equivalentTemplate;
    if (template && template.trim()) {
      return template
        .replace(/{savings_vs_monthly}/g, `${currency} ${savingsVsMonthly}`)
        .replace(/{yearly_rate_equivalent}/g, `${currency} ${yearlyRateEquivalent}`)
        .replace(/{monthly_rate}/g, `${currency} ${monthlyRate}`)
        .replace(/{yearly_rate}/g, `${currency} ${yearlyRate}`)
        // Keep old placeholders for backward compatibility
        .replace(/{savings}/g, `${currency} ${savingsVsMonthly}`)
        .replace(/{equivalent}/g, `${currency} ${yearlyRateEquivalent}`);
    }
    
    // Default templates
    const billingTerm = styles.billingTerminology === 'annual' ? 'annual' : 'yearly';
    if (billingPeriod === 'monthly' && plan.yearlyPrice > 0) {
      if (savingsVsMonthly > 0) {
        return `Save ${currency} ${savingsVsMonthly} with ${billingTerm} billing`;
      }
      return `${currency} ${yearlyRateEquivalent} per month if billed ${billingTerm}ly`;
    } else if (billingPeriod === 'yearly' && plan.yearlyPrice > 0) {
      return `${currency} ${yearlyRateEquivalent} per month`;
    }
    
    return '';
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto" style={{ 
      backgroundColor: '#f3f4f6'
    }}>
      <div className="max-w-6xl mx-auto" style={{ 
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily,
        borderRadius: '12px',
        padding: '2rem',
        minHeight: 'calc(100vh - 8rem)'
      }}>
        {header.enabled && (
          <div className="text-center mb-12">
            {header.title && (
              <h2 className="text-4xl font-bold mb-4" style={{ color: styles.textColor }}>
                {header.title}
              </h2>
            )}
            {header.subtitle && (
              <p className="text-lg" style={{ color: '#6b7280' }}>
                {header.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center mb-12 relative">
          <div className="inline-flex rounded-lg p-1" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className="px-6 py-2 rounded-md transition-all font-medium"
              style={{
                backgroundColor: billingPeriod === 'monthly' ? styles.primaryColor : 'transparent',
                color: billingPeriod === 'monthly' ? 'white' : styles.textColor
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className="px-6 py-2 rounded-md transition-all font-medium"
              style={{
                backgroundColor: billingPeriod === 'yearly' ? styles.primaryColor : 'transparent',
                color: billingPeriod === 'yearly' ? 'white' : styles.textColor
              }}
            >
              {styles.billingTerminology === 'annual' ? 'Annual' : 'Yearly'}
            </button>
          </div>
          
          {/* Yearly Incentive Annotation */}
          {header.showYearlyIncentive !== false && (
            <div className="absolute" style={{
              top: '-50px',
              right: 'calc(50% - 150px)',
              transform: 'rotate(-5deg)',
              pointerEvents: 'none'
            }}>
              <div style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#f59e0b',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap'
              }}>
                {header.yearlyIncentiveText || 'Save more!'}
              </div>
            </div>
          )}
        </div>

        <div className={styles.layoutMode === 'horizontal-scroll' 
          ? 'relative mb-8' 
          : 'mb-8'
        }>
          {styles.layoutMode === 'horizontal-scroll' && (
            <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10" 
                 style={{ 
                   background: `linear-gradient(to left, ${styles.backgroundColor}, transparent)`,
                   opacity: 0.9
                 }} 
            />
          )}
          
          <div className={styles.layoutMode === 'horizontal-scroll' 
            ? 'flex gap-6 pt-8 pb-8 pl-6 snap-x snap-mandatory scroll-smooth' 
            : `grid gap-6 ${
                plans.length === 1 ? 'max-w-sm mx-auto' :
                plans.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' :
                plans.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              }`
          }
          style={styles.layoutMode === 'horizontal-scroll' ? {
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'thin',
            scrollbarColor: `${styles.accentColor} ${styles.backgroundColor}`,
            WebkitOverflowScrolling: 'touch'
          } : {}}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 transition-all flex flex-col ${plan.isFeatured ? 'transform scale-105' : ''} ${
                styles.layoutMode === 'horizontal-scroll' ? 'flex-shrink-0 snap-center' : ''
              }`}
              style={{
                background: plan.gradientEnabled 
                  ? `linear-gradient(${plan.gradientDirection || 'to bottom'}, ${plan.gradientColor || '#3B82F6'}, transparent)`
                  : 'white',
                borderRadius: `${styles.borderRadius}px`,
                border: plan.isFeatured ? `2px solid ${styles.accentColor}` : '1px solid #e5e7eb',
                boxShadow: plan.isFeatured ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
                ...(styles.layoutMode === 'horizontal-scroll' ? { 
                  minWidth: '280px',
                  width: 'calc(70vw - 2rem)',
                  maxWidth: '400px'
                } : {})
              }}
            >
              {plan.isFeatured && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: styles.accentColor, color: 'white' }}
                >
                  {header.featuredBadgeText || 'Most Popular'}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: styles.textColor }}>{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{plan.description}</p>
                <div className="mb-2">
                  {getPrice(plan) === 0 && styles.showFreeForZeroPrice !== false ? (
                    <span className="text-4xl font-bold" style={{ color: styles.textColor }}>
                      FREE
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold" style={{ color: styles.textColor }}>
                        {styles.currency || 'CHF'} {getPrice(plan)}
                      </span>
                      <span className="text-sm" style={{ color: '#6b7280' }}>
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs" style={{ 
                  color: (() => {
                    const currentConfig = billingPeriod === 'monthly' ? plan.monthly : plan.yearly;
                    return currentConfig?.showEquivalentPrice !== false ? '#9ca3af' : 'transparent';
                  })(),
                  minHeight: '1rem'
                }}>
                  {(() => {
                    const currentConfig = billingPeriod === 'monthly' ? plan.monthly : plan.yearly;
                    return currentConfig?.showEquivalentPrice !== false 
                      ? getSavingsText(plan)
                      : '\u00A0';
                  })()}
                </p>
              </div>

              {!styles.compactMode && (
                <div className="flex justify-center my-6">
                  <div style={{
                    width: '60px',
                    height: '3px',
                    backgroundColor: styles.accentColor,
                    borderRadius: '2px'
                  }} />
                </div>
              )}

              {styles.compactMode && (
                <button
                  onClick={() => toggleCard(plan.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 mb-3 text-sm font-medium transition-all"
                  style={{ color: styles.accentColor }}
                >
                  {expandedCards[plan.id] ? (
                    <>
                      Hide Features <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Show Features <ChevronDown size={16} />
                    </>
                  )}
                </button>
              )}

              <ul className={`space-y-3 mb-6 flex-grow ${styles.compactMode && !expandedCards[plan.id] ? 'hidden' : ''}`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {feature.included ? (
                      <Check size={18} className="flex-shrink-0 mt-0.5" style={{ color: styles.accentColor }} />
                    ) : (
                      <X size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#d1d5db' }} />
                    )}
                    <span style={{ color: feature.included ? styles.textColor : '#9ca3af' }}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {(() => {
                // Get current period's action configuration
                const currentAction = billingPeriod === 'monthly' ? plan.monthly : plan.yearly;
                const promotionalText = currentAction?.promotionalText;
                
                // Show promotional text instead of CTA when promotional text exists
                if (promotionalText && promotionalText.trim()) {
                  return (
                    <div 
                      className="w-full py-3 px-4 rounded-lg text-center font-semibold text-lg"
                      style={{
                        backgroundColor: styles.accentColor + '20',
                        color: styles.accentColor,
                        borderRadius: `${styles.borderRadius}px`,
                        border: `2px solid ${styles.accentColor}`
                      }}
                    >
                      {promotionalText}
                    </div>
                  );
                }

                const useEmbed = currentAction?.useEmbed;
                const buttonText = currentAction?.buttonText || 'Get Started';
                const buttonLink = currentAction?.buttonLink || '#';
                const embedCode = currentAction?.embedCode || '';
                const openInNewTab = currentAction?.openInNewTab !== false;

                return !useEmbed ? (
                  <a
                    href={buttonLink}
                    target={openInNewTab ? '_blank' : '_self'}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    className="block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all"
                    style={{
                      backgroundColor: plan.isFeatured ? styles.accentColor : styles.primaryColor,
                      color: 'white',
                      borderRadius: `${styles.borderRadius}px`
                    }}
                  >
                    {buttonText}
                  </a>
                ) : (
                  <div className="w-full" dangerouslySetInnerHTML={{ __html: embedCode }} />
                );
              })()}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
