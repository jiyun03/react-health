import { NavLink } from "react-router-dom";

function Header(props) {
  const assetUrl = process.env.PUBLIC_URL

  return (
    <header className={`header ${props.type}`}>
      <div className="header__inner">
        <div className="header__logo">
          <NavLink to="/">
            <img src={`${assetUrl}/assets/img/logo.png`} alt="알약 로고" />
          </NavLink>
        </div>
        <div className="header__page">
          {props.name}
        </div>
      </div>
    </header>
  )
}

export default Header