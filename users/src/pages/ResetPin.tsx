import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import PageLayout from "../components/common/PageLayout";
import TextBox from "../components/common/TextBox";
import usePasswordChange from "../hooks/usePasswordChange";

export default function ResetPin() {
  const {
    pin,
    setPin,
    confirmPin,
    setConfirmPin,
    isPinEmpty,
    isConfirmPinEmpty,
    handleContinueBtn,
    isErrorStage,
    isLoading,
  } = usePasswordChange();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={isErrorStage()}>
          <PageLayout className="reset-pin">
            <div className="form-box">
              <TextBox
                error={isPinEmpty}
                errorMessage="Please fill your desired PIN"
                labelText="Set Your Pin"
                value={pin}
                setValue={setPin}
                inputType="password"
                inputMode="numeric"
                min={6}
                max={6}
              />
              <TextBox
                error={isConfirmPinEmpty}
                errorMessage="Please fill and confirm your PIN."
                labelText="Confirm Your Pin"
                value={confirmPin}
                setValue={setConfirmPin}
                inputType="password"
                inputMode="numeric"
                min={6}
                max={6}
              />
            </div>

            <Button text="Continue" onClick={handleContinueBtn} />
          </PageLayout>
        </div>
      )}
    </>
  );
}
