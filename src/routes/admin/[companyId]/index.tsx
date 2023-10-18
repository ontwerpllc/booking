import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Row,
  Space,
  Typography,
  theme,
} from 'antd';
import dayjs from 'dayjs';
import PlusSmallIcon from '../../../icons/plus-small';
import { useState } from 'react';

const { useToken } = theme;
const { Text } = Typography;

const employees = [
  {
    name: 'John Doe',
    id: 1,
    appointments: [
      {
        timeSlotId: 4,
        user: {
          firstName: 'Kaitlyn',
          lastName: 'Jochman',
        },
      },
    ],
  },
  {
    name: 'Jane Doe',
    id: 2,
  },
];

const timeSlots = [
  {
    id: 1,
    time: '9:00 AM',
  },
  {
    id: 2,
    time: '10:00 AM',
  },
  {
    id: 3,
    time: '11:00 AM',
  },
  {
    id: 4,
    time: '12:00 PM',
  },
  {
    id: 5,
    time: '1:00 PM',
  },
  {
    id: 6,
    time: '2:00 PM',
  },
  {
    id: 7,
    time: '3:00 PM',
  },
  {
    id: 8,
    time: '4:00 PM',
  },
  {
    id: 9,
    time: '5:00 PM',
  },
  {
    id: 10,
    time: '6:00 PM',
  },
  {
    id: 11,
    time: '7:00 PM',
  },
  {
    id: 12,
    time: '8:00 PM',
  },
  {
    id: 13,
    time: '9:00 PM',
  },
];

type TimeSlot = (typeof timeSlots)[0];

const AdminDashboardIndex = () => {
  const { token } = useToken();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);

  const onBookingSelect = (timeSlot: TimeSlot, open = false) => {
    setSelectedTimeSlot(timeSlot);
    open && onBookingDetailsOpen();
  };

  const onBookingDetailsOpen = () => {
    setIsBookingDetailsOpen(true);
  };

  const onBookingDetailsClose = () => {
    setSelectedTimeSlot(undefined);
    setIsBookingDetailsOpen(false);
  };

  return (
    <>
      <Space direction="vertical" className="w-full">
        <Row gutter={[16, 6]}>
          <Col>
            <DatePicker defaultValue={dayjs()} />
          </Col>
        </Row>
        {employees.map((employee) => (
          <Card title={employee.name} key={employee.id}>
            <Row gutter={[12, 12]}>
              {timeSlots.map((timeSlot) => {
                const taken = employee.appointments?.find(
                  (appointment) => appointment.timeSlotId === timeSlot.id,
                );
                return (
                  <Col className="w-32 text-center" key={timeSlot.id}>
                    <Text>{timeSlot.time}</Text>
                    <Button
                      type={taken ? 'primary' : 'dashed'}
                      className={`grid items-center text-center w-full h-fit`}
                      style={{
                        borderColor:
                          selectedTimeSlot?.id === timeSlot.id
                            ? token.colorPrimary
                            : undefined,
                      }}
                      onClick={() => {
                        onBookingSelect(timeSlot, !!taken);
                      }}
                    >
                      {taken ? (
                        <>
                          {taken.user.firstName}
                          <br />
                          {taken.user.lastName}
                        </>
                      ) : (
                        <>
                          <PlusSmallIcon />
                          <br />
                          Select
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
        title="Booking Details"
        placement="right"
        onClose={onBookingDetailsClose}
        open={isBookingDetailsOpen}
      >
        {selectedTimeSlot?.time}
      </Drawer>
    </>
  );
};

export default AdminDashboardIndex;
