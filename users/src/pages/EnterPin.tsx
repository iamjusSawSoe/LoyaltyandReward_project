import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OtpBox from "../components/OtpBox";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import PageLayout from "../components/common/PageLayout";
import useEnterPin from "../hooks/useEnterPin";
import useForgotPin from "../hooks/useForgotPin";

const EnterPin = () => {
  const { otpNo, setOtpNo, isLoading, onHandleContinue, btnDisabled } = useEnterPin();
  const { forgotPin } = useForgotPin();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="enter-pin-container">
          <PageLayout>
            <div className="form-box">
              <OtpBox
                otpNo={otpNo}
                onOtpChange={setOtpNo}
                labelText="Enter PIN"
                labelIcon={<FontAwesomeIcon icon={faInfoCircle as IconDefinition} />}
              />
            </div>

            <a onClick={forgotPin} className="link-label">
              forgot PIN?
            </a>

            <div className="enter-pin-btn">
              <Button
                text="Continue"
                onClick={onHandleContinue}
                disabled={btnDisabled}
              />
            </div>
          </PageLayout>
        </div>
      )}
    </>
  );
};

export default EnterPin;
