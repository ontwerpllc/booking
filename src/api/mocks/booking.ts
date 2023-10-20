import { mockAccount1, mockMember1, mockMember2 } from './account';
import { Booking } from '../types/booking';
import { mockTimeSlot3, mockTimeSlot5 } from './time-slot';
import dayjs from 'dayjs';

export const mockBooking1: Booking = {
  id: 1,
  account: mockAccount1,
  memberId: mockMember1.id,
  timeSlot: mockTimeSlot3,
  date: dayjs().format('YYYY-MM-DD'),
};

export const mockBooking2: Booking = {
  id: 2,
  account: mockAccount1,
  memberId: mockMember2.id,
  timeSlot: mockTimeSlot5,
  date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
};

export const mockBookings: Booking[] = [mockBooking1, mockBooking2];
