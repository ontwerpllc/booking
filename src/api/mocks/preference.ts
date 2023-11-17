import type { Preference } from '../types/preference';

export const mockPreference1: Preference = {
  id: 1,
  defaultBusinessId: 1,
};

export const mockPreference2: Preference = {
  id: 2,
  defaultBusinessId: 2,
};

export const mockPreference3: Preference = {
  id: 3,
};

export const mockPreferences: Preference[] = [
  mockPreference1,
  mockPreference2,
  mockPreference3,
];
