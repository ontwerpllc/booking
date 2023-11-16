import { Button, Form, Modal, Steps } from 'antd';
import { Dispatch, useMemo, useState } from 'react';
import { PlanCards } from './plan-cards';
import { NewBusinessForm } from './new-business-form';

const { useForm } = Form;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const NewBusinessModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  const [step, setStep] = useState(0);
  const [businessInfoForm] = useForm();
  const [plan, setPlan] = useState<string>();

  const onCancel = () => {
    setIsModalOpen(false);
    businessInfoForm.resetFields();
    setStep(0);
    setPlan(undefined);
  };

  const onSubmit = () => {
    // TODO: Create business
  };

  const steps = useMemo(() => {
    return [
      {
        title: 'Info',
        content: <NewBusinessForm form={businessInfoForm} />,
        validate: async () => businessInfoForm.validateFields(),
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
  }, [businessInfoForm, plan]);

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
      title="Create New Business"
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
