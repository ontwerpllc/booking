import { mockBookings } from '../mocks/booking';

export function getBookings(date: string, memberId: number) {
  const bookings = mockBookings;

  const filteredBookings = bookings.filter(
    (booking) => booking.date === date && booking.memberId === memberId,
  );
  return filteredBookings;
}
