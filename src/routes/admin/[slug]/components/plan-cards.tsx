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
import { getPlans } from '~/api/functions/getPlans';
import { CheckIcon } from '~/components/icons';
import { cn } from '~/lib/utils';

const { Text } = Typography;
const { useToken } = theme;

type Props = {
  currentPlan?: string;
  selectedPlan?: string;
  onPlanSelect: (key: string) => void;
};

export const PlanCards = (props: Props) => {
  const { currentPlan, selectedPlan, onPlanSelect } = props;
  const { token } = useToken();

  const plans = getPlans();

  return (
    <Space align="end" className="grid lg:grid-cols-3 mt-6">
      {plans.map((plan) => {
        const key = plan.uid;
        return (
          <Card
            className="lg:w-64"
            key={key}
            style={{
              borderColor:
                selectedPlan === key ? token.colorPrimary : undefined,
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
                    {currentPlan === key ? 'Current' : 'Most Popular'}
                  </Tag>
                ) : currentPlan === key ? (
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
              disabled={currentPlan === key || selectedPlan === key}
              onClick={() => onPlanSelect(key)}
              block
            >
              Select Plan
            </Button>
          </Card>
        );
      })}
    </Space>
  );
};
