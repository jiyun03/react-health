import { enableBodyScroll } from 'body-scroll-lock';
import { useHistory } from "react-router-dom";

function Alert(props) {
  const history = useHistory();

  const btnOk = (e) => {
    props.setValid(true)
    props.setDimOpen(false)
    enableBodyScroll(e)
  }

  const listMove = () => {
    history.push("/list")
  }

  return (
    <div className={`alert alert--${props.type}`}>
      <div className="alert__title-wrap">
        <div className="alert__title">
          {props.title}
        </div>
      </div>
      <div className="alert__content">
          {props.content}
      </div>
      <div className="alert__btn-wrap">
        {
          props.type === "submit" ? 
          <button type="button" onClick={listMove} className="alert__btn">확인</button>:
          <button type="button" onClick={btnOk} className="alert__btn">확인</button>
        }
      </div>
    </div>
  )
}

export default Alert