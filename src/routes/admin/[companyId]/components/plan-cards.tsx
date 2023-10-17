import {
  Typography,
  theme,
  Space,
  Card,
  Tag,
  List,
  Divider,
  Button,
} from 'antd';
import CheckIcon from '../../../../icons/check';
import { cn } from '../../../../lib/utils';

const { Text } = Typography;

const { useToken } = theme;

const plans = [
  {
    name: 'Basic',
    key: 'basic',
    description: 'Everything necessary to get started.',
    price: 15,
    features: [
      'Up to 1,000 active users',
      'Basic analytics',
      '48-hour support response time',
    ],
    mostPopular: false,
  },
  {
    name: 'Essential',
    key: 'essential',
    description:
      'Everything in Basic, plus essential tools for growing your business.',
    price: 30,
    features: [
      'Up to 10,000 active users',
      'Advanced analytics',
      'Custom theming',
      '24-hour support response time',
    ],
    mostPopular: true,
  },
  {
    name: 'Growth',
    key: 'growth',
    description: 'Everything in Essential, plus deeper insights.',
    price: 60,
    features: [
      'Unlimited users',
      'Advanced analytics',
      '1-hour, dedicated support response time',
    ],
    mostPopular: false,
  },
];

type Props = {
  currentPlan?: string;
  selectedPlan?: string;
  onPlanSelect: (key: string) => void;
};

const PlanCards = (props: Props) => {
  const { currentPlan, selectedPlan, onPlanSelect } = props;
  const { token } = useToken();
  return (
    <Space align="end" className="grid lg:grid-cols-3 mt-6">
      {plans.map((plan) => (
        <Card
          className="lg:w-64"
          key={plan.key}
          style={{
            borderColor:
              selectedPlan === plan.key ? token.colorPrimary : undefined,
          }}
        >
          <div className="flex justify-between items-center">
            <Text
              className={cn('font-semibold', {
                ['text-2xl ']: plan.mostPopular,
                ['text-xl']: !plan.mostPopular,
              })}
            >
              {plan.name}
            </Text>
            <div>
              {plan.mostPopular ? (
                <Tag bordered={false} color={token.colorPrimary}>
                  {currentPlan === plan.key ? 'Current' : 'Most Popular'}
                </Tag>
              ) : currentPlan === plan.key ? (
                <Tag>Current</Tag>
              ) : null}
            </div>
          </div>
          <div className="mt-2">
            <Text>{plan.description}</Text>
          </div>
          <div className="mt-4">
            <Text className="text-4xl font-bold">${plan.price}</Text>
            <Text>/month</Text>
          </div>
          <div className="mt-4">
            <List
              split={false}
              dataSource={plan.features}
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
          <Button
            type={plan.mostPopular ? 'primary' : 'default'}
            disabled={currentPlan === plan.key || selectedPlan === plan.key}
            onClick={() => onPlanSelect(plan.key)}
            block
          >
            Select Plan
          </Button>
        </Card>
      ))}
    </Space>
  );
};

export default PlanCards;
