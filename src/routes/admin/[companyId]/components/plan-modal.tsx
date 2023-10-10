import {
  Button,
  Card,
  Divider,
  List,
  Modal,
  Space,
  Tag,
  Typography,
  theme,
} from 'antd';
import { Dispatch } from 'react';
import CheckIcon from '../../../../icons/check';

const { Text } = Typography;

const { useToken } = theme;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const PlanModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  const { token } = useToken();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={null}
      width={'fit-content'}
    >
      <Space align="end">
        <Card className="w-64">
          <Text className="text-xl font-semibold">Basic</Text>
          <div className="mt-2">
            <Text>Everything necessary to get started.</Text>
          </div>
          <div className="mt-4">
            <Text className="text-4xl font-bold">$15</Text>
            <Text>/month</Text>
          </div>
          <div className="mt-4">
            <List
              split={false}
              dataSource={[
                'Up to 1,000 active users',
                'Basic analytics',
                '48-hour support response time',
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <CheckIcon
                      style={{ color: token.colorPrimary, strokeWidth: 2 }}
                    />
                    {item}
                  </Space>
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <Button block>Select Plan</Button>
        </Card>
        <Card className="w-64">
          <div className="flex justify-between items-center">
            <Text className="text-2xl font-semibold">Essential</Text>
            <div>
              <Tag bordered={false} color={token.colorPrimary}>
                Most Popular
              </Tag>
            </div>
          </div>
          <div className="mt-2">
            <Text>
              Everything in Basic, plus essential tools for growing your
              business.
            </Text>
          </div>
          <div className="mt-4">
            <Text className="text-4xl font-bold">$30</Text>
            <Text>/month</Text>
          </div>
          <div className="mt-4">
            <List
              split={false}
              dataSource={[
                'Up to 10,000 active users',
                'Advanced analytics',
                'Custom theming',
                '24-hour support response time',
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <CheckIcon
                      style={{ color: token.colorPrimary, strokeWidth: 2 }}
                    />
                    {item}
                  </Space>
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <Button type="primary" block>
            Select Plan
          </Button>
        </Card>
        <Card className="w-64">
          <Text className="text-xl font-semibold">Growth</Text>
          <div className="mt-2">
            <Text>
              Everything in Essential, plus collaboration tools and deeper
              insights.
            </Text>
          </div>
          <div className="mt-4">
            <Text className="text-4xl font-bold">$60</Text>
            <Text>/month</Text>
          </div>
          <div className="mt-4">
            <List
              split={false}
              dataSource={[
                'Unlimited users',
                'Advanced analytics',
                '1-hour, dedicated support response time',
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <CheckIcon
                      style={{ color: token.colorPrimary, strokeWidth: 2 }}
                    />
                    {item}
                  </Space>
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <Button block>Select Plan</Button>
        </Card>
      </Space>
    </Modal>
  );
};

export default PlanModal;
