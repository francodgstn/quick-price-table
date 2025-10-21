export const defaultPlans = [
  {
    id: 1,
    name: 'Your First Month 🚀',
    monthlyPrice: 55,
    yearlyPrice: 0,
    description: 'Best option to get started',
    features: [
      { text: 'Unlimited class attendance', included: true },
      { text: 'Access to all training sessions', included: true },
      { text: 'Access to the gym facilities', included: true },
      { text: 'Free HMD T-shirt', included: true }
    ],
    buttonText: 'Join Now',
    buttonLink: '',
    embedCode: '',
    useEmbed: false,
    monthly: {
      buttonText: 'Join Now',
      buttonLink: '',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '',
      showEquivalentPrice: true,
      equivalentTemplate: '🎁 Get it for FREE with a yearly plan!'
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: '',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '🎁 Get it for FREE, choose a yearly plan!',
      showEquivalentPrice: true,
      equivalentTemplate: 'FREE with a yearly plan!'
    },
    isFeatured: true
  },
  {
    id: 2,
    name: 'Students 👍',
    monthlyPrice: 70,
    yearlyPrice: 660,
    description: 'Special rate for students',
    features: [
      { text: 'Unlimited class attendance', included: true },
      { text: 'Access to all training sessions', included: true },
      { text: 'Access to the gym facilities', included: true },
      { text: 'Free HMD T-shirt', included: true },
      { text: 'Discount on sparring equipment', included: true },
      { text: 'Valid student ID required', included: true }
    ],
    buttonText: 'Join Now',
    buttonLink: '',
    embedCode: '',
    useEmbed: false,
    monthly: {
      buttonText: 'Join Now',
      buttonLink: 'https://hmdbasel.payrexx.com/pay?tid=4714fa14',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '',
      showEquivalentPrice: true,
      equivalentTemplate: 'Only {equivalent} with annual billing'
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: 'https://hmdbasel.payrexx.com/pay?tid=eabfd528',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '',
      showEquivalentPrice: true,
      equivalentTemplate: 'Save {savings_vs_monthly} vs monthly'
    },
    isFeatured: false
  },
  {
    id: 3,
    name: 'Standard 👊',
    monthlyPrice: 85,
    yearlyPrice: 840,
    description: 'Complete training for body and mind',
    features: [
      { text: 'Unlimited class attendance', included: true },
      { text: 'Access to all training sessions', included: true },
      { text: 'Access to the gym facilities', included: true },
      { text: 'Free HMD T-shirt', included: true },
      { text: 'Discount on sparring equipment', included: true }
    ],
    buttonText: 'Join Now',
    buttonLink: '',
    embedCode: '',
    useEmbed: false,
    monthly: {
      buttonText: 'Join Now',
      buttonLink: 'https://hmdbasel.payrexx.com/pay?tid=55342067',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '',
      showEquivalentPrice: true,
      equivalentTemplate: 'Only {equivalent} with annual billing'
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: 'https://hmdbasel.payrexx.com/pay?tid=35983290',
      embedCode: '',
      useEmbed: false,
      openInNewTab: true,
      promotionalText: '',
      showEquivalentPrice: true,
      equivalentTemplate: 'Save {savings_vs_monthly} vs monthly'
    },
    isFeatured: false
  }
];

export const defaultData = {
  header: {
    enabled: true,
    title: 'Choose Your Plan',
    subtitle: 'Select the perfect plan for your needs',
    featuredBadge: 'Most Popular'
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
    showFreeForZeroPrice: true
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
      featured: false,
      monthlyPromo: '',
      yearlyPromo: ''
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
      featured: true,
      monthlyPromo: '',
      yearlyPromo: 'Save {savings_vs_monthly} per year - Only {yearly_rate_equivalent}/month'
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
      featured: false,
      monthlyPromo: '',
      yearlyPromo: 'Best value - Save {savings_vs_monthly} with annual billing'
    }
  ],
  defaultBilling: 'monthly'
};

export const defaultHeader = {
  show: false,
  title: 'Begin your Martial Arts journey today!',
  subtitle: 'Join our Hwalmoodo Kickboxing community in Basel',
  featuredBadgeText: 'Get Started',
  defaultBillingPeriod: 'monthly'
};
