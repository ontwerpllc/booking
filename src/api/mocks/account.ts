import { Account } from '../types/account';
import {
  mockPreference1,
  mockPreference2,
  mockPreference3,
} from './preference';

export const mockOwnerAccount: Account = {
  id: 1,
  email: 'john.doe@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  preference: mockPreference1,
};

export const mockAccount1: Account = {
  id: 2,
  email: 'jane.doe@gmail.com',
  firstName: 'Jane',
  lastName: 'Doe',
  preference: mockPreference3,
};

export const mockAccount2: Account = {
  id: 3,
  email: 'jimmy.john@gmail.com',
  firstName: 'Jimmy',
  lastName: 'John',
  preference: mockPreference3,
};

export const mockMember1: Account = {
  id: 4,
  email: 'jammy.maddick@gmail.com',
  firstName: 'Jammy',
  lastName: 'Maddick',
  preference: mockPreference2,
};

export const mockMember2: Account = {
  id: 5,
  email: 'jackson.rice@gmail.com',
  firstName: 'Jackson',
  lastName: 'Rice',
  preference: mockPreference2,
};

export const mockAccounts: Account[] = [mockAccount1, mockAccount2];

export const mockMembers: Account[] = [mockMember1, mockMember2];
