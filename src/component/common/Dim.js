import { useRef } from 'react'
import { useHistory } from "react-router-dom";
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

function Dim(props) {
  const dim = useRef("")
  const history = useHistory();

  const dimClick = () => {
    if(props.setList) {
      history.push("/list")
    }else {
      props.setDimOpen(false)
      props.setDefault(true)
      props.setSubmit(true)
    }
    clearAllBodyScrollLocks()
  }

  return (
    <div className="dim" ref={dim} onClick={dimClick}></div>
  )
}

export default Dim