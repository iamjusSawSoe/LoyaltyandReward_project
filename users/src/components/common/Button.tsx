import type { ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
  buttonType?: "fill" | "default" | "cancel" | "disabled";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  buttonType = "default",
  onClick,
  ...buttonProperties
}: Props) {
  const buttonClass = () => {
    switch (buttonType) {
      case "default":
        return "btn--default";
      case "fill":
        return "btn--fill";
      case "cancel":
        return "btn--cancel";
      default:
        break;
    }
  };

  return (
    <div className="btn-container">
      <button onClick={onClick} className={`btn ${buttonClass()}`} {...buttonProperties}>
        {text}
      </button>
    </div>
  );
}
