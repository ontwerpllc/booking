import { Account } from './account';
import { TimeSlot } from './time-slot';

export type Booking = {
  id: number;
  account: Account;
  memberId: number;
  timeSlot: TimeSlot;
  date: string;
};
