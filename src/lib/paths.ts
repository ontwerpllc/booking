import type { LeafValues, ObjectPaths, Paths } from '~/lib/types';
import type { Get, KeysOfUnion } from 'type-fest';

export const PATH = {
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

export type Path = LeafValues<typeof PATH>;

const PATH_PARAM = {
  admin: {
    dashboard: {
      org: 'org',
    },
  },
} as const;

export type PathParam = Exclude<
  Paths<typeof PATH_PARAM>,
  ObjectPaths<typeof PATH_PARAM>
>;

export type PathParamValues<P extends PathParam> = KeysOfUnion<
  Get<typeof PATH_PARAM, P>
>;
