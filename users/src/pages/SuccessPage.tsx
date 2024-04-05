import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import PageLayout from "../components/common/PageLayout";
import type { RootState } from "../store";

export default function SuccessPage() {
  const successMessage = useSelector((state: RootState) => state.success.successMessage);

  return (
    <div className="bg-success">
      <PageLayout mainLogo={true}>
        <div className="yay-success">
          <h1>{successMessage?.headerText}</h1>
          <p>{successMessage?.labelText}</p>
          <span>{successMessage?.spanText}</span>
          <Link to={successMessage?.linkUrl} className="yay-success__btn">
            <Button text={successMessage?.buttonText} />
          </Link>
        </div>
      </PageLayout>
    </div>
  );
}
