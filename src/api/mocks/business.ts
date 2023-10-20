import { Business } from '../types/business';
import { mockMembers } from './account';
import { mockSubscription1, mockSubscription2 } from './subscription';
import { mockTimeSlots } from './time-slot';

export const mockBusiness1: Business = {
  id: 1,
  uid: 'ontwerp-test-site',
  name: 'Ontwerp Test Site',
  address: '1234 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  subscription: mockSubscription1,
  timeSlots: mockTimeSlots,
  members: mockMembers,
};

export const mockBusiness2: Business = {
  id: 2,
  uid: 'fake-location-2',
  name: 'Fake Location 2',
  address: "5678 King's Row",
  city: "King's Landing",
  state: 'Westeros',
  zip: '12345',
  subscription: mockSubscription2,
  timeSlots: [mockTimeSlots[1], mockTimeSlots[3], mockTimeSlots[5]],
  members: [mockMembers[0]],
};

export const mockBusinesses: Business[] = [mockBusiness1, mockBusiness2];
