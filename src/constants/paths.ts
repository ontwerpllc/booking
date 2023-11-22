import type { LeafValues } from '~/constants/types';

export const PATHS = {
  index: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  admin: {
    auth: {
      login: '/admin/auth/login',
      register: '/admin/auth/register',
    },
    dashboard: {
      index: '/admin/dashboard',
      analytics: '/admin/dashboard/analytics',
      customers: '/admin/dashboard/customers',
      settings: {
        general: '/admin/dashboard/settings/general',
        timeSlots: '/admin/dashboard/settings/time-slots',
      },
    },
  },
  user: {
    profile: '/user/profile',
  },
} as const;

export type Path = LeafValues<typeof PATHS>;
