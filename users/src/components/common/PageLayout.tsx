import type { HTMLProps, ReactNode } from "react";
import bottomImg from "../../assets/botoom visual.png";
import HeaderText from "./HeaderText";

type HeaderProps = {
  children: ReactNode;
  mainLogo?: boolean;
} & HTMLProps<HTMLDivElement>;

export default function PageLayout({ children, mainLogo = false, ...properties }: HeaderProps) {
  return (
    <div {...properties}>
      <div className="outer">
        <div className="inner" />

        <HeaderText isMainLogo={mainLogo} />
        <div className="container">
          <div className="container__content">{children}</div>
        </div>

        <div className="footer">
          <div className="footer__container">
            <img src={bottomImg} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
