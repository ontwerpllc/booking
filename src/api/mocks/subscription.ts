import { Subscription } from '../types/subscription';

export const mockSubscription1: Subscription = {
  id: 1,
  uid: 'basic',
  name: 'Basic',
  description: 'Everything necessary to get started.',
  price: 15,
  features: [
    'Up to 1,000 active users',
    'Basic analytics',
    '48-hour support response time',
  ],
  mostPopular: false,
};

export const mockSubscription2: Subscription = {
  id: 2,
  uid: 'essential',
  name: 'Essential',
  description:
    'Everything in Basic, plus essential tools for growing your business.',
  price: 30,
  features: [
    'Up to 10,000 active users',
    'Advanced analytics',
    'Custom theming',
    '24-hour support response time',
  ],
  mostPopular: true,
};

export const mockSubscription3: Subscription = {
  id: 3,
  uid: 'growth',
  name: 'Growth',
  description: 'Everything in Essential, plus deeper insights.',
  price: 60,
  features: [
    'Unlimited users',
    'Advanced analytics',
    '1-hour, dedicated support response time',
  ],
  mostPopular: false,
};

export const mockSubscriptions: Subscription[] = [
  mockSubscription1,
  mockSubscription2,
  mockSubscription3,
];
