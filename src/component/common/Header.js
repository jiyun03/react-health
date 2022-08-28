import { NavLink, useHistory } from "react-router-dom";

// 이미지
import imgLogo from "../../assets/img/logo.png";
import imgBack from "../../assets/img/back.png";

function Header(props) {
  const back = useHistory();

  return (
    <header className={`header ${props.type}`}>
      <div className="header__inner">
        <div className="header__logo">
          <NavLink to="/">
            <img src={imgLogo} alt="알약 로고" />
          </NavLink>
        </div>
        <div className="header__back" onClick={() => { back.goBack() }}>
          <img src={imgBack} alt="뒤로가기" />
        </div>
        <div className="header__page">
          {props.name}
        </div>
      </div>
    </header>
  )
}

export default Header