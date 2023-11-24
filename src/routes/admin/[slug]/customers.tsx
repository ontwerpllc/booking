import { Card, List } from 'antd';
import { getCustomers } from '../../../api/functions/getCustomers';
import { getAccountName } from '../../../api/functions/getAccountName';

const AdminDashboardCustomers = () => {
  const customers = getCustomers();
  const sorted = customers
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .map((customer) => ({
      ...customer,
      key: customer.id,
    }));
  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={sorted}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={getAccountName(item)}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdminDashboardCustomers;
