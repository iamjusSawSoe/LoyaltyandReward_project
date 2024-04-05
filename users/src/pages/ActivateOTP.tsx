import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OtpBox from "../components/OtpBox";
import Button from "../components/common/Button";
import OtpHeaderPage from "../components/common/OtpHeaderPage";
import PageLayout from "../components/common/PageLayout";
import useOtpHandling from "../hooks/useOtpHanding";
import useResendCodeHandler from "../hooks/useResendCodeHandler";

export type OtpNo = {
  [key: string]: string;
};

export default function ActivateOTP() {
  const { formattedTime, resendCode, showResendLink } = useResendCodeHandler();
  const { otpNo, setOtpNo, isBtnClicked, handleActivateBtn, btnDisabled } =
    useOtpHandling("register");

  const checkDisabledType = () => {
    if (btnDisabled) return true;
    if (isBtnClicked) return true;
  };

  return (
    <PageLayout className="otp-container">
      <OtpHeaderPage
        headerText="
      Welcome to Citizens Rewards. You need to activate your account to
      check your point history. Check your SMS, we just sent you Activation
      Code to your mobile "
      />

      <div className="form-box resend-code">
        <OtpBox
          otpDisabled={isBtnClicked}
          otpNo={otpNo}
          onOtpChange={setOtpNo}
          labelText="Enter Activation Code"
          labelIcon={<FontAwesomeIcon icon={faInfoCircle as IconDefinition} />}
        />
      </div>

      {showResendLink ? (
        <a onClick={resendCode} className="link-label">
          Resend Code
        </a>
      ) : (
        <p className="otp-timer">
          Didn't received the code? <br />
          Resend code in <span className="otp-timer__countdown">{formattedTime}</span> sec
        </p>
      )}

      <Button
        text={isBtnClicked ? "Loading..." : "Activate"}
        disabled={checkDisabledType()}
        onClick={handleActivateBtn}
      />
    </PageLayout>
  );
}
