export const generateAstroComponent = (plans, styles, header) => {
  const currency = styles.currency || 'CHF';
  const defaultPeriod = header.defaultBillingPeriod || 'monthly';
  
  // Generate TypeScript interface for props
  const interfaceCode = `interface Plan {
  id: number;
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Array<{
    id: number;
    text: string;
    included: boolean;
  }>;
  isFeatured: boolean;
  monthly?: {
    buttonText?: string;
    buttonLink?: string;
    embedCode?: string;
    useEmbed?: boolean;
    promotionalText?: string;
    openInNewTab?: boolean;
    showEquivalentPrice?: boolean;
    equivalentTemplate?: string;
  };
  yearly?: {
    buttonText?: string;
    buttonLink?: string;
    embedCode?: string;
    useEmbed?: boolean;
    promotionalText?: string;
    openInNewTab?: boolean;
    showEquivalentPrice?: boolean;
    equivalentTemplate?: string;
  };
}

interface Props {
  plans?: Plan[];
  styles?: {
    primaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    fontFamily?: string;
    layoutMode?: 'responsive' | 'horizontal-scroll';
    compactMode?: boolean;
    showFreeForZeroPrice?: boolean;
    currency?: string;
  };
  header?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    featuredBadge?: string;
    defaultBillingPeriod?: 'monthly' | 'yearly';
    showYearlyIncentive?: boolean;
    yearlyIncentiveText?: string;
  };
}`;

  // Serialize the data as default props
  const propsCode = `const {
  plans = ${JSON.stringify(plans, null, 2)},
  styles = ${JSON.stringify(styles, null, 2)},
  header = ${JSON.stringify(header, null, 2)}
} = Astro.props;`;

  const astroComponent = `---
${interfaceCode}

${propsCode}

const currency = styles.currency || 'CHF';
const defaultBillingPeriod = header.defaultBillingPeriod || 'monthly';
---

<div class="pricing-table-container">
  {header.enabled && (
    <div class="header">
      {header.title && <h2 class="header-title">{header.title}</h2>}
      {header.subtitle && <p class="header-subtitle">{header.subtitle}</p>}
    </div>
  )}

  <div class="billing-toggle">
    <div class="toggle-container">
      <button class="toggle-btn" data-period="monthly">Monthly</button>
      <button class="toggle-btn" data-period="yearly">Yearly</button>
    </div>
    
    {header.showYearlyIncentive !== false && (
      <div class="yearly-incentive">
        <div class="incentive-text">{header.yearlyIncentiveText || 'Save more!'}</div>
        <svg class="incentive-arrow" width="50" height="50" viewBox="0 0 50 50">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
            </marker>
          </defs>
          <path d="M 5 5 Q 20 15, 35 25" stroke="#f59e0b" stroke-width="2.5" fill="none" marker-end="url(#arrowhead)" stroke-linecap="round" />
        </svg>
      </div>
    )}
  </div>

  <div class={\`pricing-grid \${styles.layoutMode === 'horizontal-scroll' ? 'horizontal-scroll' : ''}\`}>
    {plans.map((plan) => (
      <div 
        class={\`pricing-card \${plan.isFeatured ? 'featured' : ''}\`}
        data-plan-id={plan.id}
      >
        {plan.isFeatured && (
          <div class="featured-badge">
            {header.featuredBadge || 'Most Popular'}
          </div>
        )}

        <div class="plan-header">
          <h3 class="plan-name">{plan.name}</h3>
          {plan.description && <p class="plan-description">{plan.description}</p>}
          <div class="price-container">
            <span class="price" data-monthly={plan.monthlyPrice} data-yearly={plan.yearlyPrice}>
              {plan.monthlyPrice === 0 && styles.showFreeForZeroPrice !== false ? (
                'FREE'
              ) : (
                \`\${currency} \${plan.monthlyPrice}\`
              )}
            </span>
            <span class="price-period" data-monthly-period="/month" data-yearly-period="/year">
              {plan.monthlyPrice === 0 && styles.showFreeForZeroPrice !== false ? '' : '/month'}
            </span>
          </div>
          <p class="price-note"></p>
        </div>

        {styles.compactMode && (
          <button class="toggle-features">
            <span class="toggle-text">Show Features</span>
            <svg class="chevron chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <svg class="chevron chevron-up" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        )}

        <ul class={\`features-list \${styles.compactMode ? 'hidden' : ''}\`}>
          {plan.features.map((feature) => (
            <li class={\`feature-item \${feature.included ? 'included' : 'excluded'}\`}>
              {feature.included ? (
                <svg class="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg class="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        <div class="cta-container" data-monthly-cta data-yearly-cta>
          <!-- CTA buttons will be populated by client-side script -->
        </div>
      </div>
    ))}
  </div>
</div>

<style define:vars={{
  primaryColor: styles.primaryColor,
  accentColor: styles.accentColor,
  backgroundColor: styles.backgroundColor,
  textColor: styles.textColor,
  borderRadius: \`\${styles.borderRadius}px\`,
  fontFamily: styles.fontFamily
}}>
  .pricing-table-container {
    background-color: var(--backgroundColor);
    font-family: var(--fontFamily);
    padding: 2rem;
    border-radius: 12px;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--textColor);
  }

  .header-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
  }

  .billing-toggle {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .toggle-container {
    display: inline-flex;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }

  .toggle-btn {
    padding: 0.5rem 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.2s;
    font-family: inherit;
    color: var(--textColor);
  }

  .toggle-btn.active {
    background-color: var(--primaryColor);
    color: white;
  }

  .yearly-incentive {
    position: absolute;
    top: -45px;
    right: calc(50% - 140px);
    transform: rotate(-8deg);
    pointer-events: none;
  }

  .incentive-text {
    font-family: 'Caveat', cursive;
    font-size: 1.5rem;
    font-weight: 600;
    color: #f59e0b;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    white-space: nowrap;
  }

  .incentive-arrow {
    position: absolute;
    top: 20px;
    right: -35px;
    transform: rotate(15deg);
  }

  .pricing-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .pricing-grid.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .pricing-card {
    background: white;
    border-radius: var(--borderRadius);
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    position: relative;
    transition: all 0.3s;
  }

  .pricing-card.featured {
    border: 2px solid var(--accentColor);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    transform: scale(1.05);
  }

  .horizontal-scroll .pricing-card {
    flex-shrink: 0;
    snap-align: center;
    min-width: 280px;
    width: calc(70vw - 2rem);
    max-width: 400px;
  }

  .featured-badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--accentColor);
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .plan-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .plan-name {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--textColor);
  }

  .plan-description {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }

  .price-container {
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--textColor);
  }

  .price-period {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .price-note {
    font-size: 0.75rem;
    color: #9ca3af;
    min-height: 1rem;
  }

  .toggle-features {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accentColor);
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .features-list {
    list-style: none;
    margin-bottom: 1.5rem;
  }

  .features-list.hidden {
    display: none;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  .feature-item.included {
    color: var(--textColor);
  }

  .feature-item.included .feature-icon {
    stroke: var(--accentColor);
  }

  .feature-item.excluded {
    color: #9ca3af;
  }

  .feature-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .cta-container a,
  .cta-container button {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: var(--borderRadius);
    text-align: center;
    font-weight: 600;
    transition: all 0.2s;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .cta-container .primary {
    background-color: var(--primaryColor);
    color: white;
  }

  .cta-container .accent {
    background-color: var(--accentColor);
    color: white;
  }

  .cta-container .promotional {
    background-color: color-mix(in srgb, var(--accentColor) 20%, transparent);
    color: var(--accentColor);
    border: 2px solid var(--accentColor);
    font-size: 1.125rem;
  }
</style>

<script>
  // Client-side interactivity
  const initPricingTable = () => {
    let currentBilling = '${defaultPeriod}';
    const currency = '${currency}';

    // Initialize billing toggle
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
      const period = btn.getAttribute('data-period');
      if (period === currentBilling) {
        btn.classList.add('active');
      }
      
      btn.addEventListener('click', () => {
        currentBilling = period;
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updatePrices();
      });
    });

    // Initialize CTAs for all plans
    const plans = ${JSON.stringify(plans)};
    plans.forEach(plan => {
      const card = document.querySelector(\`[data-plan-id="\${plan.id}"]\`);
      if (!card) return;

      const ctaContainer = card.querySelector('.cta-container');
      updateCTA(ctaContainer, plan, currentBilling);
    });

    // Toggle features
    document.querySelectorAll('.toggle-features').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.pricing-card');
        const featuresList = card.querySelector('.features-list');
        const toggleText = btn.querySelector('.toggle-text');
        const chevronDown = btn.querySelector('.chevron-down');
        const chevronUp = btn.querySelector('.chevron-up');

        featuresList.classList.toggle('hidden');
        if (featuresList.classList.contains('hidden')) {
          toggleText.textContent = 'Show Features';
          chevronDown.style.display = '';
          chevronUp.style.display = 'none';
        } else {
          toggleText.textContent = 'Hide Features';
          chevronDown.style.display = 'none';
          chevronUp.style.display = '';
        }
      });
    });

    function updatePrices() {
      plans.forEach(plan => {
        const card = document.querySelector(\`[data-plan-id="\${plan.id}"]\`);
        if (!card) return;

        const priceEl = card.querySelector('.price');
        const periodEl = card.querySelector('.price-period');
        const noteEl = card.querySelector('.price-note');
        const ctaContainer = card.querySelector('.cta-container');

        const price = currentBilling === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
        const showFree = ${styles.showFreeForZeroPrice !== false};

        if (price === 0 && showFree) {
          priceEl.textContent = 'FREE';
          periodEl.textContent = '';
        } else {
          priceEl.textContent = \`\${currency} \${price}\`;
          periodEl.textContent = currentBilling === 'monthly' ? '/month' : '/year';
        }

        // Update price note
        const config = currentBilling === 'monthly' ? plan.monthly : plan.yearly;
        if (config?.showEquivalentPrice === false) {
          noteEl.textContent = '';
        } else {
          noteEl.textContent = calculateSavingsText(plan);
        }

        // Update CTA
        updateCTA(ctaContainer, plan, currentBilling);
      });
    }

    function calculateSavingsText(plan) {
      if (!plan.yearlyPrice || !plan.monthlyPrice) return '';
      
      const config = currentBilling === 'monthly' ? plan.monthly : plan.yearly;
      if (config?.showEquivalentPrice === false) return '';

      const totalMonthlyPrice = plan.monthlyPrice * 12;
      const savingsVsMonthly = Math.round(totalMonthlyPrice - plan.yearlyPrice);
      const yearlyRateEquivalent = Math.round(plan.yearlyPrice / 12);

      if (config?.equivalentTemplate) {
        return config.equivalentTemplate
          .replace(/{savings_vs_monthly}/g, \`\${currency} \${savingsVsMonthly}\`)
          .replace(/{yearly_rate_equivalent}/g, \`\${currency} \${yearlyRateEquivalent}\`)
          .replace(/{monthly_rate}/g, \`\${currency} \${plan.monthlyPrice}\`)
          .replace(/{yearly_rate}/g, \`\${currency} \${plan.yearlyPrice}\`);
      }

      if (currentBilling === 'monthly' && savingsVsMonthly > 0) {
        return \`Save \${currency} \${savingsVsMonthly} with annual billing\`;
      } else if (currentBilling === 'yearly') {
        return \`\${currency} \${yearlyRateEquivalent} per month\`;
      }
      
      return '';
    }

    function updateCTA(container, plan, billing) {
      const config = billing === 'monthly' ? plan.monthly : plan.yearly;
      
      if (config?.promotionalText && config.promotionalText.trim()) {
        container.innerHTML = \`<div class="promotional">\${config.promotionalText}</div>\`;
        return;
      }

      if (config?.useEmbed && config.embedCode) {
        container.innerHTML = config.embedCode;
        return;
      }

      const buttonText = config?.buttonText || 'Get Started';
      const buttonLink = config?.buttonLink || '#';
      const openInNewTab = config?.openInNewTab !== false;
      const targetAttr = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
      const buttonClass = plan.isFeatured ? 'accent' : 'primary';

      container.innerHTML = \`<a href="\${buttonLink}"\${targetAttr} class="\${buttonClass}">\${buttonText}</a>\`;
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingTable);
  } else {
    initPricingTable();
  }
</script>
`;

  return astroComponent;
};
