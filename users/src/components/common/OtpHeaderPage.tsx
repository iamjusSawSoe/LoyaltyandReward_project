import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type Props = {
  headerText: string;
};

export default function OtpHeaderPage({ headerText }: Props) {
  const phoneNumber = useSelector((state: RootState) => state.register.phoneNumber);
  const formatPhoneNumber = () => {
    const ph = phoneNumber.split("09")[1];
    const lastNumber = ph.split("").reverse()[0];
    let star = "";
    for (let index = 0; index < ph.length - 1; index++) {
      star += "*";
    }
    return `+959${star}${lastNumber}`;
  };
  return (
    <div className="otp">
      <h2 className="otp__header">Hello!</h2>
      <p>
        {headerText} <span className="text-yellow font-bold">{formatPhoneNumber()}</span>
      </p>
    </div>
  );
}
