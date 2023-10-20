import { Account } from './account';
import { Subscription } from './subscription';
import { TimeSlot } from './time-slot';

export type Business = {
  id: number;
  name: string;
  uid: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  subscription: Subscription;
  timeSlots: TimeSlot[];
  members: Account[];
};
