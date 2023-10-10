import { Button, Form, Input } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
};

type Props = {
  onSubmit: (values: FieldType) => void;
  submitText?: string;
};

const LoginForm = (props: Props) => {
  const { onSubmit, submitText = 'Sign in' } = props;
  return (
    <Form onFinish={onSubmit} layout="vertical">
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
        <Button type="primary" htmlType="submit" block className="mt-2">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
