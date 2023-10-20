import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Row,
  Space,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import PlusSmallIcon from '../../../icons/plus-small';
import { getAccountName } from '../../../api/functions/getAccountName';
import { getBookings } from '../../../api/functions/getBookings';
import { useParams } from 'react-router-dom';
import { getBusiness } from '../../../api/functions/getBusiness';
import { Booking } from '../../../api/types/booking';
import { TimeSlot } from '../../../api/types/time-slot';
import { Account } from '../../../api/types/account';

const { Text } = Typography;

const AdminDashboardIndex = () => {
  const { companyId } = useParams();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    timeSlot: TimeSlot;
    member: Account;
  }>();
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const onBookingSelect = (booking?: Booking) => {
    setSelectedBooking(booking);
    onBookingDetailsOpen();
  };

  const onAddBookingSelect = (timeSlot: TimeSlot, member: Account) => {
    setIsAddBookingOpen(true);
    setSelectedTimeSlot({ timeSlot, member });
  };

  const onBookingDetailsOpen = () => {
    setIsBookingDetailsOpen(true);
  };

  const onBookingDetailsClose = () => {
    setSelectedBooking(undefined);
    setIsBookingDetailsOpen(false);
  };

  const onAddBookingClose = () => {
    setSelectedBooking(undefined);
    setIsAddBookingOpen(false);
  };

  const business = getBusiness({ businessUid: companyId });
  const members = business?.members ?? [];
  const timeSlots = business?.timeSlots ?? [];

  return (
    <>
      <Space direction="vertical" className="w-full">
        <Row gutter={[16, 6]}>
          <Col>
            <DatePicker
              defaultValue={dayjs()}
              onSelect={setSelectedDate}
              allowClear={false}
            />
          </Col>
        </Row>
        {members.map((member) => (
          <Card title={getAccountName(member)} key={member.id}>
            <Row gutter={[12, 12]}>
              {timeSlots.map((timeSlot) => {
                const bookings = getBookings(
                  selectedDate.format('YYYY-MM-DD'),
                  member.id,
                );
                const taken = bookings?.find(
                  (b) => b.timeSlot?.id === timeSlot.id,
                );

                return (
                  <Col className="w-32 text-center" key={timeSlot.id}>
                    <Text>{timeSlot.time}</Text>
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
              })}
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
        {selectedTimeSlot?.member
          ? getAccountName(selectedTimeSlot?.member)
          : null}
      </Drawer>
    </>
  );
};

export default AdminDashboardIndex;
