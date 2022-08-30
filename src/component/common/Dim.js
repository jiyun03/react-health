import { useRef } from 'react'

function Dim(props) {
  const dim = useRef("")
  const dimClick = () => {
    props.setDimOpen(false)
    props.setValid(true)
  }

  return (
    <div className="dim" ref={dim} onClick={dimClick}></div>
  )
}

export default Dim