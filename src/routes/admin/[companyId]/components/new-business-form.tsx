import { Button, Col, Form, FormInstance, FormProps, Input, Row } from 'antd';

type SubmitEventHandler = Required<FormProps>['onFinish'];

type FieldType = {
  name?: string;
  uid?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

type Props = {
  form?: FormInstance;
  onSubmit: SubmitEventHandler;
  submitText?: string;
};

const NewBusinessForm = (props: Props) => {
  const { onSubmit, submitText = 'Create', form } = props;

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Row gutter={16}>
        <Col flex={'auto'}>
          <Form.Item<FieldType>
            label="Business Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your business name' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
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
        <Col>
          <Form.Item<FieldType>
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FieldType>
            label="State / Province"
            name="state"
            rules={[
              { required: true, message: 'Please input your state / province' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block className="mt-2">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewBusinessForm;
