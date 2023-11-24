import { Button, Form, Modal, Steps } from 'antd';
import type { Dispatch } from 'react';
import { useMemo, useState } from 'react';
import { PlanCards } from './plan-cards';
import { NewOrganizationForm } from './new-organization-form';

const { useForm } = Form;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const NewOrganizationModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  const [step, setStep] = useState(0);
  const [form] = useForm();
  const [plan, setPlan] = useState<string>();

  const onCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setStep(0);
    setPlan(undefined);
  };

  const onSubmit = () => {
    // TODO: Create organization
  };

  const steps = useMemo(() => {
    return [
      {
        title: 'Info',
        content: <NewOrganizationForm form={form} />,
        validate: async () => form.validateFields(),
      },
      {
        title: 'Plan',
        content: <PlanCards onPlanSelect={setPlan} selectedPlan={plan} />,
        validate: async () => !!plan,
      },
      {
        title: 'Pay',
        content: <div>Pay</div>,
      },
    ];
  }, [form, plan]);

  const items = useMemo(() => {
    return steps.map((item) => ({ key: item.title, title: item.title }));
  }, [steps]);

  const onNext = async () => {
    const valid = await steps[step]?.validate?.();
    if (step === items.length - 1) return;
    if (!valid) return;
    setStep((prevStep) => prevStep + 1);
  };

  const onPrev = async () => {
    if (step === 0) return;
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Modal
      title="Create New Organization"
      open={isModalOpen}
      onCancel={onCancel}
      footer={
        <>
          {step !== 0 && <Button onClick={onPrev}>Previous</Button>}
          {step < steps.length - 1 ? (
            <Button type="primary" onClick={onNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={onSubmit}>
              Create
            </Button>
          )}
        </>
      }
      width={'fit-content'}
    >
      <Steps current={step} items={items} />
      <div className="mt-4">{steps[step].content}</div>
    </Modal>
  );
};
