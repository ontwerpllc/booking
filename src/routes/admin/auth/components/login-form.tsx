import { Button, Form, FormInstance, FormProps, Input } from 'antd';

type SubmitEventHandler = Required<FormProps>['onFinish'];

type FieldType = {
  email?: string;
  password?: string;
};

type Props = {
  form?: FormInstance;
  onSubmit: SubmitEventHandler;
  submitText?: string;
};

export const LoginForm = (props: Props) => {
  const { onSubmit, submitText = 'Sign in', form } = props;
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
        <Button type="primary" htmlType="submit" block className="mt-2">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};
