import type { FormInstance, FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type SubmitEventHandler = Required<FormProps<FieldType>>['onFinish'];

type FieldType = {
  email: string;
  password: string;
};

type Props = {
  form?: FormInstance;
  onSubmit: SubmitEventHandler;
  isLoading?: boolean;
};

export const LoginForm = (props: Props) => {
  const { onSubmit, form, isLoading } = props;
  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="mt-2"
          loading={isLoading}
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};
