import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox } from "@mui/material";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import scannerImg from "../assets/Scanner.svg";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import PageLayout from "../components/common/PageLayout";
import PhoneNoBox from "../components/common/PhoneNoBox";
import TextBox from "../components/common/TextBox";
import useClaimPoints from "../hooks/useClaimPoints";
import type { RootState } from "../store";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CollectPoints() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [pointCode, setPointCode] = useState<string>("");

  const { token } = useSelector((state: RootState) => state.register);

  const {
    isLoading,
    collectPoints,
    phoneNoError,
    pointCodeError,
    setPhoneNoError,
    setPointCodeError,
  } = useClaimPoints(phoneNumber, pointCode);

  useEffect(() => {
    if (phoneNumber !== "" && pointCode !== "") {
      setPhoneNoError(false);
      setPointCodeError(false);
    } else if (phoneNumber !== "") {
      setPhoneNoError(false);
    } else if (pointCode !== "") {
      setPointCodeError(false);
    }
  }, [phoneNumber, pointCode, setPhoneNoError, setPointCodeError]);

  const goToPage = () => {
    if (token.expire === 0 || token.expire < new Date().getTime()) return "/enter-phone-no";
    else return "/my-points";
  };

  const isErrorStage = () => {
    if ((pointCodeError && phoneNoError) || pointCodeError || phoneNoError) {
      return "error-stage";
    }
    return;
  };

  // FIXME: CHECK AFTER PRODUCT TEAM OR UI/UX CONFIRMATION
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const handleScan = (data: any) => {
    if (data) {
      setPointCode(data);
      setIsScannerOpen(false);
    }
  };

  const onScanFile = () => {
    setIsScannerOpen((prevData) => !prevData);
  };

  useEffect(() => {
    setPointCode(searchParams.get("point_code") || "");
  }, [searchParams]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={isErrorStage()}>
          <PageLayout>
            <div className="form-box">
              <PhoneNoBox
                labelText="Enter Mobile Number"
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                error={phoneNoError}
              />
              <TextBox
                error={pointCodeError}
                errorMessage="Please enter your point code."
                value={pointCode}
                setValue={setPointCode}
                labelText="Enter Point Code "
                labelIcon={<FontAwesomeIcon icon={faInfoCircle as IconDefinition} />}
                endAdornmentIcon={scannerImg}
                endAdornmentAction={onScanFile}
              />
              {isScannerOpen && (
                <QrScanner
                  onDecode={(result) => handleScan(result)}
                  onError={(error) => console.log(error?.message)}
                />
              )}
            </div>

            <div className="checkbox">
              <Checkbox
                {...label}
                icon={<CheckBoxOutlineBlankIcon sx={{ color: "#2470a2" }} />}
                checkedIcon={<CheckBoxIcon sx={{ color: "white" }} />}
                defaultChecked
                className="checkbox__item"
              />
              <label className="checkbox__label">
                by continue you are agree to our{" "}
                <Link to="/#" className="link-label">
                  Terms <br /> and Conditions
                </Link>
              </label>
            </div>

            <Button text="Collect Your Points!" onClick={collectPoints} />

            <div className="inline-link">
              <Link to={goToPage()} className="link-label">
                check my points
              </Link>
            </div>
          </PageLayout>
        </div>
      )}
    </>
  );
}
