import { Modal } from "antd";
import React from "react";

const AlertModal: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modal, contextHolder] = Modal.useModal();

  return <>{contextHolder}</>;
};

export default AlertModal;
