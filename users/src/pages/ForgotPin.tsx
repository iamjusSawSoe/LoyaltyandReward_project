import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OtpBox from "../components/OtpBox";
import Button from "../components/common/Button";
import OtpHeaderPage from "../components/common/OtpHeaderPage";
import PageLayout from "../components/common/PageLayout";
import useOtpHandling from "../hooks/useOtpHanding";
import useResendCodeHandler from "../hooks/useResendCodeHandler";

const ForgotPin = () => {
  const { otpNo, setOtpNo, isBtnClicked, handleActivateBtn, btnDisabled } = useOtpHandling("reset");
  const { formattedTime, resendCode, showResendLink } = useResendCodeHandler();

  const checkDisabledType = () => {
    if (btnDisabled) return true;
    if (isBtnClicked) return true;
  };

  return (
    <PageLayout className="forgot-pin">
      <OtpHeaderPage headerText="Check your SMS, we just send a confirmation code to your mobile" />

      <div className="form-box">
        <OtpBox
          otpDisabled={isBtnClicked}
          otpNo={otpNo}
          onOtpChange={setOtpNo}
          labelText="Enter Confirmation Code"
          labelIcon={<FontAwesomeIcon icon={faInfoCircle as IconDefinition} />}
        />
      </div>

      {showResendLink ? (
        <div className="resend">
          <a onClick={resendCode} className="link-label">
            Resend Code
          </a>
        </div>
      ) : (
        <p className="otp-timer">
          Didn't receive the code? <br />
          Resend code in <span className="otp-timer__countdown">{formattedTime}</span> sec
        </p>
      )}

      <Button
        text={isBtnClicked ? "Loading..." : "Continue"}
        disabled={checkDisabledType()}
        onClick={handleActivateBtn}
      />
    </PageLayout>
  );
};

export default ForgotPin;
