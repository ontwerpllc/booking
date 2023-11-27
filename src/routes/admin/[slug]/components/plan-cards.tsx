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

export type PlanCardsProps = {
  currentPlan?: string;
  selectedPlan?: string;
  onPlanSelect: (key: string) => void;
};

export const PlanCards = ({
  currentPlan,
  selectedPlan,
  onPlanSelect,
}: PlanCardsProps) => {
  const { token } = theme.useToken();

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
              <Typography.Text
                className={cn('font-semibold', {
                  ['text-2xl ']: plan.mostPopular,
                  ['text-xl']: !plan.mostPopular,
                })}
              >
                {plan.name}
              </Typography.Text>
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
              <Typography.Text>{plan.description}</Typography.Text>
            </div>
            <div className="mt-4">
              <Typography.Text className="text-4xl font-bold">
                ${plan.price}
              </Typography.Text>
              <Typography.Text>/month</Typography.Text>
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
