import { TextField } from "@mui/material";
import { useCallback, type ChangeEvent, type ReactNode } from "react";

type PhoneNoBoxProps = {
  labelText: string;
  labelIcon?: ReactNode;
  phoneNumber: string;
  phoneNumberDisabled?: boolean;
  error?: boolean;
  // eslint-disable-next-line autofix/no-unused-vars
  setPhoneNumber: (value: string) => void;
};

export default function PhoneNoBox({
  labelText,
  labelIcon,
  phoneNumber,
  setPhoneNumber,
  error = false,
  phoneNumberDisabled,
}: PhoneNoBoxProps) {
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedPhoneNumber = event.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(sanitizedPhoneNumber);
  };

  const showError = useCallback(() => {
    if (phoneNumber === "") {
      return "Please enter your mobile number.";
    } else if (phoneNumber.length < 7) {
      return "Mobile number must be at least 7 numbers.";
    }
    return "";
  }, [phoneNumber]);

  return (
    <>
      <div className="phonebox">
        {labelIcon ? (
          <div className="flex-icon">
            <label className="textbox__label">{labelText}</label>
            {labelIcon}
          </div>
        ) : (
          <label className="textbox__label">{labelText}</label>
        )}

        <div className={error ? "error" : ""}>
          <TextField
            error={error}
            disabled={phoneNumberDisabled}
            variant="standard"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={` ${error ? "textbox--error" : "textbox__input"}`}
            hiddenLabel
            size="small"
            inputProps={{
              pattern: "[0-9]*",
              inputMode: "numeric",
              maxLength: 9,
            }}
            InputProps={{
              startAdornment: <div className="red-number">09</div>,
              style: { borderRadius: "5px" },
              disableUnderline: true,
            }}
          />
          {error && <span>{showError()}</span>}
        </div>
      </div>
    </>
  );
}
