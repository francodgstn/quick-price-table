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

export const defaultStyles = {
  primaryColor: '#1c1c1c',
  accentColor: '#cc0000',
  backgroundColor: '#efefef',
  textColor: '#1f2937',
  fontFamily: 'Montserrat',
  borderRadius: '12',
  cardShadow: 'lg',
  layoutMode: 'responsive', // 'responsive' or 'horizontal-scroll'
  compactMode: false, // when true, features are collapsed by default
  showFreeForZeroPrice: true // when true, display "FREE" instead of "CHF 0"
};

export const defaultHeader = {
  show: false,
  title: 'Begin your Martial Arts journey today!',
  subtitle: 'Join our Hwalmoodo Kickboxing community in Basel',
  featuredBadgeText: 'Get Started',
  defaultBillingPeriod: 'monthly'
};
