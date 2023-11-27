import { Modal } from 'antd';
import type { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { PlanCards } from './plan-cards';
import { getBusiness } from '~/api/functions/getBusiness';

export type PlanModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const PlanModal = ({ setIsModalOpen, isModalOpen }: PlanModalProps) => {
  const { companyId } = useParams();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onPlanSelect = (key: string) => {
    // TODO: implement plan selection
    console.log(key);
  };

  const business = getBusiness({ businessUid: companyId });

  return (
    <Modal
      title="Choose a Plan"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={'fit-content'}
    >
      <PlanCards
        currentPlan={business?.subscription.uid}
        onPlanSelect={onPlanSelect}
      />
    </Modal>
  );
};
