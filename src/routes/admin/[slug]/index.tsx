import { Space, Row, Col, DatePicker, Card, Drawer } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getAccountName } from '~/api/functions/getAccountName';
import { useOrganization } from '~/api/hooks/org';
import type { Booking } from '~/api/types/booking';
import { useTypedSearchParams } from '~/hooks/useTypedSearchParams';

const AdminDashboardIndex = () => {
  const params = useTypedSearchParams<'admin.dashboard'>();
  const organization = useOrganization({ slug: params.get('org') });
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
  //   timeSlot: TimeSlot;
  //   member: Account;
  // }>();
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // const onBookingSelect = (booking?: Booking) => {
  //   setSelectedBooking(booking);
  //   onBookingDetailsOpen();
  // };

  // const onAddBookingSelect = (timeSlot: TimeSlot, member: Account) => {
  //   setIsAddBookingOpen(true);
  //   setSelectedTimeSlot({ timeSlot, member });
  // };

  // const onBookingDetailsOpen = () => {
  //   setIsBookingDetailsOpen(true);
  // };

  console.log(selectedDate);

  const onBookingDetailsClose = () => {
    setSelectedBooking(undefined);
    setIsBookingDetailsOpen(false);
  };

  const onAddBookingClose = () => {
    setSelectedBooking(undefined);
    setIsAddBookingOpen(false);
  };

  return (
    <>
      <Space direction="vertical" className="w-full" size={'middle'}>
        <Row gutter={[16, 6]}>
          <Col>
            <DatePicker
              defaultValue={dayjs()}
              onSelect={setSelectedDate}
              allowClear={false}
            />
          </Col>
        </Row>
        {organization.data?.members?.map((member) => (
          <Card
            title={`${member?.first_name} ${member?.last_name}`}
            key={member?.id}
          >
            <Row gutter={[12, 12]}>
              {/* {[].map((timeSlot) => {
                const bookings = getBookings(
                  selectedDate.format('YYYY-MM-DD'),
                  member.id,
                );
                const taken = bookings?.find(
                  (b) => b.timeSlot?.id === timeSlot.id,
                );

                return (
                  <Col className="w-32 text-center" key={timeSlot.id}>
                    <Typography.Text>{timeSlot.time}</Typography.Text>
                    <Button
                      type={taken ? 'primary' : 'dashed'}
                      className={`grid items-center text-center w-full h-fit`}
                      onClick={() => {
                        taken
                          ? onBookingSelect(taken)
                          : onAddBookingSelect(timeSlot, member);
                      }}
                    >
                      {taken ? (
                        <>
                          {taken.account?.firstName}
                          <br />
                          {taken.account?.lastName}
                        </>
                      ) : (
                        <>
                          <PlusSmallIcon />
                          <br />
                          Add
                        </>
                      )}
                    </Button>
                  </Col>
                );
              })} */}
            </Row>
          </Card>
        ))}
      </Space>
      <Drawer
        key={'booking-details'}
        title="Booking Details"
        placement="right"
        onClose={onBookingDetailsClose}
        open={isBookingDetailsOpen}
      >
        {selectedBooking?.account
          ? getAccountName(selectedBooking?.account)
          : null}
      </Drawer>
      <Drawer
        key={'add-booking'}
        title="Add Booking"
        placement="right"
        onClose={onAddBookingClose}
        open={isAddBookingOpen}
      >
        {/* {selectedTimeSlot?.member
          ? getAccountName(selectedTimeSlot?.member)
          : null} */}
      </Drawer>
    </>
  );
};

export default AdminDashboardIndex;
