import { TextField } from "@mui/material";
import type { ReactNode } from "react";

type TextBoxProps = {
  labelText: string;
  labelIcon?: ReactNode;
  value: string;
  min?: number;
  max?: number;
  inputType?: string;
  inputMode?: string;
  error?: boolean;
  errorMessage?: string;
  endAdornmentIcon?: string;
  endAdornmentAction?: () => void;
  // eslint-disable-next-line autofix/no-unused-vars
  setValue: (value: string) => void;
};

export default function TextBox({
  labelText,
  labelIcon,
  value,
  min,
  max,
  inputType,
  inputMode,
  error = false,
  errorMessage,
  endAdornmentIcon,
  setValue,
  endAdornmentAction,
}: TextBoxProps) {
  return (
    <>
      <div className="textbox">
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
            value={value}
            className={` ${error ? "textbox--error" : "textbox__input"}`}
            hiddenLabel
            size="small"
            variant="standard"
            type={inputType}
            InputProps={
              endAdornmentIcon
                ? {
                    style: { background: "white", borderRadius: "5px" },
                    disableUnderline: true,
                    endAdornment: (
                      <img
                        className="scanner-img"
                        src={endAdornmentIcon}
                        alt="Scanner Image"
                        onClick={endAdornmentAction}
                        style={{ cursor: "pointer" }}
                      />
                    ),
                  }
                : {
                    style: { background: "white", borderRadius: "5px" },
                    disableUnderline: true,
                  }
            }
            inputProps={{
              maxLength: max,
              minLength: min,
            }}
            onChange={(e) => {
              if (inputMode === "numeric") setValue(e.target.value.replace(/[^0-9]/g, ""));
              else setValue(e.target.value);
            }}
          />
          {error && <span>{errorMessage}</span>}
        </div>
      </div>
    </>
  );
}
