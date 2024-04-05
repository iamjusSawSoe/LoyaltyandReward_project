import CustomMessage from "@/components/CustomMessage";
import CustomToast from "@/components/common/CustomAlert";
import { RootState } from "@/store";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import AlertModal from "../components/modal/AlertModal";
import Routes from "../router/routers";

const App = () => {
  const { isLoading } = useSelector((state: RootState) => state.loading);

  return (
    <Spin tip="Loading" spinning={isLoading} className="loading">
      <CustomToast />
      <AlertModal />
      <CustomMessage />
      <Routes />
    </Spin>
  );
};

export default App;
