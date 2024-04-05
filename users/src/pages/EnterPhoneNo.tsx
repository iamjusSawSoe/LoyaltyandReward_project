import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import PageLayout from "../components/common/PageLayout";
import PhoneNoBox from "../components/common/PhoneNoBox";
import CustomModal from "../components/common/modal/CustomModal";
import useRegistration from "../hooks/useRegistration";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function EnterPhoneNo() {
  const [phoneNo, setPhoneNo] = useState("");
  const isModalOpen = useSelector((state: RootState) => state.customModal.isCustomModal);

  const { isBtnClicked, handleContinueBtn, formEmptyErr, setFormEmptyErr } =
    useRegistration(phoneNo);

  useEffect(() => {
    if (phoneNo !== "") {
      setFormEmptyErr(false);
    }
  }, [phoneNo, setFormEmptyErr]);

  return (
    <PageLayout>
      <div className="form-box">
        <PhoneNoBox
          error={formEmptyErr}
          phoneNumberDisabled={isBtnClicked}
          labelText="Enter Mobile Number"
          phoneNumber={phoneNo}
          setPhoneNumber={setPhoneNo}
        />
      </div>

      <div className="btn--footer">
        <Button
          text={isBtnClicked ? "Loading..." : "Continue"}
          disabled={isBtnClicked}
          onClick={() => handleContinueBtn(phoneNo)}
        />
      </div>

      {isModalOpen && <CustomModal closeRoute="activation" continueRoute="enter-phone-no" />}
    </PageLayout>
  );
}
