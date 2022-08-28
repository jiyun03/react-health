import { NavLink } from "react-router-dom";

// 이미지
import imgHome from "../../assets/img/nav/nav__home.svg";
import imgHomeActive from "../../assets/img/nav/nav__home--active.svg";
import imgList from "../../assets/img/nav/nav__list.svg";
import imgListActive from "../../assets/img/nav/nav__list--active.svg";
import imgWrite from "../../assets/img/nav/nav__write.svg";
import imgWriteActive from "../../assets/img/nav/nav__write--active.svg";
import imgCalender from "../../assets/img/nav/nav__calender.svg";
import imgCalenderActive from "../../assets/img/nav/nav__calender--active.svg";
import imgSetting from "../../assets/img/nav/nav__setting.svg";
import imgSettingActive from "../../assets/img/nav/nav__setting--active.svg";

function Nav() {
  const active = { color: "#ff7e7e" }

  return (
    <nav className="nav">
      <ul className="nav__box">
        <li className="nav__item">
          <NavLink activeStyle={active} to="/" exact>
            <span className="nav__icon-wrap">
              <img src={imgHome} className="nav__icon" alt="홈 아이콘 기본" />
              <img src={imgHomeActive} className="nav__icon nav__icon--active" alt="홈 아이콘 활성화" />
            </span>
            <span className="nav__title">홈</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/list">
            <span className="nav__icon-wrap">
              <img src={imgList} className="nav__icon" alt="리스트 아이콘 기본" />
              <img src={imgListActive} className="nav__icon nav__icon--active" alt="리스트 아이콘 활성화" />
            </span>
            <span className="nav__title">리스트</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/write">
            <span className="nav__icon-wrap">
              <img src={imgWrite} className="nav__icon" alt="작성 아이콘 기본" />
              <img src={imgWriteActive} className="nav__icon nav__icon--active" alt="작성 아이콘 활성화" />
            </span>
            <span className="nav__title">작성</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/calender">
            <span className="nav__icon-wrap">
              <img src={imgCalender} className="nav__icon" alt="달력 아이콘 기본" />
              <img src={imgCalenderActive} className="nav__icon nav__icon--active" alt="달력 아이콘 활성화" />
            </span>
            <span className="nav__title">달력</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeStyle={active} to="/setting">
            <span className="nav__icon-wrap">
              <img src={imgSetting} className="nav__icon" alt="설정 아이콘 기본" />
              <img src={imgSettingActive} className="nav__icon nav__icon--active" alt="설정 아이콘 활성화" />
            </span>
            <span className="nav__title">설정</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav