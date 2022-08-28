import { NavLink } from "react-router-dom";

function Nav() {
  const active = { color: "#ff7e7e" }

  return (
    <nav className="nav">
      <ul className="nav__box">
        <li className="nav__item">
          <NavLink activeStyle={active} to="/">
            <span className="nav__icon"></span>
            <span className="nav__title">홈</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/list">
            <span className="nav__icon"></span>
            <span className="nav__title">리스트</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/write">
            <span className="nav__icon"></span>
            <span className="nav__title">작성</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/calender">
            <span className="nav__icon"></span>
            <span className="nav__title">달력</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/setting">
            <span className="nav__icon"></span>
            <span className="nav__title">설정</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav