import type { Account } from './account';
import type { TimeSlot } from './time-slot';

export type Booking = {
  id: number;
  account: Account;
  memberId: number;
  timeSlot: TimeSlot;
  date: string;
};
