export const defaultPlans = [
  {
    id: 1,
    name: 'Your Fist Month 🚀',
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
      useEmbed: false
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: '',
      embedCode: '',
      useEmbed: false
    },
    isFeatured: true,
    showEquivalentPrice: false
  },
  {
    id: 2,
    name: 'Students',
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
      buttonLink: '',
      embedCode: '',
      useEmbed: false
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: '',
      embedCode: '',
      useEmbed: false
    },
    isFeatured: false,
    showEquivalentPrice: true
  },
  {
    id: 3,
    name: 'Standard',
    monthlyPrice: 85,
    yearlyPrice: 840,
    description: 'Full access to all classes',
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
      buttonLink: '',
      embedCode: '',
      useEmbed: false
    },
    yearly: {
      buttonText: 'Join Now',
      buttonLink: '',
      embedCode: '',
      useEmbed: false
    },
    isFeatured: false,
    showEquivalentPrice: true
  }
];

export const defaultStyles = {
  primaryColor: '#cc0000',
  accentColor: '#1c1c1c',
  backgroundColor: '#f9fafb',
  textColor: '#1f2937',
  fontFamily: 'system-ui',
  borderRadius: '12',
  cardShadow: 'lg'
};

export const defaultHeader = {
  show: true,
  title: 'HMD Basel Membership',
  subtitle: 'Join our Hwalmoodo Kickboxing community in Basel',
  featuredBadgeText: 'Get Started'
};
