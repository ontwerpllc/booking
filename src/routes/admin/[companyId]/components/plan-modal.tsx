import { Modal } from 'antd';
import { Dispatch } from 'react';
import PlanCards from './plan-cards';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const PlanModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onPlanSelect = (key: string) => {
    // TODO: implement plan selection
    console.log(key);
  };

  // TODO: Replace with actual plan
  const currentPlan = 'essential';

  return (
    <Modal
      title="Choose a Plan"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={'fit-content'}
    >
      <PlanCards currentPlan={currentPlan} onPlanSelect={onPlanSelect} />
    </Modal>
  );
};

export default PlanModal;
