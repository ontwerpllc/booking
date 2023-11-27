import type { FormInstance, FormProps } from 'antd';
import { Col, Form, Input, Row } from 'antd';
import { useRef } from 'react';

type SubmitEventHandler = Required<FormProps<FieldType>>['onFinish'];

type FieldType = {
  name: string;
  uid: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type NewOrganizationFormProps = {
  form?: FormInstance;
  onSubmit?: SubmitEventHandler;
  submitText?: string;
};

export const NewOrganizationForm = ({
  onSubmit,
  form,
}: NewOrganizationFormProps) => {
  const formRef = useRef<FormInstance>(null);

  const onOrganizationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uid = e.target.value.toLowerCase().replace(/\s/g, '-');
    if (!formRef.current) return;
    formRef.current.setFieldsValue({
      uid: uid,
    });
  };

  return (
    <>
      <Form form={form} ref={formRef} onFinish={onSubmit} layout="vertical">
        <Row gutter={16}>
          <Col flex={2}>
            <Form.Item<FieldType>
              label="Organization Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your organization name',
                },
              ]}
            >
              <Input onChange={onOrganizationNameChange} />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item<FieldType>
              label="Unique Identifier"
              name="uid"
              rules={[
                {
                  required: true,
                  message: 'Please input your unique identifier',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Street Address"
          name="street"
          rules={[
            { required: true, message: 'Please input your street address' },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col flex={1}>
            <Form.Item<FieldType>
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item<FieldType>
              label="State / Province"
              name="state"
              rules={[
                {
                  required: true,
                  message: 'Please input your state / province',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item<FieldType>
              label="ZIP / Postal Code"
              name="zip"
              rules={[
                {
                  required: true,
                  message: 'Please input your zip / postal code',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
