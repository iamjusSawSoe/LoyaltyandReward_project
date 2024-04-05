import { Button, Modal } from "antd";
import React from "react";

type CustomModal = {
  title: string;
  children: React.ReactNode;
  handleSubmit: () => void;
  handleReset: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const CustomModal: React.FC<CustomModal> = ({
  children,
  title,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  handleReset,
}) => {
  return (
    <Modal
      width={1000}
      closeIcon={true}
      title={title}
      centered
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button
          key="back"
          onClick={() => {
            handleReset();
            setIsModalOpen(false);
          }}
        >
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            handleSubmit();
            setIsModalOpen(false);
          }}
        >
          Submit
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
