import type { HTMLProps } from "react";
// import mainLogo from "../../assets/Main big coin 2x.png";
// import logoHeader from "../../assets/Upper visual 2x.png";
import mainLogo from "../../assets/images/Big coin with shadow/Big coin 2x.png";
import logoHeader from "../../assets/Upper visual 2x-RUwFcjam.png";

type HeaderTextProps = { isMainLogo?: boolean } & HTMLProps<HTMLDivElement>;
export default function HeaderText({ isMainLogo = false, ...properties }: HeaderTextProps) {
  return (
    <div className="header" {...properties}>
      <div className="header__img-container">
        {isMainLogo && <img className="header__main-logo" src={mainLogo} alt="main logo" />}

        <img className="header__logo" src={logoHeader} alt="main logo" />
      </div>
    </div>
  );
}
