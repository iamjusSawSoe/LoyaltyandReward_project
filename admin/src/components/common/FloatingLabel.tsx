import { useState } from "react";

type FloatLabelProps = {
  children: React.ReactNode;
  label: string;
  value: string;
};
const FloatLabel = (props: FloatLabelProps) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value } = props;

  const labelClass = focus || value ? "label label-float" : "label";

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
