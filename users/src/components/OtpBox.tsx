import { TextField } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  labelText: string;
  labelIcon?: ReactNode;
  children?: ReactNode;
  otpNo: {
    [key: string]: string;
  };
  otpDisabled?: boolean;
  // eslint-disable-next-line autofix/no-unused-vars
  onOtpChange: (otpNo: { [key: string]: string }) => void;
};

export default function OtpBox(props: Props) {
  const handleRemoveKey = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0) {
      // Handle backspace key: remove the previous key and move focus
      let newOtpNo = {};
      if (props.otpNo[`number${index + 1}`] === "") {
        newOtpNo = {
          ...props.otpNo,
          [`number${index}`]: "",
        };
        document.getElementById(`digit${index}`)?.focus();
      } else {
        newOtpNo = {
          ...props.otpNo,
          [`number${index + 1}`]: "",
        };
        document.getElementById(`digit${index + 1}`)?.focus();
      }
      props.onOtpChange(newOtpNo);
    }
  };
  return (
    <div className="textbox">
      <div className="flex-icon">
        <label className="textbox__label">{props.labelText}</label>
        {props.labelIcon}
      </div>

      <div className="otp-stack">
        {Array.from({ length: 6 }, (_, index) => (
          <TextField
            disabled={props.otpDisabled}
            key={index}
            id={`digit${index + 1}`}
            className="textbox__input"
            hiddenLabel
            size="small"
            name={`number${index + 1}`}
            type="password"
            value={props.otpNo[`number${index + 1}`]}
            onChange={(e) => {
              const key = e.target.value.replace(/[^0-9]/g, "");
              if (key) {
                const newOtpNo = {
                  ...props.otpNo,
                  [`number${index + 1}`]: key,
                };
                document.getElementById(`digit${index + 2}`)?.focus();
                props.onOtpChange(newOtpNo);
              }
            }}
            onKeyDown={(e) => handleRemoveKey(index, e as React.KeyboardEvent<HTMLInputElement>)}
            inputProps={{
              pattern: "[0-9]*",
              inputMode: "numeric",
              maxLength: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
