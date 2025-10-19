export const generateHTML = (plans, styles, header) => {
  const fontLink = styles.fontFamily.includes('Montserrat') 
    ? '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">'
    : '';
  
  const headerHTML = header.show ? `
    <div class="header">
      ${header.title ? `<h1>${header.title}</h1>` : ''}
      ${header.subtitle ? `<p>${header.subtitle}</p>` : ''}
    </div>
    ` : '';
  
  const featuredBadgeText = header.featuredBadgeText || 'Most Popular';
  
  const plansHTML = plans.map(plan => {
    const featuresHTML = plan.features.map(feature => `
          <li class="feature-item">
            <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="${feature.included ? styles.accentColor : '#d1d5db'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${feature.included ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
            </svg>
            <span class="${feature.included ? 'feature-included' : 'feature-excluded'}">${feature.text}</span>
          </li>
          `).join('');
    
    // Monthly and Yearly action data
    const monthlyAction = plan.monthly || { buttonText: plan.buttonText, buttonLink: plan.buttonLink, embedCode: plan.embedCode, useEmbed: plan.useEmbed };
    const yearlyAction = plan.yearly || { buttonText: plan.buttonText, buttonLink: plan.buttonLink, embedCode: plan.embedCode, useEmbed: plan.useEmbed };
    
    const monthlyActionHTML = !monthlyAction.useEmbed 
      ? `<a href="${monthlyAction.buttonLink || '#'}" class="cta-button ${plan.isFeatured ? 'accent' : 'primary'}">${monthlyAction.buttonText || 'Get Started'}</a>`
      : `<div class="embed-container">${monthlyAction.embedCode || ''}</div>`;
    
    const yearlyActionHTML = !yearlyAction.useEmbed 
      ? `<a href="${yearlyAction.buttonLink || '#'}" class="cta-button ${plan.isFeatured ? 'accent' : 'primary'}">${yearlyAction.buttonText || 'Get Started'}</a>`
      : `<div class="embed-container">${yearlyAction.embedCode || ''}</div>`;
    
    // Calculate savings
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    const savings = monthlyCost - yearlyCost;
    const savingsTextMonthly = savings > 0 
      ? `Save CHF ${savings.toFixed(0)} with annual billing`
      : `CHF ${(plan.yearlyPrice / 12).toFixed(2)} per month if billed annually`;
    const savingsTextYearly = `CHF ${(plan.yearlyPrice / 12).toFixed(2)} per month`;
    
    const priceNoteHTML = plan.showEquivalentPrice !== false ? `
          <p class="price-note" 
             data-monthly-text="${savingsTextMonthly}" 
             data-yearly-text="${savingsTextYearly}">
            ${savingsTextMonthly}
          </p>` : `
          <p class="price-note" style="visibility: hidden; min-height: 1rem;">&nbsp;</p>`;
    
    return `
      <div class="pricing-card${plan.isFeatured ? ' featured' : ''}" 
           data-monthly-action="${encodeURIComponent(monthlyActionHTML)}"
           data-yearly-action="${encodeURIComponent(yearlyActionHTML)}">
        ${plan.isFeatured ? `<div class="featured-badge">${featuredBadgeText}</div>` : ''}
        
        <div class="card-header">
          <h3 class="plan-name">${plan.name}</h3>
          <p class="plan-description">${plan.description}</p>
          <div class="price-container">
            <span class="price" data-monthly="${plan.monthlyPrice}" data-yearly="${plan.yearlyPrice}">CHF ${plan.monthlyPrice}</span>
            <span class="price-period">/month</span>
          </div>
          ${priceNoteHTML}
        </div>
        
        <ul class="features">
          ${featuresHTML}
        </ul>
        
        <div class="action-container">
          ${monthlyActionHTML}
        </div>
      </div>
      `;
  }).join('');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${header.title || 'Pricing'}</title>
  ${fontLink}
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: ${styles.fontFamily};
      background-color: ${styles.backgroundColor};
      color: ${styles.textColor};
      padding: 2rem 1rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .header h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: ${styles.textColor};
    }
    .header p {
      font-size: 1.125rem;
      color: #6b7280;
    }
    .billing-toggle {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
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
    }
    .toggle-btn.active {
      background-color: ${styles.primaryColor};
      color: white;
    }
    .toggle-btn:not(.active) {
      color: ${styles.textColor};
    }
    .pricing-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .pricing-grid.cols-2 { grid-template-columns: repeat(2, 1fr); max-width: 900px; margin: 0 auto; }
      .pricing-grid.cols-3 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .pricing-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
      .pricing-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
    }
    .pricing-card {
      position: relative;
      background: white;
      padding: 2rem 1.5rem;
      border-radius: ${styles.borderRadius}px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }
    .pricing-card.featured {
      border: 2px solid ${styles.accentColor};
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      transform: scale(1.05);
    }
    .featured-badge {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${styles.accentColor};
      color: white;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .card-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .plan-name {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: ${styles.textColor};
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
      color: ${styles.textColor};
    }
    .price-period {
      font-size: 0.875rem;
      color: #6b7280;
    }
    .price-note {
      font-size: 0.75rem;
      color: #9ca3af;
    }
    .features {
      list-style: none;
      margin-bottom: 1.5rem;
    }
    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }
    .feature-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      margin-top: 2px;
    }
    .feature-included {
      color: ${styles.textColor};
    }
    .feature-excluded {
      color: #9ca3af;
    }
    .cta-button {
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: ${styles.borderRadius}px;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .cta-button.primary {
      background-color: ${styles.primaryColor};
      color: white;
    }
    .cta-button.accent {
      background-color: ${styles.accentColor};
      color: white;
    }
    .cta-button:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    .embed-container {
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="container">
    ${headerHTML}
    
    <div class="billing-toggle">
      <div class="toggle-container">
        <button class="toggle-btn active" id="monthlyBtn" onclick="switchBilling('monthly')">Monthly</button>
        <button class="toggle-btn" id="yearlyBtn" onclick="switchBilling('yearly')">Yearly</button>
      </div>
    </div>
    
    <div class="pricing-grid cols-${plans.length}">
      ${plansHTML}
    </div>
  </div>
  
  <script>
    let currentBilling = 'monthly';
    
    function switchBilling(period) {
      currentBilling = period;
      
      document.getElementById('monthlyBtn').classList.toggle('active', period === 'monthly');
      document.getElementById('yearlyBtn').classList.toggle('active', period === 'yearly');
      
      document.querySelectorAll('.price').forEach(el => {
        const price = period === 'monthly' ? el.dataset.monthly : el.dataset.yearly;
        el.textContent = 'CHF ' + price;
      });
      
      document.querySelectorAll('.price-period').forEach(el => {
        el.textContent = '/' + (period === 'monthly' ? 'month' : 'year');
      });
      
      document.querySelectorAll('.price-note').forEach(el => {
        if (el.dataset.monthlyText && el.dataset.yearlyText) {
          const text = period === 'monthly' ? el.dataset.monthlyText : el.dataset.yearlyText;
          el.textContent = text;
        }
      });
      
      // Switch action buttons/embeds based on billing period
      document.querySelectorAll('.pricing-card').forEach(card => {
        const actionContainer = card.querySelector('.action-container');
        if (actionContainer) {
          const actionHTML = period === 'monthly' 
            ? decodeURIComponent(card.dataset.monthlyAction)
            : decodeURIComponent(card.dataset.yearlyAction);
          actionContainer.innerHTML = actionHTML;
        }
      });
    }
  </script>
</body>
</html>`;
  return html;
};
