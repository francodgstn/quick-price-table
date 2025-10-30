export const defaultData = {
  header: {
    enabled: true,
    title: 'Choose Your Plan',
    subtitle: 'Select the perfect plan for your needs',
    featuredBadge: 'Most Popular',
    showYearlyIncentive: true,
    yearlyIncentiveText: 'Save more!'
  },
  styles: {
    primaryColor: '#3B82F6',
    accentColor: '#2563EB',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderRadius: 12,
    fontFamily: 'system-ui',
    layoutMode: 'responsive',
    compactMode: false,
    showFreeForZeroPrice: true,
    currency: 'CHF',
    billingTerminology: 'yearly'
  },
  plans: [
    {
      id: 1,
      name: 'Basic',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { id: 1, text: 'Up to 3 Projects', included: true },
        { id: 2, text: '5 GB Storage', included: true },
        { id: 3, text: 'Basic Support', included: true },
        { id: 4, text: 'Team Collaboration', included: false },
        { id: 5, text: 'Advanced Analytics', included: false },
        { id: 6, text: 'Priority Support', included: false }
      ],
      actionType: 'button',
      actionButtonText: 'Get Started Free',
      actionButtonLink: '#signup',
      monthlyButtonText: 'Start Free',
      monthlyButtonLink: '#signup-free',
      yearlyButtonText: 'Start Free',
      yearlyButtonLink: '#signup-free',
      actionEmbedCode: '',
      isFeatured: false,
      monthlyPromo: '',
      yearlyPromo: '',
      gradientEnabled: false,
      gradientColor: '#3B82F6',
      gradientDirection: 'to bottom'
    },
    {
      id: 2,
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { id: 1, text: 'Unlimited Projects', included: true },
        { id: 2, text: '100 GB Storage', included: true },
        { id: 3, text: 'Priority Support', included: true },
        { id: 4, text: 'Team Collaboration', included: true },
        { id: 5, text: 'Advanced Analytics', included: true },
        { id: 6, text: 'Custom Integrations', included: false }
      ],
      actionType: 'button',
      actionButtonText: 'Start Trial',
      actionButtonLink: '#signup-pro',
      monthlyButtonText: 'Start Monthly',
      monthlyButtonLink: '#signup-pro-monthly',
      yearlyButtonText: 'Save with Annual',
      yearlyButtonLink: '#signup-pro-yearly',
      actionEmbedCode: '',
      isFeatured: true,
      monthlyPromo: '',
      yearlyPromo: 'Save {savings_vs_monthly} per year - Only {yearly_rate_equivalent}/month',
      gradientEnabled: false,
      gradientColor: '#3B82F6',
      gradientDirection: 'to bottom'
    },
    {
      id: 3,
      name: 'Enterprise',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { id: 1, text: 'Unlimited Everything', included: true },
        { id: 2, text: 'Unlimited Storage', included: true },
        { id: 3, text: '24/7 Dedicated Support', included: true },
        { id: 4, text: 'Advanced Team Tools', included: true },
        { id: 5, text: 'Custom Analytics', included: true },
        { id: 6, text: 'Custom Integrations', included: true }
      ],
      actionType: 'button',
      actionButtonText: 'Contact Sales',
      actionButtonLink: '#contact',
      monthlyButtonText: 'Contact Sales',
      monthlyButtonLink: '#contact-monthly',
      yearlyButtonText: 'Contact Sales',
      yearlyButtonLink: '#contact-yearly',
      actionEmbedCode: '',
      isFeatured: false,
      monthlyPromo: '',
      yearlyPromo: 'Best value - Save {savings_vs_monthly} with annual billing',
      gradientEnabled: false,
      gradientColor: '#3B82F6',
      gradientDirection: 'to bottom'
    }
  ],
  defaultBilling: 'monthly'
};

// Export individual parts for backward compatibility
export const defaultPlans = defaultData.plans;
export const defaultStyles = defaultData.styles;
export const defaultHeader = {
  enabled: defaultData.header.enabled,
  title: defaultData.header.title,
  subtitle: defaultData.header.subtitle,
  featuredBadge: defaultData.header.featuredBadge,
  defaultBillingPeriod: defaultData.defaultBilling,
  showYearlyIncentive: defaultData.header.showYearlyIncentive,
  yearlyIncentiveText: defaultData.header.yearlyIncentiveText
};
