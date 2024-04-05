import { Modal } from "antd";

export const sessionExpired = () => {
  const secondsToGo = 5;

  const instance = Modal.info({
    title: "Session Expired!",
    content: `Your session has ended. Please log in again.`,
  });

  setTimeout(() => {
    instance.destroy();
  }, secondsToGo * 1000);
};
