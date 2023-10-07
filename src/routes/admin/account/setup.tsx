import { Steps } from 'antd';
import { useState } from 'react';

const AdminAccountSetup = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <>
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Finished',
          },
          {
            title: 'In Progress',
          },
          {
            title: 'Waiting',
          },
        ]}
      />
    </>
  );
};

export default AdminAccountSetup;
