import { NavLink } from "react-router-dom";

function Nav() {
  const active = { color: "#000" }

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink activeStyle={active} to="/">
            홈
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} to="/list">
            리스트
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} to="/write">
            작성
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} to="/">
            미정
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} to="/">
            설정
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav