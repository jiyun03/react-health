import React from 'react'
import { NavLink } from 'react-router-dom'

function GateItem(props) {
  return (
    <li className={`gate-item__item ${props.className}`}>
      <NavLink to={props.link}>
        <span className="gate-item__tag">
          {props.tag}
        </span>
        <div className="gate-item__title-wrap">
          <div className="gate-item__title">
            {props.title}
          </div>
          <div className="gate-item__subtitle">
            {props.subtitle}
          </div>
        </div>
        <div className="gate-item__img">
          <img src={props.img} alt="" />
        </div>
      </NavLink>
    </li>
  )
}

export default GateItem