import type { FormInstance, FormProps, GlobalToken } from 'antd';
import { Button, Form, Input, Progress, theme } from 'antd';
import { max } from 'lodash';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

type SubmitEventHandler = Required<FormProps<FieldType>>['onFinish'];

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

type Props = {
  form?: FormInstance;
  onSubmit: SubmitEventHandler;
  submitText?: string;
  isLoading?: boolean;
};

type Problem = { error: string; priority: number };

const { useToken } = theme;

function determinePasswordStrength({ password }: { password: string }) {
  let strength = 0;
  const problems: Problem[] = [];
  if (password.match(/[a-z]+/)) {
    strength += 20;
  } else {
    problems.push({
      error: 'Must contain at least one lowercase letter',
      priority: 1,
    });
  }
  if (password.match(/[A-Z]+/)) {
    strength += 20;
  } else {
    problems.push({
      error: 'Must contain at least one uppercase letter',
      priority: 2,
    });
  }
  if (password.match(/[0-9]+/)) {
    strength += 20;
  } else {
    problems.push({
      error: 'Must contain at least one number',
      priority: 3,
    });
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 20;
  } else {
    problems.push({
      error: 'Must contain at least one special character',
      priority: 4,
    });
  }
  if (password.length > 8) {
    strength += 20;
  } else {
    problems.push({
      error: 'Must be at least 8 characters long',
      priority: 5,
    });
  }
  return { strength, problems };
}

function determinePasswordStrengthColor({
  strength,
  token,
}: {
  strength: number;
  token: GlobalToken;
}) {
  let color = token.red;

  if (strength >= 40 && strength < 60) {
    color = token.orange;
  }
  if (strength >= 60 && strength < 100) {
    color = token.yellow;
  }
  if (strength === 100) {
    color = token.green;
  }

  return color;
}

export const RegisterForm = (props: Props) => {
  const { onSubmit, submitText = 'Sign up', form, isLoading } = props;
  const { token } = useToken();
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<string>(
    token.red,
  );
  const [passwordStrength, setPasswordStrength] = useState<
    ReturnType<typeof determinePasswordStrength>
  >({ strength: 0, problems: [] });

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const strength = determinePasswordStrength({
      password: event.target.value,
    });
    const color = determinePasswordStrengthColor({
      strength: strength.strength,
      token,
    });
    setPasswordStrength(strength);
    setPasswordStrengthColor(color);
  };

  const onFinish: SubmitEventHandler = useCallback(
    (values) => {
      if (passwordStrength.strength !== 100) return;
      onSubmit(values);
    },
    [onSubmit, passwordStrength.strength],
  );

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="flex gap-6">
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input />
        </Form.Item>
      </div>

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
        rules={[
          { required: true, message: 'Please input your password' },
          () => ({
            validator() {
              if (passwordStrength.problems.length === 0) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  passwordStrength.problems.find(
                    (x) =>
                      x.priority ===
                      max(passwordStrength.problems.map((y) => y.priority)),
                  )?.error,
                ),
              );
            },
          }),
        ]}
      >
        <Input.Password onChange={onPasswordChange} />
      </Form.Item>
      <Progress
        percent={passwordStrength.strength}
        showInfo={false}
        strokeColor={passwordStrengthColor}
      />

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The passwords that you entered do not match'),
              );
            },
          }),
        ]}
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
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};
