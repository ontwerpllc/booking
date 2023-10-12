import { Form, Modal } from 'antd';
import { Dispatch } from 'react';
import NewBusinessForm from './new-business-form';

const { useForm } = Form;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const NewBusinessModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  const [form] = useForm();

  const onCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onSubmit = () => {};

  return (
    <Modal
      title="Create New Business"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={'fit-content'}
    >
      <NewBusinessForm form={form} onSubmit={onSubmit} />
    </Modal>
  );
};

export default NewBusinessModal;
