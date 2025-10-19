import React from 'react';
import { Check, X } from 'lucide-react';

export default function PricingPreview({ plans, styles, header, billingPeriod, setBillingPeriod }) {
  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavingsText = (plan) => {
    if (billingPeriod === 'monthly') {
      // Show savings when paying yearly
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      const savings = monthlyCost - yearlyCost;
      if (savings > 0) {
        return `Save CHF ${savings.toFixed(0)} with annual billing`;
      }
      return `CHF ${(plan.yearlyPrice / 12).toFixed(2)} per month if billed annually`;
    } else {
      // Show monthly equivalent when viewing yearly
      const monthlyEquivalent = (plan.yearlyPrice / 12).toFixed(2);
      return `CHF ${monthlyEquivalent} per month`;
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {header.show && (
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

        <div className="flex justify-center mb-8">
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
              Yearly
            </button>
          </div>
        </div>

        <div className={`grid gap-6 mb-8 ${
          plans.length === 1 ? 'max-w-sm mx-auto' :
          plans.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' :
          plans.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 transition-all ${plan.isFeatured ? 'transform scale-105' : ''}`}
              style={{
                backgroundColor: 'white',
                borderRadius: `${styles.borderRadius}px`,
                border: plan.isFeatured ? `2px solid ${styles.accentColor}` : '1px solid #e5e7eb',
                boxShadow: plan.isFeatured ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
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
                  <span className="text-4xl font-bold" style={{ color: styles.textColor }}>
                    CHF {getPrice(plan)}
                  </span>
                  <span className="text-sm" style={{ color: '#6b7280' }}>
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className="text-xs" style={{ 
                  color: plan.showEquivalentPrice !== false ? '#9ca3af' : 'transparent',
                  minHeight: '1rem'
                }}>
                  {plan.showEquivalentPrice !== false 
                    ? getSavingsText(plan)
                    : '\u00A0'
                  }
                </p>
              </div>

              <ul className="space-y-3 mb-6">
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
                const currentAction = billingPeriod === 'monthly' ? plan.monthly : plan.yearly;
                const useEmbed = currentAction?.useEmbed;
                const buttonText = currentAction?.buttonText || 'Get Started';
                const buttonLink = currentAction?.buttonLink || '#';
                const embedCode = currentAction?.embedCode || '';

                return !useEmbed ? (
                  <a
                    href={buttonLink}
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
  );
}
